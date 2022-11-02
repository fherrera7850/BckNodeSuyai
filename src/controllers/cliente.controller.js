import { getConnection } from "./../database/database";

const addCliente = async (req, res) => {

    const { Cliente } = req.body
    console.log("🚀 ~ file: cliente.controller.js ~ line 6 ~ addCliente ~ Cliente", Cliente)
    

    const connection = await getConnection();

    try {
        await connection.query('START TRANSACTION')
        await connection.query("INSERT INTO cliente SET ?", req.body)
        await connection.query("commit")
        console.log("commit")
        res.sendStatus(200)
    } catch (error) {
        await connection.query("rollback")
        console.log("🚀rollback", error)
        res.sendStatus(500)
    }
}

export const methods = {
    addCliente
};