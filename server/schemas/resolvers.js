const {User, GroceryItem} = require('../models');
// import sign token function from auth
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
	Query: {
		// Get a single user by thier id or username
		me: async (parent, args, context) => {
			if (context.user) {
				const userInfo = await User.findOne({_id: context.user._id}).select(
					'-__v -password'
				);
				return userInfo;
			}
			throw new AuthenticationError('You need to be logged in!');
		},
	},
	Mutation: {
		// Login a user, sign a token, and send it back
		login: async (parent, {email, password}) => {
			const user = await User.findOne({email});
			if (!user) {
				throw new AuthenticationError('No user found with this email address');
			}
			const correctPw = await user.isCorrectPassword(password);
			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}
			const token = signToken(user);
			return {token, user};
		},
		// Creates a user, sign a token, and send it back
		addUser: async (parent, {username, email, password}) => {
			const user = await User.create({username, email, password});
			const token = signToken(user);
			return {token, user};
		},
		// save a book to a users 'savedBooks' field by adding it to the set (this prevents duplicates)
		// saveBook: async (parent, {input}, context) => {
		// 	if (context.user) {
		// 		const user = User.findByIdAndUpdate(
		// 			{_id: context.user._id},
		// 			{$push: {savedBooks: input}},
		// 			{new: true, runValidators: true}
		// 		);
		// 		return user;
		// 	}
		// 	throw new AuthenticationError('No user found to update books');
		// },
		// // remove a book from `savedBooks`
		// removeBook: async (parent, {bookId}, context) => {
		// 	if (context.user) {
		// 		const userBooks = User.findOneAndUpdate(
		// 			{_id: context.user._id},
		// 			{$pull: {savedBooks: {bookId}}},
		// 			{new: true}
		// 		);
		// 		return console.log('Book removed from savedBooks'), userBooks;
		// 	}
		// 	throw new AuthenticationError('No book under this Id to remove');
		// },
	},
};

module.exports = resolvers;
