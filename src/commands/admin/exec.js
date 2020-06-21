module.exports = {
	name: 'exec',
	description: 'execute console commands',
	aliases: [ 'exe' ],

	execute: (msg, args, client) => {
		const process = require(`child_process`);
		const owner = require('../../config/users').devs;
		if (!owner.includes(msg.author.id)) return;

		if (!args.length) return msg.channel.createMessage('do something');
		else {
			process.exec(args.join(' '), (error, stdout) => {
				if (typeof output === 'object') {
					output = inspect(output, { depth: 1 });
				}
			});
		}
	}
};
