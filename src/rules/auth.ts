import * as validator from 'express-validator';
export const handleLogin = [
    validator.check('email').notEmpty().withMessage('email is required').isEmail().withMessage('must be is email'),
    validator.check('password').notEmpty().withMessage('password is required')
];
export const checkRegister = [
    validator.check('email').notEmpty().withMessage('email is required').isEmail().withMessage('must be is email'),
    validator.check('password').notEmpty().withMessage('password is required'),
    validator.check('firstName').notEmpty().withMessage('FirstName is required'),
    validator.check('lastName').notEmpty().withMessage('LastName is required'),
    validator.check('confirmPassword').notEmpty().withMessage('Confirm password is required').custom( (value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
];
export const change = [
    validator.check('email').not().trim().isEmpty().withMessage('Email is requried').isEmail().withMessage('be must is email'),
    validator.check('passwordOld').not().trim().isEmpty().withMessage('passwordOld is required'),
    validator.check('password').not().trim().isEmpty().withMessage('password is required'),
    validator.check('passwordConfirm').not().trim().isEmpty().withMessage('Confirm password is required').custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })
];