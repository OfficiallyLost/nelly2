module.exports = {
	name: 'help',
	description: 'Get help from the bot',
	usages: [ 'help', 'help [ command ]' ],
	cooldown: 2,

	execute: async (msg, client, args) => {
		const settings = require('../../models/guild');
		const guild = await settings.findOne({ id: msg.guildID });
		if (!args.length) {
			return msg.channel.createMessage('put default halp command here');
		} else {
			const command =
				client.commands.get(args[0]) ||
				client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(args[0]));
			let thing = [];
			thing.push(`**Name:** ${command.name}`);
			thing.push(`**Description:** ${command.description}`);
			if (command.aliases) thing.push(`**Aliases:** ${command.aliases.join(`${guild.prefix} `)}`);
			if (command.examples) thing.push(`**Examples:** ${command.examples.join(`${guild.prefix} `)}`);
			if (command.usages) thing.push(`**Usages** ${command.usages.join(`${guild.prefix} `)}`);
			if (command.cooldown) thing.push(`**Cooldown:** ${command.cooldown} seconds`);
			const embed = {
				author: { name: `Command: ${command.name}`, icon_url: client.user.avatarURL },
				description: thing.join('\n')
			};
			msg.channel.createMessage({ embed });
		}
	}
};
