module.exports = {
	name: 'ping',
	description: 'Get the bots latency',

	execute: (msg) => {
		msg.channel.createMessage('pong bitch');
	}
};
