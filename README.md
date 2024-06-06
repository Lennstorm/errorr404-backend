# API Documentation

When starting the server with no db files, the products database will autofill. The database for customers will insert a guest user thats logged in by default.

The guest user is limited to some operations to limit potential bugs. The Guest cannot log itself out, update or delete itself.

You can create a new customer and login on that account to access more API requests.


## CUSTOMERS

**POST** new customer http://localhost:3000/customers

You can copy and paste the json below to create a new customer. Change whatever you like and see what works and what doesn't.

```json
{
	"firstName": "Test",
	"lastName": "Tester",
	"email": "testman@testmail.com",
	"password": "thisisatest",
	"phoneNumber": "101010010011"
}
```

**GET** all customers http://localhost:3000/customers

**GET** Profile page for logged in customer. http://localhost:3000/customers/profile  

**PUT** Update logged in customer information. Guests can't update the guest account http://localhost:3000/customers

**DELETE** Delete logged in customer. Guests can't delete the guest account http://localhost:3000/customers

## LOGIN

**POST** login user http://localhost:3000/login

Send valid json data in the request body. A user logs in by entering valid email and phone number values. Login controller checks if the entered data is correct. Below is the test users email and password in json.

```json
{
	"email": "testman@testmail.com",
	"password": "thisisatest"
}
```

## PRODUCTS

**POST** new product http://localhost:3000/products

Anyone can add products to the database, admin benefits is not implemented.

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

**PUT** update product with product \_id http://localhost:3000/products/:id

**DELETE** product by \_id http://localhost:3000/products/:id  
Use the _id value in the parameter to delete that product.

## CART

**GET** cart http://localhost:3000/cart

**POST** Add product to logged in customer cart http://localhost:3000/cart/:productId

**DELETE** product from customer cart using product _id as route parameter http://localhost:3000/cart/:productID

## ORDER

**POST** new order. This will empty the customer cart and send the cart items into the customers unique order history object in the orderHistory.db http://localhost:3000/orders

**GET** specific order to see delivery time and other info. http://localhost:3000/orders/:orderId
Use the order ID provided in the response from the POST operation.


## ORDER HISTORY 

**GET** all order histories http://localhost:3000/order-history/all

**GET** specific customer order history http://localhost:3000/order-history


## ABOUT

**GET** about information http://localhost:3000/about




