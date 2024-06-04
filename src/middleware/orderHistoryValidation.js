import orderHistorySchema from "../models/orderHistoryScheme.js"; // Import the Joi schema for order history validation

const validateOrderHistory = (req, res, next) => {
  const { error } = orderHistorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }
  next();
};

export default validateOrderHistory;
