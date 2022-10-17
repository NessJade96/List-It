const {User, GroceryItem, GroceryList} = require('../models');
// import sign token function from auth
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
	// GroceryList: {
	// 	groceryItems: async (groceryList) => {
	// 		return (await groceryList.populate('groceryItems').execPopulate())
	// 			.groceryItems;
	// 	},
	// },
	// createItem: async (_, args)=>{
	//   try{
	//     const groceryList = await GroceryList.findById()
	//   }
	// }
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
		// listItems: async () => {
		// 	return await User.find();
		// },
	},
	Mutation: {
		// Creates a user, sign a token, and send it back
		addUser: async (parent, {username, email, password}) => {
			const user = await User.create({username, email, password});
			const token = signToken(user);
			return {token, user};
		},
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
		// save a grocery item to a 'grocerylist' by adding it to the set
		addGroceryItem: async (parent, args, context) => {
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
		// save a grocery item to a users 'savedGroceryItems' field by adding it to the set
		addGroceryList: async (parent, args, context) => {
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
