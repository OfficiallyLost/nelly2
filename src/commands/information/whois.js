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
