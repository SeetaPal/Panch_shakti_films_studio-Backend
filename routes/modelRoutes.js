// const express = require("express");
// const router = express.Router();
// const {createModel , getModels } = require("../controllers/modelController");


// // ✅ POST new model
// router.post("/", createModel);
// router.get("/", getModels); // /api/models?city=Mumbai&search=Divya&page=1

// module.exports = router;






const express = require("express");
const router = express.Router();
const { createModel, getModels } = require("../controllers/modelController");

router.post("/", createModel);  // POST - Create Model
router.get("/", getModels);     // GET - List Models

module.exports = router;
