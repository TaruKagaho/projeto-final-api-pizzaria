const { DataTypes } = require( "sequelize" );

const { db } = require( "../database/connection" );

const Customers = db.define( "Customers", {
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
    email: {
        type: DataTypes.STRING( 50 ),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
},
{
    tableName: "customers",
} );

// Customers.sync( { force: true } );
// Customers.sync();
// Customers.drop();

/* module.exports = {
    Customer,
}; */
module.exports = Customers;
