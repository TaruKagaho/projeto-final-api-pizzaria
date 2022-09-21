const { joi } = require( "../configs/Joi" );

const schemaAddOrder = {
    body: joi.object( {
        customers_id: joi.number().integer().positive().strict().required(),
        items: joi
            .array()
            .min( 1 )
            .items( {
                pizzas_id: joi.number().integer().positive().strict().required(),
                quantity: joi.number().integer().positive().strict().required(),
            } )
            .required(),
    } ),
};

const schemaUpdateOrder = {
    body: joi.object( {
        items: joi
            .array()
            .min( 1 )
            .items( {
                pizzas_id: joi.number().integer().positive().strict().required(),
                quantity: joi.number().integer().positive().strict().required(),
            } )
            .required(),
    } ),
};

module.exports = {
    schemaAddOrder,
    schemaUpdateOrder,
};
