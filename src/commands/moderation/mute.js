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
    .setName("mute")
    .setDescription("Mute member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Member to mute")
        .setRequired(true)
    )

    .addIntegerOption((option) =>
      option.setName("time").setDescription("Duration").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for mute")
    ),

  async execute(interaction, client) {
    // sjekker at brukeren som brukte commanden har permissions
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      ) // MuteMembers might be the wrong flag
    )
      return await interaction.reply(config.noPermissionMessage);

    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    const time = interaction.options.getInteger("time");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided";

    await user.send({
      content: `**You have been muted from ${interaction.guild.name}**\n\n\`Duration:\`${time} min\`\nReason:\` ${reason}`,
    });

    await member.timeout(time * 60 * 1000, reason).catch(console.error);

    const embed = new EmbedBuilder()
      .setColor("#4b6ce6")
      .setTitle(`:warning: Take a break!`)
      .setTimestamp(Date.now())
      .setFooter({
        text: "BadBot",
        iconURL: "https://i.imgur.com/xxemNry.png",
      })
      .setDescription(
        `${user} **has been muted**\n\n\`Reason:\` ${reason}\n\`Duration:\` ${time} min`
      );

    await interaction.reply({ embeds: [embed] });
  },
};
