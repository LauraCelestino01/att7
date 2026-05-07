const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env.js");
const UserModel = require("../model/user.model.js");
const { compareHash } = require("../utils/hashProvider.js");



const login = async (request, response) =>{
    const { email, password} = request.body
    const user = await UserModel.findOne({ email }).lean();


    const errorMenssage = {
            error: '@authenticate/login',
            message: 'Invalid email or password'
        };
    if(!user){
        return response.status(400).json(errorMenssage);
    };   

    const isValidPassword = await compareHash(password, user.password);
    if(!isValidPassword){
        return response.status(400).json(errorMenssage);
    }; 

    const userLoged = { ...user }; 
    const token = jwt.sign(user, JWT_SECRET,{
        expiresIn: '24h'
    });
    
    delete userLoged.password;
     
    return response.json({ ...userLoged, token}); 
};


module.exports = {
    login,
}