const { db } = require( "../database/connection" );
const { Orders, Items, Customers } = require( "../models" );

const addNewOrder = async ( req, res ) => {
    try {
        const { customer, pizzas } = req;

        const newOrder = await Orders.create( {
            customers_id: customer.id,
        } );

        /* for ( const pizza of pizzas ) {
            pizza.orders_id = newOrder.id;
        } */
        const pizzasList = pizzas.map( pizza => {
            pizza.orders_id = newOrder.id;

            return pizza;
        } );

        const newItems = await Items.bulkCreate(
            pizzasList,
            {
                fields: [ "orders_id", "pizzas_id", "quantity" ],
            }
        );

        const customerOrder = {
            order_id: newOrder.id,
            customer_name: customer.name,
            pizzas: [],
            total: 0,
        };

        const pizzasCustomerOrdered = pizzasList.map( pizza => {
            const itemFinded = newItems.find( item => {
                return item.pizzas_id === pizza.pizzas_id;
            } );

            console.log( { itemFinded: itemFinded } );

            pizza.item_id = itemFinded.id;

            pizza.total_item = pizza.price * pizza.quantity;

            return pizza;
        } );

        customerOrder.pizzas = pizzasCustomerOrdered;

        const total = pizzasCustomerOrdered.reduce( ( acc, pizza ) => {
            return acc += pizza.total_item;
        }, 0 );

        customerOrder.total = total;

        return res.status( 201 ).json( customerOrder );
    } catch ( error ) {
        console.log( { Error: error.message } );
    }
};

const getAllOrders = async ( req, res ) => {
    try {
        /* const listOrders = await Orders.findAll( {
            include: [
                {
                    model: Customers,
                    required: true,
                },
                {
                    model: Items,
                    required: true
                },
            ],
        } ); */
        const queryOrders = `
            SELECT 
                o.id as id_order, 
                c.name  
            FROM orders o
            JOIN customers c ON o.customers_id = c.id
        `;
        const [ listOrders ] = await db.query( queryOrders );

        for ( const order of listOrders ) {
            const queryItems = `
                SELECT
                    i.id as id_item,
                    p.name,
                    p.price,
                    i.quantity
                FROM items i
                JOIN pizzas p ON i.pizzas_id = p.id
                WHERE orders_id = ?
            `;
            const [ items ] = await db.query(
                queryItems,
                {
                    replacements: [ order.id_order ],
                }
            );
            const localItems = [ ...items ];

            let total = 0;

            const itemsUpdate = localItems.map( item => {
                item.total_item = item.price * item.quantity;

                total += item.total_item;

                return item;
            } );

            order.items = itemsUpdate;
            order.total = total;
        }

        return res.status( 200 ).json( listOrders );
    } catch ( error ) {
        console.log( { Error: error.message } );
    }
};

const getOrderById = async ( req, res ) => {
    try {
        const { order } = req;

        const queryItems = `
            SELECT
                i.id as id_item,
                p.name,
                p.price,
                i.quantity
            FROM items i
            JOIN pizzas p ON i.pizzas_id = p.id
            WHERE orders_id = ?
        `;
        const [ items ] = await db.query(
            queryItems,
            {
                replacements: [ order.orders_id ],
            }
        );

        const localItems = [ ...items ];

        let total = 0;

        const itemsUpdate = localItems.map( item => {
            item.total_item = item.price * item.quantity;

            total += item.total_item;

            return item;
        } );

        order.items = itemsUpdate;
        order.total = total;

        return res.status( 200 ).json( order );
    } catch ( error ) {
        console.log( error.message );
    }
};

const updateOrder = async ( req, res ) => {
    try {
        const { items } = req.body;
        const { order } = req;

        const itemsDB = await Items.findAll(
            {
                attributes: [ "id" ],
                where: {
                    orders_id: order.orders_id,
                },
            }
        );

        const itemsDBid = itemsDB.map( item => {
            return item.id;
        } );

        const localItems = [ ...items ];

        for ( let i = 0; i < localItems.length; i++ ) {
            localItems[ i ].id = itemsDBid[ i ];
            localItems[ i ].orders_id = order.orders_id;
        }

        const itemsUpadete = await Items.bulkCreate(
            localItems,
            {
                updateOnDuplicate: [ "pizzas_id", "quantity" ],
            }
        );

        return res.status( 200 ).json( { itemsUpadete: itemsUpadete } );
    } catch ( error ) {
        console.log( error.message );
    }
};

const deleteOrder = async ( req, res ) => { 
    try {
        const { id } = req.params;

        // @ts-ignore
        await Orders.destroy( {
            where: {
                id,
            }
        } );

        return res.status( 200 ).json( "Pedido removido com sucesso" );
    } catch ( error ) {
        console.log( error.message );
    }
};

module.exports = {
    addNewOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
