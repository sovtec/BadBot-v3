const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");

const configFile = fs.readFileSync("./config.yml", "utf8");
const config = yaml.load(configFile);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Open Bot info"),
  async execute(interaction, client) {
    const embedAbout = new EmbedBuilder()
      .setTitle(`${config.aboutEmbed.title}`)
      .setDescription(`${config.aboutEmbed.description}`)
      .setThumbnail("https://i.imgur.com/xxemNry.png")
      .setColor(client.color)
      .setTimestamp(Date.now())
      .setFooter({
        text: "BadBot",
        iconURL: "https://i.imgur.com/xxemNry.png",
      });
    config.aboutEmbed.fields.forEach((field) => {
      embedAbout.addFields({
        name: field.name,
        value: field.value,
        inline: field.inline,
      });
    });
    /* .addFields({
        name: "\u200B",
        value: "Use /help for help",
        inline: true,
      }); */
    await interaction.reply({
      embeds: [embedAbout],
      ephemeral: true,
    });
  },
};
