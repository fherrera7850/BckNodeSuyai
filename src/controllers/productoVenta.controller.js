import { getConnection } from "./../database/database";

const addProductoVenta = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("Insert into productoventa set ?", req.body);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    addProductoVenta
};