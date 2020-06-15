const mongoose = require('mongoose');

const guild = new mongoose.Schema({
	id: { type: String, indexes: true },
	prefix: { type: String }
});

mongoose.model('guild', guild);
