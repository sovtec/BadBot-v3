const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Open Bot info"),
  async execute(interaction, client) {
    const embedAbout = new EmbedBuilder()
      .setTitle("BadBot-v3")
      .setDescription('**A "nice" Discord bot created by __hrdu__**')
      .setThumbnail("https://i.imgur.com/xxemNry.png")
      .setColor(client.color)
      .setTimestamp(Date.now())
      .setFooter({
        text: "BadBot",
        iconURL: "https://i.imgur.com/xxemNry.png",
      })
      .addFields(
        {
          name: "Features:",
          value:
            "__**COMMING SOON**__\nClear up to 99 messages\nView client ping\nCheck server info\nCheck user info",
        },
        {
          name: "Source:",
          value: "*__https://github.com/sovtec/BadBot-v3__*",
        },
        /* { name: "\u200B", value: "\u200B" }, */
        {
          name: "Commands:",
          value: "/about\n/ping",
          inline: true,
        }
      );
    await interaction.reply({
      embeds: [embedAbout],
    });
  },
};
