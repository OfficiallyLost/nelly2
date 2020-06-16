const eris = require('eris');
const cooldowns = new eris.Collection();

module.exports = async (client, msg) => {
	const guildSettings = require('../../models/guild');
	console.log(guildSettings);
	let guild = await guildSettings.findOne({ id: msg.guildID });
	if (!guild) {
		guild = new guildSettings({
			id: msg.channel.guild.id,
			prefix: ';;'
		});
	} else {
		guild = {
			id: guild.id,
			prefix: guild.prefix
		};
	}

	const prefix = guild.prefix || ';;';

	if (!msg.content.startsWith(prefix) || !msg.channel.guild || msg.author.bot) return;
	const commandName = args.shift().toLowerCase();
	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Eris.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = command.cooldown * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel
				.createMessage(
					`${message.member.mention}, you're being rate limited! Please wait **${timeLeft.toFixed(
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
		command.execute(msg, args, client);
	} catch (e) {
		console.log(e);
		client.createMessage(require('../../config/channels'.error), `\`\`\`js\n${e}\n\`\`\``);
	}
};
