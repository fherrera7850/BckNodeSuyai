import { getConnection } from "./../database/database";

const addVenta = async (req, res) => {

    const { Venta, ProductosVenta } = req.body

    console.log(Venta)
    console.log(ProductosVenta)

    const connection = await getConnection();

    await connection.beginTransaction()

    await connection.query("INSERT INTO Venta SET ?", Venta, async (err, result, fields) => {
        try {
            if (!err) {
                let idVenta = result.insertId
                ProductosVenta.forEach(async (element) => {
                    let PV = {
                        Venta_id: idVenta,
                        Producto_id: element._id,
                        Cantidad: element.Cantidad,
                        PrecioVentaProducto: element.Precio
                    }
                        await connection.query("INSERT INTO ProductoVenta SET ?", PV)
                })
                connection.commit();
                console.log("commit")
                res.sendStatus(200)
            }
            else {
                throw new Error("Error al insertar en tabla principal")
            }
        } catch (error) {
            connection.rollback();
            console.log("ROLLBACK")
            res.sendStatus(500)
        }

    })


    /* .then(() => {
        connection.commit();
        console.log("commit")
        res.sendStatus(200)
    })
    .catch((err) => {
        connection.rollback();
        console.log("ROLLBACK")
        res.sendStatus(500)
    }) */



}

const getHistorial30Dias = async (req, res) => {
    try {
        const connection = await getConnection();

        let qry = 'SELECT count(_id) as NroVentas,sum(Preciototalventa) as SumaVentas, DATE_FORMAT(fecha, "%Y-%m-%dT%H:%i:%s") as FechaVenta '
        qry += 'from Venta '
        qry += 'WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 30 day) '
        qry += 'GROUP by day(fecha) '
        qry += 'order by fecha desc'

        const resultAgrupados = await connection.query(qry);

        resultAgrupados.forEach(element => {
            element.Ventas = []
        });

        let qry2 = 'SELECT PrecioTotalVenta,MedioPago,cliente.Nombre Cliente, fecha Fecha '
        qry2 += 'from Venta, cliente '
        qry2 += 'WHERE Venta.Cliente_id=cliente._id and '
        qry2 += 'fecha >= DATE_SUB(CURDATE(), INTERVAL 30 day) '
        qry2 += 'order by fecha desc'

        const resultVentas = await connection.query(qry2);

        console.log(resultAgrupados[0], resultVentas[0])

        resultAgrupados.forEach(parent => {
            resultVentas.forEach(child => {
                let fecha1 = new Date(parent.FechaVenta).toLocaleDateString()
                let fecha2 = new Date(child.Fecha).toLocaleDateString()
                console.log("fechaFormateada", fecha1, fecha2)
                if (fecha1 === fecha2) {
                    console.log("iguales", fecha1, fecha2)
                    parent.Ventas.push(child)
                }
            });
        });
        console.log(resultAgrupados)
        res.json(resultAgrupados);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getEstadisticas = async (req, res) => {
    try {
        const connection = await getConnection();
        let qry = "SELECT count(_id) NroVentas, COALESCE(sum(PrecioTotalVenta), 0) SumaVentas "
        qry += "FROM venta "
        qry += "where Fecha BETWEEN '" + req.params.FechaInicio + " 00:00:00' AND '" + req.params.FechaFin + " 23:59:00';"
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