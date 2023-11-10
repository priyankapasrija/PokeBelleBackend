require("dotenv").config();
console.log(process.env.MONGODB_URI); // Add this line for testing
const axios = require("axios");
const Pokemon = require("../models/pokemonModel.js");

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(({ connection }) =>
    console.log(`Connected to MongoDB @ ${connection.host}`)
  )
  .catch((err) => console.log(err));

const importData = async () => {
  try {
    // Fetch the list of Pokémon
    const listResponse = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100"
    );
    const pokemons = listResponse.data.results;

    // Fetch detailed data for each Pokémon
    const detailedDataPromises = pokemons.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const detailedResponses = await Promise.all(detailedDataPromises);

    // Transform the data to match the schema
    const formattedData = detailedResponses.map((response) => {
      const pokemonData = response.data;
      return {
        name: pokemonData.name,
        types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
        stats: {
          hp: pokemonData.stats.find((stat) => stat.stat.name === "hp")
            .base_stat,
          attack: pokemonData.stats.find((stat) => stat.stat.name === "attack")
            .base_stat,
          defense: pokemonData.stats.find(
            (stat) => stat.stat.name === "defense"
          ).base_stat,
          specialAttack: pokemonData.stats.find(
            (stat) => stat.stat.name === "special-attack"
          ).base_stat,
          specialDefense: pokemonData.stats.find(
            (stat) => stat.stat.name === "special-defense"
          ).base_stat,
          speed: pokemonData.stats.find((stat) => stat.stat.name === "speed")
            .base_stat,
        },
      };
    });

    // Insert the data into the database
    await Pokemon.insertMany(formattedData);
    console.log("Data imported successfully");
  } catch (error) {
    console.error("Error importing data:", error);
  } finally {
    mongoose.disconnect();
  }
};

importData();
