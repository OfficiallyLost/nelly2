module.exports = {
	name: 'eval',
	description: 'eval js code',
	aliases: [ 'e' ],

	execute: (msg, args) => {
		const clean = (text) => {
			if (typeof text === 'string')
				return text
					.replace(/`/g, '`' + String.fromCharCode(8203))
					.replace(/@/g, '@' + String.fromCharCode(8203));
			else return text;
		};

		const owner = require('../../config/users').devs;
		if (!owner.includes(msg.author.id))
			try {
				const code = args.join(' ');
				let evaled = eval(code);
				if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

				msg.channel.createMessage(`\`\`\`${clean(evaled)}\`\`\``);
			} catch (err) {
				msg.channel.createMessage({
					embed: {
						title: 'Error',
						color: 13703449,
						description: `\`\`\`xl\n${clean(err)}\n\`\`\``,
						timestamp: new Date()
					}
				});
			}
	}
};
