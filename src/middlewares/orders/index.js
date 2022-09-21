// const { Orders, Customers } = require( "../../models" );

const { db } = require( "../../database/connection" );

const checkOrderExist = async ( req, res, next ) => {
    try {
        const { id } = req.params;

        const queryOrders = `
            SELECT 
                o.id as orders_id, 
                c.name  
            FROM orders o
            JOIN customers c ON o.customers_id = c.id
            WHERE o.id = ?
        `;
        const [ customerOrder ] = await db.query(
            queryOrders,
            {
                replacements: [ Number( id ) ],
            }
        );

        if ( customerOrder.length === 0 ) {
            return res.status( 404 ).json( "Pedido não cadastrado." );
        }

        req.order = customerOrder[ 0 ];

        next();
    } catch ( error ) {
        console.log( error.message );
    }
};

module.exports = {
    checkOrderExist,
};
