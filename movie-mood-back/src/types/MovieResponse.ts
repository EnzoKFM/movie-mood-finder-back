interface genre {
    name:string
}

interface movieDetails {
    adult:string,
    budget:number,
    genres:genre[],
    title:string,
    overview:string,
    status:string,
    release_date:string,
    production_companies : {
        name:string
    },
    production_countries : {
        name:string
    }
}

interface MovieResponse {
    page:number,
    results:movieDetails[]
}

export default MovieResponse;
