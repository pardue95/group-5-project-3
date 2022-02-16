const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedGifts` array in User.js
const GiftSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  // saved Gift id from GoogleGifts
  GiftId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = GiftSchema;
