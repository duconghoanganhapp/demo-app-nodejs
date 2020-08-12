import { Users } from '../models/mysql/User';

export const findAllUser = async () => {
    try {
        const result = await Users.findAll({
            where: {
                delFlg: 0
            }
        });
        return result;
    } catch(err) {
        return err;
    }
}