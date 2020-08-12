import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';
import { Articles } from './Articles';
import { Tags } from './Tags';

interface ArticlesTagsAttributes {
    readonly id?: number,
    articlesId?: number,
    tagsId?: number,
}

type ArticlesTagsModel = typeof Model & {
    new(): ArticlesTagsAttributes;
}

export const ArticlesTags = <ArticlesTagsModel>sequelize.define('articles', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
    },
    articlesId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Articles',
          key: 'id'
        }
    },
    tagsId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Tags',
          key: 'id'
        }
    },
    delFlg: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    createdAt: DataTypes.NOW,
    updatedAt: DataTypes.NOW,
    deletedAt: DataTypes.NOW
});

// associate model
ArticlesTags.belongsTo(Articles, {
    foreignKey: 'articlesId'
});
ArticlesTags.belongsTo(Tags, {
    foreignKey: 'tagsId'
});