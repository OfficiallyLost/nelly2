const moment = require('moment-timezone');
require('moment-duration-format');

module.exports = {
	name: 'info',
	description: 'View Nelly info',
	cooldown: 2,

	execute: async (msg, _, client) => {
		const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
		const { devs } = require('../../config/users');
		let developers = [];
		// devs.forEach(async (dev) => {
		// 	console.log(dev);
		// 	const user = client.getRESTUser(dev).then((e) => e);
		// 	developers = user.username;
		// });
		for (const dev of devs) {
			const user = await client.getRESTUser(dev).then((e) => e);
			developers.push(user.username);
		}
		msg.channel.createMessage({
			embed: {
				title: 'Nelly',
				color: 16283903,
				fields: [
					{
						name: 'Version',
						value: `1.0.0`,
						inline: true
					},
					{
						name: 'Languages',
						value: `JavaScript, TypeScript (Eris)`,
						inline: true
					},
					{
						name: '\u200b',
						value: '\u200b',
						inline: true
					},
					{
						name: 'Invite',
						value: `[Click Here](https://discordapp.com/oauth2/authorize?client_id=715862013389307976&scope=bot&permissions=2080645174)`,
						inline: true
					},
					{
						name: 'Support Server',
						value: `[Click Here](https://discord.gg/VMfW2jF)`,
						inline: true
					},
					{
						name: '\u200b',
						value: '\u200b',
						inline: true
					},
					{
						name: 'Memory',
						value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / 1024 MB`,
						inline: false
					},
					{
						name: 'Developers',
						value: developers.join('\n')
					}
				],
				footer: {
					text: `Dev | PID: ${process.pid} | Uptime: ${duration}`
				}
			}
		});
	}
};
