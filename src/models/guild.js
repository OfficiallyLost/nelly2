const mongoose = require('mongoose');

const guild = new mongoose.Schema({
	id: { type: String, indexes: true },
	prefix: { type: String },
	logs: {
		action: { enabled: { type: Boolean }, channel: { type: String } },
		mod: { enabled: { type: Boolean }, channel: { type: String } }
	}
});

module.exports = mongoose.model('guild', guild);
