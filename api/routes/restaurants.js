const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(":", "_").replace(":", "_") + file.originalname,
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true) // przyjąć
    } else {
        cb(null, false) // odrzuć
    }
}

// Miejsce składowania plików
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
    fileFilter: fileFilter,
});

const RestaurantController = require('../controllers/restaurants');

router.get('/', checkAuth, RestaurantController.restaurants_get_all);

router.post('/', checkAuth, upload.single('restaurantImage'), RestaurantController.restaurants_add_new);

router.get('/:restaurantId', checkAuth, RestaurantController.restaurants_get_by_id);

router.put('/:restaurantId', checkAuth, RestaurantController.restaurants_change_by_id);

router.delete('/:restaurantId', checkAuth, RestaurantController.restaurants_delete_by_id);

module.exports = router;
