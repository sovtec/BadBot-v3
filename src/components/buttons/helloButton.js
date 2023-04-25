const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: {
    name: `helloButton`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `**Hi!**`,
      ephemeral: true,
    });
    await wait(2000);
    await interaction.deleteReply();
  },
};
