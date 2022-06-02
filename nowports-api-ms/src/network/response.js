exports.success = function (req, res, content, status) {
  let statusCode = status || 200;
  res.status(statusCode).send(content);
}

exports.error = function (req, res, content, status) {
  let statusCode = status || 500;
  res.status(statusCode).send(content);
}
