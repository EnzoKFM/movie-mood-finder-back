import { Router, RequestHandler } from 'express';
import { MovieService } from '../services/movieService';
import { validationRules, validateRules } from '../middleware/validator'
import { RecommendationService } from '../services/recommendationService';
import { WeatherService } from '../services/weatherService';

const router = Router();
const movieService = new MovieService ();
const weatherService = new WeatherService ();

const recommendationService = new RecommendationService (weatherService, movieService);

const getMovieByName: RequestHandler = async (req, res) => {
    try {
        const name = req.query.name as string;

        if (!name){
            res.status(400).json({
                error: "name parameter is required"
            });
            return;
        }

        const response = await movieService.getMovieDetailsByName(name);
        res.json(response);
    } catch (error) {
        res.status(500).json({
            error: "Not Found"
        });
    }
}

const getMovieByID: RequestHandler = async (req, res) => {
    try {
        const id = req.query.id as string;

        if (!id){
            res.status(400).json({
                error: "id parameter is required"
            });
            return;
        }

        const response = await movieService.getMovieDetailsByID(id);
        res.json(response);
    } catch (error) {
        res.status(500).json({
            error: "Not Found"
        });
    }
}

const getMoviesByGenreID: RequestHandler = async (req, res) => {
    try {
        const id = req.query.id as string;

        if (!id){
            res.status(400).json({
                error: "id parameter is required"
            });
            return;
        }

        const response = await movieService.getMoviesByGenreID(id);
        res.json(response);
    } catch (error) {
        res.status(500).json({
            error: "Not Found"
        });
    }
}

const getMoviesRecommendation: RequestHandler = async (req, res) => {
    try {
        const city = req.query.city as string;

        const response = await recommendationService.getRecommendationsByCity(city);
        res.json(response);

        
    } catch (error) {
        console.log(error);
    }
}

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API de recommandation de films basée sur la météo
 */


/**
 * @swagger
 * /movieName:
 *   get:
 *     summary: Retrieve a movie by his name
 *     description: Retrieve a movie by his name. Basic Route
*/
router.get('/movieName', getMovieByName);

/**
 * @swagger
 * /movieID:
 *   get:
 *     summary: Retrieve a movie by his ID
 *     description: Retrieve a movie by his ID. Basic Route
*/
router.get('/movieID', getMovieByID);

/**
 * @swagger
 * /genreID:
 *   get:
 *     summary: Retrieve movies from genres
 *     description: Retrieve movies from genres. Basic Route
*/
router.get('/genreID', getMoviesByGenreID);

/**
 * @swagger
 * /apimovie/recommend:
 *   get:
 *     summary: Obtenir des recommandations de films selon la météo
 *     description: Retourne une liste de films recommandés en fonction de la météo de la ville
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom de la ville
 *         example: Paris
 *     responses:
 *       200:
 *         description: Recommandations de films
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 weather:
 *                   type: string
 *                   example: Clear
 *                 mood:
 *                   type: string
 *                   example: énergique
 *                 description:
 *                   type: string
 *                   example: Par beau temps, on se sent aventureux !
 *                 movies:
 *                   type: array
 *       400:
 *         description: Paramètres invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                       param:
 *                         type: string
 *                       value:
 *                         type: string
 *       500:
 *         description: Erreur serveur
 */

/**
 * @route GET /apimovie/recommend
 * @desc Get movie recommendations based on weather in a city
 * @param {string} city - The city name to get weather-based recommendations
 * @returns {Object} Weather info, mood, description and recommended movies
 */
router.get('/recommend', validationRules, validateRules, getMoviesRecommendation);

export default router; 