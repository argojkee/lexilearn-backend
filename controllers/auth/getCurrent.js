const getCurrent = async (req, res) => {
  req.user.password = undefined
  res.json(req.user);
};

module.exports = getCurrent;
