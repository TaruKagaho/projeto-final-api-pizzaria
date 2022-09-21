const { Sequelize } = require( "sequelize" );

// Dados de conexão ao banco de dados.
const DB_NAME = "pizzariaGama";
const DB_USER = "root";
const DB_PASSWORD = "MySql01";
const DB_CONFIG = {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
};

// Objeto para guardar a conexão do banco de dados.
let db = {};

try {
    db = new Sequelize(
        DB_NAME,
        DB_USER,
        DB_PASSWORD,
        // @ts-ignore
        DB_CONFIG
    );
} catch ( error ) {
    console.log( { Error: error.message } );
}

function hasConnection() {
    db.authenticate()
        .then( function () {
            console.log( "Conexão com exito ao banco de dados." );
            // db.drop();
        } )
        // .then( () => db.sync() )
        .catch( function ( error ) {
            console.log( "Erro de conexão " + error.message + " ao banco de dados." );
        } );
}

Object.assign( db, {
    hasConnection,
} );

module.exports = {
    db,
};
