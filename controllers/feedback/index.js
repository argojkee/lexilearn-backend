const { ctrlWrapper } = require('../../helpers')

const { addFeedback } = require('./addFeedback')

module.exports = {addFeedback : ctrlWrapper(addFeedback)}
