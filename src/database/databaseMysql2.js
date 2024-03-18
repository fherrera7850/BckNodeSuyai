import mysql from "mysql2";
import config from "./../config";
const parameters = {
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    port: config.port,
    connectionLimit: 10,
    multipleStatements: true
}
//console.log("🚀 ~ file: databaseMysql2.js:12 ~ parameters:", parameters)

const getConnectionMysql2 = () => {
    try {
        const connection = mysql.createPool(parameters);
        return connection;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getConnectionMysql2
};