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

        const resultAgrupados = await connection.query(qry);

        if (resultAgrupados.length > 0) {
            resultAgrupados.forEach(element => element.Ventas = [])

            let qry2 = 'SELECT PrecioTotalVenta,MedioPago,cliente.Nombre Cliente, DATE_FORMAT(DATE_SUB(fecha, INTERVAL 3 HOUR), "%Y-%m-%dT%H:%i:%s") as Fecha '
            qry2 += 'from venta, cliente '
            qry2 += 'WHERE venta.Cliente_id=cliente._id and '
            qry2 += 'fecha >= DATE_SUB(CURDATE(), INTERVAL 30 day) '
            qry2 += 'order by fecha desc'

            const resultVentas = await connection.query(qry2);

            console.log(resultAgrupados[0], resultVentas[0])

            resultAgrupados.forEach(parent => {
                resultVentas.forEach(child => {
                    let fecha1 = new Date(parent.FechaVenta).toLocaleDateString()
                    
                    let fecha2 = new Date(child.Fecha).toLocaleDateString()
                    console.log("🚀 ~ file: venta.controller.js ~ line 72 ~ getHistorial30Dias ~ child.Fecha.split(T)", child.Fecha.split("T")[0])
                    //console.log("fechaFormateada", fecha1, fecha2)
                    if (parent.FechaVenta === child.Fecha.split("T")[0]) {
                        
                        
                        //console.log("iguales", fecha1, fecha2)
                        parent.Ventas.push(child)
                    }
                });
            });
            console.log(resultAgrupados)
            res.json(resultAgrupados);
        }
        else {
            res.json({ErrorMessage: "No hay ventas para mostrar"})
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
        let qry = "SELECT count(_id) NroVentas, COALESCE(sum(PrecioTotalVenta), 0) SumaVentas "
        qry += "FROM venta "
        qry += "where DATE_SUB(Fecha,INTERVAL 3 HOUR) BETWEEN '" + req.params.FechaInicio + " 00:00:00' AND '" + req.params.FechaFin + " 23:59:00';"
        //qry += "where Fecha BETWEEN '" + req.params.FechaInicio + " 00:00:00' AND '" + req.params.FechaFin + " 23:59:00';"
        const result = await connection.query(qry);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/* 
SELECT count(_id) NroVentas, sum(PrecioTotalVenta) SumaVentas
FROM `venta`
where Fecha BETWEEN '2022-09-29 00:00:00' AND '2022-10-03 23:59:00'; */

//SELECT count(_id) as NroVentas,sum(Preciototalventa) as SumaVentas, DATE_FORMAT(fecha, " %d-%m-%Y") as FechaVenta 
//from Venta 
//WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 30 day) 
//GROUP by day(fecha) 
//order by fecha desc

export const methods = {
    addVenta,
    getHistorial30Dias,
    getEstadisticas
};