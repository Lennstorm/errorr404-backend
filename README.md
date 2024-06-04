# API Documentation

Routes starting with `:id` are protected. The `:id` parameter needs to be replaced by the user NeDB `_id`.

Below is the default user in the database. Login using email and phone number. Use `_id` value to access protected routes.

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phoneNumber": "+1234567890",
  "_id": "xbc9Nbod8wWdPzRd"
}
```

## CUSTOMERS

**POST** new customer http://localhost:3000/customers

Send valid json data based on customerSchema in the body request. Below is the scheme for the customer model file.

```json
{
  "firstName": "Joi.string().required()",
  "lastName": "Joi.string().required()",
  "email": "Joi.string().email().required()",
  "password": "Joi.string().min(6).required()",
  "phoneNumber": "Joi.string()",
}
```

**GET** all customers http://localhost:3000/customers

**GET** find specific customer using the customer \_id as route parameter http://localhost:3000/customers/:id

**DELETE** customer by \_id http://localhost:3000/customers/:id

## LOGIN

**POST** login user http://localhost:3000/login

Send valid json data in the request body. A user logs in by entering valid email and phone number values. Login controller checks if the entered data is correct.

```json
{
  "email": "Joi.string().email().required()",
  "password": "Joi.string().min(6).required()"
}
```

## PRODUCTS

**POST** new product http://localhost:3000/products/:productID
Use the _id value in the parameter to delete that product.

Send valid json data in the request body to create a new product products.db

```json
{
  "id": "Joi.number().integer().required()",
  "title": "Joi.string().required()",
  "desc": "Joi.string().required()",
  "price": "Joi.number().precision(2).required()"
}
```

**GET** all products http://localhost:3000/products

**PUT** product by \_id http://localhost:3000/products/:id

**DELETE** product by \_id http://localhost:3000/products/:id

## CART (protected)

**GET** cart page. Not protected http://localhost:3000/cart

**GET** customer cart using customer \_id as route parameter http://localhost:3000/:customerID/cart

**POST** Add product to cart by using the product id as a route parameter. http://localhost:3000/:customerID/cart/:productID

**DELETE** product from customer cart using customer \_id and product id as route parameters http://localhost:3000/:customerID/cart/:productID

## ORDER (protected)

**POST** new order. This will empty the customer cart and send the cart items into the customers unique order history object in the orderHistory.db http://localhost:3000/:customerID/orders

## ORDER HISTORY (protected)

**GET** all order histories http://localhost:3000/:customerID/order-history

**GET** specific customer order history http://localhost:3000/:customerID/order-history/:orderHistoryID

**DELETE** specific customer order history http://localhost:3000/:customerID/order-history/:orderHistoryID

## ABOUT

**GET** about information http://localhost:3000/about
