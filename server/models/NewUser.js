const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const newUserSchema = new Schema(
	{
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
		password: {
			type: String,
			required: true,
		},
		savedGroceryLists: [
			{
				type: Schema.Types.ObjectId,
				ref: 'NewGroceryList',
			},
		],
	},
	// set this to use virtual below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// hash user password
newUserSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
newUserSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const NewUser = model('NewUser', newUserSchema);

module.exports = NewUser;
