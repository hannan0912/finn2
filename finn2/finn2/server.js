const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware for å tolke JSON data
app.use(cors());
app.use(express.json());

// Koble til SQLite-database
const db = new sqlite3.Database('./chatDB.sqlite3', (err) => {
    if (err) {
        console.error('Error connecting to the SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Opprett tabellen hvis den ikke finnes
db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    sender TEXT NOT NULL,
    recipient TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error("Error creating table:", err.message);
    } else {
        console.log("Messages table created or already exists.");
    }
});

app.get('/', (req, res) => {
    res.send('Velkommen til vår chat server!');
});

app.get('/messages', (req, res) => {
    const sender = req.query.sender;
    const recipient = req.query.recipient;

    if (!sender || !recipient) {
        return res.status(400).json({ error: 'Sender and recipient query parameters are required.' });
    }

    const sql = 'SELECT * FROM messages WHERE (sender = ? AND recipient = ?) OR (sender = ? AND recipient = ?) ORDER BY timestamp ASC';
    db.all(sql, [sender, recipient, recipient, sender], (err, messages) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(messages);
    });
});
app.post('/messages', (req, res) => {
    const { sender, recipient, content } = req.body;

    if (!sender || !recipient || !content) {
        return res.status(400).json({ error: 'Sender, recipient, and content are required.' });
    }

    const timestamp = new Date().toISOString();
    const sql = 'INSERT INTO messages(sender, recipient, content, timestamp) VALUES (?, ?, ?, ?)';
    db.run(sql, [sender, recipient, content, timestamp], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            id: this.lastID,
            sender: sender,
            recipient: recipient,
            content: content,
            timestamp: timestamp
        });
    });
});

app.listen(port, () => {
    console.log(`Serveren kjører på http://localhost:${port}`);
});
