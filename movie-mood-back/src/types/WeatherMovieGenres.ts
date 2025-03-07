interface WeatherLink {
    weatherCode: string,
    genres:MovieGenres[],
    mood:string,
    description:string
}

export enum MovieGenres {
    Action = 28,
    Adventure = 12,
    Animation = 16,
    Comedy = 35,
    Crime = 80,
    Documentary = 99,
    Drama = 18,
    Family = 10751,
    Fantasy = 14,
    History = 36,
    Horror = 27,
    Music = 10402,
    Mystery = 9648,
    Romance = 10749,
    ScienceFiction = 878,
    TVMovie = 10770,
    Thriller = 53,
    War = 10752,
    Western = 37
}

export const weatherToGenreMap: WeatherLink[] = [
    {
        weatherCode:"Clear",
        genres:[MovieGenres.Action, MovieGenres.Adventure],
        mood:"énergique",
        description: "Par beau temps"
    },
    {
        weatherCode:"Rain",
        genres:[MovieGenres.Drama, MovieGenres.Family],
        mood:"énergique",
        description: "Par beau temps"
    },
    {
        weatherCode:"Snow",
        genres:[MovieGenres.Documentary, MovieGenres.ScienceFiction, MovieGenres.Mystery],
        mood:"énergique",
        description: "Par beau temps"
    },
    {
        weatherCode:"Thunderstorm",
        genres:[MovieGenres.Horror, MovieGenres.Thriller],
        mood:"énergique",
        description: "Par beau temps"
    },
    {
        weatherCode:"Clouds",
        genres:[MovieGenres.History, MovieGenres.War],
        mood:"énergique",
        description: "Par beau temps"
    }
]