const crypto = require("node:crypto");


const movies = [{
    id: "949da987-d5bc-4e1f-b1fe-185981e9fa7a",
    title: "Avatar",
    description: "Um fuzileiro paraplégico é enviado a Pandora e se envolve com os habitantes locais, os Na'vi.",
    year: 2009,
    genres: [
        "Aventura",
        "Ficção Científica"
    ],
    image: "https://m.media-amazon.com/images/I/41kTVLeW1CL._AC_.jpg",
    video: "https://www.youtube.com/watch?v=5PSNL1qE6VY",
    createAt: new Date(),
    updateAt: new Date(),
}];

const list = (request, response) => {
    return response.json(movies);
};

const read = (request, response) => {
    const { id } = request.params;
    
    const movie = movies.find(m => String(m.id) === String(id));

    if (!movie) {
        return response.status(404).json({ error: "Filme não encontrado" });
    }

    return response.json(movie);
};

const create = (request, response) => {
    const { title, description, year, genres, image, video } = request.body;
    
    const movie = {
        id: crypto.randomUUID(),
        title,
        description,
        year,
        genres,
        image,
        video,
        createAt: new Date(),
        updateAt: new Date(),
    };

    movies.push(movie);

    return response.status(201).json(movie);
};

const update = (request, response) => {    
    const { id } = request.params;

    const { title, description, year, genres, image, video } = request.body;
    
    const movieIndex = movies.findIndex(m => String(m.id) === String(id));

   
    if (movieIndex < 0) {
        return response.status(404).json({ error: "Filme não encontrado" });
    }

    
    const { createAt } = movies[movieIndex];

    const movieUpdate = {
        id: String(id),
        title,
        description,
        year,
        genres,
        image,
        video,
        createAt, 
        updateAt: new Date(),
    };
    
    movies[movieIndex] = movieUpdate;

    return response.json(movieUpdate);
};

const delet = (request, response) => {
    const { id } = request.params;
    const movieIndex = movies.findIndex(m => String(m.id) === String(id));

    if (movieIndex < 0) {
        return response.status(404).json({ error: "Filme não encontrado" });
    }
    
    movies.splice(movieIndex, 1);

    return response.send("Filme removido");
};

module.exports = { 
    list, 
    read, 
    create, 
    update, 
    delet,
};