// Pool: Para realizar consultas a la base de datos
const { Pool } = require('pg');

//SSL permite cifrar el tráfico de datos entre dos servidores web protegiendo así la conexión
const fs = require("fs");

const config = {
    user: 'admindb@database-app',
    host: 'database-app.postgres.database.azure.com',
    password: 'admin-db-2021',
    database: 'app-database-ap',
    ssl: {
        cert: fs.readFileSync("certificadoSSL/BaltimoreCyberTrustRoot.crt.pem"), // Forzando la conección SSL
        rejectUnauthorized: true,
    }
};

const pool = new Pool (config);





/* insertarUsuario({
    nombre : 'Priscilla2',
    apellidos : 'Webb',
    contrasena : 'webb'
}); */
getUsers();