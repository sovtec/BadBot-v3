module.exports = {
  data: {
    name: "testing",
  },
  async execute(interaction, client) {
    const input1Value = interaction.fields.getTextInputValue("testingInput1");
    const input2Value = interaction.fields.getTextInputValue("testingInput2");

    await interaction.reply({
      content: `\`Age:\` ${input1Value}\n\`Has toaster:\` ${input2Value}`,
    });
  },
};
