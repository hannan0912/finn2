const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./chat.db');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, sender TEXT, receiver TEXT, message TEXT)");
});

module.exports = db;
