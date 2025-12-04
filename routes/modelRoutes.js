
const express = require("express");
const router = express.Router();
const { createModel,getAllModels, getModels } = require("../controllers/modelController");

router.post("/", createModel);  // POST - Create Model
router.get("/", getModels);     // GET - List Models

router.get("/allrecord", getAllModels);  


module.exports = router;
