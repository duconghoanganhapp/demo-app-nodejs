import Sequelize from 'sequelize';
import sequelize from '../../config/sequelize';
import moment from 'moment-timezone';
import { Messages } from './Messages';
const Op = Sequelize.Op;
interface UsersAttributes {
    readonly id?: number,
    firstName: string,
    id_google?: string,
    id_facebook?: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    delFlg: Boolean,
    role: Boolean,
    deletedAt?: Date
}

type UsersModel = typeof Sequelize.Model & {
    new(): UsersAttributes;
}

export const Users = <UsersModel>sequelize.define('Users', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    id_google: Sequelize.STRING,
    id_facebook: Sequelize.STRING,
    password: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        get: function() {
            return moment.utc(this.getDataValue('CreateDate')).format('YYYY-MM-DD')
        }
    },
    delFlg: Sequelize.BOOLEAN,
    role: Sequelize.BOOLEAN,
    updatedAt: Sequelize.DATE,
    deletedAt: Sequelize.DATE
});
export const deleteUser = (id : number, cb: Function) => {
    Users.update({
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
export const search = (keyword: string, callback: Function) => {
    Users.findAll({
        where: {
            email: {
            [Op.like]: `%${keyword}%`
            },
            deletedAt: null
        }
    }).then( users => {
        callback(undefined, users)
    }).catch( err => {
        callback(new Error(err), undefined);
    });
}
export const list = (callback : Function) => {
    Users.findAll({
        where: {
            deletedAt: null
        }
    }).then( users => {
       callback(undefined, users);
    }).catch( err => {
        callback(new Error(err), undefined);
    });
}
export const findOne = (email: string, callback: Function) => {
    Users.findOne({
        where: {
            email : email
        }
    }).then( user => {
        callback(undefined, user);
    }).catch( err => {
        callback(new Error(err), undefined);
    });
}
export const findById = (id: number, callback: Function) => {
    Users.findOne({
        where: {
            id: id
        }
    }).then( (user :Object) => {
        callback(undefined, user);
    }).catch( (err: string) => {
        callback(err, undefined);
    });
}
export const update = (id: number, user : Object, callback: Function) => {
    Users.update(user,{
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
export const create = (user: Object, callback: Function) => {
    Users.create(user).then( user => {
        return callback(undefined, user);
    }).catch( err => {
       return callback(new Error(err), undefined);
    });
}
export const updatePassword = async (password: any,email: string) => {
    try {
        var query = await Users.update({ password: password },{
            where: {
                email: email,
                deletedAt: null
            }
        });
        if (query[0]) {
            return true; 
        }
        return false;
    } catch(err) {
        return false;
    }
   
}
export const findOrCreate = async (profileGoole) => {
   try {
        const query = await Users.findOne({ 
            where: {
                id_google: profileGoole.id
            }
        });
        if (query) return query;
        return await Users.create({
            id_google: profileGoole.id,
            lastName: profileGoole.name.familyName,
            firstName: profileGoole.name.givenName
        });
   } catch(err) {
    return false;
   }
}