module.exports = {
	name: 'ping',
	description: 'Get the bots latency',

	execute: (msg) => {
		const message = await msg.channel.createMessage('Pong?');
		message.edit(`Pong! \`${message.creaedAt - msg.creaedAt}\``)
	}
};
