const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const changeStatus = async (req, res, next) => {
 const { wordId, result, tl } = req.body;
    const { user } = req;

    const currentDictionary = user.dictionaries.find(dict => dict.lang === tl)
    if (!currentDictionary) throw HttpError(400, 'Add dictionary firstly')

  const currentWord = currentDictionary.words.find(w => String(w._id) === wordId)
  if(!currentWord) throw HttpError(400, "Add word to the dictionary firstly")

  const newRepeating = result === 'correct' ? currentWord.repeatCount + 1 : 0;

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id,
        "dictionaries.lang": tl,
        "dictionaries.words._id": wordId
      },
      {
        $set: {
          "dictionaries.$[lang].words.$[word].repeatCount": newRepeating
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


module.exports = {changeStatus};
