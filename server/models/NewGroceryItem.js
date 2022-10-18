const {Schema, model} = require('mongoose');

const NewGroceryItemSchema = new Schema({
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

const NewGroceryItem = model('NewGroceryItem', NewGroceryItemSchema);

module.exports = NewGroceryItem;
