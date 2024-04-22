const express = require("express");

const movieController = require("../controllers/movie");

const router = express.Router();

router.get("/trending", movieController.getTrendingMoive);

router.get("/top-rate", movieController.getTopRatedMoive);

router.get("/discover", movieController.getGenre);

router.post("/video", movieController.postTrailerMoive);

router.post("/search", movieController.postSearch);

module.exports = router;
