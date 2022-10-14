const {Schema, model} = require('mongoose');

const userSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, 'Must use a valid email address'],
	},
});

const GroceryListSchema = new Schema({
	listName: {
		type: String,
		required: true,
		trim: true,
	},
	users: [userSchema],
	groceryItems: [
		{
			type: Schema.Types.ObjectId,
			ref: 'GroceryItemSchema',
		},
	],
});

const GroceryList = model('GroceryList', GroceryListSchema);

module.exports = GroceryList;
