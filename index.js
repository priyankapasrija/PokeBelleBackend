require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const gameRoutes = require("./routes/gameRoutes"); // This line is correct

// Middleware for CORS and parsing JSON and URL-encoded data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use your game routes
app.use(gameRoutes); // This line is using the routes

// Import your card controllers
const {
  getAllPokemons,
  getSinglePokemon,
  getPokemonById,
  getPokeInfo,
} = require("./controllers/cardControllers"); // Adjust the path if necessary

// Define your routes
app.get("/", (req, res) =>
  res.send(
    '<p>Welcome to the Pokemon API! Click here to reach there <a href="/pokemon">pokemon</a>'
  )
);
app.route("/pokemon").get(getAllPokemons);
app.route("/pokemon/:pokeName").get(getSinglePokemon);
app.route("/pokemon/withid/:id").get(getPokemonById);
app.route("/pokemon/:pokeName/:info").get(getPokeInfo);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
