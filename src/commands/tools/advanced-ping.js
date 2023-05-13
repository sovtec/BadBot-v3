const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
  embedLength,
} = require("discord.js");

const fs = require("fs");
const yaml = require("js-yaml");
const configFile = fs.readFileSync("./config.yml", "utf8");
const config = yaml.load(configFile);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping-advanced")
    .setDescription("Return my ms"),
  async execute(interaction, client) {
    // sjekker at brukeren som brukte commanden har permissions ( alle kan bruke denne )
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.SendMessages
      )
    )
      return await interaction.reply(config.noPermissionMessage);

    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const advancedPingEmbed = new EmbedBuilder()
      .setTitle(`Advanced-Ping`)
      .setDescription(
        `API Latency: ${client.ws.ping}\nClient Ping: ${
          message.createdTimestamp - interaction.createdTimestamp
        }`
      )
      .setColor(client.color)
      .setTimestamp(Date.now())
      .setFooter({
        text: "BadBot",
        iconURL: "https://i.imgur.com/xxemNry.png",
      });

    await interaction.editReply({
      embeds: [advancedPingEmbed],
    });
  },
};
