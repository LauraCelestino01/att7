const { response } = require("express");
const crypto = require("node:crypto");

const { generateHash } = require("../utils/hashProvider.js");


const users = [
  {
    id: "6565da01-a5f9-4409-bcc0-827622aa059d",
    name: "Carlos Silva",
    age: 28,
    email: "carlos.silva@example.com",
    password: "$2b$08$cjvfk8q1sGl0o.7VtdSzDedsLqRBrR7dnJdiwbyUsgGCyyvVqDIOW",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
  id: "eaf419fc-445b-43db-a019-27c127f1b59c",
  name: "Mariana Souza",
  age: 34,
  email: "mariana.souza@example.com",
  password: "$2b$08$krlM4zm9cx5yadhl8dJYq.642TImbWU2y8yvexEVc83L7hX2SfysG",
  createdAt: new Date(),
  updatedAt: new Date(),
}
];


const list = (request, response) => {
    return response.json(users);

};


const read = (request, response) => {
    const { id } = request.params;

    const user = users.find(u => u.id === String(id));

    if (!user) {
        return response.status(404).json({ error: "Usuário não encontrado" });
    }

    return response.json(user);
};


const create = async (request, response) => {
    const { name, age, email, password } = request.body;

    const hashedPassword = await generateHash(password);
    const user = {
        id: crypto.randomUUID(), 
        name,
        age,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    
    users.push(user);

    return response.status(201).json(user);
};


const update = async (request, response) => {
    const { id } = request.params;

    const { name, age, email, password } = request.body;
    
    const userIndex = users.findIndex(u => u.id === String(id));
    if (userIndex < 0) {
        return response.status(404).json({ error: "Usuário não encontrado!" });
    }    
    
    const { createdAt } = users[userIndex];
    const userUpdate = {
        id: String(id), 
        name,
        age,
        email,
        createdAt,
        updatedAt: new Date(),
    };  

    if(password){
        userUpdate.password = await generateHash(password);
    }else{
        userUpdate.password = users[userIndex].password
    };

    users[userIndex] = userUpdate;

    return response.json(userUpdate);
};


const delet = (request, response) => {
    const { id } = request.params;
    
    const userIndex = users.findIndex(u => u.id === String(id));
    
    if (userIndex < 0) {
        return response.status(404).json({ error: "Usuário não encontrado!" });
    }

    users.splice(userIndex, 1);
    
    return response.send("Usuário removido!");
};


module.exports = {
    list,
    read,
    create,
    update,
    delet,
    userDatabase: users
};