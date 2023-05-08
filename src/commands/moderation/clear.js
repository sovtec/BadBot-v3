const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

const fs = require("fs");
const yaml = require("js-yaml");
const configFile = fs.readFileSync("./config.yml", "utf8");
const config = yaml.load(configFile);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("purge up to 99 messages.")
    .setDMPermission(false)
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("Number of messages to purge")
    ),
  async execute(interaction) {
    // sjekker at brukeren som brukte commanden har permissions ( alle kan bruke denne )
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply(config.noPermissionMessage);

    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 99) {
      return interaction.reply({
        content: "You need to input a number between 1 and 99.",
        ephemeral: true,
      });
    }
    await interaction.channel.bulkDelete(amount, true).catch((error) => {
      console.error(error);
      interaction.reply({
        content: "There was an error trying to purge messages in this channel!",
        ephemeral: true,
      });
    });

    await interaction.reply({
      content: `Successfully purged \`${amount}\` messages.`,
      ephemeral: true,
    });
  },
};
