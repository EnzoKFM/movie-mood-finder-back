import axios from 'axios';
import dotenv from 'dotenv';
import MovieResponse from '../types/MovieResponse';
import { WeatherService } from './weatherService';

dotenv.config();


export class MovieService {
    private readonly apiKey: string;
    private readonly baseUrl: string;
    
    private weatherService = new WeatherService ();

    constructor() {
        this.apiKey = process.env.TMDB_API_KEY || '';
        this.baseUrl = 'https://api.themoviedb.org/3';
    }

    async getMovieDetailsByName(name: string): Promise<MovieResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/search/movie`, {
                params: {
                    query: name,
                    api_key: this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Movie API error: ${error.response?.data.message || error.message}`);
            }
            throw error;
        }
    }

    async getMovieDetailsByID(id: string): Promise<MovieResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/movie/${id}`, {
                params: {
                    api_key: this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Movie API error: ${error.response?.data.message || error.message}`);
            }
            throw error;
        }
    }

    async getMoviesByGenreID(id: string): Promise<MovieResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/discover/movie`, {
                params: {
                    api_key: this.apiKey,
                    with_genres:id
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Movie API error: ${error.response?.data.message || error.message}`);
            }
            throw error;
        }
    }
}