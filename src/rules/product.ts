import * as validator from 'express-validator';
import { MESSAGE } from '../utils/messages';

/**
 * Validation update product
 */
export const edit = [
    validator
        .check('name')
        .notEmpty()
        .withMessage(MESSAGE.V02('name')),
    validator
        .check('content')
        .notEmpty()
        .withMessage(MESSAGE.V02('content')),
    validator
        .check('description')
        .notEmpty()
        .withMessage(MESSAGE.V02('description')),
];