// Pool: Para realizar consultas a la base de datos
const { Pool } = require('pg');
const fs = require("fs");

const dbConfig = {
    user: 'admindb@database-app',
    host: 'database-app.postgres.database.azure.com',
    password: 'admin-db-2021',
    database: 'app-database-ap',
    ssl: {
        cert: fs.readFileSync("src/database_config/BaltimoreCyberTrustRoot.crt.pem"), // Forzando la conección SSL
        rejectUnauthorized: true
    }
}

const pool = new Pool(dbConfig);

const insertarProducto = async (req, res) => {
    try {
        const { usuario, descripcion, precio } = req.body;
        await pool.query(
            `INSERT INTO productos (usuario, descripcion, precio)
            VALUES ('${usuario}', '${descripcion}', '${precio}')`
        );
        res.send({ "inserted": true })
    } catch (e) {
        res.send({ "inserted": false }) /* retorna false si no encuentra usuario */
    }
}

module.exports = {
    insertarProducto
}