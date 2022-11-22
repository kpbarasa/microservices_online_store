const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {

    constructor() {
        this.repository = new ShoppingRepository();
    }

    async GetCart({ _id }) {

        const cartItems = await this.repository.Cart(_id);

        return FormateData(cartItems);
    }

    async PlaceOrder(userInput) {

        const { _id, txnNumber } = userInput

        const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);

        return FormateData(orderResult);

    }

    async GetOrders(customerId) {
        const orders = await this.repository.Orders(customerId);
        return FormateData(orders)
    }

    async GetOrderDetails({ _id, orderId }) {
        const orders = await this.repository.Orders(productId);
        return FormateData(orders)
    }

    async ManageCart(customerId, item, qty, isRemove) { 
        console.log(item);

        const cartResult = await this.repository.AddCartItem(customerId, item, qty, isRemove);
        return FormateData(cartResult);
    }

    async SubscribeEvents(payload) {

        payload = JSON.parse(payload);

        const item = payload.data.data.product
        const { data } = payload;

        switch (data.event) {
            case 'ADD_TO_CART':
                this.ManageCart(data.data.userId, item, data.qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(data.userId, item, data.qty, true);
                break;
            default:
                break;
        }

    }

    async GetOrderPayload(userId, order, event) {

        if (order) {
            const payload = {
                event: event,
                data: { userId, order }
            };

            return payload
        } else {
            return FormateData({ error: 'No Order Available' });
        }

    }

    async GetCartPayload(cartItems, event) {

        if (cartItems) {
            const payloadCart = {
                event: event,
                product: {
                    _id: cartItems._id,
                    name: cartItems.name,
                    banner: cartItems.banner,
                    price: cartItems.price,
                },
                unit: cartItems.unit
            };

            return payloadCart
        } else {
            return FormateData({ error: 'No Cart Available' });
        }

    }


}

module.exports = ShoppingService;