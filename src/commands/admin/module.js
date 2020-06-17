module.exports = {
	name: 'module',
	description: 'Enable or disable a logging module',
	cooldown: 3,

	execute: async (msg, args) => {
		const setting = require('../../models/guild');
		const guild = await setting.findOne({ id: msg.guildID });

		if (args[0].toLowerCase() === 'mod') {
			msg.channel.createMessage({
				embed: {
					title: 'Moderation',
					description: `${!!guild.logs.mod.enabled
						? 'True'
						: 'False'} the moderation logs.\n**Enabled:** ${!!guild.logs.mod.enabled ? 'True' : 'False'}`
				}
			});
		}
	}
};
