import { Router, RequestHandler } from 'express';
import { WeatherService } from '../services/weatherService';

const router = Router();
const weatherService = new WeatherService ();

const getWeather: RequestHandler = async (req, res) => {
    try {
        const city = req.query.city as string;

        if (!city){
            res.status(400).json({
                error: "City parameter is required"
            });
            return;
        }

        const response = await weatherService.getWeatherByCity(city)
        res.json(response);
    } catch (error) {
        res.status(500).json({
            error: "Not Found"
        });
    }
}

router.get('/weather', getWeather);

export default router; 