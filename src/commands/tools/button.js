const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hellobtn")
    .setDescription("Return hello button"),
  async execute(interaction, client) {
    const button = new ButtonBuilder()
      .setCustomId(`helloButton`)
      .setLabel(`Click me to say hi!`)
      .setStyle(ButtonStyle.Primary);

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
