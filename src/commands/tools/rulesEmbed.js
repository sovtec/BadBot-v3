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
  data: new SlashCommandBuilder().setName("rules").setDescription("Send rules"),
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply(config.noPermissionMessage);

    const embedPre = new EmbedBuilder()
      .setColor("#4b6ce6")
      .setTitle(config.messageSent.title);

    const embedRules = new EmbedBuilder()
      .setTitle(`Rules <:mc_swords:1100288310502494239>`)
      .setDescription(`${config.rulesEmbed.rulesDescription}`)
      .setThumbnail("https://i.imgur.com/sYQV4sS.png")
      .setColor(client.color)
      .setTimestamp(Date.now())
      .setFooter({
        text: "BadBot",
        iconURL: "https://i.imgur.com/xxemNry.png",
      })
      .addFields({
        name: ":warning: __Staff__",
        value:
          "Staff will Mute/Kick/Ban per discretion. If you feel mistreated open a ticket and we will resolve the issue.",
        inline: true,
      })
      .addFields({
        name: ":question: __Info__",
        value:
          "All Channels will have pinned messages explaining what they are there for and how everything works. If you don't understand something, feel free to ask!",
        inline: true,
      });

    await interaction.reply({
      embeds: [embedPre],
      ephemeral: true,
    });

    interaction.channel.send({
      embeds: [embedRules],
      ephemeral: false,
    });
  },
};
