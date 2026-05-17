const mysql = require('mysql2');

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projeto_cadastro'
});

conection.connect((err) => {
    if(err){
        console.error("Erro de conecção: " + err.stack);
        return;
    }
    console.log("conecçao estabelecida");
});

module.exports = conection;