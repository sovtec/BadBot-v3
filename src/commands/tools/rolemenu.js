const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rolemenu")
    .setDescription("Sends rolemenu"),
  async execute(interaction, client) {
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
