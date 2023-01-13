module.exports = {
  data: {
    name: `helloButton`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `**Hi!**`,
    });
  },
};
