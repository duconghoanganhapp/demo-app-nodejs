import sequelize from '../config/sequelize';
import { Articles, ArticlesAttributes } from '../models/mysql/Articles';
import { Users } from '../models/mysql/User';
import { ArticlesMedia } from '../models/mysql/ArticlesMedia';
import { ArticlesCategory } from '../models/mysql/ArticlesCategory';

export const saveTable = async (data: ArticlesAttributes) => {
    const t = await sequelize.transaction();
    try {
        const result = await Articles.create(data, { transaction: t });
        if(result) {
            t.commit();
        } else {
            t.rollback();
        }
        return result;
    } catch(err) {
        t.rollback();
    }
}

export const findAllArticles = async () => {
    try{
        const result = await Articles.findAll({
            where: {
                delFlg: 0
            },
            include: [
                {
                    model: Users,
                    as: 'User',
                    where: {
                        delFlg: 0
                    },
                    required: false,
                },
                {
                    model: ArticlesCategory,
                    as: 'ArtCate',
                    where: {
                        delFlg: 0
                    },
                    required: false,
                }
            ],
            order: [
                ['id', 'DESC']
            ],
        });
        return result;
    } catch(err) {
        return err;
    }
}

export const findArticlesById = async (id: number) => {
    try {
        const result = await Articles.findOne({
            where: {
                id: id,
                delFlg: 0
            }
        });
        return result;
    } catch(err) {
        return err;
    }
} 