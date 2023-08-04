module.exports = ({client, prefix, db}) => {
  client.on('interactionCreate', async (interaction) => {
    if(!interaction.guild) return;
    if(interaction.guild.name !== "CLIMAX") return;
    if (!interaction.isCommand()) return;
    // Get the command from the client's command collection
    const slashCommand = client.slashCommands.get(interaction.commandName);

    // If the command doesn't exist, return
    if (!slashCommand) return;
    try {
      // Execute the command
      await slashCommand.run({ client, interaction, db, prefix });
    } catch (error) {
      console.error(`Error executing command '${interaction.commandName}':`, error);
    }
  });
};