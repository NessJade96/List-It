const {Schema, model} = require('mongoose');

const GroceryItemSchema = new Schema({
	itemName: {
		type: String,
		required: true,
	},
	amount: {
		type: Int,
	},
	measurement: {
		type: String,
	},
});
const GroceryItem = model('GroceryItem', GroceryItemSchema);

module.exports = GroceryItem;
