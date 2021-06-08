const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

// Zakładanie konta użytkownika
router.post('/signup', usersController.users_signup);

// Usuwanie użytkownika
router.delete('/:userId', usersController.users_delete);

// Logowanie
router.post('/login', usersController.users_login);

module.exports = router;