const {User} = require('../../models');
const {HttpError} = require('../../helpers')

const  deleteDictionary = async (req, res) => {
    const {user} = req;
    const {tl} = req.query;

    if (!user.dictionaries.some(dict => dict.lang === tl)) throw HttpError(400, "You haven't this dictionary")
    
    const dictionariesUpdated = user.dictionaries.filter(dict => dict.lang !== tl);


    const updatedUser = await User.findByIdAndUpdate(user.id, {dictionaries : dictionariesUpdated}, {new : true})

    updatedUser.password = undefined

    res.status(200).json(updatedUser)
}

module.exports = {deleteDictionary}