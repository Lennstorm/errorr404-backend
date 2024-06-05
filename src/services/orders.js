import { createOrUpdateOrderHistory } from "./orderHistory.js";
import { getCustomerById } from "./customers.js"; // Ensure this is correctly imported

const createOrder = async (userId, cart, totalPrice) => {
  try {
    if (cart.length === 0) {
      return {
        status: 400,
        response: { error: "Cart is empty" },
      };
    }

    await getCustomerById(userId); // Check if the user exists

    // Use the totalPrice passed as parameter
    const newOrder = {
      items: [...cart],
      totalPrice: totalPrice,
    };

    const orderHistoryData = {
      userId,
      orders: [newOrder],
      totalPrice: totalPrice,
    };

    const result = await createOrUpdateOrderHistory(orderHistoryData);

    cart.length = 0; // Clear the cart

    return {
      status: 201,
      response: { message: result },
    };
  } catch (error) {
    return {
      status: 500,
      response: { error: "Failed to place order: " + error.message },
    };
  }
};

const getAllOrders = async (userId) => {
  try {
    const customer = await getCustomerById(userId); // Ensure user exists
    // Implement logic to fetch all orders for the specific user from order history
  } catch (error) {
    throw new Error("Failed to fetch orders: ");
  }
};

const getOrderById = async (userId, orderId) => {
  try {
    const customer = await getCustomerById(userId); // Ensure user exists
    // Implement logic to fetch order by ID for the specific user from order history
  } catch (error) {
    throw new Error("Failed to fetch order: " + error.message);
  }
};

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export { createOrder, getAllOrders, getOrderById };
