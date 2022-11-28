const dotEnv  = require("dotenv");


if (process.env.NODE_ENV !== 'prod') {

    const configFile =  `.env`;
    dotEnv.config({ path: '.env' });


} else {
    
    dotEnv.config();

}

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    CLOUDAMQP_URL: process.env.CLOUDAMQP_URL,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    SHOPPING_BINDING_KEY: 'SHOPPING_SERVICE',
    CUSTOMER_BINDIG_KEY: 'CUSTOMER_SERVICE'
}
 