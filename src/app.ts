import express from 'express';
import { Signale } from 'signale';

import { initializeDatabase } from './database/sequelize'; 
import { userRouter } from './users/infraestructure/userRouter';
import { eventRouter } from './events/infraestructure/userRouter';

const app = express();
const signale = new Signale();

app.use(express.json());
app.use('/users', userRouter);
app.use('/events', eventRouter);

async function startServer() {
    try {

        // Luego inicializa y conecta la base de datos
        await initializeDatabase();
        
        // Después inicia el servidor Express
        app.listen(3000, () => {
            signale.success("Server online in port 3000");
        });
    } catch (error) {
        signale.error("Error al iniciar el servidor: ", error);
    }
}

startServer();