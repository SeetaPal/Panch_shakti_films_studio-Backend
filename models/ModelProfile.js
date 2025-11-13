const mongoose = require("mongoose");

const modelProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
  category: { type: String }, // e.g. Actor, Model, Director
  gender: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("ModelProfile", modelProfileSchema);
