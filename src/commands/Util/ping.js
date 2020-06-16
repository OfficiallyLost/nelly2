module.exports = {
	name: 'ping',
	description: 'Get the bots latency',
	cooldown: 2,

	execute: async (msg) => {
		const message = await msg.channel.createMessage('Pong?');
		message.edit(`Pong! \`${Math.abs(msg.createdAt - message.createdAt)}ms\``);
	}
};
