module.exports = (client) => {
	client.connect().catch((e) => console.log(e));
	const channel = require('../../config/channels').bot;
	client.createMessage(channel, {
		embed: {
			title: 'Bot is now online.',
			footer: { text: 'timestamp' },
			timestamp: new Date()
		}
	});
	console.log('bots online my dudes');
};
