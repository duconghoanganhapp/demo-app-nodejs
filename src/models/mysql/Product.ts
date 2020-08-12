// import { Sequelize, Model, DataTypes } from 'sequelize';
import Sequelize from 'sequelize';
import sequelize from '../../config/sequelize';

const Op = Sequelize.Op;

interface ProductsAttributes {
    readonly id?: number,
    name: string,
    amount: number,
    price: number,
    img?: string,
    content?: string,
    description?: Text,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date
}

type ProductsModel = typeof Sequelize.Model & {
    new(): ProductsAttributes;
}

export const Products = <ProductsModel>sequelize.define('products', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
    },
    name: Sequelize.STRING,
    amount: Sequelize.NUMBER,
    price: Sequelize.NUMBER,
    img: Sequelize.STRING,
    content: Sequelize.STRING,
    description: Sequelize.TEXT,
    createdAt: Sequelize.NOW,
    updatedAt: Sequelize.NOW,
    deletedAt: Sequelize.NOW
});
/**
 * Search products
 * @param keyword
 * @param callback
 */
export const search = (keyword: string, limit: number, offset: number, callback: Function) => {
    Products.findAll({
        where: {
            name: {
                [Op.like]: `%${keyword}%`
            },
            deletedAt: null
        },
        offset: offset,
        limit: limit
    }).then(products => {
        callback(undefined, products)
    }).catch(err => {
        callback(new Error(err), undefined);
    });
};
export const findById = (id: number, callback: Function) => {
    Products.findOne({
        where: {
            id: id
        }
    }).then((product: Object) => {
        callback(undefined, product);
    }).catch((err: string) => {
        callback(err, undefined);
    });
}
export const update = (id: number, product: Object, callback: Function) => {
    Products.update(product, {
        where: {
            id: id,
            deletedAt: null
        }
    }).then(() => {
        callback(undefined, true);
        ;
    }).catch(err => {
        callback(new Error(err), undefined);
    });
}
export const create = (id: number, product: Object, callback: Function) => {
    Products.create(product).then(product => {
        return callback(undefined, product);
    }).catch(err => {
        return callback(new Error(err), undefined);
    });
}

export const deleteProduct = (id: number, cb: Function) => {
    Products.update({
        deletedAt: new Date()
    }, {
        where: {
            id: id,
            deletedAt: null
        }
    }).then(() => {
        cb(undefined, true);
        ;
    }).catch(err => {
        cb(new Error(err), undefined);
    });
};
export const findByName = (name: string, callback: Function) => {
    Products.findOne({
        where: {
            name: name,
            deletedAt: null
        }
    }).then(product => {
        callback(undefined, product);
    }).catch(err => {
        callback(new Error(err), undefined);
    });
}
export const count = async () => {
    try {
        const query = Products.findAndCountAll({
            where: {
                deletedAt: null
            }
        });
        return (await query).count;
    } catch (err) {
        return false;
    }
}
export const limitPage = async (limit: number, offset: number) => {
    const query = Products.findAll({
        where: {
            deletedAt: null
        },
        offset: offset,
        limit: limit
    });
    return (await query);
}
export const findAsync = async (id: number) => {
    try {
        const query = await Products.findOne({
            where: {
                id: id
            }
        });
        return query;
    } catch (err) {
        return false;
    }

}
export default Products;
