import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';
import { Users } from './User';
import { ArticlesCategory } from './ArticlesCategory';
import { ArticlesMedia } from './ArticlesMedia';
import moment from 'moment-timezone';

export interface ArticlesAttributes  {
    readonly id?: number,
    userId?: number,
    cateArticlesId?: number,
    title: string,
    alias?: string,
    desc?: string,
    published?: Date
}

type ArticlesModel = typeof Model & {
    new(): ArticlesAttributes;
}

export const Articles = <ArticlesModel>sequelize.define('articles', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    cateArticlesId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Articles_Categories',
            key: 'id'
        }
    },
    title: DataTypes.STRING,
    alias: DataTypes.STRING,
    desc: DataTypes.TEXT,
    published: {
        type: DataTypes.DATE, 
        get: function() {
            return moment.utc(this.getDataValue('published')).format('YYYY-MM-DD');
        }
    },
    delFlg: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    createdAt: DataTypes.NOW,
    updatedAt: DataTypes.NOW,
    deletedAt: DataTypes.NOW,
});

// associate model
Articles.belongsTo(Users, {
    foreignKey: 'userId'
});
Articles.belongsTo(ArticlesCategory, {
    foreignKey: 'cateArticlesId',
    as: 'ArtCate'
});