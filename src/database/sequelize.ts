import { Sequelize } from 'sequelize-typescript';

import UserModel from "../user/infraestructure/model/userModel";


export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    database: 'hexagonal',
    username: 'Angel',
    password: '1980',
    port: 3306,
    models: [UserModel],
});

export async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');
        await sequelize.sync({ force: false });
    } catch (err) {
        console.error('No se pudo conectar a la base de datos:', err);
        process.exit(1);  // Cierra la aplicación si hay un error de conexión
    }
}