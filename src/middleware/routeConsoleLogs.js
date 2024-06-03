// loggingMiddleware.js
function routeLogger(message) {
  return function (req, res, next) {
    const customerId = req.params.id;
    const logMessage = {
      customerId: customerId,
      message: message,
    };
    console.log(logMessage);
    next();
  };
}

export const logCartParam = routeLogger("Cart operation");
export const logOrdersParam = routeLogger("Order operation");
export const logOrderHistory = routeLogger("Order History operation");
