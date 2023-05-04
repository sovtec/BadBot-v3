require("dotenv").config();

const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.selectMenus = new Collection();
client.color = 0x0099ff;
const buttons = new Collection();

//henter alle mapper fra src/functions
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  //henter filer fra den mappen (funtions) som slutter med .js
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  //Passing(sender) client til fil
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.buttons = buttons;
client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
