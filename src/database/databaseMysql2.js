import mysql from "mysql2";
import config from "./../config";

const parameters = {
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    port: config.port,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}
console.log("🚀 ~ file: databaseMysql2.js:12 ~ parameters:", parameters)
const connection = mysql.createPool(parameters);

const getConnectionMysql2 = () => {
    return connection;
};

const queryMysql2 = async (query) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
    return promise;
};

module.exports = {
    getConnectionMysql2,
    queryMysql2
};
