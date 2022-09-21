require( "dotenv" ).config();

const express = require( "express" );

const { router } = require( "./router" );
const { db } = require( "./database/connection" );
const { handleError } = require( "./middlewares/handleError" );

const app = express();

db.hasConnection();

app.use( express.json() );
app.use( router );

// app.use( express.static( "index.html" ) );

app.use( handleError );

app.listen( 8080, () => {
    console.log( "O servidor está rodando na porta 8080." );
} );
