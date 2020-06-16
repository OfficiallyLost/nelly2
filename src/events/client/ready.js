module.exports = (client) => {
	const channel = require('../../config/channels').bot;
	client.createMessage(channel, {
		embed: {
			title: 'Bot is now online.',
			footer: { text: 'timestamp' },
			timestamp: new Date()
		}
	});
};
