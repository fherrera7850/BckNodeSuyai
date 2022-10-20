import { getConnection } from "./../database/database";

const addVenta = async (req, res) => {

    const { Venta, ProductosVenta } = req.body
    let fx = Venta.Fecha.toString()
    fx = fx.replace(/T/g, " ")
    fx = fx.replace(/Z/g, "")
    Venta.Fecha = fx
    console.log("🚀 ~ file: venta.controller.js ~ line 8 ~ addVenta ~ fx", fx)


    const connection = await getConnection();

    try {
        await connection.query('START TRANSACTION')
        const resVenta = await connection.query("INSERT INTO venta SET ?", Venta)
        const idVenta = resVenta.insertId
        for (const key in ProductosVenta) {
            let PV = {
                Venta_id: idVenta,
                Producto_id: ProductosVenta[key]._id,
                Cantidad: ProductosVenta[key].Cantidad,
                PrecioVentaProducto: ProductosVenta[key].Precio
            }
            await connection.query("INSERT INTO productoventa SET ?", PV)
        }

        await connection.query("commit")
        console.log("commit")
        res.sendStatus(200)
    } catch (error) {
        await connection.query("rollback")
        console.log("🚀rollback", error)
        res.sendStatus(500)
    }
}

const getHistorial30Dias = async (req, res) => {
    try {
        const connection = await getConnection();

        let qry = 'SELECT count(_id) as NroVentas,sum(Preciototalventa) as SumaVentas, DATE_FORMAT(DATE_SUB(fecha, INTERVAL 3 HOUR), "%Y-%m-%d") as FechaVenta '
        qry += 'from venta '
        qry += 'WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 30 day) '
        qry += 'GROUP by FechaVenta '
        qry += 'order by FechaVenta desc'
        //console.log("🚀 ~ file: venta.controller.js ~ line 48 ~ getHistorial30Dias ~ qry", qry)

        const resultAgrupados = await connection.query(qry);

        if (resultAgrupados.length > 0) {
            resultAgrupados.forEach(element => element.Ventas = [])

            let qry2 = 'SELECT PrecioTotalVenta,MedioPago,cliente.Nombre Cliente, DATE_FORMAT(DATE_SUB(fecha, INTERVAL 3 HOUR), "%Y-%m-%dT%H:%i:%s") as Fecha, observacion as Observacion '
            qry2 += 'from venta, cliente '
            qry2 += 'WHERE venta.Cliente_id=cliente._id and '
            qry2 += 'fecha >= DATE_SUB(CURDATE(), INTERVAL 30 day) '
            qry2 += 'order by fecha desc'
            //console.log("🚀 ~ file: venta.controller.js ~ line 60 ~ getHistorial30Dias ~ qry2", qry2)

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
        qryTotales += "GananciaVentas "
        qryTotales += "FROM venta, (select (sum(pv.PrecioVentaProducto*pv.cantidad) - sum(p.Costo*pv.cantidad)) GananciaVentas "
        qryTotales += "from productoventa pv inner join producto p "
        qryTotales += "on pv.Producto_id=p._id inner join venta v "
        qryTotales += "on v._id=pv.Venta_id "
        qryTotales += "where "
        qryTotales += "DATE_SUB(v.Fecha,INTERVAL 3 HOUR) BETWEEN '" + req.params.FechaInicio + " 00:00:00' AND '" + req.params.FechaFin + " 23:59:59') temp2 where  "
        qryTotales += "DATE_SUB(Fecha,INTERVAL 3 HOUR) BETWEEN '" + req.params.FechaInicio + " 00:00:00' AND '" + req.params.FechaFin + " 23:59:59'"

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
        qryMediosDePago += "group by mediopago order by cantidad desc;"

        const resultMediosDePago = await connection.query(qryMediosDePago);
        console.log("🚀 ~  resultMediosDePago", resultMediosDePago)

        resultTotales[0].MediosDePago = resultMediosDePago

        let qryMasVendidos = "select p.nombre, sum(cantidad) cantidad,sum(pv.PrecioVentaProducto*pv.Cantidad) total "
        qryMasVendidos += "from productoventa pv inner join producto p "
        qryMasVendidos += "on p._id=pv.Producto_id "
        qryMasVendidos += "group by pv.producto_id "
        qryMasVendidos += "order by cantidad desc;"

        const resultMasVendidos = await connection.query(qryMasVendidos);
        console.log("🚀 ~ resultMasVendidos", resultMasVendidos)

        resultTotales[0].MasVendidos = resultMasVendidos

        //const result = await connection.query(qryTotales);
        res.json(resultTotales);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    addVenta,
    getHistorial30Dias,
    getEstadisticas
};