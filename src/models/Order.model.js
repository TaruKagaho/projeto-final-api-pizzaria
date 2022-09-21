const { DataTypes } = require( "sequelize" );

const { db } = require( "../database/connection" );
const Customers = require( "./Customer.model" );

const Orders = db.define( "Orders", {
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    customers_id: {
        type: DataTypes.SMALLINT,
        references: {
            model: Customers,
            key: "id",
        },
        allowNull: false,
    },
}, 
{
    tableName: "orders"
} );

// Orders.sync( { force: true } );
// Orders.sync();
// Orders.drop();

/* module.exports = {
    Order,
}; */
module.exports = Orders;
