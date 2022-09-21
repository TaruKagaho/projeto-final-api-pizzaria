const { db } = require( "../../database/connection" );
// const { Customers } = require( "../../models" );

async function findCustomer( res, idCustomer ) {
    // const customer = await Customers.findByPk( Number( idCustomer ) );

    const query = "SELECT id, name, email FROM customers WHERE id = ?";
    const [ customer ] = await db.query(
        query,
        {
            replacements: [ idCustomer ],
        }
    );
    
    if ( customer.length === 0 ) {
        res.status( 404 ).json( "Cliente não cadastrado." );

        return;
    }

    return customer[ 0 ];
}

const checkCustomerExist = async ( req, res, next ) => {
    try {
        const url = req.url;

        if ( url.includes( "/customers" ) ) {
            const { id } = req.params;
            
            req.customer = await findCustomer( res, Number( id ) );
        }

        if ( url.includes( "/orders" ) ) {
            const { customers_id } = req.body;

            const customer = await findCustomer( res, customers_id );
            
            if (!customer) {
                return;
            }
            
            req.customer = customer;
        }

        next();
    } catch ( error ) {
        console.log( error.message );
    }
};

module.exports = {
    checkCustomerExist,
};
