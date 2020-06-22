const moment = require('moment-timezone');
require('moment-duration-format');

module.exports = {
	name: 'uptime',
    description: 'view nellys uptime',
    aliases: [ 'up'],

	execute: async (msg, args, client) => {

        const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

        msg.channel.createMessage({
            embed: {
                color: 4388183,
                description: duration,
                footer: {
                    text: `Dev | PID ${process.pid} `
                }
            }
        })
    }
}