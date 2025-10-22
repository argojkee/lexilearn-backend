const  { HttpError } = require("../../helpers");
const { Word} = require("../../models");


const getRandomWords = async (req, res, next) => {

    const {tl, count} = req.query;
    const {nativeLang} = req.user;

    if(nativeLang === tl) throw HttpError(400, 'This is your native language')

    if (Number(count) !== 10 && Number(count) !== 20) throw HttpError(400, 'Count should be 10 or 20')

const randomWords = await Word.aggregate([
  { $sample: { size: Number(count) } } ,
  { $project: { 
      [tl]: 1,
      [nativeLang]: 1,
  }}
])

const response = randomWords.map(word => ({
  ...word[tl],
  [nativeLang] : word[nativeLang],
  _id : word._id,
}))


    res.status(200).json(response)
  
  }






module.exports = {getRandomWords};
