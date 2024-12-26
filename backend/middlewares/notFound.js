const notFound = (req, res, next) => {
  const err = new Error(
    `Error 404 : Resource Not Found at ${req.originalUrl} !`
  );
  res.status(404);
  next(err);
};

module.exports = notFound;
