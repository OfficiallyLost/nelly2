const db = require('./database/database');
const fs = require('fs');

db.then(() => console.log('connected to the database')).catch((e) => console.log(e));

client.loadCommands();
client.loadEvents();

const con = async () => {
	await client.connect();
};
con();
