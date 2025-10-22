const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../helpers");

const langSchema = new Schema({
  text: { type: String, required: true },
  synonyms: { type: [String], default: [],required: true },
  antonyms: { type: [String], default: [],required: true },
  examples: { type: [String], default: [],required: true },
  translate : {type : String,required: true },
  repeatCount : {type : Number, default : 0},
  id: { type: Schema.Types.ObjectId, ref: "Word", required: true }
}, { _id: false });

const wordSchema = new Schema({
   en: { type: langSchema },
  fr: { type: langSchema },
  de: { type: langSchema },
  ru: { type: langSchema },
  ua: { type: langSchema },
  tr: { type: langSchema }
});







wordSchema.post("save", handleMongooseError);
const Word = model("word", wordSchema);

module.exports = {
  Word,
};
