const Errors = require('../helpers/errors');

// eslint-disable-next-line no-unused-vars
const ErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof Errors.BadRequest) {
    res.status(400).send({ message: err.message });
  } else if (err instanceof Errors.Unauthorized) {
    res.status(401).send({ message: err.message });
  } else if (err instanceof Errors.Forbidden) {
    res.status(403).send({ message: err.message });
  } else if (err instanceof Errors.NotFound) {
    res.status(404).send({ message: err.message });
  } else if (err instanceof Errors.Conflict) {
    res.status(409).send({ message: err.message });
  } else if (err instanceof Errors.UnprocessableEntity) {
    res.status(422).send({ message: err.message });
  } else if (err instanceof Errors.InternalServerError) {
    res.status(500).send({ message: err.message });
  } else {
    res.status(500).send({ error: err, message: err.message });
  }
};

module.exports = { ErrorHandlerMiddleware };
