import express from 'express';
import { Signale } from 'signale';

import { initializeDatabase } from './database/sequelize'; 
import { userRouter } from './user/infraestructure/userRouter';
import { productRouter } from './product/infraestructure/productRouter';

import cors from 'cors';

const app = express();
const signale = new Signale();

app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/product', productRouter);

async function startServer() {
    try {
        // Initialize and connect to the database
        await initializeDatabase();
        
        // Start the Express server
        app.listen(3000, () => {
            signale.success("Server online in port 3000");
        });
    } catch (error) {
        signale.error("Error al iniciar el servidor:", error);
    }
}

// Start the server
startServer();
