const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  types: [
    {
      type: String,
    },
  ],
  stats: {
    hp: Number,
    attack: Number,
    defense: Number,
    specialAttack: Number,
    specialDefense: Number,
    speed: Number,
  },
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
