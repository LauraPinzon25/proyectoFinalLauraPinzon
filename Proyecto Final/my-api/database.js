const mysql=require("promise-mysql");
const dotenv=require("dotenv");
//const mysql = require('mysql');
dotenv.config();
//datos de mysql
const connection=mysql.createConnection({
    host:"localhost",
    database:"sakila",
    user:"root",
    password:"root",
})

const getConnection=async()=>await connection;
module.exports={
    getConnection
}
// Conectar a la base de datos
/*connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conexión establecida con la base de datos');
  });
  // Exportar la conexión para que esté disponible en otros archivos
module.exports = connection;*/