import { getConnection } from "./../database/database";

const addVenta = async (req, res) => {

    const { Venta, ProductosVenta, Pedido } = req.body
    let fx = Venta.Fecha.toString()
    fx = fx.replace(/T/g, " ")
    fx = fx.replace(/Z/g, "")
    Venta.Fecha = fx
    if (Pedido)
        Pedido.FechaCreacion = fx
    console.log("🚀 ~ file: venta.controller.js ~ line 8 ~ addVenta ~ fx", fx)


    const connection = await getConnection();

    try {
        await connection.query('START TRANSACTION')
        const resVenta = await connection.query("INSERT INTO venta SET ?", Venta)
        const idVenta = resVenta.insertId
        console.log("🚀 ~ file: venta.controller.js:19 ~ addVenta ~ idVenta", idVenta)
        for (const key in ProductosVenta) {
            let PV = {
                Venta_id: idVenta,
                Producto_id: ProductosVenta[key]._id,
                Cantidad: ProductosVenta[key].Cantidad,
                PrecioVentaProducto: ProductosVenta[key].PrecioVenta > 0 ? ProductosVenta[key].PrecioVenta : ProductosVenta[key].Precio
            }
            console.log("🚀 ~ file: venta.controller.js:27 ~ addVenta ~ PV", PV)
            await connection.query("INSERT INTO productoventa SET ?", PV)
        }

        console.log("🚀 ~ file: venta.controller.js:34 ~ addVenta ~ Pedido", Pedido)

        if (Pedido) {
            Pedido.Venta_id = idVenta
            console.log("🚀 --------HACE INSERT DE PEDIDO-------")
            await connection.query("INSERT INTO pedido SET ?", Pedido)
        }

        await connection.query("COMMIT;")
        console.log("commit")
        res.sendStatus(200)
    } catch (error) {
        await connection.query("ROLLBACK;")
        console.log("🚀rollback", error)
        res.sendStatus(500)
    } finally {
        await connection.query("COMMIT;")
    }
}

const getVenta = async (req, res) => {
    try {
        const { _id } = req.params
        console.log("🚀 ~ file: venta.controller.js:92 ~ getVenta ~ req.body", req.body)
        const connection = await getConnection();

        let qry = 'SELECT pv._id , v._id _idv, ped._id _idp, p._id id_producto, v.PrecioTotalVenta, v.Dcto, v.MedioPago, c._id Cliente_id, p.Nombre, pv.Cantidad, p.Precio Precio, pv.PrecioVentaProducto PrecioVenta, p.Costo, p.Descripcion, p.CategoriaProducto_id, p.Imagen, (select count(Producto_id) from productoventa) as Ventas, DATE_FORMAT(DATE_SUB(v.Fecha, INTERVAL 3 HOUR), "%Y-%m-%dT%H:%i:%s") Fecha '
        qry += 'from venta v left join cliente c on v.Cliente_id=c._id '
        qry += 'left join productoventa pv on pv.Venta_id=v._id '
        qry += 'inner join producto p on p._id=pv.Producto_id '
        qry += 'left join pedido ped on v._id=ped.Venta_id '
        qry += `WHERE v._id = ${_id};`

        const resultVenta = await connection.query(qry);

        res.json(resultVenta);

    } catch (error) {
        console.error(error)
        res.status(500);
        res.send(error.toString());
    }
};

const deleteVenta = async (req, res) => {
    const { _id } = req.params
    const connection = await getConnection();

    try {
        await connection.query('START TRANSACTION;')
        await connection.query(`DELETE FROM venta WHERE _id=${_id};`)
        await connection.query("COMMIT;")
        console.log("commit")
        res.sendStatus(200)
    } catch (error) {
        await connection.query("ROLLBACK;")
        console.log("🚀rollback", error)
        res.sendStatus(500)
    }
};

const getHistorial30Dias = async (req, res) => {
    try {
        const connection = await getConnection();

        let qry = 'SELECT count(_id) as NroVentas,sum(Preciototalventa) as SumaVentas, DATE_FORMAT(DATE_SUB(fecha, INTERVAL 3 HOUR), "%Y-%m-%d") as FechaVenta '
        qry += 'from venta '
        qry += 'WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 30 day) '
        qry += 'and _id not in (select Venta_id from pedido where Estado = "I") '
        qry += 'GROUP by FechaVenta '
        qry += 'order by FechaVenta desc'
        console.log("🚀 ~ file: venta.controller.js ~ line 48 ~ getHistorial30Dias ~ qry", qry)

        const resultAgrupados = await connection.query(qry);

        if (resultAgrupados.length > 0) {
            resultAgrupados.forEach(element => element.Ventas = [])

            let qry2 = 'SELECT v._id, sum(pv.Cantidad) CantidadItems, v.PrecioTotalVenta,v.MedioPago,c.Nombre Cliente, DATE_FORMAT(DATE_SUB(v.fecha, INTERVAL 3 HOUR), "%Y-%m-%dT%H:%i:%s") as Fecha, v.observacion as Observacion,CONCAT(TRIM(c.Calle), ", ", TRIM(c.Comuna)) Direccion '
            qry2 += 'from venta v left join cliente c '
            qry2 += 'on v.Cliente_id=c._id '
            qry2 += 'left join productoventa pv '
            qry2 += 'on pv.Venta_id=v._id '
            qry2 += 'WHERE v.fecha >= DATE_SUB(CURDATE(), INTERVAL 30 day)  '
            qry2 += 'and v._id not in (select Venta_id from pedido where Estado = "I") '
            qry2 += 'GROUP by v._id '
            qry2 += 'order by v.fecha desc; '

            const resultVentas = await connection.query(qry2);

            //console.log(resultAgrupados[0], resultVentas[0])

            resultAgrupados.forEach(parent => {
                resultVentas.forEach(child => {
                    if (parent.FechaVenta === child.Fecha.split("T")[0]) {
                        parent.Ventas.push(child)
                    }
                });
            });
            res.json(resultAgrupados);
        }
        else {
            res.json({ ErrorMessage: "No hay ventas para mostrar" })
        }


    } catch (error) {
        console.error(error)
        res.status(500);
        res.send(error.toString());
    }
};


