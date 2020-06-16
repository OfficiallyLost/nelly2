<<<<<<< HEAD
module.exports = {
	name: 'whois',
	description: 'get information about a specific member',
	cooldown: 3,

	execute: (msg, args, client) => {
		const member =
			msg.channel.guild.members.find((e) => e.id === args.join(' ')) ||
			msg.channel.guild.members.find((e) => e.mention === args.join(' ')) ||
			msg.channel.guild.members.find((e) => e.username.toLowerCase() == args.join(' ')) ||
			msg.channel.guild.members.find((e) => (e.nick ? e.nick.toLowerCase() : e.nick === args.join(' '))) ||
			msg.member;
		if (!member) return msg.channel.createMessage(`I could not find that member.`);
		else
			msg.channel.createMessage({
				embed: {
					author: { name: member.username, icon_url: member.avatarURL },
					fields: [
						{
							name: 'Mention',
							value: member.mention,
							inline: true
						},
						{
							name: 'Nickname',
							value: member.nick ? member.nick : 'None',
							inline: true
						},
						{
							name: 'Game',
							value: member.game ? member.game : 'None',
							inline: true
						},
						{
							name: 'Created At',
							value: new Date(member.createdAt).toDateString(),
							inline: true
						},
						{
							name: 'Joined At',
							value: new Date(member.joinedAt).toDateString(),
							inline: true
						}
					],
					footer: { text: `ID: ${member.id}` }
				}
			});
	}
};
=======
const moment = require('moment-timezone');
require('moment-duration-format');

module.exports = {
	name: 'whois',
	description: 'get information about a specific member',
	cooldown: 3,

	execute: (msg, args, client) => {

		let status = {
			"online": "Online",
			"idle": "Idle",
			"dnd": "Do Not Disturb",
			"offline": "Offline",
		  };

		const member = client.users.get(args[0]) || msg.member;
		const joinPos = msg.channel.guild.members.map(m => m).sort((a, b) => a.joinedAt - b.joinedAt).indexOf(member) + 1;

		if (!member) return msg.channel.createMessage(`I could not find that member.`);
		else
			msg.channel.createMessage({
				embed: {
					author: { 
						name: member.discrim, 
						icon_url: member.avatarURL 
					},
					thumbnail: { 
						url: member.avatarURL, 
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
							inline: true,
						},
						{
							name: 'Join Position',
							value: joinPos,
							inline: false,
						},
						{
							name: 'Joined',
							value: moment(member.joinedAt).tz("Europe/London").format("D MMMM YYYY h:mm:ss A"),
							inline: false,
						},
						{
							name: 'Registered',
							value: moment(member.createdAt).tz("Europe/London").format("D MMMM YYYY h:mm:ss A"),
							inline: false,
						},
					],
					footer: { 
						text: `ID: ${member.id}` 
					},
					timestamp: new Date(),
				}
			});
	}
};
>>>>>>> d42beb6740c3443cfe63fba851beb22d03cd45d9
