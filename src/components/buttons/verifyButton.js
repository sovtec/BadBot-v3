const fs = require("fs");
const wait = require("node:timers/promises").setTimeout;
const yaml = require("js-yaml");
const configFile = fs.readFileSync("./config.yml", "utf8");
const config = yaml.load(configFile);
const { EmbedBuilder } = require("discord.js");

module.exports = {
  customId: "verify-button",
  async execute(interaction, client) {
    const role = interaction.guild.roles.cache.find(
      (r) => r.name === "Verified"
    );

    const member = interaction.member;

    if (member.roles.cache.has(role.id)) {
      return await interaction.reply({
        content: config.verifyButton.alreadyVerifiedMessage,
        ephemeral: true,
      });
    }

    member.roles.add(role);
    await interaction.reply({
      content: config.verifyButton.successMessage,
      ephemeral: true,
    });

    const embed = new EmbedBuilder()
      .setColor(config.verifyButton.dmEmbed.color)
      .setTitle(config.verifyButton.dmEmbed.title)
      .setTimestamp(Date.now())
      .setThumbnail(config.verifyButton.dmEmbed.thumbnail)
      .setDescription(`${config.verifyButton.dmEmbed.description}`);

    // Send the embed as a DM
    interaction.user.send({ embeds: [embed] }).catch((err) => {
      return;
    });
  },
};
