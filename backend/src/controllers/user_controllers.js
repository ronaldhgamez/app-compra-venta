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

const getUsers = async (req, res) => {
    const pool = new Pool(dbConfig);
    try {
        const respose = await pool.query('SELECT  * FROM Usuarios'); // await para que espere
        res.send(respose['rows']);
    } catch (e) {
        console.log(e)
    }
}

const insertarUsuario = async (req, res) => {
    try {
        const { nombre, apellidos, numerotel, usuario, contrasena } = req.body;
        await pool.query(
            `INSERT INTO usuarios (nombre, apellidos, numerotel, usuario, contrasena)
            VALUES ('${nombre}', '${apellidos}', '${numerotel}', '${usuario}', crypt('${contrasena}', gen_salt('bf')))`
        );
        res.send({ "inserted": true })
    } catch (e) {
        res.send({ "inserted": false })
    }
}

const validarUsuario = async (req, res) => {
    const pool = new Pool(dbConfig);
    try {
        const { usuario, contrasena } = req.body;
        const response = await pool.query(
            `SELECT validarUsuario('${usuario}', '${contrasena}') AS valido`
        );
        const valido = response.rows[0];
        console.log(valido)
        res.send(valido);
    } catch (e) {
        res.send({ error: 0 })
    }
};

module.exports = {
    getUsers,
    insertarUsuario,
    validarUsuario
}