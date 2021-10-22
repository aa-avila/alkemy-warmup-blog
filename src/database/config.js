/** LOCAL MySQL server */
/* const database = {
    username: 'root',
    password: '',
    database: 'disney_world',
    host: 'localhost',
    Port: 3306,
    dialect: 'mysql'
}; */

/** Remote MySQL */
const database = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
};

module.exports = database;