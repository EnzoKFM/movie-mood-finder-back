import axios from 'axios';
import dotenv from 'dotenv';
import WeatherResponse from '../types/WeatherResponse';

dotenv.config();


export class WeatherService {
    static getWeatherByCity(city: string) {
        throw new Error('Method not implemented.');
    }
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor() {
        this.apiKey = process.env.OPENWEATHER_API_KEY || '';
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }

    async getWeatherByCity(city: string): Promise<WeatherResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/weather`, {
                params: {
                    q: city,
                    appid: this.apiKey,
                    units: 'metric'
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Weather API error: ${error.response?.data.message || error.message}`);
            }
            throw error;
        }
    }
}