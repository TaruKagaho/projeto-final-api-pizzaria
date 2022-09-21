const express = require( "express" );
const { validate } = require( "express-validation" );

// Controllers
const customersController = require( "../controllers/customers" );
const authController = require( "../controllers/auth" );
const ordersController = require( "../controllers/orders" );
const pizzasControllers = require( "../controllers/pizzas" );

// Middlewares
const verifyToken = require( "../middlewares/auth" );
const verifyCustomers = require( "../middlewares/customers" );
const verifyPizzas = require( "../middlewares/pizzas" );
const verifyOrders = require( "../middlewares/orders" );

// Validations
const schemasCustomers = require( "../validations/customers" );
const { schemaLogin } = require( "../validations/auth" );
const { schemaParams } = require( "../validations/params" );
const {
    schemaAddOrder,
    schemaUpdateOrder
} = require( "../validations/oders" );

const router = express.Router();
// const router = express();

router.post(
    "/customers",
    // verifyCustomers.checkInfosNewCustomer, 
    validate( schemasCustomers.schemaAddCustomer ),
    customersController.addNewCustomer
);
router.post(
    "/login",
    validate( schemaLogin ),
    authController.login
);

router.get(
    "/pizzas",
    pizzasControllers.getAllPizzas
);

router.use( verifyToken );

router.get(
    "/customers",
    customersController.getAllCustomers
);
router.get(
    "/customers/:id",
    validate( schemaParams ),
    verifyCustomers.checkCustomerExist,
    customersController.getCustomerById
);
router.put(
    "/customers/:id",
    validate( schemaParams ),
    verifyCustomers.checkCustomerExist,
    validate( schemasCustomers.schemaUpdateCustomer ),
    customersController.updateCustomer
);
router.delete(
    "/customers/:id",
    validate( schemaParams ),
    verifyCustomers.checkCustomerExist,
    customersController.deleteCustomer
);

router.post(
    "/orders",
    validate( schemaAddOrder ),
    verifyCustomers.checkCustomerExist,
    verifyPizzas.checkPizzaExist,
    ordersController.addNewOrder
);
router.get(
    "/orders",
    ordersController.getAllOrders
);
router.get(
    "/orders/:id",
    validate( schemaParams ),
    verifyOrders.checkOrderExist,
    ordersController.getOrderById,
);
router.put(
    "/orders/:id",
    validate( schemaParams ),
    verifyOrders.checkOrderExist,
    validate( schemaUpdateOrder ),
    ordersController.updateOrder,
);
router.delete(
    "/orders/:id",
    validate( schemaParams ),
    verifyOrders.checkOrderExist,
    ordersController.deleteOrder,
);

module.exports = {
    router,
};
