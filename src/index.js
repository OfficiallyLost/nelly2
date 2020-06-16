const db = require('./database/db');
const fs = require('fs');
const eris = require('eris');
const client = new eris.Client();

db.then(() => console.log('connected to the database')).catch((e) => console.log(e));

process.on('unhandledPromiseRejectionWarning', (e) => {
	console.log(e);
});
client.commands = new eris.Collection();
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

fs.readdirSync('./events/').forEach((dir) => {
	const events = fs.readdirSync(`./events/${dir}/`).filter((file) => file.endsWith('.js'));
	for (let file of events) {
		const evt = require(`./events/${dir}/${file}`);
		const event = file.split('.')[0];
		console.log(event);
		client.on(event, evt.bind(null, client));
	}
});

client.connect().catch((e) => console.log(e));
