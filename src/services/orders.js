import { createOrUpdateOrderHistory } from "./orderHistory.js";
import { getCustomerById } from "./customers.js"; // Ensure this is correctly imported

const createOrder = async (userId, cart) => {
  // Accept cart as a parameter
  try {
    await getCustomerById(userId); // Check if the user exists

    const totalPrice = calculateTotalPrice(cart); // Calculate total price for the specific cart
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

    return result;
  } catch (error) {
    throw new Error("Failed to place order: " + error.message);
  }
};

const getAllOrders = async (userId) => {
  try {
    const customer = await getCustomerById(userId); // Ensure user exists
    // Implement logic to fetch all orders for the specific user from order history
  } catch (error) {
    throw new Error("Failed to fetch orders: " + error.message);
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
