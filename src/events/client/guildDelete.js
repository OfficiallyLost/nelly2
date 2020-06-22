module.exports = async (client, guild) => {
    const channel = require('../../config/channels').bot;
    let gid = await client.getRESTUser(guild.ownerID);

    client.createMessage(channel, {
		embed: {
			title: 'Left Server',
            color: 16119106,
            description: `**Server Name:** ${guild.name} (${guild.id})`,
			footer: {
				text: 'Dev'
			},
			timestamp: new Date()
		}
    });
}