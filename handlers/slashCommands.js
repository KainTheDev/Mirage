module.exports = ({client, fs}) => {
  // Load all command files
  const commandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const slashCommand = require(`../slashCommands/${file}`);
    slashCommand.name = file.split(".js")[0]
    // Add the command to the commands map
    client.slashCommands.set(slashCommand.name, slashCommand);

    // You can also set aliases for the command if desired
    // Example: command.aliases = ['alias1', 'alias2'];

    // Logging the loaded command
    console.log(`Command loaded: ${slashCommand.name}`);
  }
}