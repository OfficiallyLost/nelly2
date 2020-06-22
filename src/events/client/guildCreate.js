module.exports = async (client, guild) => {
    const channel = require('../../config/channels').bot;
    let gid = await client.getRESTUser(guild.ownerID);

    client.createMessage(channel, {
		embed: {
			title: 'Joined Server',
            color: 16119106,
            description: `**Server Name:** ${guild.name} (${guild.id})\n**Owner:** ${gid.username}#${gid.discriminator}\n**Members:** ${guild.memberCount}`,
			footer: {
				text: 'Dev'
			},
			timestamp: new Date()
		}
    });
}