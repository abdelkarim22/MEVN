const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const items = require('./routes/api/items');
const app = express();

// use midleWare

app.use(bodyParser.json());
app.use(cors());
// db config

const db = require('./config/keys').mongoURI;

// connect to Mongo

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log('MongoDB connected ...')})
.catch((error) => { console.log(error) });

// initialize routes

app.use('/api/items', items);

// handle production
if (process.env.NODE_ENV==='production') {
    app.use(express.static(__dirname + '/public/'));

    // handle Single page application
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    });
}

// initialize port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
