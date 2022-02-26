const { AuthenticationError } = require("apollo-server-express");
const { User, Gift, Wishlist } = require("../models")
const { signToken } = require("../utils/auth");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
    gifts: async (parent, args) => {
      return Gift.find();
    },
    gift: async (parent, { _id }) => {
      return Gift.findOne({ _id });
    },
    wishlists: async (parent, args) => {
      return Gift.find()
        .select('-__v')
        .populate('gifts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('wishlist');
    },
    wishlist: async (parent, { _id }) => {
      return Gift.findOne({ _id })
        .select('-__v')
        .populate('gifts');
    },
    checkout: async (parent, args, context) => {
      const wishlist = new Wishlist({ gifts: args.gifts });
      const { gifts } = await wishlist.populate('gifts').execPopulate();
      const line_items = [];

      for (let i = 0; i < gifts.length; i++) {
        // generate gift id
        const gift = await stripe.gifts.create({
          name: gifts[i].name,
          description: gifts[i].description
        });

        // generate price id using the product id
        const price = await stripe.prices.create({
          product: gift.id,
          unit_amount: gifts[i].price * 100,
          currency: 'usd',
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1
        });
      };
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: 'http://localhost:3001/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3001/cancel'
      });

      return { session: session.id };
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
