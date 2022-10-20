const mongoose = require('mongoose');

console.log(
	'🚀 ~ file: connection.js ~ line 4 ~ process.env.MONGODB_URI',
	process.env.MONGODB_URI
);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/list-it', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

module.exports = mongoose.connection;
