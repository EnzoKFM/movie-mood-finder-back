import express from 'express';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes';
import movieRoutes from './routes/movieRoutes';

import swaggerUI from 'swagger-ui-express';
import { specs } from './config/swagger';

import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req,res,next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors({
    origin: '*'
}))

// Weather routes
app.use('/apiweather', weatherRoutes);

// Movie routes
app.use('/apimovie', movieRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});