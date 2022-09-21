const { expressjwt: expressJWT } = require( "express-jwt" );

module.exports = expressJWT( {
    // @ts-ignore
    secret: process.env.SECRET_KEY,
    algorithms: [ "HS256" ],
    // requestProperty: "customer",
} );
