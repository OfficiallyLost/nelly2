module.exports = {
	name: 'nou',
    description: 'For when you really want to give someone the ultimate no u',
	cooldown: 2,

	execute: (msg, args) => {

    msg.channel.createMessage("no u");
    msg.delete();
    }
}
