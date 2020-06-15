const eris = require('eris');

class Client extends eris.Client {
	constructor(token, options) {
		super(token, options);
	}
	loadEvents() {
		fs.readdirSync('./events/').forEach((dir) => {
			const events = fs.readdirSync(`./events/${dir}/`).filter((file) => file.endsWith('.js'));
			for (let file of events) {
				const evt = require(`./events/${dir}/${file}`);
				const event = file.split('.')[0];
				console.log(event);
				client.on(event, evt.bind(null, client));
			}
		});
	}
	loadCommands() {
		client.commands = new Eris.Collection();
		fs.readdirSync('./commands/').forEach((dir) => {
			const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = require(`./commands/${dir}/${file}`);
				client.commands.set(command.name, command);
			}
			commandFiles.forEach((f) => {
				require(`./commands/${dir}/${f}`);
			});
		});
	}
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
}
