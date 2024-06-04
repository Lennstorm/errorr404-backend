import {
  createOrUpdateOrderHistory,
  getAllOrderHistories,
  getOrderHistoryById,
  deleteOrderHistory,
} from "../services/orderHistory.js";

export const getOrderHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const orderHistory = await getOrderHistoryById(id);
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

    if (orderHistories.length === 0) {
      const error = {
        status: 400,
        message: "No order histories found",
      };
      return res.status(error.status).json(error);
    }

    return res.status(200).json(orderHistories);
  } catch (error) {
    // If an error occurs during the process, construct and send the error response
    const errorResponse = {
      status: 500,
      message: "Failed to fetch order histories",
    };
    return res.status(errorResponse.status).json(errorResponse);
  }
};

export const deleteOrderHistoryHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteOrderHistory(id);
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting order history" });
  }
};
