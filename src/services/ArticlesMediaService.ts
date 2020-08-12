import sequelize from '../config/sequelize';
import { ArticlesMedia, ArticlesMediaAttributes } from '../models/mysql/ArticlesMedia';

export const saveTable = async (data: ArticlesMediaAttributes) => {
    const t = await sequelize.transaction();
    try {
        const result = await ArticlesMedia.create(data, { transaction: t });
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