module.exports = {
	name: 'help',
	description: 'Get help from the bot',
	usages: [ 'help', 'help [ command ]' ],
	cooldown: 2,

	execute: async (msg, args, client) => {
		const settings = require('../../models/guild');
		const guild = await settings.findOne({ id: msg.guildID });
		if (!args.length) return msg.channel.createMessage('put default halp command here');
		else {
			const name = args[0].toLowerCase();
			const command =
				client.commands.get(name) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name));
			if (!command) return msg.channel.createMessage(`I could not find that command!`);

			let thing = [];
			thing.push(`**Name:** ${command.name}`);
			thing.push(`**Description:** ${command.description}`);
			if (command.aliases) thing.push(`**Aliases:** ${guild.prefix}${command.aliases.join(`, `)}}`);
			if (command.examples)
				thing.push(`**Examples:** ${guild.prefix}${command.examples.join(`\n${guild.prefix}`)}`);
			if (command.usages) thing.push(`**Usages** ${guild.prefix}${command.usages.join(`, ${guild.prefix}`)}`);
			if (command.cooldown) thing.push(`**Cooldown:** ${command.cooldown} seconds`);
			const embed = {
				author: { name: `Command: ${command.name}`, icon_url: client.user.avatarURL },
				description: thing.join('\n')
			};
			msg.channel.createMessage({ embed });
		}
	}
};
