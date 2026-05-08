const UserModel = require("../model/user.model.js");

const list = async (request, response) => {
    try {
        const users = await UserModel.find({}, {password: 0})
        return response.json(users);

    } catch (err) {
        return response.status(400).json({
            error: "user/list",
            message: err.message || "Failed to list users"
        });
    };
    
};


const getById = async (request, response) => {
    const { id } = request.params;

    try {
        const user = await UserModel.findById(id, {password: 0})
        return response.json(user);  

    } catch (err) {
        return response.status(400).json({ 
            error: "user/getById",
            message: err.message || "User not found"
         });
    }; 
};


const create = async (request, response) => {
    const { name, age, email, password } = request.body;

    try {
        const user = await UserModel.create({
            name,
            age,
            email,
            password,
        })
        return response.status(201).json(user); 

    } catch (err) {
        return response.status(400).json({
            error: "users/create",
            message: err.message || "Fail to create"
        });
    };
};


const update = async (request, response) => {
    const { id } = request.params;
    const { name, age, email, password } = request.body;

    try {
        const userUpdated = await UserModel.findByIdAndUpdate(id, {
            name,
            age,
            email,
            password,
        })
        if(!userUpdated) {
            throw new Error()
        }
        return response.json(userUpdated);

    } catch (err) {
         return response.status(404).json({ 
            error: "users/update" ,
            message: err.message || "User not found"
         });
    };
};
    

 


const remove = async (request, response) => {
    const { id } = request.params;

    try {
        const userDeleted = await UserModel.findByIdAndDelete( id )

        if(!userDeleted) {
            throw new Error();
        }
        return response.status(200).json({
            message: "User removed"
        });

    } catch (err) {
        return response.status(404).json({ 
            error: "users/remove" ,
            message: err.message || "User not found" 
        });
    };
};


module.exports = {
    list,
    getById,
    create,
    update,
    remove,
    UserModel,
};