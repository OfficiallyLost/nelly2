module.exports = (client) => {
	client.connect().catch((e) => console.log(e));
	const channel = require('../../config/channels').bot;
	client.createMessage(channel, {
		embed: {
			title: 'Online',
			color: 3922790,
			footer: {
				text: 'Dev'
			},
			timestamp: new Date()
		}
	});
	console.log('Nelly is online');
	client.editStatus({ name: ';;help', type: 2 });
};
