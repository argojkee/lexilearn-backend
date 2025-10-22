const { Feedback } = require("../../models");

const addFeedback = async (req, res) => {
const { id } = req.user;
const answer = await Feedback.create({...req.body, owner : id })

res.status(200).json(answer)



};




module.exports = {addFeedback};
