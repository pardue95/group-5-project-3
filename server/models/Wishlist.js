const { Schema, model } = require("mongoose");
const GiftSchema = require("./Gift");

const wishlistSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    gifts: [GiftSchema],
    title: {
        type: String,
        required: true,
    },
    created: {
        type: String,
        // NEEDED Date Formatter
    },

});

const Wishlist = model('Wishlist', wishlistSchema);

module.exports = Wishlist;