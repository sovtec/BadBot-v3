const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("faq")
    .setDescription("Sends FAQ menu"),
  async execute(interaction, client) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId(`faq-menu`)
      .setMaxValues(1)
      .setMaxValues(1)
      .setPlaceholder("Frequently Asked Questions")
      .setOptions(
        new StringSelectMenuOptionBuilder({
          label: `How do i get the linked role?`,
          value: `To get the linked role you need to use the command \`/link\` in-game`,
        }),
        new StringSelectMenuOptionBuilder({
          label: `Where to I appeal?`,
          value: `You can go to etcetcetc to appeal`,
        })
      );
    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
