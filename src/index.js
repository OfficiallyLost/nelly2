const db = require('./database/db');
const fs = require('fs');
const { Client } = require('eris');
const client = new Client();

db.then(() => console.log('connected to the database')).catch((e) => console.log(e));

process.on('unhandledPromiseRejectionWarning', (e) => {
	console.log(e);
});
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
client.loadEvents();

const con = async () => {
	await client.connect();
};
con();
