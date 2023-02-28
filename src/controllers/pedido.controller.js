import { getConnection } from "../database/database";

const getPedidos = async (req, res) => {
    try {
        const connection = await getConnection();

        let qryFechas = 'SELECT DISTINCT FechaEntrega FROM pedido order by 1'
        const resultFechas = await connection.query(qryFechas);


        if (resultFechas.length > 0) {

            resultFechas.forEach(element => element.Pedidos = [])

            let qryAgrupados = 'SELECT ped._id Pedido_id, c._id Cliente_id, v._id Venta_id, c.Nombre, ped.Direccion, ped.Telefono, ped.FechaEntrega, ped.Estado, ped.Nota '
            qryAgrupados += 'FROM pedido ped '
            qryAgrupados += 'LEFT JOIN venta v on v._id=ped.Venta_id '
            qryAgrupados += 'LEFT JOIN cliente c on c._id=v.Cliente_id ORDER BY 1;'

            const resultAgrupados = await connection.query(qryAgrupados);

            if (resultAgrupados.length > 0) {
                //Agrega array vacio para el detalle del pedido
                resultAgrupados.forEach(element => element.Pedido = [])

                let qryDetalleProductos = 'SELECT ped._id as Pedido_id, pv.Cantidad, p.Nombre as Producto, p._id Producto_id, pv.PrecioVentaProducto PrecioVenta '
                qryDetalleProductos += 'FROM venta v '
                qryDetalleProductos += 'RIGHT JOIN pedido ped on ped.Venta_id=v._id '
                qryDetalleProductos += 'INNER JOIN productoventa pv on v._id=pv.Venta_id '
                qryDetalleProductos += 'INNER JOIN producto p on p._id=pv.Producto_id ORDER BY 1;'

                const resultDetalleProductos = await connection.query(qryDetalleProductos);

                resultFechas.forEach(grandparent => {
                    resultAgrupados.forEach(parent => {
                        //console.log("grandparent.FechaEntrega", grandparent.FechaEntrega)
                        //console.log("parent.FechaEntrega", parent.FechaEntrega)
                        if (grandparent.FechaEntrega.toString() === parent.FechaEntrega.toString()) {
                            grandparent.Pedidos.push(parent)
                            resultDetalleProductos.forEach(child => {
                                if (parent.Pedido_id === child.Pedido_id) {
                                    parent.Pedido.push(child)
                                }
                            })
                        }
                    })
                })

                res.json(resultFechas);
            }
        }
        else {
            res.json({ ErrorMessage: "No hay pedidos para mostrar" })
        }


    } catch (error) {
        console.error(error)
        res.status(500);
        res.send(error.toString());
    }
};

const getPedido = async (req, res) => {
    try {
        const connection = await getConnection();

        const { _id } = req.params

        let qryAgrupados = 'SELECT ped._id Pedido_id, c._id Cliente_id, v._id Venta_id, c.Nombre, ped.Direccion, ped.Telefono, ped.FechaEntrega, ped.Estado, v.MedioPago, v.Observacion, v.Dcto '
        qryAgrupados += 'FROM pedido ped '
        qryAgrupados += 'LEFT JOIN venta v on v._id=ped.Venta_id '
        qryAgrupados += 'LEFT JOIN cliente c on c._id=v.Cliente_id '
        qryAgrupados += 'WHERE ped._id = ' + _id + ';'

        const resultAgrupados = await connection.query(qryAgrupados);

        //Agrega array vacio para el detalle del pedido
        resultAgrupados.forEach(element => element.Productos = [])

        let qryDetalleProductos = 'SELECT ped._id as Pedido_id, pv.Cantidad, p._id Producto_id, p.Nombre, p.Precio, p.Costo '
        qryDetalleProductos += 'FROM venta v '
        qryDetalleProductos += 'RIGHT JOIN pedido ped on ped.Venta_id=v._id '
        qryDetalleProductos += 'INNER JOIN productoventa pv on v._id=pv.Venta_id '
        qryDetalleProductos += 'INNER JOIN producto p on p._id=pv.Producto_id '
        qryDetalleProductos += 'WHERE ped._id = ' + _id + ';'

        const resultDetalleProductos = await connection.query(qryDetalleProductos);

        resultAgrupados.forEach(parent => {
            resultDetalleProductos.forEach(child => {
                if (parent.Pedido_id === child.Pedido_id) {
                    parent.Productos.push(child)
                }
            })
        })


        console.log("🚀 ~ file: pedido.controller.js:97 ~ getPedido ~ resultAgrupados", resultAgrupados)
        res.json(resultAgrupados);


    } catch (error) {
        console.error(error)
        res.status(500);
        res.send(error.toString());
    }
};

