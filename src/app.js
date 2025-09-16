import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { swaggerMiddleware } from './docs/swagger.js';

const app = express();

const PORT = 8080;

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/adoptme";


mongoose.connect(MONGO_URL)
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error("Error al conectar a MongoDB:", err));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/docs', ...swaggerMiddleware);

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8" />
    <title>AdoptMe API</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        background: #f5f5f5;
        color: #333;
        margin: 0;
        padding: 20px;
        text-align: center;
        }
        h1 {
        color: #2c3e50;
        }
        p {
        font-size: 18px;
        }
        ul {
        list-style: none;
        padding: 0;
        }
        li {
        margin: 10px 0;
        }
        a {
        text-decoration: none;
        color: #3498db;
        font-weight: bold;
        }
        a:hover {
        color: #1abc9c;
        }
        .container {
        max-width: 600px;
        margin: 50px auto;
        background: #fff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>AdoptMe</h1>
        <p>Servidor corriendo en el puerto 8080</p>
        <p>Explora la documentación en <a href="/api/docs">/api/docs</a></p>
        <ul>
            <li><a href="/api/users">/api/users</a></li>
            <li><a href="/api/pets">/api/pets</a></li>
            <li><a href="/api/adoptions">/api/adoptions</a></li>
            <li><a href="/api/sessions">/api/sessions</a></li>
        </ul>
    </div>
    </body>
    </html>`);
});

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));

