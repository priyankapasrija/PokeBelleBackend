// gameRoutes.js

const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameControllers");

// Routes using the gameController functions
router.post("/game/save", gameController.saveGame);
router.get("/game/leaderboard", gameController.getLeaderboard);

module.exports = router;
