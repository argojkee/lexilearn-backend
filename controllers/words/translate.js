const { HttpError } = require("../../helpers");
const { Word } = require("../../models");

const translate = async (req, res, next) => {
 const { tl,  wordId } = req.query;
    const { user } = req;

    const userDict = user.dictionaries.find(dict => dict.lang === tl);
    if (!userDict) throw HttpError(400, "Add a dictionary firstly");

    const wordToTranslate = await Word.findById(wordId);
    if (!wordToTranslate) throw HttpError(404, "Word not found");


  const {synonyms, antonyms, examples, text } = wordToTranslate[tl]

    const response = {
      word : {
        lang : tl,
        text,
        synonyms,
        antonyms,
        examples,
        [user.nativeLang] : wordToTranslate[user.nativeLang]
      }
    }

    res.status(200).json(response)
};


module.exports = {translate};
