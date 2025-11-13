
const ModelProfile = require("../models/ModelProfile");

exports.createModel = async (req, res) => {
  try {
    const { name, age, city, gender, category, image } = req.body;

    if (!name || !age || !city || !gender || !category) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newModel = new ModelProfile({
      name,
      age,
      city,
      gender,
      category,
      image,
    });

    await newModel.save();

    res.status(201).json({
      success: true,
      message: "Model profile created successfully",
      data: newModel,
    });
  } catch (error) {
    console.error("❌ Error creating model:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get models
exports.getModels = async (req, res) => {
  try {
    const { search, city, gender, category, page = 1, limit = 6 } = req.query;
    const filter = {};

    if (search) filter.name = { $regex: search, $options: "i" };
    if (city) filter.city = city;
    if (gender) filter.gender = gender;
    if (category) filter.category = category;

    const skip = (page - 1) * limit;

    const total = await ModelProfile.countDocuments(filter);
    const models = await ModelProfile.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ name: 1 });

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      models,
    });
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};