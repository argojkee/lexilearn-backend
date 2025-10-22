const express = require("express");
const  {wordsControllers}  = require("../../controllers");
const {  authenticate } = require("../../middlewares");

const router = express.Router();

const {getRandomWords, getWord, translate} = wordsControllers

router.get('/get-word', authenticate, getWord)
router.get('/translate', authenticate,  translate)
router.get('/get-random' , authenticate, getRandomWords)

module.exports = router;
