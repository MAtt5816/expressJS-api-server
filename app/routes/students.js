const router = require('express').Router()
const controller = require('../controllers/students')
const jwtAuth = require('../middleware/jwt-auth')
const {body, param, query, handleValidationErrors} = require('../middleware/validation')

// GET /student
router.get(
    '/student',
    [
        jwtAuth.authenticateJWT,
        query('results').optional().isInt({min: 1}).withMessage('Results must be an integer greater than 0'),
    ],
    handleValidationErrors,
    controller.getStudent
);

// POST /student
router.post(
    '/student',
    [
        jwtAuth.authenticateJWT,
        body().isArray(),
        body('*.gender').isString().isLength({max: 10}),
        body('*.title').isString().isLength({max: 20}),
        body('*.first_name').isString().isLength({max: 50}),
        body('*.last_name').isString().isLength({max: 50}),
        body('*.email').isEmail().isLength({max: 100}),
        body('*.dob').isDate(),
        body('*.phone').isString().isLength({max: 20}),
        body('*.id_name').isString().isLength({max: 20}),
        body('*.id_value').isString().isLength({max: 50}),
        body('*.nat').isString().isLength({max: 10}),
        body('*.location.street_number').isNumeric(),
        body('*.location.street_name').isString().isLength({max: 100}),
        body('*.location.city').isString().isLength({max: 100}),
        body('*.location.state').isString().isLength({max: 100}),
        body('*.location.country').isString().isLength({max: 100}),
        body('*.location.postcode').isString().isLength({max: 20}),
        body('*.location.timezone').isString().isLength({max: 10}),
        body('*.picture.large').isString().isLength({max: 255}),
        body('*.picture.medium').isString().isLength({max: 255}),
        body('*.picture.thumbnail').isString().isLength({max: 255}),
    ],
    handleValidationErrors,
    controller.postStudent
);

// PUT /student/:studentId
router.put(
    '/student/:studentId',
    [
        jwtAuth.authenticateJWT,
        param('studentId').isInt().withMessage('Student ID must be an integer'),
        body('gender').isString().isLength({max: 10}),
        body('title').isString().isLength({max: 20}),
        body('first_name').isString().isLength({max: 50}),
        body('last_name').isString().isLength({max: 50}),
        body('email').isEmail().isLength({max: 100}),
        body('dob').isDate(),
        body('phone').isString().isLength({max: 20}),
        body('id_name').isString().isLength({max: 20}),
        body('id_value').isString().isLength({max: 50}),
        body('nat').isString().isLength({max: 10}),
        body('location.street_number').isNumeric(),
        body('location.street_name').isString().isLength({max: 100}),
        body('location.city').isString().isLength({max: 100}),
        body('location.state').isString().isLength({max: 100}),
        body('location.country').isString().isLength({max: 100}),
        body('location.postcode').isString().isLength({max: 20}),
        body('location.timezone').isString().isLength({max: 10}),
        body('picture.large').isString().isLength({max: 255}),
        body('picture.medium').isString().isLength({max: 255}),
        body('picture.thumbnail').isString().isLength({max: 255}),
    ],
    handleValidationErrors,
    controller.putStudent
);

// PATCH /student/:studentId
router.patch(
    '/student/:studentId',
    [
        jwtAuth.authenticateJWT,
        param('studentId').isInt().withMessage('Student ID must be an integer'),
        body('gender').optional().isString().isLength({max: 10}),
        body('title').optional().isString().isLength({max: 20}),
        body('first_name').optional().isString().isLength({max: 50}),
        body('last_name').optional().isString().isLength({max: 50}),
        body('email').optional().isEmail().isLength({max: 100}),
        body('dob').optional().isDate(),
        body('phone').optional().isString().isLength({max: 20}),
        body('id_name').optional().isString().isLength({max: 20}),
        body('id_value').optional().isString().isLength({max: 50}),
        body('nat').optional().isString().isLength({max: 10}),
        body('location.street_number').optional().isNumeric(),
        body('location.street_name').optional().isString().isLength({max: 100}),
        body('location.city').optional().isString().isLength({max: 100}),
        body('location.state').optional().isString().isLength({max: 100}),
        body('location.country').optional().isString().isLength({max: 100}),
        body('location.postcode').optional().isString().isLength({max: 20}),
        body('location.timezone').optional().isString().isLength({max: 10}),
        body('picture.large').optional().isString().isLength({max: 255}),
        body('picture.medium').optional().isString().isLength({max: 255}),
        body('picture.thumbnail').optional().isString().isLength({max: 255}),
    ],
    handleValidationErrors,
    controller.patchStudent
);

// DELETE /student/:studentId
router.delete(
    '/student/:studentId',
    [
        jwtAuth.authenticateJWT,
        param('studentId').isInt().withMessage('Student ID must be an integer')
    ],
    handleValidationErrors,
    controller.deleteStudent
);

module.exports = router;