module.exports = {
	name: 'prefix',
	description: 'Change the server prefix',
	cooldown: 4,

	execute: async (msg, args) => {
		if (!msg.member.permission.has('manageGuild'))
			return msg.channel.createMessage('You do not have permission to use this command.');
		if (!args.length) return msg.channel.createMessage('You need to provide the new prefix!');
		else {
			const setting = require('../../models/guild');
			const guild = await setting.findOne({ id: msg.channel.guild.id });
			await guild.updateOne({ prefix: args[0] });
			msg.channel.createMessage(`Prefix has been changed to \`${args[0]}\``).catch((e) => console.log(e));
		}
	}
};
