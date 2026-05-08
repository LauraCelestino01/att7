const{ response } = require("express")

const MovieModel =  require("../model/movie.model.js");



const list = async (request, response) => {
    try {
        const movies = await MovieModel.find()
        return response.json(movies);

    } catch (err) {
        return response.status(400).json({
            error: "movies/list",
            message: err.message || "Fail to list movies"
        });
    };
    
};

const getById = async (request, response) => {
    const { id } = request.params;
    
    try {
        const movies = await MovieModel.findById(id)
        if(!movies){
            throw new Error(404)
        };

        return response.json(movies);
        
       
         
    } catch (err) {
       return response.status(404).json({ 
        error:"movies/getById",
        message: err.message || "Movies not found" 
     }); 
    };   
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
    };
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
            return response.status(404).json({ 
                message: "Movie not found"
             });
        }
        return response.json(moviesUpdate);
        
    } catch (err) {
        return response.status(404).json({ 
            error:"movies/update",
            message: err.message || "Movies not found",
         });  
    };
};

const remove = async (request, response) => {
    const { id } = request.params;

    try {
        const movieRemoved = await MovieModel.findByIdAndDelete(id)
        if(!movieRemoved){
            throw new Error();
        }
        return response.status(200).json({
            message: "Movie removed"
        }); 
    } catch (err) {
        return response.status(404).json({ 
            error:"movie/delet",
            message: err.message || "Movie not found"
        }); 
    };
};

module.exports = { 
    list, 
    getById, 
    create, 
    update, 
    remove,
};