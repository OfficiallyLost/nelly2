module.exports = {
	name: 'avatar',
	description: 'View a user avatar',
	aliases: [ 'av' ],
	cooldown: 2,

	execute: (msg, args, client) => {
		const member = client.getMember(msg.channel.guild, args.join(' ')) || msg.member;
		msg.channel.createMessage({
			embed: {
				title: 'Avatar',
				description: member.user.username,
				image: {
					url: member.user.dynamicAvatarURL({ size: 256 })
				},
				timestamp: new Date()
			}
		});
	}
};
