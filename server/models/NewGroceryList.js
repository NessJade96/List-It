const {Schema, model} = require('mongoose');

// const GroceryItem = require('./GroceryItem');

// const userSchema = new Schema({
// 	_id: {
// 		type: String,
// 		required: true,
// 	},
// 	username: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 	},
// 	email: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 		match: [/.+@.+\..+/, 'Must use a valid email address'],
// 	},
// });

const NewGroceryListSchema = new Schema({
	listName: {
		type: String,
		required: true,
		trim: true,
	},
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: 'NewUser',
		},
	],
	groceryItems: [
		{
			type: Schema.Types.ObjectId,
			ref: 'NewGroceryItem',
		},
	],
});

const NewGroceryList = model('NewGroceryList', NewGroceryListSchema);

module.exports = NewGroceryList;
