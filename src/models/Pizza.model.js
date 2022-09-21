const { DataTypes } = require( "sequelize" );

const { db } = require( "../database/connection" );

const Pizzas = db.define( "Pizzas", {
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING( 100 ),
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
},
    {
        tableName: "pizzas"
    } );

// Pizzas.sync( { force: true } );
// Pizzas.sync();

/* Pizzas.create( {
    name: "Margherita",
    price: 500,
} );
Pizzas.create( {
    name: "Bufala",
    price: 600,
} );
Pizzas.create( {
    name: "Romana",
    price: 575,
} );
Pizzas.create( {
    name: "Diavola",
    price: 750,
} );
Pizzas.create( {
    name: "Pizza Bianca",
    price: 830,
} ); */

/* module.exports = {
    Pizza,
}; */
module.exports = Pizzas;
