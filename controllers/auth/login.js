const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "Email or password is wrong");

  const { id } = user;

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) throw HttpError(401, "Email or password is wrong");

  const payload = { id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "72h" });

  const updatedUser =  await User.findByIdAndUpdate(id, { token }, {new : true});

  updatedUser.password = undefined
  updatedUser.token = undefined

  res.status(200).json({user: updatedUser, token});
};

module.exports = login;
