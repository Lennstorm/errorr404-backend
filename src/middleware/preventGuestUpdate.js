import { findLoggedInCustomer } from "../utils/findLoggedCustomer.js";

//Prevent guest account from updating itself

export async function preventGuestUpdate(req, res, next) {
  const loggedInCustomer = await findLoggedInCustomer();

  if (loggedInCustomer && loggedInCustomer._id === "guestintest") {
    return res.status(403).json({
      message: "Guest user cannot update its details.",
    });
  }

  next();
}
