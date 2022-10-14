const {User, GroceryItem, GroceryList} = require('../models');
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
		// Grocery List with grocery items
		listItems: async () => {
			return await Category.find();
		},
	},
	Mutation: {
		// Login a user, sign a token, and send it back
		login: async (parent, {email, password}) => {
			const user = await User.findOne({email});
			if (!user) {
				throw new AuthenticationError('Incorrect credentials');
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
		// save a grocery item to a users 'savedGroceryItems' field by adding it to the set (this prevents duplicates)
		addGroceryItem: async (parent, args, context) => {
			if (context.user) {
				const groceryItem = new GroceryItem({args});

				await User.findByIdAndUpdate(
					{_id: context.user._id},
					{$push: {groceryItems: groceryItem}},
					{new: true, runValidators: true}
				);
				return groceryItem;
			}
			throw new AuthenticationError('No user found to add a grocery list');
		},
		// remove a grocery item from `savedGroceryItems`
		// removeGroceryItem: async (parent, {_id}, context) => {
		// 	const groceryId = _id;
		// 	if (context.user) {
		// 		const userGroceries = User.findOneAndUpdate(
		// 			{_id: context.user._id},
		// 			{$pull: {savedGroceryLists: {groceryId}}},
		// 			{new: true}
		// 		);
		// 		return (
		// 			console.log('Grocery item removed from savedGroceryItems'),
		// 			userGroceries
		// 		);
		// 	}
		// 	throw new AuthenticationError('No Groceries under this Id to remove');
		// },
		// save a grocery item to a users 'savedGroceryItems' field by adding it to the set (this prevents duplicates)
		addGroceryList: async (parent, args, context) => {
			console.log(
				'🚀 ~ file: resolvers.js ~ line 75 ~ addGroceryList: ~ args',
				args.input.users
			);
			if (context.user) {
				const groceryList = new GroceryList(args.input);
				console.log(
					'🚀 ~ file: resolvers.js ~ line 81 ~ addGroceryList: ~ groceryList',
					groceryList
				);

				await User.findByIdAndUpdate(
					{_id: context.user._id},
					{$push: {savedGroceryLists: groceryList}},
					{new: true, runValidators: true}
				);
				return groceryList;
			}
			throw new AuthenticationError('No user found to update grocery list');
		},
		// remove a grocery item from `savedGroceryLists`
		// removeGroceryList: async (parent, {_id}, context) => {
		// 	const groceryId = _id;
		// 	if (context.user) {
		// 		const userGroceries = User.findOneAndUpdate(
		// 			{_id: context.user._id},
		// 			{$pull: {savedGroceryLists: {groceryId}}},
		// 			{new: true}
		// 		);
		// 		return (
		// 			console.log('Book removed from savedGroceryLists'), userGroceries
		// 		);
		// 	}
		// 	throw new AuthenticationError('No Groceries under this Id to remove');
		// },
	},
};

module.exports = resolvers;
