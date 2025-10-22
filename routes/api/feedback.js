const express = require("express");
const  {feedbackControllers}  = require("../../controllers");
const {  authenticate, validateBody } = require("../../middlewares");
const {feedbackSchemas} = require('../../models')

const router = express.Router();

// const {getRandomWords, getWord, translate} = wordsControllers

router.post('/', authenticate, validateBody(feedbackSchemas.postFeedbackSchema), feedbackControllers.addFeedback)


module.exports = router;
