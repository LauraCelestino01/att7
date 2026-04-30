const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env.js");
const { compareHash } = require("../utils/hashProvider.js");
const { userDatabase } = require("./users.controller.js");


const login = async (request, response) =>{
    const { email, password} = request.body

    const user = userDatabase.find(u => u.email === email);

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
    delete userLoged.password;

    const token = jwt.sign(user, JWT_SECRET,{
        expiresIn: '25h'
    });
    
    return response.json({ ...userLoged, token}); 
};


module.exports = {
    login,
}