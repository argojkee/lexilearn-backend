const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../helpers");
const Joi = require('joi')

const feedbackSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true }
});



feedbackSchema.post("save", handleMongooseError);
const Feedback = model("Feedback", feedbackSchema);

const postFeedbackSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(6).required(),
});

const feedbackSchemas = {postFeedbackSchema}

module.exports = {
  Feedback, feedbackSchemas
};
