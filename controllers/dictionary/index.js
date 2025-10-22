const {ctrlWrapper} = require('../../helpers')

const {createDictionary} = require('./createDictionary')
const {addWord} = require('./addWord')
const {deleteDictionary} = require('./deleteDictionary')
const {changeStatus} = require('./changeStatus')
const {sendToRepeat} = require('./sendToRepeat')
const {deleteWord} = require('./deleteWord')


module.exports = {
    createDictionary : ctrlWrapper(createDictionary),
    addWord : ctrlWrapper(addWord),
    deleteDictionary : ctrlWrapper(deleteDictionary),
    changeStatus : ctrlWrapper(changeStatus),
    sendToRepeat : ctrlWrapper(sendToRepeat),
    deleteWord : ctrlWrapper(deleteWord)
}