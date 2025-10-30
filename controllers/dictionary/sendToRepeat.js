const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const sendToRepeat = async (req, res, next) => {
 const { wordId, tl } = req.body;
    const { user } = req;

    const currentDictionary = user.dictionaries.find(dict => dict.lang === tl)
    if (!currentDictionary) throw HttpError(400, 'Add dictionary firstly')

  const currentWord = currentDictionary.words.find(w => String(w._id) === wordId)
  if(!currentWord) throw HttpError(400, "Add word to the dictionary firstly")

    if (currentWord.repeatCount < 10) throw HttpError(400, 'Learn this word firstly')

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id,
        "dictionaries.lang": tl,
        "dictionaries.words._id": wordId
      },
      {
        $set: {
          "dictionaries.$[lang].words.$[word].repeatCount": '0'
        }
      },
      {
        new: true,
        arrayFilters: [
          { "lang.lang": tl },
          { "word._id": wordId }
        ]
      }
    );

    if (!updatedUser) {
      return next(HttpError(404, "Word not found in your dictionary"));
    }

    updatedUser.password = undefined;
    res.status(200).json(updatedUser);

};


module.exports = {sendToRepeat};
