import { createOrUpdateOrderHistory } from "./orderHistory.js";
import { getCustomerById } from "./customers.js"; // Ensure this is correctly imported
import { orderHistoryDb } from "./orderHistory.js";

const createOrder = async (userId, cart, totalPrice) => {
  try {
    if (cart.length === 0) {
      return {
        status: 400,
        response: { error: "Cart is empty" },
      };
    }

    const customer = await getCustomerById(userId); // Check if the user exists

    const prelTime = new Date();
    const prelDelTime = new Date(prelTime.getTime() + 20 * 60000); // 20 minutes from placed order

    function formatDate(date) {
      // Get the components of the date
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");

      // Format the date as desired
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const orderTime = formatDate(prelTime);
    const deliveryTime = formatDate(prelDelTime);

    const newOrder = {
      orderId: Math.floor(Math.random() * 1000000), //generate random orderId
      userId,
      items: [...cart],
      totalPrice: totalPrice,
      orderTime: orderTime,
      deliveryTime: deliveryTime,
    };

    const orderHistoryData = {
      userId,
      firstName: customer.firstName,
      totalPrice: totalPrice,
      orders: [newOrder],
    };

    const result = await createOrUpdateOrderHistory(orderHistoryData);

    cart.length = 0; // Clear the cart

    return {
      status: 201,
      response: {
        message:
          "Order has been sent. Enter your order ID to see delivery time",
        orderId: newOrder.orderId,
      },
    };
  } catch (error) {
    return {
      status: 500,
      response: { error: "Failed to place order: " + error.message },
    };
  }
};

const getOrderById = async (userId, orderId) => {
  const fetchOrderByIdFromDatabase = async (userId, orderId) => {
    try {
      // Find the order history document for the user
      const orderHistory = await orderHistoryDb.findOne({ userId: userId });
      if (!orderHistory) {
        return null;
      }

      // Find the specific order within the orders array
      const order = orderHistory.orders.find(
        (order) => order.orderId === parseInt(orderId, 10)
      );
      return order;
    } catch (error) {
      throw new Error("Failed to fetch order: " + error.message);
    }
  };

  try {
    await getCustomerById(userId); // Ensure user exists

    // Fetch the order from the order history database
    const order = await fetchOrderByIdFromDatabase(userId, orderId);

    if (!order) {
      return {
        status: 404,
        response: { error: "Order NOT found!" },
      };
    }
    return {
      status: 200,
      response: order,
    };
  } catch (error) {
    return {
      status: 500,
      response: { error: "Failed to fetch order: " + error.message },
    };
  }
};

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export { createOrder, getOrderById };
