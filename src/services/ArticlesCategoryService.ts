import { ArticlesCategory } from '../models/mysql/ArticlesCategory';

export const findAllArtCate = async () => {
    try {
        let artCate = await ArticlesCategory.findAll({
            where: {
                delFlg: 0
            }
        });
        return artCate;
    } catch(err) {
        return err;
    }
}