const express = require("express");
const { dictionaryControllers } = require("../../controllers");
const {authenticate, validateBody} = require("../../middlewares");
const {dictSchemas} = require('../../models')


const router = express.Router();


router.post("/create-dictionary", authenticate, validateBody(dictSchemas.createDictionarySchema),dictionaryControllers.createDictionary);
router.post('/add-word', authenticate, validateBody(dictSchemas.addWordSchema), dictionaryControllers.addWord)
router.delete('/delete-dictionary', authenticate,  dictionaryControllers.deleteDictionary)
router.patch('/change-status', authenticate, validateBody(dictSchemas.changeStatusSchema), dictionaryControllers.changeStatus)
router.patch('/repeat', authenticate, validateBody(dictSchemas.sendToRepeatSchema), dictionaryControllers.sendToRepeat)
router.delete('/delete-word', authenticate,  dictionaryControllers.deleteWord)






module.exports = router;
