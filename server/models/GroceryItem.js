const {Schema} = require('mongoose');

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

module.exports = GroceryItemSchema;
