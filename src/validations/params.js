const { joi } = require( "../configs/Joi" );

const schemaParams = {
    params: joi.object( {
        id: joi.string().pattern( /^[0-9]+$/ ),
    } ),
};

module.exports = {
    schemaParams,
};
