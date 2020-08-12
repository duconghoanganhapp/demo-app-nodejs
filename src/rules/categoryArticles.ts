import * as validator from 'express-validator';
export const add = [
    validator.check('name').not().trim().isEmpty().withMessage('Name is required')
];