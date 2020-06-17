module.exports = {
	name: 'exec',
	description: 'execute console commands',
	aliases: [ 'exe' ],

	execute: (msg, args, client) => {
        const process = require(`child_process`);
		const owner = require('../../config/users').devs;
        if (owner.includes(msg.author.id))
        return;

        process.exec(args.join(' '), (error, stdout) => {
            const outputType = error || stdout;
            let output = outputType;
            if (typeof outputType === 'object') {
                output = inspect(outputType, {
                    depth: getMaxDepth(outputType, args.join(' '))
                });
            }
            return msg.channel.createMessage(`${output}`);
        });
    }
};