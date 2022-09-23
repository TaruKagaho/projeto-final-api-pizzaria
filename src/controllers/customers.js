const bcrypt = require( "bcryptjs" );

const { db } = require( "../database/connection" );

const { Customers } = require( "../models" );

const addNewCustomer = async ( req, res ) => {
    try {
        const { name, email, password } = req.body;

        const cryptPassword = await bcrypt.hash( password, 10 );

        // @ts-ignore
        const addedCustomer = await Customers.create( {
            name,
            email,
            password: cryptPassword,
        } );

        const newCustomer = {
            id: addedCustomer.id,
            name: addedCustomer.name, 
            email: addedCustomer.email,
        };

        return res.status( 201 ).json( newCustomer );
    } catch ( error ) {
        return res.status( 400 ).json( { error: error.errors[ 0 ].message } );
    }
};

const getAllCustomers = async ( req, res ) => {
    try {
        // @ts-ignore
        // const customersList = await Customers.findAll();

        const query = "SELECT id, name, email FROM customers";
        const [ results ] = await db.query( query );

        return res.status( 200 ).json( results );
    } catch ( error ) {
        console.log( error.message );
    }
};

const getCustomerById = async ( req, res ) => {
    try {
        const { customer } = req;

        return res.status( 200 ).json( customer );
    } catch ( error ) {
        console.log( error.message );
    }
};

const updateCustomer = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const { customer } = req;

        let cryptPassword;

        if ( password ) {
            cryptPassword = await bcrypt.hash( password, 10 );
        }
        // @ts-ignore
        await Customers.update( {
            name,
            email,
            password: cryptPassword,
        }, {
            where: {
                id,
            }
        } );

        const customerUpdated = {
            id: customer.id,
            name: name ? name : customer.name,
            email: email ? email : customer.email,
        };

        return res.status( 200 ).json( customerUpdated );
    } catch ( error ) {
        console.log( error.message );
    }
};

const deleteCustomer = async ( req, res ) => {
    try {
        const { id } = req.params;

        // @ts-ignore
        await Customers.destroy( {
            where: {
                id,
            }
        } );

        return res.status( 200 ).json( "Cliente removido com sucesso" );
    } catch ( error ) {
        console.log( error.message );
    }
};

module.exports = {
    addNewCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
