const  { HttpError } = require("../../helpers");
const { Word} = require("../../models");


const getWord = async (req, res, next) => {

    const {lang, text} = req.query;

const currentWord = await Word.findOne({ [`${lang}.text`]: text.trim().toLowerCase() });

    if(!currentWord) throw HttpError(400, "We haven't this word in our dictionary")

    res.status(200).json(currentWord)
  
  }






module.exports = {getWord};
