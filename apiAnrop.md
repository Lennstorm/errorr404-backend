# API Documentation

## Base URL http://localhost:3000/

Routes starting with `:id` are protected. The `:id` parameter needs to be replaced by the user NeDB `_id`.

Default user in database. Login using email and phone number. Use `_id` value to access protected routes.

````json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "phoneNumber": "+1234567890",
    "_id": "xbc9Nbod8wWdPzRd"
}
````


### CUSTOMERS

**POST** new customer http://localhost:3000/api/customers

Send valid json data based on customerSchema in the body request. Below is the scheme from the model file.

firstName: Joi.string().required(),
lastName: Joi.string().required(),
email: Joi.string().email().required(),
password: Joi.string().min(6).required(),
phoneNumber: Joi.string(),
orderHistory: Joi.array().items(orderHistorySchema).optional()

**GET** all customers http://localhost:3000/api/customers
**GET** customer _id http://localhost:3000/api/customers/:id
**DELETE** customer by _id http://localhost:3000/api/customers/:id




### LOGIN

**POST** login user http://localhost:3000/api/login

Send valid json data in the request body. A user logs in by entering valid email and phone number values. Login controller checks if the entered data is correct.

````json
{
"email": "Joi.string().email().required()",
"phoneNumber": "Joi.string()"
}
````






### PRODUCTS (protected)

**POST** new product http://localhost:3000/:customerID/products
**GET** all products http://localhost:3000/:customerID/products
**PUT** product by _id http://localhost:3000/:customerID/products/:id
**DELETE** product by _id http://localhost:3000/:customerID/products/:id




### CART (protected)

**GET** customer cart http://localhost:3000/:customerID/cart
**POST** new product to customer cart http://localhost:3000/:customerID/cart/:productID
**DELETE** product from customer cart http://localhost:3000/:customerID/cart/:productID




### ORDER (protected)

**POST** new order. This will empty the customer cart and send the cart items into the users unique order history object in the database. http://localhost:3000/:customerID/orders




### ORDER HISTORY (protected)

**POST** new order history http://localhost:3000/:customerID/api/order-history
**GET** all order histories http://localhost:3000/:customerID/api/order-history
**GET** specific customer order history http://localhost:3000/:customerID/api/order-history/:orderHistoryID
**DELETE** specific customer order history http://localhost:3000/:customerID/api/order-history/:orderHistoryID




### ABOUT

**GET** about information http://localhost:3000/about

