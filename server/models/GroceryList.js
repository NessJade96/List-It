const {Schema, model} = require('mongoose');

const GroceryListSchema = new Schema({
	listName: {
		type: String,
		required: true,
		trim: true,
	},
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	groceryItems: [
		{
			type: Schema.Types.ObjectId,
			ref: 'GroceryItem',
		},
	],
});

const GroceryList = model('GroceryList', GroceryListSchema);

module.exports = GroceryList;
