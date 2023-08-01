module.exports = ({client, fs}) => {
  // Load all command files
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    command.name = file.split(".js")[0]
    // Add the command to the commands map
    client.commands.set(command.name, command);

    // You can also set aliases for the command if desired
    // Example: command.aliases = ['alias1', 'alias2'];

    // Logging the loaded command
    console.log(`Command loaded: ${command.name}`);
  }
}