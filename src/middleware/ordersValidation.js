import orderSchema from "../models/orderSchema.js";

export const validateOrder = (req, res, next) => {
  const { error } = orderSchema.validate(req.body);
  if (!error) {
    next();
  } else {
    return res.status(400).json({ error: error.details[0].message });
  }
};
