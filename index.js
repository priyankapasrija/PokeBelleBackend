const express = require("express");
const app = express();

const {
  getAllPokemons,
  getSinglePokemon,
  getPokemonById,
  getPokeInfo,
} = require("./controllers/cardControllers");
const cors = require("cors");

const port = process.env.PORT || 8000;
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.send(
    '<p>Welcome to the Pokemon API! Click here to reach there <a href="/pokemon">pokemon</a>'
  )
);

app.route("/pokemon").get(getAllPokemons);
app.route("/pokemon/:pokeName").get(getSinglePokemon);
app.route("/pokemon/withid/:id").get(getPokemonById);
app.route("/pokemon/:pokeName/:info").get(getPokeInfo);

app.listen(port, () => console.log(`Welcome ${port}`));
