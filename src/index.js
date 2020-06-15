const eris = require('eris');
const guildSettings = require('./models/Guild');

const db = require('./database/database');
db.then(() => console.log('connected to the database')).catch((e) => console.log(e));
