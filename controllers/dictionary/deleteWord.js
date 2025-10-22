const {User} = require('../../models');
const {HttpError} = require('../../helpers')

const  deleteWord = async (req, res) => {
    const {user} = req;
    const {wordId, tl} = req.query;

   const currentDictionary = user.dictionaries.find(dict => dict.lang === tl);
  if (!currentDictionary) {
    throw HttpError(400, "You don't have this dictionary");
  }
    
      const wordExists = currentDictionary.words.some(w => String(w._id) === wordId);

  if (!wordExists) {
    throw HttpError(404, "Word not found in this dictionary");
  }

 await User.updateOne(
    { _id: user._id, "dictionaries.lang": tl },
    { $pull: { "dictionaries.$.words": { _id: wordId } } }
  );

  res.json({ message: 'Word deleted successfully', wordId : String(wordId), tl });
}

module.exports = {deleteWord}