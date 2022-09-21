const { DataTypes } = require( "sequelize" );

const { db } = require( "../database/connection" );
const Orders = require( "./Order.model" );
const Pizzas  = require( "./Pizza.model");

const Items = db.define( "Items", {
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    orders_id: {
        type: DataTypes.SMALLINT,
        references: {
            model: Orders,
            key: "id",
        },
        allowNull: false,
    },
    pizzas_id: {
        type: DataTypes.SMALLINT,
        references: {
            model: Pizzas,
            key: "id",
        },
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, 
{
    tableName: "items",
} );

// Items.sync( { force: true } );
// Items.sync();
// Items.drop();

/* module.exports = {
    Item,
}; */
module.exports = Items;
