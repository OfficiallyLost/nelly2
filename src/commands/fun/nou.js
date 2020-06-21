module.exports = {
	name: 'nou',
	description: 'For when you really want to give someone the ultimate no u',
	cooldown: 2,

	execute: async (msg) => {
		msg.channel.createMessage('no u');
		await msg.delete();
	}
};
