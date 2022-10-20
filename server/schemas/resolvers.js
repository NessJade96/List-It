const {User, GroceryList, GroceryItem} = require('../models');
// import sign token function from auth
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
	Query: {
		// Get a single user by thier id or username
		me: async (_, args, context) => {
			if (context.user) {
				console.log(
					'🚀 ~ file: resolvers.js ~ line 11 ~ me: ~ context.user',
					context.user
				);
				const userPromise = User.findById({
					_id: context.user._id,
				}).select('-__v -password');

				const groceryListPromise = GroceryList.find({
					users: {$in: [context.user._id]},
				}).select('listName');

				const [user, groceryLists] = await Promise.all([
					userPromise,
					groceryListPromise,
				]);
				console.log(
					'🚀 ~ file: resolvers.js ~ line 23 ~ me: ~ groceryLists',
					groceryLists
				);
				console.log('🚀 ~ file: resolvers.js ~ line 23 ~ me: ~ user', user);

				return {
					_id: user._id,
					username: user.username,
					email: user.email,
					savedGroceryLists: groceryLists,
				};
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		groceryList: async (_, {_id}, context) => {
			return await GroceryList.findById({_id});
		},
		groceryItem: async (_, {_id}, context) => {
			return await GroceryItem.findById({_id});
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
			// const user = await User.findOne({email});
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
		// Creates a groceryList
		addGroceryList: async (_, args, context) => {
			if (context.user) {
				const groceryList = await GroceryList.create({
					listName: args.input.listName,
					users: [context.user._id],
					groceryItems: [],
				});

				const updatedUser = await User.findByIdAndUpdate(
					{_id: context.user._id},
					{$push: {savedGroceryLists: groceryList}},
					{new: true, runValidators: true}
				);

				return {
					listName: groceryList.listName,
					user: [updatedUser],
					groceryItems: groceryList.groceryItems,
				};
			}
			throw new AuthenticationError('No user found to update grocery list');
		},

		// save a new grocery item to a 'grocerylist' by adding it to the set
		addGroceryItem: async (_, args, context) => {
			if (context.user) {
				const {groceryListId, ...input} = args.input;

				const groceryItem = await GroceryItem.create(input);

				const updateList = await GroceryList.findOneAndUpdate(
					{_id: groceryListId},
					{$push: {groceryItems: groceryItem}},
					{new: true, runValidators: true}
				).populate('groceryItems');

				return updateList;
			}
			throw new AuthenticationError('No user found to add a grocery list');
		},
		// remove a GroceryItem from `groceryItem`
		removeGroceryItem: async (_, {_id, groceryListId}, context) => {
			if (context.user) {
				const groceryItem = await GroceryList.findOneAndUpdate(
					{_id: groceryListId},
					{$pull: {groceryItems: _id}}
				).populate('groceryItems');
				console.log('Grocery item removed from the list');
				return groceryItem;
			}
			throw new AuthenticationError('No Groceries under this Id to remove');
		},
		// remove the Grocery list
		removeGroceryList: async (_, {_id}, context) => {
			if (context.user) {
				const groceryList = await GroceryList.findOneAndRemove({
					_id: _id,
				});
				console.log('Grocery item removed from the list');
				return groceryList;
			}
			throw new AuthenticationError('No Groceries under this Id to remove');
		},
		// Update the GroceryList so users can add other users to the GroceryList
		updateGroceryList: async (_, args, context) => {
			if (context.user) {
				const {groceryListId, usersId} = args.input;

				const groceryList = GroceryList.findOneAndUpdate(
					{_id: groceryListId},
					{$push: {users: usersId}},
					{new: true, runValidators: true}
				).populate('users');
				console.log('Grocery list updated');
				return groceryList;
			}
			throw new AuthenticationError('Something went wrong :(');
		},

		// Update the GroceryItem
		updateGroceryItem: async (_, args, context) => {
			if (context.user) {
				const {_id, itemName, amount, measurement} = args.input;

				const updatedGroceryItem = await GroceryItem.findOneAndUpdate(
					{_id: _id},
					{$set: {itemName, amount, measurement}},
					{new: true, runValidators: true}
				);
				console.log('Updated the grocery list item');
				return updatedGroceryItem;
			}
			throw new AuthenticationError('Something went wrong :(');
		},
	},
};

module.exports = resolvers;
