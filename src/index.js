const db = require('./database/database');
const fs = require('fs');

db.then(() => console.log('connected to the database')).catch((e) => console.log(e));

fs.readdirSync('./events/').forEach((dir) => {
	const events = fs.readdirSync(`./events/${dir}/`).filter((file) => file.endsWith('.js'));
	for (let file of events) {
		const evt = require(`./events/${dir}/${file}`);
		const event = file.split('.')[0];
		console.log(event);
		client.on(event, evt.bind(null, client));
	}
});

client.loadCommands();

const con = async () => {
	await client.connect();
};
con();
