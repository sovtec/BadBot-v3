const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");

const configFile = fs.readFileSync("./config.yml", "utf8");
const config = yaml.load(configFile);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("staffhelp")
    .setDescription("Staffhelp"),
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.KickMembers
      )
    )
      return await interaction.reply(config.noPermissionMessage);
    const embedStaffHelp = new EmbedBuilder()
      .setTitle(`Staff Help Menu`)
      //.setDescription(`${config.staffhelp.description}`)
      .setColor(client.color)
      .setTimestamp(Date.now())
      .setFooter({
        text: "BadBot",
        iconURL: "https://i.imgur.com/xxemNry.png",
      });
    config.staffhelp.fields.forEach((field) => {
      embedStaffHelp.addFields({
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
      embeds: [embedStaffHelp],
      ephemeral: true,
    });
  },
};
