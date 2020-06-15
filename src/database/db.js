const mongoose = require('mongoose');

module.exports = mongoose.connect(
	'mongodb+srv://dev:pOMWEglpVEZjSaoT@nelly-axr4x.mongodb.net/Nelly?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);
