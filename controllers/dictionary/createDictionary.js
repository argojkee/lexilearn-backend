const { HttpError } = require("../../helpers");
const {  User } = require("../../models");

const createDictionary = async (req, res) => {
const { tl} = req.body;
const {user} = req;


if (user.dictionaries.some(dict => dict.lang === tl)) throw HttpError(400, 'You already have this dictionary')
if (tl === user.nativeLang) throw HttpError(400, "This is your native language")

 const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { dictionaries: { lang: tl, words: [] } } },
      { new: true } 
    );

    updatedUser.password = undefined

    res.status(200).json(updatedUser)
};




module.exports = {createDictionary};
