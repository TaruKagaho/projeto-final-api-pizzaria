const { joi } = require( "../configs/Joi" );

const schemaAddCustomer = {
    body: joi.object( {
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    } )
};

const schemaUpdateCustomer = {
    body: joi.object( {
        name: joi.string(),
        email: joi.string().email(),
        password: joi.string(),
    } )
};

module.exports = {
    schemaAddCustomer,
    schemaUpdateCustomer,
};
