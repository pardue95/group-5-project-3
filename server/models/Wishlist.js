const { Schema } = require("mongoose");

const WishlistSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
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

module.exports = WishlistSchema;