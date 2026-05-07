const mongoose = require("mongoose");

const { MONGO_DB_URI } = require("./env.js")

mongoose.connect(
    MONGO_DB_URI,
   {
    dbName: "telos",
   },
   {
    autoIndex: true,
   },
).then(() => {
    console.log("Database connect");
}).catch((erro) => {
    console.log("Failed to connect", erro);
});