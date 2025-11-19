// const mongoose = require("mongoose");

// const modelProfileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   city: { type: String, required: true },
//   category: { type: String }, // e.g. Actor, Model, Director
//   gender: { type: String },
//   image: { type: String },
// });

// module.exports = mongoose.model("ModelProfile", modelProfileSchema);


//
const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  city: { type: String },
  gender: { type: String, 
  enum: ["Male", "Female", "Other"] }, // ✅ fixed
  from: { type: String },        // Naya field
  currentCity: { type: String }, // Naya field
  height: { type: Number },
  weight: { type: Number },
  bust: { type: Number },
  waist: { type: Number },
  hips: { type: Number },
  eyes: { type: String },
  hairColor: { type: String },
  hairLength: { type: String },
  shoes: { type: Number },
  ethnicGroup: { type: String },
  category: { type: String },    // Model / Actor / etc
  image: { type: String },
});

module.exports = mongoose.model("ModelProfile", modelSchema);
