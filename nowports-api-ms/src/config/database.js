module.exports = {
    connections: {
        mysql: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            dialect: process.env.DB_CONNECTION,
            logging: process.env.NODE_ENV === 'production' ? false : console.log
        }
    }
}
