import express from 'express';
import { Signale } from 'signale';
import cors from 'cors'
import dotenv from 'dotenv'; 

dotenv.config();


// import { initializeDatabase } from './database/sequelize'; 
import { query } from './database/db';
import { userRouter } from './users/infraestructure/userRouter';
import { authRouter } from './auth/intraestructure/authRouter';
import { eventRouter } from './events/infraestructure/userRouter';


const app = express();
const signale = new Signale();


app.use(express.json());
app.use(cors())
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/v1', eventRouter)




async function startServer() {
    try {

        // Luego inicializa y conecta la base de datos
        await query("SELECT 1 + 1 AS result", []);
        
        // Después inicia el servidor Express
        app.listen(3000, () => {
            signale.success("Server online in port 3000");
        });
    } catch (error) {
        signale.error("Error al iniciar el servidor: ", error);
    }
}

startServer();