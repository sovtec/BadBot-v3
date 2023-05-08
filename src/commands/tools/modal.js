const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  PermissionsBitField,
} = require("discord.js");

const fs = require("fs");
const yaml = require("js-yaml");
const configFile = fs.readFileSync("./config.yml", "utf8");
const config = yaml.load(configFile);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modaltest")
    .setDescription("Returns modal used for testing"),
  async execute(interaction, client) {
    // sjekker at brukeren som brukte commanden har permissions ( alle kan bruke denne )
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply(config.noPermissionMessage);
    const modal = new ModalBuilder()
      .setCustomId("testing")
      .setTitle("Testing modal");

    const textInput1 = new TextInputBuilder()
      .setCustomId("testingInput1")
      .setLabel("What's your age?")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const textInput2 = new TextInputBuilder()
      .setCustomId("testingInput2")
      .setLabel("Do you own a toaster?")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    modal.addComponents(new ActionRowBuilder().addComponents(textInput1));
    modal.addComponents(new ActionRowBuilder().addComponents(textInput2));

    await interaction.showModal(modal);
  },
};
