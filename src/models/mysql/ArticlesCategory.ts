import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import sequelize from '../../config/sequelize';
import moment from 'moment-timezone'
export interface ArticlesCategoryAttributes extends Model {
    readonly id?: number,
    name?: string
}

type ArticlesCategoryModel = typeof Model & {
    new(): ArticlesCategoryAttributes;
}

export const ArticlesCategory = <ArticlesCategoryModel>sequelize.define('articles_categories', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
    },  
    name: DataTypes.STRING,
    delFlg: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.NOW,
        get: function() {
            return moment.utc(this.getDataValue('CreateDate')).format('YYYY-MM-DD')
        }
    },
    updatedAt:{
        type: DataTypes.NOW,
        get: function() {
            return moment.utc(this.getDataValue('CreateDate')).format('YYYY-MM-DD')
        }
    },
    deletedAt: DataTypes.NOW
});
export const list = (keyword: String, callback: Function) => {
    ArticlesCategory.findAll({
        where: {
            name: {
            [Op.like]: `%${keyword}%`
            },
            deletedAt: null,
        },
        order: [
            ['id', 'DESC'],
        ],
    }).then( categories => {
        callback(undefined, categories)
    }).catch( err => {
        callback(new Error(err), undefined);
    });
}
export const update = (id: number, category : Object, callback: Function) => {
    ArticlesCategory.update(category,{
        where: {
            id: id,
            deletedAt: null
        }
    }).then( () => {
        callback(undefined,true);;
    }).catch( err => {
        callback(new Error(err), false);
    });
}
export const create = (category: Object, callback: Function) => {
    ArticlesCategory.create(category).then( category => {
        return callback(undefined, category);
    }).catch( err => {
       return callback(new Error(err), undefined);
    });
}
export const deleteCategory = (id : number, cb: Function) => {
    ArticlesCategory.update({
        deletedAt: new Date()
    },{
        where: {
            id: id,
            deletedAt: null
        }
    }).then( () => {
         cb(undefined,true);;
    }).catch( err => {
        cb(new Error(err), undefined);
    });
};
export const findOneById = (id: number, callback: Function) => {
    ArticlesCategory.findOne({
        where: {
            id: id,
            deletedAt: null
        }
    }).then(category => {
        callback(undefined, category);
    }).catch( err => {
        callback(new Error(err), undefined);
    });
}