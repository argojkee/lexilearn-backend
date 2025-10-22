const {ctrlWrapper} = require('../../helpers')

const {getWord} = require('./getWord')
const {translate} = require('./translate')
const {getRandomWords} = require('./getRandomWords')




module.exports = {
    getWord: ctrlWrapper(getWord),
    translate: ctrlWrapper(translate),
    getRandomWords : ctrlWrapper(getRandomWords)
}