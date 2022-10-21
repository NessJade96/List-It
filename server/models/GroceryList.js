const {Schema, model} = require('mongoose');

const GroceryItem = require('./GroceryItem');

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
	groceryItems: [GroceryItem.schema],
});

const GroceryList = model('GroceryList', GroceryListSchema);

module.exports = GroceryList;
