import { getConnection } from "./../database/mysql2promise";

const getProductos = async (req, res) => {

    const connection = await getConnection();

    // A simple SELECT query
    try {
        let qry = "select p.*, count(pv.Producto_id) as Ventas "
        qry += "from producto p left join productoventa pv "
        qry += "on p._id=pv.Producto_id "
        qry += "GROUP by p._id "
        qry += "order by ventas desc"

        const [results, fields] = await connection.query(qry);
        console.log("🚀 ~ getProductos ~ results:", results)

        res.json(results);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
}
export const methods = {
    getProductos
}; 