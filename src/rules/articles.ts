import { check } from 'express-validator';

const validate = [
    check('title').notEmpty().withMessage('Title is required'),
    check('userId').notEmpty().withMessage('Author is required'),
    check('cateArticlesId').notEmpty().withMessage('Category Articles is required'),
    check('published').notEmpty().withMessage('Published is required')
]

export default validate;