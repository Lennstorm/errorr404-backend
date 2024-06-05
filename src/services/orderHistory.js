import nedb from "nedb-promises";

const orderHistoryDb = new nedb({
  filename: "orderHistory.db",
  autoload: true,
});

// Function to create or update order history
async function createOrUpdateOrderHistory(orderHistoryData) {
  try {
    const existingOrderHistory = await orderHistoryDb.findOne({
      userId: orderHistoryData.userId,
    });
    if (existingOrderHistory) {
      // Push the new order into the existing orders array
      existingOrderHistory.orders.push(orderHistoryData.orders[0]);
      existingOrderHistory.totalPrice += orderHistoryData.totalPrice;

      await orderHistoryDb.update(
        { userId: orderHistoryData.userId },
        {
          $set: {
            orders: existingOrderHistory.orders,
            totalPrice: existingOrderHistory.totalPrice,
          },
        }
      );
      return "Order history updated successfully";
    } else {
      const newOrderHistory = await orderHistoryDb.insert(orderHistoryData);
      return {
        message: "New order history created",
        data: newOrderHistory, // Return the new order history data
      };
    }
  } catch (error) {
    throw new Error("Failed to create or update order history");
  }
}

// Function to get all order histories
async function getAllOrderHistories() {
  try {
    const orderHistories = await orderHistoryDb.find({});
    return orderHistories;
  } catch (error) {
    throw new Error("Failed to fetch order histories");
  }
}

// Function to get order history by NeDB _id
async function getOrderHistoryById(id) {
  try {
    const orderHistory = await orderHistoryDb.findOne({ _id: id });
    if (!orderHistory) {
      throw new Error("Order history not found");
    }
    return orderHistory;
  } catch (error) {
    throw new Error("Failed to fetch order history");
  }
}

// Function to delete order history by NeDB _id
async function deleteOrderHistory(id) {
  try {
    const numRemoved = await orderHistoryDb.remove({ _id: id });
    if (numRemoved === 0) {
      throw new Error("Order history not found");
    }
    return "Order history deleted successfully";
  } catch (error) {
    throw new Error("Failed to delete order history");
  }
}

export {
  createOrUpdateOrderHistory,
  getAllOrderHistories,
  getOrderHistoryById,
  deleteOrderHistory,
  orderHistoryDb,
};
