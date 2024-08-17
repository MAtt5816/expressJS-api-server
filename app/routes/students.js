const router = require('express').Router()
const controller = require('../controllers/students')
const jwtAuth = require('../middleware/jwt-auth')
const {body, param, query, handleValidationErrors} = require('../middleware/validation')

// GET /student
router.get(
    '/student',
    [
        jwtAuth.authenticateJWT,
        query('results').optional().isInt({ min: 1 }).withMessage('Results must be an integer greater than 0'),
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
        body('*.gender').isString().isLength({ max: 10 }),
        body('*.title').isString().isLength({ max: 20 }),
        body('*.first_name').isString().isLength({ max: 50 }),
        body('*.last_name').isString().isLength({ max: 50 }),
        body('*.email').isEmail().isLength({ max: 100 }),
        body('*.dob').isDate(),
        body('*.phone').isString().isLength({ max: 20 }),
        // TODO: Add more validation rules as needed
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
        body('gender').optional().isString().isLength({ max: 10 }),
        body('title').optional().isString().isLength({ max: 20 }),
        body('first_name').optional().isString().isLength({ max: 50 }),
        body('last_name').optional().isString().isLength({ max: 50 }),
        body('email').optional().isEmail().isLength({ max: 100 }),
        body('dob').optional().isDate(),
        body('phone').optional().isString().isLength({ max: 20 }),
        // TODO: Add more validation rules as needed
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
        body('gender').optional().isString().isLength({ max: 10 }),
        body('title').optional().isString().isLength({ max: 20 }),
        body('first_name').optional().isString().isLength({ max: 50 }),
        body('last_name').optional().isString().isLength({ max: 50 }),
        body('email').optional().isEmail().isLength({ max: 100 }),
        body('dob').optional().isDate(),
        body('phone').optional().isString().isLength({ max: 20 }),
        // TODO: Add more validation rules as needed
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