module.exports = {
	name: 'restart',
	description: 'Restart',
    cooldown: 2,
    
    execute: async (msg, client) => {

    const process = require(`child_process`);
    let owner = ['475371795185139712', '254814547326533632', '322996242521260042']

    if (!owner.includes(msg.author.id))
    return;

    await msg.channel.createMessage({
		embed: {
		    description: '<a:gears:715984737163804752> Restarting',
        }
    })      
    process.exec('pm2 restart index', (stdout, stderr) => null);
    }
}
