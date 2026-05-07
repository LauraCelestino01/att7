const MovieModel =  require("../model/movie.model.js");
const { errorMonitor } = require("node:events");
const { error } = require("node:console");



const list = async (request, response) => {
    try {
        const movies = await MovieModel.find()
    
        return response.json(movies);

    } catch (err) {
        return response.status(400).json({
            error: "movies/list",
            message: err.message || "Fail to list movies"
        });
    }
    
};

const read = async (request, response) => {
    const { id } = request.params;
    
    try {
        const movies = await MovieModel.findById(id)
        
        return response.json(movies); 
        
        if(!movies){
            throw new Error();
        }
         
    } catch (err) {
       return response.status(404).json({ 
        error:"movies/read",
        message: err.message || "Movies not found" 
     }); 
    }    
};


const create = async (request, response) => {
    const { title, description, year, generes, image, video } = request.body;

    try {
        const movies = await MovieModel.create({
            title,
            description,
            year,
            generes,
            image,
            video,
        })
         return response.status(201).json(movies);

    } catch (err) {
        return response.status(400).json({
            erro:"movies/create",
            message: err.message || "Failed to create"
        });      
    }

};

const update = async (request, response) => {    
    const { id } = request.params;
    const { title, description, year, generes, image, video } = request.body;
    
    try {
        const moviesUpdate = await MovieModel.findByIdAndUpdate(id, {
            title,
            description,
            year,
            generes,
            image,
            video,
        },{
            new: true
        })
        if (!moviesUpdate) {
            return response.status(404).json({ message: "Movie not found" });
        }

        return response.json(moviesUpdate);
        
    } catch (err) {
        return response.status(404).json({ 
            error:"movies/update",
            message: err.message || "Filme não encontrado",
         });
        
    }
};

const delet = async (request, response) => {
    const { id } = request.params;

    try {
        const movieRemoved = await MovieModel.findByIdAndDelete(id);
        if(!movieRemoved){
            throw new Error();
        }
        
        return response.status(204).send();     

    } catch (err) {
       return response.status(404).json({ 
        error:"movie/delet",
        message: err.message || "Filme não encontrado" }); 
    }
   
   
};

module.exports = { 
    list, 
    read, 
    create, 
    update, 
    delet,
};