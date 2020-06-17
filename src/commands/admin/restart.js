module.exports = {
	name: 'restart',
	description: 'Restart',
	aliases: [ 'r' ],
	execute: async (msg, client) => {
		const process = require(`child_process`);
		const channel = require('../../config/channels').bot;
		const devs = require('../../config/users').devs;
		if (!devs.includes(msg.author.id)) return;
		await msg.channel.createMessage({
			embed: {
				description: '<a:gears:715984737163804752> Restarting'
			}
		});

		client.createMessage(channel, {
			embed: {
				title: 'Restart',
				color: 12386304,
				footer: {
					text: 'Dev'
				},
				timestamp: new Date()
			}
		});

		process.exec('pm2 restart index', (stdout, stderr) => null);
	}
};
