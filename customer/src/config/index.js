const dotEnv  = require("dotenv");

// if (process.env.NODE_ENV !== 'prod') {
//     const configFile =  `./.env.${process.env.NODE_ENV}`;
//     dotEnv.config({ path:  configFile });
// } else {
//     dotEnv.config({ path: '.env' });
// }

dotEnv.config({ path: '.env' });

module.exports = {

    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    CLOUDAMQP_URL: process.env.CLOUDAMQP_URL,
    EXCHANGE_NAME: 'ONLINE_SHOPPING',
    CUSTOMER_BINDIG_KEY: 'CUSTOMER_SERVICE',
    QUEUE_NAME:"CUSTOMER_QUEUE"

}
 