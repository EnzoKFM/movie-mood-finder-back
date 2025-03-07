import { WeatherService } from './weatherService';
import { MovieService } from './movieService';
import { weatherToGenreMap } from '../types/WeatherMovieGenres';
import MovieResponse from '../types/MovieResponse';

import Redis from 'ioredis';

const redisClient = new Redis();

interface MovieRecommendation {
    weather: string;
    mood: string;
    description: string;
    movies: MovieResponse['results'];
}

export class RecommendationService {
    constructor(
        private weatherService: WeatherService,
        private MovieService: MovieService
    ) {}

    async getRecommendationsByCity(city: string): Promise<MovieRecommendation> {
        try {
            // 1. Get weather for the city
            const weather = await this.weatherService.getWeatherByCity(city);
            const weatherCondition = weather.weather[0].main;

            const cachedCity = await redisClient.get(weatherCondition);

            if(cachedCity){
                console.log("Donnée Trouvée")
                return JSON.parse(cachedCity);
            } 
            else 
            {
                console.log("Donnée non-Trouvée, rajout dans le cache")
                // 2. Find corresponding genre mapping
                const mapping = weatherToGenreMap.find(
                    m => m.weatherCode === weatherCondition
                );

                if (!mapping) {
                    throw new Error(`No recommendations available for weather: ${weatherCondition}`);
                }
                
                let id = "";
                mapping.genres.forEach(element => {
                    id += element;
                    id += ",";
                });

                // 3. Get movie recommendations
                const movies = await this.MovieService.getMoviesByGenreID(id);

                const response = {
                    weather: weatherCondition,
                    mood: mapping.mood,
                    description: mapping.description,
                    movies: movies.results.slice(0, 5) // Return top 5 movies
                }

                await redisClient.set(weatherCondition, JSON.stringify(response), 'EX', 3600); // Cache for 1 hour
                // 4. Return formatted response
                return response;
            }

            
        } catch (error) {
            throw new Error(`Failed to get recommendations: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
} 