module.exports = {
	name: 'template',
	aliases: [ 'alias' ],
	description: 'command description',
	examples: [ 'example' ],
	usages: [ 'usages' ],
	cooldown: 0,

	execute: async (msg, client, args) => {
		try {
			msg.channel.createMessage('hi');
		} catch (error) {
			client.error(client, msg, error.stack);
		}
	}
};