const getEstadisticas = async (req, res) => {
    try {

        const connection = await getConnection();

        let qryTotales = "SELECT "
        qryTotales += "count(_id) NroVentas, "
        qryTotales += "COALESCE(sum(PrecioTotalVenta), 0) SumaVentas, "
        qryTotales += "avg(preciototalventa) PromedioVentas, "
        qryTotales += "GananciaVentas-sum(Dcto) GananciaVentas "
        qryTotales += "FROM venta, (select (sum(pv.PrecioVentaProducto*pv.cantidad) - sum(p.Costo*pv.cantidad)) GananciaVentas "
        qryTotales += "from productoventa pv inner join producto p "
        qryTotales += "on pv.Producto_id=p._id inner join venta v "
        qryTotales += "on v._id=pv.Venta_id "
        qryTotales += "where "
        qryTotales += 'v._id not in (select Venta_id from pedido) and '
        qryTotales += "DATE_SUB(v.Fecha,INTERVAL 3 HOUR) BETWEEN '" + req.params.FechaInicio + " 00:00:00' AND '" + req.params.FechaFin + " 23:59:59') temp2 where  "
        qryTotales += "DATE_SUB(Fecha,INTERVAL 3 HOUR) BETWEEN '" + req.params.FechaInicio + " 00:00:00' AND '" + req.params.FechaFin + " 23:59:59' "
        qryTotales += "and _id not in (select Venta_id from pedido)"

        const resultTotales = await connection.query(qryTotales);
        console.log("🚀 ~  resultTotales", resultTotales)


        let qryMediosDePago = "select "
        qryMediosDePago += "CASE "
        qryMediosDePago += "WHEN mediopago = 0 THEN 'Efectivo' "
        qryMediosDePago += "WHEN mediopago = 1 THEN 'Transferencia' "
        qryMediosDePago += "WHEN mediopago = 2 THEN 'Tarjeta' "
        qryMediosDePago += "ELSE '-' "
        qryMediosDePago += "END mediopago, count(mediopago) cantidad "
        qryMediosDePago += "from venta "
        qryMediosDePago += "where "
        qryMediosDePago += '_id not in (select Venta_id from pedido) and '
        qryMediosDePago += "DATE_SUB(Fecha,INTERVAL 3 HOUR) BETWEEN '" + req.params.FechaInicio + " 00:00:00' AND '" + req.params.FechaFin + " 23:59:59' ";
        qryMediosDePago += "group by mediopago order by cantidad desc;"

        const resultMediosDePago = await connection.query(qryMediosDePago);
        console.log("🚀 ~  resultMediosDePago", resultMediosDePago)

        if (resultTotales.length > 0) {
            resultTotales[0].MediosDePago = resultMediosDePago
        }

        let qryMasVendidos = "select p.nombre, sum(cantidad) cantidad,sum(pv.PrecioVentaProducto*pv.Cantidad) total "
        qryMasVendidos += "from productoventa pv inner join producto p "
        qryMasVendidos += "on p._id=pv.Producto_id  inner join venta v "
        qryMasVendidos += "on v._id=pv.Venta_id "
        qryMasVendidos += "where DATE_SUB(v.Fecha,INTERVAL 3 HOUR) BETWEEN '" + req.params.FechaInicio + " 00:00:00' AND '" + req.params.FechaFin + " 23:59:59' ";
        qryMasVendidos += 'and v._id not in (select Venta_id from pedido) '
        qryMasVendidos += "group by pv.producto_id "
        qryMasVendidos += "order by cantidad desc;"
        console.log("🚀 ~ file: venta.controller.js:189 ~ getEstadisticas ~ qryMasVendidos", qryMasVendidos)

        const resultMasVendidos = await connection.query(qryMasVendidos);
        console.log("🚀 ~ resultMasVendidos", resultMasVendidos)

        resultTotales[0].MasVendidos = resultMasVendidos

        //const result = await connection.query(qryTotales);
        res.json(resultTotales);

    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log("🚀 ~ file: venta.controller.js:207 ~ getEstadisticas ~ error", error)
    }
};

export const methods = {
    addVenta,
    getHistorial30Dias,
    getEstadisticas,
    getVenta,
    deleteVenta
};