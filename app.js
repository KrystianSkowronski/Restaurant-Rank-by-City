const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

// instancja expressa
const app = express();

// import routów
const restaurantsRoutes = require('./api/routes/restaurants');
const usersRoutes = require('./api/routes/users');

// statyczny katalog z obrazkami
app.use('/uploads', express.static('uploads'));

// połączenie z bazą sql
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_NAME}.41tad.mongodb.net/restaurants?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// logger - morgan
app.use(morgan('combined'));

// parsowanie - wyciągnięcie części body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/restaurants', restaurantsRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
    res.status(404).json({ wiadomosc: 'Nie odnaleziono' });
});

module.exports = app;
