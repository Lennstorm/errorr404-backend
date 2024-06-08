import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";

export async function validateAdmin(req, res, next) {
  const loggedInCustomer = await findLoggedInCustomer();

  if (loggedInCustomer._id !== "admin") {
    return res.status(400).json({
      message: "Admin authorization denied",
    });
  }
  next();
}
