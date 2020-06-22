module.exports = {
	name: 'commands',
	cooldown: 2,
	description: "View a full list of Nelly's commands",

	execute: (msg, _, client) => {
		const commands = client.commands.map((e) => e.name).sort();
		let command = [];
		for (command of commands) {
			command.push(`**${command.name}** - ${command.description}`);
		}
		msg.channel.createMessage({
			embed: {
				description: command
			}
		});
	}
};
