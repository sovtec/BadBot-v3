const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  PermissionsBitField,
} = require("discord.js");

const fs = require("fs");
const yaml = require("js-yaml");
const configFile = fs.readFileSync("./config.yml", "utf8");
const config = yaml.load(configFile);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rolemenu")
    .setDescription("Sends rolemenu"),
  async execute(interaction, client) {
    // sjekker at brukeren som brukte commanden har permissions ( alle kan bruke denne )
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply(config.noPermissionMessage);

    const menu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(`rolemenu-menu`)
        .setMinValues(1)
        .setMaxValues(2)
        .setPlaceholder(`nada`)
        .addOptions(
          {
            label: `Option 1`,
            description: "Description?",
            value: "OPTION 1",
          },
          {
            label: `Option 2`,
            description: "Description?",
            value: "OPTION 2",
          }
        )
    );
    await interaction.reply({ content: "this is derp", components: [menu] });
  },
};
