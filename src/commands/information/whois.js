const moment = require('moment-timezone');
require('moment-duration-format');

module.exports = {
	name: 'whois',
	description: 'get information about a specific member',
	cooldown: 3,

	execute: async (msg, args, client) => {
		let status = {
			online: 'Online',
			idle: 'Idle',
			dnd: 'Do Not Disturb',
			offline: 'Offline'
		};

		let member = client.getMember(msg.channel.guild, args.join(' '));
		let roles = member.roles.map((e) => msg.channel.guild.roles.get(e)).map((e) => e.mention).sort((a, b) => b.position - a.position).map(r => `${r}`).join(', ');
		if (!roles) roles = 'No roles';
		let createdAt;
		const joinPos =
			msg.channel.guild.members.map((m) => m).sort((a, b) => a.joinedAt - b.joinedAt).indexOf(member) + 1;
		if (!member) {
			try {
				const user = await client.getRESTUser(args[0]).then((e) => e);
				msg.channel.createMessage({
					embed: {
						description: '**This user is not in this server**',
						author: { name: user.username + '#' + user.discriminator, icon_url: user.avatarURL },
						fields: [
							{
								name: 'Username',
								value: user.username,
								inline: true
							},
							{
								name: 'Registered',
								value: moment(user.createdAt).tz('Europe/London').format('D MMMM YYYY h:mm:ss A'),
								inline: true
							}
						],
						thumbnail: { url: user.avatarURL }
					}
				});
			} catch (e) {
				msg.channel.createMessage('I could not find that user!');
			}
		} else if (!args.length) {
			member = msg.member;
			msg.channel.createMessage({
				embed: {
					fields: [
						{
							name: 'Username',
							value: member.username,
							inline: true
						},
						{
							name: 'Status',
							value: status[member.status],
							inline: true
						},
						{
							name: '\u200b',
							value: '\u200b',
							inline: true
						},
						{
							name: 'Join Position',
							value: joinPos,
							inline: false
						},
						{
							name: 'Joined At',
							value: moment(member.joineddAt).tz('Europe/London').format('D MMMM YYYY h:mm:ss A'),
							inline: false
						},
						{
							name: 'Registered',
							value: moment(member.createdAt).tz('Europe/London').format('D MMMM YYYY h:mm:ss A'),
							inline: false
						},
						{
							name: `Roles [${member.roles.length}]`,
							value: roles
						}
					],
					author: {
						name: member.username + '#' + member.discriminator,
						icon_url: member.avatarURL
					},
					thumbnail: { url: member.avatarURL },
					footer: { text: `ID: ${member.id}` },
					timestamp: new Date()
				}
			});
		} else {
			msg.channel.createMessage({
				embed: {
					fields: [
						{
							name: 'Username',
							value: member.username,
							inline: true
						},
						{
							name: 'Status',
							value: status[member.status],
							inline: true
						},
						{
							name: '\u200b',
							value: '\u200b',
							inline: true
						},
						{
							name: 'Join Position',
							value: joinPos,
							inline: false
						},
						{
							name: 'Joined At',
							value: moment(member.joineddAt).tz('Europe/London').format('D MMMM YYYY h:mm:ss A'),
							inline: false
						},
						{
							name: 'Registered',
							value: moment(member.createdAt).tz('Europe/London').format('D MMMM YYYY h:mm:ss A'),
							inline: false
						},
						{
							name: `Roles [${member.roles.length}]`,
							value: roles
						}
					],
					author: {
						name: member.username + '#' + member.discriminator,
						icon_url: member.avatarURL
					},
					thumbnail: { url: member.avatarURL },
					footer: { text: `ID: ${member.id}` },
					timestamp: new Date()
				}
			});
		}
	}
};
