const eris = require('eris');
const cooldowns = new eris.Collection();

module.exports = async (client, msg) => {
	const guildSettings = require('../../models/guild');
	let guild = await guildSettings.findOne({ id: msg.guildID });
	if (!guild) {
		guild = new guildSettings({
			id: msg.guildID,
			prefix: ';;',
			logs: {}
		});
		await guild.save().catch((e) => console.log(e));
	} else {
		guild.updateOne({
			id: guild.id,
			prefix: guild.prefix,
			logs: guild.logs
		});
	}
	const prefix = guild.prefix || ';;';

	if (!msg.content.startsWith(prefix) || !msg.channel.guild || msg.author.bot) return;
	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();
	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new eris.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = command.cooldown * 1000;

	if (timestamps.has(msg.author.id)) {
		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return msg.channel
				.createMessage(
					`${msg.member.mention}, you're being rate limited! Please wait **${timeLeft.toFixed(
						2
					)}** seconds before trying to use this command.`
				)
				.then((e) => setTimeout(async () => await e.delete(), cooldownAmount));
			// setTimeout(async () => {
			// 	await r.delete();
			// }, cooldownAmount);
		}
	}

	try {
		if (
			!require('../../config/users').staff.includes(msg.author.id) ||
			!require('../../config/users').devs.includes('msg.author.id')
		)
			return;
		command.execute(msg, args, client);
	} catch (e) {
		client.error(client, msg, e.stack);
	}
};
