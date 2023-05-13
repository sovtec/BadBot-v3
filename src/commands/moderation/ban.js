const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");

const fs = require("fs");
const yaml = require("js-yaml");
const configFile = fs.readFileSync("./config.yml", "utf8");
const config = yaml.load(configFile);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban member")
    .addUserOption((option) =>
      option.setName("target").setDescription("Member to ban").setRequired(true)
    )

    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for ban")
    ),

  async execute(interaction, client) {
    // sjekker at brukeren som brukte commanden har permissions
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return await interaction.reply(config.noPermissionMessage);

    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided";

    await user.send({
      content: `You have been banned from ${interaction.guild.name}\n\`Reason:\` ${reason}`,
    });

    const embed = new EmbedBuilder()
      .setColor("#4b6ce6")
      .setTitle(`:anger: Banned`)
      .setTimestamp(Date.now())
      .setFooter({
        text: "BadBot",
        iconURL: "https://i.imgur.com/xxemNry.png",
      })
      .setDescription(
        `${user} **has been banned!**\n\n\`Reason:\` ${reason}`
      );

    await member
      .ban({
        deleteMessageSeconds: 1200,
        reason: reason,
      })
      .catch(console.error);

    await interaction.reply({ embeds: [embed] });
  },
};
