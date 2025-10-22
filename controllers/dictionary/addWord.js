const { HttpError } = require("../../helpers");
const { Word, User } = require("../../models");

const addWord = async (req, res) => {
const {wordId, tl} = req.body;
const { nativeLang, dictionaries, id } = req.user;


if (tl === nativeLang) throw HttpError(400, 'This is your native language')

const dictIdx = dictionaries.findIndex(dict => dict.lang === tl);
if (!~dictIdx) throw HttpError(400, 'Add a dictionary firstly');

const wordInBase = await Word.findById(wordId);

if (!wordInBase) throw HttpError(400, "Sorry, we haven'nt this word in our database");

if (dictionaries[dictIdx].words.some(word => String(word._id) === wordId)) throw HttpError(400, "You already have this word in the dictionary")

const {text, synonyms, antonyms, examples} = wordInBase[tl]

dictionaries[dictIdx].words.push({
    text,
    synonyms,
    antonyms,
    examples,
    [nativeLang] : wordInBase[nativeLang],
    _id: wordInBase._id
})

const updatedUser = await User.findByIdAndUpdate(id, {
    dictionaries
}, {new : true})

updatedUser.password = undefined

res.status(200).json(updatedUser)



};




module.exports = {addWord};
