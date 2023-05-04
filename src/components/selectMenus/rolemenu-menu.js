const { execute } = require("../../events/client/interactionCreate");

module.exports = {
  data: {
    name: `rolemenu-menu`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `${interaction.values[0]}`,
      ephemeral: true,
    });
  },
};
