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
      // Update the existing order history
      existingOrderHistory.orders.push(orderHistoryData.orders[0]);
      existingOrderHistory.totalPrice += orderHistoryData.totalPrice;
      existingOrderHistory.firstName = orderHistoryData.firstName; // Ensure firstName is updated

      await orderHistoryDb.update(
        { userId: orderHistoryData.userId },
        existingOrderHistory
      );
    } else {
      // Insert new order history
      await orderHistoryDb.insert({
        userId: orderHistoryData.userId,
        firstName: orderHistoryData.firstName,
        totalPrice: orderHistoryData.totalPrice,
        orders: orderHistoryData.orders,
      });
    }
  } catch (error) {
    throw new Error("Failed to create or update order history");
  }
}

// Function to get all order histories
async function getAllOrderHistories() {
  try {
    const orderHistories = await orderHistoryDb.find({});
    if (orderHistories.length === 0) {
      throw new Error("No order histories found");
    }
    return orderHistories;
  } catch (error) {
    throw new Error("Failed to fetch order histories");
  }
}

// Function to get order history by NeDB _id
async function getOrderHistoryById(id) {
  try {
    const orderHistory = await orderHistoryDb.findOne({ userId: id });
    if (!orderHistory) {
      throw new Error("Order history not found");
    }
    return orderHistory;
  } catch (error) {
    throw new Error("Failed to fetch order history");
  }
}

export {
  createOrUpdateOrderHistory,
  getAllOrderHistories,
  getOrderHistoryById,
  orderHistoryDb,
};
