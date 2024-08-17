const router = require('express').Router()
const controller = require('../controllers/general')
const {body, param, query, handleValidationErrors} = require('../middleware/validation')

// GET /hello
router.get('/hello', controller.hello);

// POST /authorize
router.post(
    '/authorize',
    [
        body('username').isString().isLength({ max: 50 }),
        body('passphrase').isString().isLength({ max: 255 })
    ],
    handleValidationErrors,
    controller.authorize
);

module.exports = router;