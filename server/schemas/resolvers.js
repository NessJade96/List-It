const {User, GroceryItem, GroceryList} = require('../models');
// import sign token function from auth
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
	Query: {
		// Get a single user by thier id or username
		me: async (_, args, context) => {
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
		// Creates a user, sign a token, and send it back
		addUser: async (_, {username, email, password}) => {
			const user = await User.create({username, email, password});
			const token = signToken(user);
			return {token, user};
		},
		// Login a user, sign a token, and send it back
		login: async (_, {email, password}) => {
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
		// save a grocery item to a 'grocerylist' by adding it to the set
		addGroceryItem: async (_, args, context) => {
			if (context.user) {
				const {groceryListId, ...input} = args.input;

				const groceryItem = new GroceryItem(input);

				const updateList = await User.findOneAndUpdate(
					{_id: context.user._id, 'savedGroceryLists._id': groceryListId},
					{$push: {'savedGroceryLists.$.groceryItems': groceryItem}},
					{new: true, runValidators: true}
				);

				return updateList;
			}
			throw new AuthenticationError('No user found to add a grocery list');
		},
		// remove a grocery item from `savedGroceryItems`
		removeGroceryItem: async (_, args, context) => {
			console.log(args);
			if (context.user) {
				const {groceryListId, _id} = args;

				const userGroceries = await User.findOneAndUpdate(
					{
						_id: context.user._id,
						'savedGroceryLists._id': groceryListId,
					},
					{$pull: {'savedGroceryLists.$.groceryItems': {_id}}}
				);
				console.log(userGroceries, 'userGroceries');
				return console.log('Grocery item removed from the list'), userGroceries;
			}
			throw new AuthenticationError('No Groceries under this Id to remove');
		},
		// save a grocery item to a users 'savedGroceryItems' field by adding it to the set
		addGroceryList: async (_, args, context) => {
			if (context.user) {
				const groceryList = new GroceryList(args.input);

				await User.findByIdAndUpdate(
					{_id: context.user._id},
					{$push: {savedGroceryLists: groceryList}},
					{new: true, runValidators: true}
				);

				return groceryList;
			}
			throw new AuthenticationError('No user found to update grocery list');
		},
		// remove a groceryList from `savedGroceryLists`
		removeGroceryList: async (_, {_id}, context) => {
			console.log(context.user, 'context.user');
			console.log(_id, '_id');
			if (context.user) {
				const userGroceries = User.findOneAndUpdate(
					{_id: context.user._id},
					{$pull: {savedGroceryLists: {_id}}}
				);
				return (
					console.log('GroceryList removed from savedGroceryLists'),
					userGroceries
				);
			}
			throw new AuthenticationError('No lists under this Id to remove');
		},
	},
};

module.exports = resolvers;
