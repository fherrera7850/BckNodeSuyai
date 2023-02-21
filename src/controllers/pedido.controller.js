import { getConnection } from "../database/database";

const getPedidos = async (req, res) => {
    try {
        const connection = await getConnection();

        let qryFechas = 'SELECT DISTINCT FechaEntrega FROM pedido order by 1'
        const resultFechas = await connection.query(qryFechas);


        if (resultFechas.length > 0) {

            resultFechas.forEach(element => element.Pedidos = [])

            let qryAgrupados = 'SELECT ped._id Pedido_id, c._id Cliente_id, v._id Venta_id, c.Nombre, ped.Direccion, ped.Telefono, ped.FechaEntrega, ped.Estado '
            qryAgrupados += 'FROM pedido ped '
            qryAgrupados += 'LEFT JOIN venta v on v._id=ped.Venta_id '
            qryAgrupados += 'LEFT JOIN cliente c on c._id=v.Cliente_id ORDER BY 1;'

            const resultAgrupados = await connection.query(qryAgrupados);

            if (resultAgrupados.length > 0) {
                //Agrega array vacio para el detalle del pedido
                resultAgrupados.forEach(element => element.Pedido = [])

                let qryDetalleProductos = 'SELECT ped._id as Pedido_id, pv.Cantidad, p.Nombre as Producto '
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

        let qryDetalleProductos = 'SELECT ped._id as Pedido_id, pv.Cantidad, p.Nombre, p.Precio, p.Costo '
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

export const methods = {
    getPedidos,
    deletePedido,
    getPedido
};