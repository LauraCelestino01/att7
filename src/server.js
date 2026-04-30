const express = require("express");

const { PORT } = require("./config/env.js");
const movieRoutes = require("./routes/movies.routes.js");
const userRoutes = require("./routes/users.routes.js");
const authenticateRoutes = require("./routes/authenticate.routes.js");


const app = express();


app.use(express.json());
app.use(movieRoutes);
app.use(userRoutes);
app.use(authenticateRoutes);

app.listen(PORT, () => {
    console.log(`API is running on PORT: ${PORT}`);
});
