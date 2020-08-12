import Sequelize from 'sequelize';
import sequelize from '../../config/sequelize';
import moment from 'moment-timezone';
import { Users } from './User';
const Op = Sequelize.Op;

interface MessasgesAttributes {
    readonly id?: number,
    idUser: number,
    idProduct: number,
    message: Text,
    createdAt: Date,
    updatedAt: Date
}

type MessagesModel = typeof Sequelize.Model & {
    new(): MessasgesAttributes;
}

export const Messages = <MessagesModel>sequelize.define('Messages', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
    },
    idUser: Sequelize.INTEGER,
    idProduct: Sequelize.INTEGER,
    message: Sequelize.TEXT,
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: Sequelize.DATE
},{
    timestamps: false
});
Messages.belongsTo(Users, {
    foreignKey: 'idUser'
});
export const insert = async (idProduct: number, idUser: number, message: string) => {
    try {
        const query = await Messages.create({
            idUser: idUser,
            idProduct: idProduct,
            message: message,
            createdAt: moment(Date.now()).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD hh:mm:ss')
        });
        return query;
    } catch(err) {
        return false;
    }
}
export const list = async () => {
    try {
        const query = await Messages.findOne({  
            order: [
                ['createdAt', 'ASC']
            ],
            include:[{
                model: Users
            }]
        });
        return query;
    } catch (err) {
        return false;
    }
}