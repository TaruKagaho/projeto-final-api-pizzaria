const Customers = require( "./Customer.model" );
const Items = require( "./Item.model" );
const Orders = require( "./Order.model" );
const Pizzas = require( "./Pizza.model" );

// @ts-ignore
Customers.hasMany( Orders, {
    foreignKey: {
        name: "customers_id",
        allowNull: false,
    }
} );
// @ts-ignore
Orders.belongsTo( Customers, {
    foreignKey: {
        name: "customers_id",
        allowNull: false,
    }
} );

// @ts-ignore
Pizzas.hasMany( Items, {
    foreignKey: {
        name: "pizzas_id",
        allowNull: false,
    }
} );
// @ts-ignore
Items.belongsTo( Pizzas, {
    foreignKey: {
        name: "pizzas_id",
        allowNull: false,
    }
} );

// @ts-ignore
Orders.hasMany( Items, {
    foreignKey: {
        name: "orders_id",
        allowNull: false,
    }
} );
// @ts-ignore
Items.belongsTo( Orders, {
    foreignKey: {
        name: "orders_id",
        allowNull: false,
    }
} );

module.exports = {
    Customers,
    Items,
    Orders,
    Pizzas,
};
