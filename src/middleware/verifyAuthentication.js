const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env.js");


const veryfyAuthenticate = (request, response, next) => {
    const { authorization } = request.headers;
    
    if(!authorization){
        return response.status(401).json({
            error: "@authenticate/missing-token",
            message: "Token not sent",
        });
    };  

    const [prefix, token] = authorization.split(" ");

    const invalidToken = {
        error: "@authenticate/invalid-token",
        message: "Token provide is invalid",
    };

   
    if(prefix !== "Bearer" ){
        return response.status(401).json(invalidToken);

    };

    if(!token){
        return response.status(401).json(invalidToken);
    };

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if(error){
            return response.status(401).json(invalidToken);
        };
        
        request.user = decoded;
        
        return next();
    });
}; 


module.exports = {
    veryfyAuthenticate,
};