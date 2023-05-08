const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
  PermissionsBitField,
} = require("discord.js");

const fs = require("fs");
const yaml = require("js-yaml");
const configFile = fs.readFileSync("./config.yml", "utf8");
const config = yaml.load(configFile);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("faq")
    .setDescription("Sends FAQ menu"),
  async execute(interaction, client) {
    // sjekker at brukeren som brukte commanden har permissions
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply(config.noPermissionMessage);

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
          label: `How do I appeal a ban?`,
          value: `You can go to etcetcetc to appeal`,
        })
      );
    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
