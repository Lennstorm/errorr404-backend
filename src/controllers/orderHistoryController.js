import {
  createOrUpdateOrderHistory,
  getAllOrderHistories,
  getOrderHistoryByUserId,
  deleteOrderHistory,
} from "../services/orderHistory.js";

export const getOrderHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const orderHistory = await getOrderHistoryByUserId(Number(userId));
    if (!orderHistory) {
      return res.status(200).json({ message: "Order History is empty" });
    }
    return res.status(200).json(orderHistory);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving order history" });
  }
};

export const updateOrderHistory = async (req, res) => {
  try {
    const result = await createOrUpdateOrderHistory(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating order history" });
  }
};

export const getAllOrderHistoriesHandler = async (req, res) => {
  try {
    const orderHistories = await getAllOrderHistories();
    return res.status(200).json(orderHistories);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching order histories" });
  }
};

export const deleteOrderHistoryHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await deleteOrderHistory(Number(userId));
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting order history" });
  }
};
