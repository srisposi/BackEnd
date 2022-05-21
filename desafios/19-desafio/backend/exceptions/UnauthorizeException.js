class UnauthorizeException extends Error {
  constructor(...params) {
    super(...params);
  }
}

module.exports = UnauthorizeException;
