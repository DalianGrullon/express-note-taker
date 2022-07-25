const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// sends users the notes.html file when navigating to /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// sends users the index.html file when navigating to all other unspecified pages
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// TODO: remove link from consolelog once deployed to heroku
app.listen(PORT, () => {
    console.log(`Server is live and listening on http://localhost:${PORT}`);
});