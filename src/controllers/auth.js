const bcrypt = require( "bcryptjs" );
const jwt = require( "jsonwebtoken" );

const { Customers } = require( "../models" );

const login = async ( req, res ) => {
    try {
        const { email, password } = req.body;

        const customer = await Customers.findOne( {
            where: {
                email,
            },
        } );

        if ( !customer ) {
            return res.status( 400 ).json( "Cliente não cadastrado." );
        }

        if ( !bcrypt.compareSync( password, customer.password ) ) {
            return res.status( 401 ).json( "Senha inválida!" );
        }

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign( 
            {
                id: customer.id,
                name: customer.name,
            }, 
            // @ts-ignore
            secretKey, 
            { 
                expiresIn: '2d'
            }
        );

        const customerLogged = {
            cliente: {
                id: customer.id,
                name: customer.name,
                email: customer.email,
            },
            token,
        };

        return res.status( 200 ).json( customerLogged );
    } catch ( error ) {
        console.log( error.message );
    }
};

module.exports = {
    login,
};
