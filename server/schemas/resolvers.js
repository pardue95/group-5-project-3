const { AuthenticationError } = require("apollo-server-express");
const { User, Gift, Wishlist } = require("../models")
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate('userWishlists');

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    // queries all users
    users: async (parent, args) => {
      return User.find();
    },

    // queries all gifts
    bgifts: async (parent, args) => {
      return Gift.find();
    },

    // queries one specific gift, must provide Gift _id
    bgift: async (parent, { _id }) => {
      return Gift.findOne({ _id });
    },

    // queries all wishlists
    userWishlists: async (parent, args) => {
      return Wishlist.find()
        .select('-__v')
        .populate('presents');
    },

    // queries all wishlists, must provide Wishlist _id
    userWishlist: async (parent, { _id }) => {
      return Wishlist.findOne({ _id })
        .select('-__v')
        .populate('presents');
    }
  },

  Mutation: {
    // Creates a new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // Logs a user in
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    // Adds new gift to the specified wishlist, must provide Wishlist _id
    saveGift: async (parent, { wishlistId, title, description, image }, context) => {
      if (context.user) {
        const present = await Gift.create({ title: title, description: description, image: image })

        const updatedWishlist = await Wishlist.findByIdAndUpdate(
          { _id: wishlistId },
          { $push: { presents: present } },
          { new: true }
        );

        return updatedWishlist;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // removes a gift from a Wishlist. Must provide Gift _id
    removeGift: async (parent, { GiftId }, context) => {
      if (context.userWishlist) {
        const updatedWishlist = await Wishlist.findOneAndUpdate(
          { _id: context.userWishlist._id },
          { $pull: { presents: { GiftId } } },
          { new: true }
        );

        return updatedWishlist;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
