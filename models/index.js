const { Word } = require("./words");
const { User, userSchemas } = require("./user");
const {dictSchemas} = require('./dictionaries')
const {Feedback, feedbackSchemas} = require('./feedback')

module.exports = {
     Word, 
      User, userSchemas,
     dictSchemas,
     Feedback, feedbackSchemas
     };
