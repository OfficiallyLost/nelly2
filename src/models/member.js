const mongoose = require('mongoose');

const member = new mongoose.Schema({
	id: { type: String },
	afk: { type: Boolean }
});
