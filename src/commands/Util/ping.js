module.exports = {
	name: 'ping',
	description: 'Get the bots latency',
	cooldown: 2,

	execute: async (msg) => {
		const message = await msg.channel.createMessage('Pong?');
		message.edit(`Pong! \`${msg.createdAt - message.createdAt}ms\``);
	}
};
