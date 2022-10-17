const {Schema, model} = require('mongoose');

const GroceryItemSchema = new Schema({
	itemName: {
		type: String,
		required: true,
		trim: true,
	},
	amount: {
		type: Number,
	},
	measurement: {
		type: String,
		trim: true,
	},
});

const GroceryItem = model('GroceryItem', GroceryItemSchema);

module.exports = GroceryItem;
