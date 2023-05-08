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

    const channelId = "1102726992052359178";
    const customChannel = interaction.guild.channels.cache.get(channelId);

    const channelEmbed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("<:enchanted_apple:1100286431802425344> New member!")
      .setDescription(
        `${member} has joined ${interaction.guild.name}\n\n**Welcome!**\nYou are the ${interaction.guild.memberCount}th member`
      )
      .setThumbnail(
        member.user.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setTimestamp(Date.now());

    // Send the embed as a DM

    customChannel.send({ embeds: [channelEmbed] });

    interaction.user.send({ embeds: [embed] }).catch((err) => {
      return;
    });
  },
};
