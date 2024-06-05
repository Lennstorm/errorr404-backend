//Stops request if a request contains body content when it should not

export function bodyContentBlocker(req, res, next) {
  if (Object.keys(req.body).length !== 0) {
    return res
      .status(400)
      .json({ message: "No body content allowed in request" });
  }
  next();
}
