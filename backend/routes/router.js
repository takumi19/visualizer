const express = require("express");
const router = express.Router();
const { generateData } = require("../logic/random_data_generator");

router.get("/randomdata", generateData);

module.exports = router;
