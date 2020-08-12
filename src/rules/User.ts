import * as validator from 'express-validator';
export const edit = [       
    validator.check('firstName').notEmpty().withMessage('FirstName is required'),
    validator.check('lastName').notEmpty().withMessage('LastName is required'),
    validator.check('email').notEmpty().withMessage('email is required').isEmail().withMessage('must be is email'),
    validator.check('confirmPassword').custom( (value, { req }) => {
        if(req.body.password.length > 0) {
            if (value.length <= 0) {
                throw new Error('confirmPassword is required');
            }
            if (req.body.password !== value) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }
        return true;
    })
];