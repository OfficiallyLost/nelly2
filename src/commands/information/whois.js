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

		let member;
		let createdAt;
		const joinPos =
			msg.channel.guild.members.map((m) => m).sort((a, b) => a.joinedAt - b.joinedAt).indexOf(member) + 1;
		if (member) {
			bits = member.publicFlags;
			member = client.getMember(guild, args.join(' ')) || msg.member;
			createdAt = moment(member.createdAt).tz('Europe/London').format('D MMMM YYYY h:mm:ss A');
			console.log(member);
			msg.channel.createMessage({
				embed: {
					author: {
						name: member.discrim,
						icon_url: member.avatarURL
					},
					thumbnail: {
						url: member.avatarURL
					},
					fields: [
						{
							name: 'Username',
							value: member.mention,
							inline: true
						},
						{
							name: 'Status',
							value: status[member.status],
							inline: true
						},
						{
							name: 'Join Position',
							value: joinPos,
							inline: false
						},
						{
							name: 'Joined',
							value: moment(member.joinedAt).tz('Europe/London').format('D MMMM YYYY h:mm:ss A'),
							inline: false
						},
						{
							name: 'Registered',
							value: createdAt,
							inline: false
						}
					],
					footer: {
						text: `ID: ${member.id}`
					},
					timestamp: new Date()
				}
			});
		} else {
			if (!args.length && !member) return;
			try {
				member = await client.getRESTUser(args[0]).then((e) => e);
				const bit = member.publicFlags;
				let badges = [];
				if (bit & 0) badges.push('Discord Employee');
				if (bit & 1) badges.push('Discord Partner');
				if (bit & 2) badges.push('HypeSquad Events');
				if (bit & 3) badges.push('Bug Hunter (Level 1)');
				if (bit & 6) badges.push('HypeSquad Bravery');
				if (bit & 7) badges.push('HypeSquad Brilliance');
				if (bit & 8) badges.push('HypeSquad Balance');
				if (bit & 9) badges.push('Early Supporter');
				if (bit & 10) badges.push('Team User');
				if (bit & 12) badges.push('Discord System');
				if (bit & 14) badges.push('Bug Hunter (Level 2)');
				if (bit & 16) badges.push('Verified Bot');
				if (bit & 17) badges.push('Verified Bot Developer');
				console.log(member);
				console.log(member.id);
				let username = member.username;
				status = member.status;
				createdAt = moment(member.createdAt).tz('Europe/London').format('D MMMM YYYY h:mm:ss A');
				console.log(badges);
				msg.channel.createMessage({
					content: '**This user is not in the server.**',
					embed: {
						author: { name: member.discrim, icon_url: member.avatarURL },
						thumbnail: { url: member.avatarURL },
						description: badges.join(', '),
						fields: [
							{
								name: 'Username',
								value: username,
								inline: true
							},
							{
								name: 'Status',
								value: 'status[member.status]'
							},
							{
								name: 'Registered',
								value: moment(member.createdAt).tz('Europe/London').format('D MMMM YYYY h:mm:ss A')
							}
						]
					}
				});
			} catch (e) {
				console.log(e);
			}
		}
	}
};
