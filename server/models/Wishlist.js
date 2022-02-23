const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
        },
        gifts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Gift'
            }
        ],
        created: {
            type: String,
            // NEEDED Date Formatter
        },
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// when we query a wishlist, we'll also get another field called `GiftCount` with the number of saved Gifts we have
wishlistSchema.virtual("giftCount").get(function () {
    return this.gifts.length;
});

const Wishlist = model('Wishlist', wishlistSchema);

module.exports = Wishlist;