const deletePedido = async (req, res) => {
};

const CompletarPedido = async (req, res) => {

    const { Venta, ProductosVenta, Pedido } = req.body
    console.log("🚀 ~ file: pedido.controller.js:116 ~ CompletarPedido ~ Pedido:", Pedido)
    console.log("🚀 ~ file: pedido.controller.js:116 ~ CompletarPedido ~ Venta:", Venta)
    /*  let fx = Venta.Fecha.toString()
     fx = fx.replace(/T/g, " ")
     fx = fx.replace(/Z/g, "")
     Venta.Fecha = fx
     if (Pedido)
         Pedido.FechaCreacion = fx
     console.log("🚀 ~ file: venta.controller.js ~ line 8 ~ addVenta ~ fx", fx) */


    const connection = await getConnection();

    try {

        const datosVenta = await connection.query(`select * from venta where _id = ${Pedido.Venta_id}`)
        const datosProductoVenta = await connection.query(`select * from productoventa where Venta_id = ${Pedido.Venta_id}`)
        const datosPedido = await connection.query(`select * from pedido where Venta_id = ${Pedido.Venta_id}`)


        let eliminados = []
        let nuevos = []
        let mismos = []



        //identifica los que setan en ambos
        for (const keyDatosPV in datosProductoVenta) {
            for (const key in ProductosVenta) {

                let PV = {
                    Producto_id: ProductosVenta[key]._id,
                    Cantidad: ProductosVenta[key].Cantidad,
                    PrecioVentaProducto: ProductosVenta[key].PrecioVenta > 0 ? ProductosVenta[key].PrecioVenta : ProductosVenta[key].Precio
                }

                if (PV.Producto_id === datosProductoVenta[keyDatosPV].Producto_id) {
                    //Se guardan en el array de los que ya están para hacer update
                    mismos.push(PV)
                }
            }
        }

        //identifica eliminados
        for (const keyDatosPV in datosProductoVenta) {

            let estaEnMismos = false

            for (const key in mismos) {
                let PV = {
                    Producto_id: ProductosVenta[key]._id
                }

                if (mismos[key].Producto_id === datosProductoVenta[keyDatosPV].Producto_id) {
                    estaEnMismos = true
                }
            }

            if (!estaEnMismos) {
                eliminados.push(datosProductoVenta[keyDatosPV])
            }
        }

        //identifica nuevos
        for (const keyProductosVenta in ProductosVenta) {

            let PV = {
                Producto_id: ProductosVenta[keyProductosVenta]._id,
                Cantidad: ProductosVenta[keyProductosVenta].Cantidad,
                PrecioVentaProducto: ProductosVenta[keyProductosVenta].PrecioVenta > 0 ? ProductosVenta[keyProductosVenta].PrecioVenta : ProductosVenta[keyProductosVenta].Precio
            }

            let estaEnMismos = false

            for (const keyMismos in mismos) {
                if (mismos[keyMismos].Producto_id === PV.Producto_id) {
                    estaEnMismos = true
                }
            }

            if (!estaEnMismos) {
                nuevos.push(PV)
            }
        }




        console.log("--------------MISMOS----------")

        console.log(mismos)

        console.log("--------------ELIMINADOS----------")

        console.log(eliminados)

        console.log("--------------NUEVOS----------")

        console.log(nuevos)





        await connection.query('START TRANSACTION')

        mismos.forEach(async (item) => {
            await connection.query(
                `UPDATE productoventa 
                SET 
                CANTIDAD = ${item.Cantidad}, 
                PRECIOVENTAPRODUCTO = ${item.PrecioVentaProducto} 
                WHERE 
                VENTA_ID = ${Pedido.Venta_id} AND 
                PRODUCTO_ID = ${item.Producto_id};`
            )
        })

        eliminados.forEach(async (item) => {
            await connection.query(
            `DELETE FROM productoventa 
            WHERE 
            _ID = ${item._id}}`
                )
        })

        nuevos.forEach(item => {
            
        });








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

export const methods = {
    getPedidos,
    deletePedido,
    getPedido,
    CompletarPedido
};