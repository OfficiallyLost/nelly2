module.exports = async (client, msg) => {
	const guildSettings = require('../../models/guild');
	let guild = await guildSettings.findOne({ id: msg.channel.guild.id });
	if (!guild) {
		guild = new guildSettings({
			id: msg.channel.guild.id,
			prefix: ';;'
		});
	} else {
		guild = {
			guild: guild
		};
	}

	const prefix = guild.prefix || ';;';

	if (!msg.content.startsWith(prefix) || !msg.channel.guild || msg.author.bot) return;
	const commandName = args.shift().toLowerCase();
	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	try {
		command.execute(msg, args, client);
	} catch (e) {
		console.log(e);
		client.createMessage(require('../../config/channels'.error), `\`\`\`js\n${e}\n\`\`\``);
	}
};
