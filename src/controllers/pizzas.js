const { Pizzas } = require( "../models" );

const getAllPizzas = async ( req, res ) => {
    try {
        // @ts-ignore
        const pizzasList = await Pizzas.findAll( {
            attributes: {
                exclude: [ "createdAt", "updatedAt" ],
            }
        } );

        return res.status( 200 ).json( pizzasList );
    } catch ( error ) {
        console.log( error.message );
    }
};

module.exports = {
    getAllPizzas,
};
