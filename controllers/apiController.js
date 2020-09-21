const Item = require("../models/Item");
const Category = require("../models/Category");
module.exports = {
  homePage: async (req, res) => {
    try {
      const item = await Item.find()
        .select("_id name price rate image categoryId")
        .populate({ path: "categoryId", select: "name" });
      const category = await Category.find().select("_id name");
      res.status(200).json({ item, category });
    } catch (error) {
      res.status(500).json("Internal Error 500");
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findById(id)
        .select("_id name price rate image size categoryId")
        .populate({ path: "categoryId", select: "name" });
      const recommend = await Item.find({ categoryId: item.categoryId })
        .select("_id name price rate image categoryId")
        .populate({ path: "categoryId", select: "name" });

      res.status(200).json({ item, recommend });
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  },
};
