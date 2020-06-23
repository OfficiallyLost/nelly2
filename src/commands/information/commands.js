module.exports = {
	name: 'commands',
	cooldown: 2,
	description: "View a full list of Nelly's commands",

	execute: (msg, _, client) => {
		const commands = client.commands.filter((e) => !e.hidden).map((e) => `**${e.name}** - *${e.description}*`);
		let counts = {};
		commands.forEach((e) => {
			counts[e] = counts.hasOwnProperty(e) ? counts[e] + 1 : 1;
		});
		let command = Object.keys(counts);
		let cmdArray = command.map(function(e) {
			return counts[e];
		});
		msg.channel.createMessage({
			embed: {
				description: `${cmdArray.join(command)}`
			}
		});
	}
};
