import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';
import { Articles } from './Articles';

export interface ArticlesMediaAttributes {
    readonly id?: number,
    articlesId?: number,
    type?: boolean,
    fileNameImg?: string,
    fileUrlImg?: string,
    fileNameTxt?: string,
    fileUrlTxt?: string,
    fileUrl?: string 
}

type ArticlesMediaModel = typeof Model & {
    new(): ArticlesMediaAttributes;
}

export const ArticlesMedia = <ArticlesMediaModel>sequelize.define('articles_media', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
    },
    articlesId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Articles',
            key: 'articlesId'
        }
    },
    type: DataTypes.BOOLEAN,
    fileNameImg: DataTypes.STRING,
    fileUrlImg: DataTypes.STRING,
    fileNameTxt: DataTypes.STRING,
    fileUrlTxt: DataTypes.STRING,
    delFlg: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    createdAt: DataTypes.NOW,
    updatedAt: DataTypes.NOW,
    deletedAt: DataTypes.NOW
});

ArticlesMedia.belongsTo(Articles, {
    foreignKey: 'articlesId'
});