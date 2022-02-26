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
    users: async () => {
      return User.find()
        .select('-__v -password');
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

    // Adds a new Wishlist to the userWishlist array of a specific User. Must provide User _id
    addWishlist: async (parent, { userId, title, description, gender }, context) => {
      if (context.user) {
        const userWishlist = await Wishlist.create({ title: title, description: description, gender: gender })

        const updatedUser = await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { userWishlists: userWishlist } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // Removes a specific Wishlist. Wishlist _id required
    removeWishlist: async (parent, { wishlistId }, context) => {
      if (context.user) {
        await Wishlist.findByIdAndDelete({ _id: wishlistId });

        return console.log('Wishlist removed!');
      }

      throw new AuthenticationError("You need to be logged in!");
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
      if (context.user) {
        await Gift.findByIdAndDelete({ _id: GiftId });

        return console.log('Gift removed!');
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
