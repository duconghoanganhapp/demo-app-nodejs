import 'dotenv/config';
import { Sequelize } from 'sequelize';
const db = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    // pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 20000,
    //     acquire: 20000
    // }
    query: {
        nest: true
    }
    
});

db.Sequelize = Sequelize;

export default db;