const { AuthenticationError } = require("apollo-server-express");
const { User, Gift, Wishlist } = require("../models")
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    bgifts: async (parent, args) => {
      return Gift.find();
    },
    bgift: async (parent, { _id }) => {
      return Gift.findOne({ _id });
    },
    wishlists: async (parent, args) => {
      return Wishlist.find()
        .select('-__v')
        .populate('presents');
    },
    // user: async (parent, { username }) => {
    //   return User.findOne({ username })
    //     .select('-__v -password')
    //     .populate('wishlist');
    // },
    wishlist: async (parent, { _id }) => {
      return Wishlist.findOne({ _id })
        .select('-__v')
        .populate('presents');
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
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
    saveGift: async (parent, { GiftData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedGifts: GiftData } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeGift: async (parent, { GiftId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedGifts: { GiftId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
