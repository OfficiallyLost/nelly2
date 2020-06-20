const fetch = require('node-fetch');

module.exports = {
	name: 'hug',
    description: 'Hug a user',
	cooldown: 2,

	execute: (msg, args) => {

	const member =
		msg.guild.members.cache.find((e) => e.id == args[0]) ||
		msg.guild.members.cache.find((e) => `<@!${e.id}>` == args[0]) ||
		msg.guild.members.cache.find((e) => e.user.username == args.join(' ')) ||
		msg.guild.members.cache.find((e) => e.nickname == args.join(' '));
	if (member === msg.author.bot) return msg.channel.send({ 
		embed: { 
			description: 'You cannot hug bot accounts!' 
		}
	});
	if (member.id === msg.author.id) return msg.channel.send({
		embed: { 
			description: 'You cannot hug yourself!'
		} 
	});
	if (!args.length) return msg.channel.send('You need to provide a member to hug!');
	if (!member) return msg.channel.send({
		embed: {
			description: 'I could not find that member!'
		} });
	else {
		const r = await fetch('https://some-random-api.ml/animu/hug');
		r.json().then((e) => {
			msg.channel.send({
				embed: {
					color: msg.member.displayColor,
					description: `<@!${msg.author.id}> gave a big hug to <@!${member.id}>!`,
					image: { url: e.link },
					timestamp: new Date()
				}
			});
		});
	}
}
}
