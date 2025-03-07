interface WeatherResponse {
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
        description: string;
    }>;
}

export default WeatherResponse;
