const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const amqplib = require('amqplib');

const { APP_SECRET, MESSAGE_BROKER_URL, EXCHANGE_NAME, CLOUDAMQP_URL } = require('../config');

//Utility functions
module.exports.GenerateSalt = async () => {
        return await bcrypt.genSalt()
};

module.exports.GeneratePassword = async (password, salt) => {
        return await bcrypt.hash(password, salt);
};


module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
        return await this.GeneratePassword(enteredPassword, salt) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
        return await jwt.sign(payload, APP_SECRET, { expiresIn: '1d' })
};

module.exports.ValidateSignature = async (req) => {

        const signature = req.get('Authorization');

        console.log(signature);

        if (signature) {
                const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
                req.user = payload;
                return true;
        }

        return false
};

module.exports.FormateData = (data) => {
        if (data) {
                return { data }
        } else {
                throw new Error('Data Not found!')
        }
}


// //Raise Events
// module.exports.PublishCustomerEvent = async (payload) => {
//         axios.post("http://customer:8001/app-events/", {
//                 payload,
//         });

//         //     axios.post(`${BASE_URL}/customer/app-events/`,{
//         //         payload
//         //     });
// };

// module.exports.PublishShoppingEvent = async (payload) => {
//         // axios.post('http://gateway:8000/shopping/app-events/',{
//         //         payload
//         // });

//         axios.post(`http://shopping:8003/app-events/`, {
//                 payload,
//         });
// };


/* --------------------------------- Message Broker ----------------------------------*/
//  S1 CREATE CHANEL
module.exports.CreateChannel = async () => {
        try {

                const connection = await amqplib.connect(MESSAGE_BROKER_URL || CLOUDAMQP_URL);
                const channel = await connection.createChannel();
                await channel.assertExchange(EXCHANGE_NAME, "direct", false);
                return channel;

        } catch (err) {
                throw err;
        }

};

//  S2 PUBLISCH MESSAGE
module.exports.PublishMessage = (channel, bind_key, msg) => {
        channel.publish(EXCHANGE_NAME, bind_key, Buffer.from(msg));
        console.log("Sent from Product-Service: ", msg);
};

//  S3 SUBSCRIBE MESSAGE
module.exports.SubscribeMessageChannel = async (channel, bind_key,) => {

        const appQueue = await channel.assertQueue('QUEUE_NAME')

        channel.bindQueue(appQueue.queue, EXCHANGE_NAME, bind_key)

        channel.consume(appQueue.queque, data => {
                console.log('Products-Service Recieved Data')
                console.log(data.content.toString())
                channel.ack(data)
        })

}