module.exports = {
	name: 'avatar',
    description: 'View a user avatar',
    aliases: [ 'av' ],
	cooldown: 2,

	execute: (msg) => {

        const member =
        client.getMember(args[0]) ||
        msg.channel.guild.members.find((e) => e.mention === args.join(' ')) ||
        msg.channel.guild.members.find((e) => e.username.toLowerCase() == args.join(' ')) ||
        msg.channel.guild.members.find((e) => (e.nick ? e.nick.toLowerCase() : e.nick === args.join(' '))) ||
        msg.member;
        msg.channel.createMessage({
            embed: {
                title: 'Avatar',
                description: member.user.username,
                image: {
                    url: member.user.dynamicAvatarURL({size: 256})
                },
                timestamp: new Date(),
            }
        })
    }
}

                


