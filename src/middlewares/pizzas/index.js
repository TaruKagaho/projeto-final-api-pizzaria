const { db } = require( "../../database/connection" );

const checkPizzaExist = async ( req, res, next ) => {
    try {
        const { items } = req.body;
        
        const queryPizzas = `
            SELECT 
                id as pizzas_id, 
                name, 
                price
            FROM pizzas
        `;
        const [ pizzasDB ] = await db.query( queryPizzas );

        const pizzasOrdered = items.reduce( ( acc, item ) => {
            const pizzaFinded = pizzasDB.find( pizza => pizza.pizzas_id === item.pizzas_id );

            if ( pizzaFinded === undefined ) {
                return res.status( 404 ).json( "Pizza não cadastrada." );
            }

            pizzaFinded.quantity = item.quantity;

            acc.push( pizzaFinded );

            return acc;
        }, [] );
        
        req.pizzas = pizzasOrdered;

        next();
    } catch ( error ) {
        console.log( error.message );
    }
};

module.exports = {
    checkPizzaExist,
};
