const express = require('express');
const connectDb = require('./db')
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());

connectDb();

app.use(bodyParser.json());
app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'client')));

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '..', 'client')));

// SPA fallback - redirect all non-API routes to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
