const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')

                return userData;
            }

            throw new AuthenticationError('Not logged in!')
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('Incorrect credentials!');
            }

            const correctPass = await user.isCorrectPassword(password);

            if(!correctPass) {
                throw new AuthenticationError('Incorrect credentials!');
            }

            const token = signToken(user);
            return { token, user }
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addMovie: async (parent, { input }, context) => {

            if (context.user) {
                const userWithMovie = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedMovies: input }},
                    { new: true }
                )

                return userWithMovie;
            }

            throw new AuthenticationError('You need to be logged in to save a movie!');
        },
        removeMovie: async (parent, { movieId }, context) => {
            if(context.user) {
                const userWithOneFewerMovie = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $pull: { savedMovies: { movieId }}},
                    { new: true }
                )

                return userWithOneFewerMovie;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers;