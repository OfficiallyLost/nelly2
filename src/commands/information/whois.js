module.exports = {
	name: 'whois',
	description: 'get information about a specific member',
	cooldown: 3,

	execute: (msg, args, client) => {
		const member = client.getMember(msg.channel.guild, args.join(' ')) || msg.member;
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
