const attachSocketIo = (io) => (req, res, next) => {
  req.io = io;
  next();
};

module.exports = { attachSocketIo };
