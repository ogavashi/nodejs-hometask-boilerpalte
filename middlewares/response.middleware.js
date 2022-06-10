const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res?.error) {
    res.status(404).json({ error: res.error, message: res.message });
  }

  res.status(200).json(res.data);

  next();
};

exports.responseMiddleware = responseMiddleware;
