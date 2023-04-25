const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");

const configFile = fs.readFileSync("./config.yml", "utf8");
const config = yaml.load(configFile);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Open BadBot's help"),
  async execute(interaction) {
    const embedHelp = new EmbedBuilder()
      .setTitle("BadBotv3")
      .setDescription(`${config.helpCommand.description}`)
      .setThumbnail(config.helpCommand.thumbnail_img)
      .setColor(config.helpCommand.color)
      .setTimestamp(Date.now())
      .setFooter({
        text: config.helpCommand.title,
        iconURL: config.helpCommand.thumbnail_img,
      });
    await interaction.reply({
      embeds: [embedHelp],
      ephemeral: true,
    });
  },
};
