const def = (method, moduleName) => {
  return (req, res) => {
    const error = (err) => {
      res.status(500).send({
        moduleName,
        message: err.message,
        hind: err?.original?.hint,
        stack: process.env.DEBUG ? err.stack : undefined,
      });
    };

    try {
      method(req, res, error);
    } catch (err) {
      error(err);
    }
  };
};

module.exports = def;
