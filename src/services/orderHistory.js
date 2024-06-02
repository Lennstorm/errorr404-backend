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
      await orderHistoryDb.update(
        { userId: orderHistoryData.userId },
        { $set: orderHistoryData }
      );
      return "Order history updated successfully";
    } else {
      const newOrderHistory = await orderHistoryDb.insert(orderHistoryData);
      return newOrderHistory;
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

// Function to get order history by user ID
async function getOrderHistoryByUserId(userId) {
  try {
    const orderHistory = await orderHistoryDb.findOne({ userId });
    if (!orderHistory) {
      throw new Error("Order history not found");
    }
    return orderHistory;
  } catch (error) {
    throw new Error("Failed to fetch order history");
  }
}

// Function to delete order history by user ID
async function deleteOrderHistory(userId) {
  try {
    const numRemoved = await orderHistoryDb.remove({ userId });
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
  getOrderHistoryByUserId,
  deleteOrderHistory,
};
