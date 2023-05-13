const { SlashCommandBuilder } = require("discord.js");
const {
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const fs = require("fs");
const yaml = require("js-yaml");
const configFile = fs.readFileSync("./config.yml", "utf8");
const config = yaml.load(configFile);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Send verification message"),
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply(config.noPermissionMessage);

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("verify-button")
        .setEmoji("<:mc_accept:1100288309240012870>")
        .setLabel("Verify")
        .setStyle(ButtonStyle.Success)
    );

    const embedPre = new EmbedBuilder()
      .setColor("#4b6ce6")
      .setTitle(config.messageSent.title);

    const embed = new EmbedBuilder()
      .setColor("#4b6ce6")
      .setTitle("Server Verification")
      .setThumbnail("https://i.imgur.com/sYQV4sS.png")
      .setDescription(
        "Before you can view the rest of the server, you must prove that you are not a bot account.\nTo do so, simply click the button attached to this message"
      );

    await interaction.reply({
      embeds: [embedPre],
      ephemeral: true,
    });

    interaction.channel.send({ embeds: [embed], components: [button] });
  },
};
