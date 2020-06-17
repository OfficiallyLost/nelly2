const eris = require('eris');
const fs = require('fs');
class Client extends eris.Client {
	constructor(token, options) {
		super(token, options);
	}
	test() {
		console.log('e');
	}
	// loadEvents() {
	// 	fs.readdirSync('./events/').forEach((dir) => {
	// 		const events = fs.readdirSync(`../events/${dir}/`).filter((file) => file.endsWith('.js'));
	// 		for (let file of events) {
	// 			const evt = require(`../events/${dir}/${file}`);
	// 			const event = file.split('.')[0];
	// 			console.log(event);
	// 			client.on(event, evt.bind(null, client));
	// 		}
	// 	});
	// }
	// loadCommands() {
	// 	fs.readdirSync(`${__dirname}/../commands`).forEach((dir) => {
	// 		const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
	// 		for (const file of commandFiles) {
	// 			const command = require(`./commands/${dir}/${file}`);
	// 			client.commands.set(command.name, command);
	// 		}
	// 		commandFiles.forEach((f) => {
	// 			require(`./commands/${dir}/${f}`);
	// 		});
	// 	});
	// }
	/**
    * @param {Object} guild Eris.Guild.prototype 
    * @param {String} search Where to search for the member, ie 'args[0], args.join(' ')'
    */
	getMember(guild, search) {
		guild.members.find((e) => e.id === search) ||
			guild.members.find((e) => e.mention === search) ||
			guild.members.find((e) => e.username === search) ||
			guild.members.find((e) => e.nick === search);
	}

	/**
	 * 
	 * @param {Object} client The client parameter
	 * @param {Object} msg The message object from the messageCreate event 
	 * @param {?Object} error The error causing it
	 */

	error(client, msg, error) {
		client.createMessage(require('../config/channels').error, {
			content: `<@!704676350493196318>\n\n**Guild:** ${msg.channel.guild
				.name} (${msg.guildID})n**Caused By:** ${msg.author.username}#${msg.author.discriminator} (${msg.author
				.id})`,
			embed: {
				title: 'Error',
				description: `\`\`\`js\n${error.stack.slice(0, 350)}\`\`\``
			}
		});
		console.log(erorr);
		msg.channel.createMessage(
			`An error occured during the process of this command. If this issue persits, please contact support.`
		);
	}
}

module.exports = Client;
