const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.users_signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            name: req.body.name,
        });
        user.save()
            .then(result => {
                res.status(201).json({
                    wiadomosc: 'Dodano nowego użytkownika',
                    info: result,
                });
            })
            .catch(err => res.status(500).json({
                wiadomosc: "Błąd serwera"
            }));
    });
}

exports.users_delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.userId)
        .then(() => res.status(200).json({
            wiadomosc: 'Usunięto użytkownika'
        }))
        .catch(err => res.status(500).json({
            wiadomosc: "Błąd serwera"
        }));
}

exports.users_login = (req, res, next) => {
    // Szukam usera
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    wiadomosc: "Brak autoryzacji"
                });
            }
            // Weryfikacja hasła
            bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    if (!result) {
                        return res.status(401).json({
                            wiadomosc: "Brak autoryzacji"
                        });
                    }
                    // Wygenerowanie JWT
                    const token = jwt.sign(
                        { email: user.email, userId: user._id, userName: user.name },
                        process.env.SECRET,
                        { expiresIn: "1h" }
                    );
                    res.status(200).json({
                        wiadomosc: "Zalogowano",
                        token: token
                    });
                })
        })
        .catch(err => res.status(500).json({
            wiadomosc: "Błąd serwera"
        }));
}