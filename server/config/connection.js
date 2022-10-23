const mongoose = require('mongoose');
console.log(process.env);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/list-it', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

module.exports = mongoose.connection;
