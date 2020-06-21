const { Guild } = require('eris');
const eris = require('eris');
class Client extends eris.Client {
	constructor(token, options) {
		super(token, options);
	}
	/**
	 * 
	 * @param int a deciamal number
	 */
	decimalToHex(int) {
		const hex = int.toString(16);
		return '#000000'.substring(0, 7 - hex.length) + hex;
	}
	/**
	 * 
	 * @param guild the guild the commnd was ran in
	 * @param search where to search for the member
	 */
	getMember(guild, search) {
		return (
			guild.members.find((e) => e.id === search) ||
			guild.members.find((e) => e.mention === search) ||
			guild.members.find((e) => e.nick === search) ||
			guild.members.find((e) => `${e.username}#${e.discriminator}` === search) ||
			guild.members.find((e) => e.username === search) ||
			guild.members.find((e) => e.username === search.toLowerCase()) ||
			guild.members.find((e) => e.nick === search.toLowerCase()) ||
			guild.members.find((e) => e.username === search.toLowerCase()) ||
			guild.members.find((e) => e.username.toLowerCase().startsWith(search.toLowerCase())) ||
			guild.members.find((e) => e.nick && e.nick.toLowerCase().startsWith(search.toLowerCase()))
		);
	}
	/**
	 * 
	 * @param client the client paramater
	 * @param msg the message paramater
	 * @param error the error causing it to break
	 */
	error(client, msg, error) {
		client.createMessage(require('../config/channels').error, {
			content: `<@&704676350493196318>\n\n**Guild:** ${msg.channel.guild
				.name} (${msg.guildID})\n**Caused By:** ${msg.author.username}#${msg.author.discriminator} (${msg.author
				.id})`,
			embed: {
				title: 'Error',
				description: `\`\`\`js\n${error.slice(0, 350)}\`\`\``
			}
		});
		client.createMessage(require('../config/channels').console, {
			content: `<@&704676350493196318>\n\n**Guild:** ${msg.channel.guild
				.name} (${msg.guildID})\n**Caused By:** ${msg.author.username}#${msg.author.discriminator} (${msg.author
				.id})`,
			embed: {
				title: 'Error',
				description: `\`\`\`js\n${error.slice(0, 350)}\`\`\``
			}
		});
		console.log(error);
		msg.channel.createMessage(
			`An error occured during the process of this command. If this issue persits, please contact support.`
		);
	}
}
module.exports = Client;
// 'use-strict';

// const { Guild, Member } = require('eris');

// export default class Client extends eris.Client {
// 	constructor(token: string, options: object) {
// 		super(token, options);
// 	}
// 	/**
// 	 *
// 	 * @param Guild The Eris.Guild.prototype Object
// 	 * @param search Where to search for the member in the String
// 	 */
// 	public getMember(search: string, { members }: Guild): Member | undefined {
// 		return (
// 			members.find((e) => e.id === search) ||
// 			members.find((e) => e.mention === search) ||
// 			members.find((e) => e.nick === search) ||
// 			members.find((e) => `${e.username}#${e.discriminator}` === search) ||
// 			members.find((e) => e.username === search) ||
// 			members.find((e) => e.username === search.toLowerCase()) ||
// 			members.find((e) => e.nick === search.toLowerCase()) ||
// 			members.find((e) => e.username === search.toLowerCase()) ||
// 			members.find((e) => e.username.toLowerCase().startsWith(search.toLowerCase())) ||
// 			members.find((e) => e.nick && e.nick.toLowerCase().startsWith(search.toLowerCase()))
// 		);
// 	}
// }

// module.exports = Client;
// const eris = require('eris');
// const fs = require('fs');
// class Client extends eris.Client {
// 	constructor(token, options) {
// 		super(token, options);
// 	}
// 	test() {
// 		console.log('e');
// 	}
// 	// loadEvents() {
// 	// 	fs.readdirSync('./events/').forEach((dir) => {
// 	// 		const events = fs.readdirSync(`../events/${dir}/`).filter((file) => file.endsWith('.js'));
// 	// 		for (let file of events) {
// 	// 			const evt = require(`../events/${dir}/${file}`);
// 	// 			const event = file.split('.')[0];
// 	// 			console.log(event);
// 	// 			client.on(event, evt.bind(null, client));
// 	// 		}
// 	// 	});
// 	// }
// 	// loadCommands() {
// 	// 	fs.readdirSync(`${__dirname}/../commands`).forEach((dir) => {
// 	// 		const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
// 	// 		for (const file of commandFiles) {
// 	// 			const command = require(`./commands/${dir}/${file}`);
// 	// 			client.commands.set(command.name, command);
// 	// 		}
// 	// 		commandFiles.forEach((f) => {
// 	// 			require(`./commands/${dir}/${f}`);
// 	// 		});
// 	// 	});
// 	// }
// 	/**
//     * @param {Object} Guild Eris.Guild.prototype
//     * @param {String} search Where to search for the member, ie 'args[0], args.join(' ')'
//     */
// 	getMember(Guild, search) {
// 		console.log(search);
// 		return (
// 			Guild.members.find((e) => e.id === search) ||
// 			Guild.members.find((e) => e.mention === search) ||
// 			Guild.members.find((e) => e.nick === search) ||
// 			Guild.members.find((e) => `${e.username}#${e.discriminator}` === search) ||
// 			Guild.members.find((e) => e.username === search) ||
// 			Guild.members.find((e) => e.username === search.toLowerCase()) ||
// 			Guild.members.find((e) => e.nick === search.toLowerCase()) ||
// 			Guild.members.find((e) => e.username === search.toLowerCase()) ||
// 			Guild.members.find((e) => e.username.toLowerCase().startsWith(search.toLowerCase())) ||
// 			Guild.members.find((e) => e.nick && e.nick.toLowerCase().startsWith(search.toLowerCase()))
// 		);
// 	}

// 	/**
// 	 *
// 	 * @param {Object} client The client parameter
// 	 * @param {Object} msg The message object from the messageCreate event
// 	 * @param {?Object} error The error causing it
// 	 */

// 	error(client, msg, error) {
// 		client.createMessage(require('../config/channels').error, {
// 			content: `<@&704676350493196318>\n\n**Guild:** ${msg.channel.Guild
// 				.name} (${msg.GuildID})\n**Caused By:** ${msg.author.username}#${msg.author.discriminator} (${msg.author
// 				.id})`,
// 			embed: {
// 				title: 'Error',
// 				description: `\`\`\`js\n${error.slice(0, 350)}\`\`\``
// 			}
// 		});
// 		client.createMessage(require('../config/channels').console, {
// 			content: `<@&704676350493196318>\n\n**Guild:** ${msg.channel.Guild
// 				.name} (${msg.GuildID})\n**Caused By:** ${msg.author.username}#${msg.author.discriminator} (${msg.author
// 				.id})`,
// 			embed: {
// 				title: 'Error',
// 				description: `\`\`\`js\n${error.slice(0, 350)}\`\`\``
// 			}
// 		});
// 		console.log(error);
// 		msg.channel.createMessage(
// 			`An error occured during the process of this command. If this issue persits, please contact support.`
// 		);
// 	}
// }

// module.exports = Client;
