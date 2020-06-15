const mongoose = require('mongoose');

const guild = new mongoose.Schema({
	id: { type: String }
});

mongoose.model('guild', guild);
