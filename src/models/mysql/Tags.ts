import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';

interface TagsAttributes {
    readonly id?: number,
    title?: string,
}

type TagsModel = typeof Model & {
    new(): TagsAttributes;
}

export const Tags = <TagsModel>sequelize.define('tags', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
    },
    title: DataTypes.STRING,
    delFlg: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    createdAt: DataTypes.NOW,
    updatedAt: DataTypes.NOW,
    deletedAt: DataTypes.NOW
});