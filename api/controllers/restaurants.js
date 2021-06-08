const mongoose = require('mongoose');

// importuję model Restaurant
const Restaurant = require('../models/restaurant');

exports.restaurants_get_all = (req, res, next) => {
    Restaurant.find()
        .then(result => {
            res.status(200).json({
                wiadomosc: 'Lista wszystkich restauracji',
                info: result,
            });
        })
        .catch(err => res.status(500).json({
            wiadomosc: "Błąd serwera"
        }));
}

exports.restaurants_add_new = (req, res, next) => {
    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        city: req.body.city,
        rating: req.body.rating,
        restaurantImage: req.file.path,
    });
    restaurant.save()
        .then(result => {
            res.status(201).json({
                wiadomosc: 'Dodano nową restaurację',
                info: result,
            });
        })
        .catch(err => res.status(500).json({
            wiadomosc: "Błąd serwera"
        }));
}

exports.restaurants_get_by_id = (req, res, next) => {
    const id = req.params.restaurantId;
    Restaurant.findById(id)
        .then(result => {
            res.status(200).json({
                wiadomosc: 'Szczegóły restauracji o ID: ' + id,
                info: result,
            });
        })
        .catch(err => res.status(500).json({
            wiadomosc: "Błąd serwera"
        }));
}

exports.restaurants_change_by_id = (req, res, next) => {
    const id = req.params.restaurantId;
    Restaurant.findByIdAndUpdate(id,
        {
            name: req.body.name,
            rating: req.body.rating,
        },
        {
            new: true,
        }
    )
        .then(result => {
            res.status(200).json({
                wiadomosc: 'Zmieniono dane restauracji o ID: ' + id,
                info: result,
            });
        })
        .catch(err => res.status(500).json({
            wiadomosc: "Błąd serwera"
        }));
}

exports.restaurants_delete_by_id = (req, res, next) => {
    const id = req.params.restaurantId;
    Restaurant.findByIdAndDelete(id)
        .then(result => {
            res.status(200).json({
                wiadomosc: 'Usunięto restaurację o ID: ' + id,
                info: result,
            });
        })
        .catch(err => res.status(500).json({
            wiadomosc: "Błąd serwera"
        }));
}