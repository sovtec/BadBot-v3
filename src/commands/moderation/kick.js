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
    .setName("kick")
    .setDescription("Kick member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Member to kick")
        .setRequired(true)
    )

    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for kick")
    ),

  async execute(interaction, client) {
    // sjekker at brukeren som brukte commanden har permissions
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)
    )
      return await interaction.reply(config.noPermissionMessage);

    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided";

    await user
      .send({
        content: `You have been kicked from ${interaction.guild.name}\n\`Reason:\` ${reason}`,
      })

    const embed = new EmbedBuilder()
      .setColor("#4b6ce6")
      .setTitle(`:no_entry_sign: Kicked`)
      .setTimestamp(Date.now())
      .setDescription(
        `\`${user.username}\` **has been kicked!**\n\n\`Reason:\` ${reason}`
      );

    await member.kick(reason).catch(console.error);

    await interaction.reply({ embeds: [embed] });
  },
};
