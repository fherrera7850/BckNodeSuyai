// Get the client
import mysql from 'mysql2/promise';
import config from '../config';

export const getConnection = async () => {
    const connection = await mysql.createConnection({
        host: config.host,
        database: config.database,
        user: config.user,
        password: config.password,
        port: config.port
    });

    return connection;
}
