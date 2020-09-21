const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  rate: {
    type: Number,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  size: Array,
  categoryId: {
    _id: {
      type: ObjectId,
      ref: "Category",
    },
    name: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Item", itemSchema);
