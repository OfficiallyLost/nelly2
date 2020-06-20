const fetch = require('node-fetch');

module.exports = {
	name: 'hug',
	description: 'Hug a user',
	cooldown: 2,

	execute: async (msg, args, client) => {
		if (!args.length) return msg.channel.createMessage('You need to provide a member to hug!');
		const member = client.getMember(msg.channel.guild, args.join(' '));
		if (!member)
			return msg.channel.createMessage({
				embed: {
					description: 'I could not find that member!'
				}
			});
		if (member === msg.author.bot)
			return msg.channel.createMessage({
				embed: {
					description: 'You cannot hug bot accounts!'
				}
			});
		if (member.id === msg.author.id)
			return msg.channel.createMessage({
				embed: {
					description: 'You cannot hug yourself!'
				}
			});
		else {
			const r = await fetch('https://some-random-api.ml/animu/hug');
			r.json().then((e) => {
				msg.channel.createMessage({
					content: member.mention,
					embed: {
						description: `<@!${msg.author.id}> gave a big hug to you!`,
						image: { url: e.link },
						timestamp: new Date(),
						footer: { text: '💖' }
					}
				});
			});
		}
	}
};
