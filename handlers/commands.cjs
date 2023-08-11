let chalk = import("chalk");
const { table } = require("table"); // Import the 'table' package
const Settings = require("./settings.json")
module.exports = async ({ client, fs }) => {
  chalk = new (await chalk).Chalk();

  // Load all command files
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  // Initialize a data array for the table
  const data = [
    [chalk[Settings.chalk.titleColor](chalk.bold('Command')), chalk[Settings.chalk.titleColor](chalk.bold('Description'))]
  ];

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    command.name = file.split(".js")[0];

    // Add the command to the commands map
    client.commands.set(command.name, command);

    // Push the command name and description to the data array
    data.push([chalk[Settings.chalk.commandNameColor](command.name), chalk[Settings.chalk.descriptionColor](command.description) || chalk.red('No description')]);
  }

  // Create options for table formatting
  const options = {
    columns: {
      0: { alignment: 'left', width: 20 }, // Adjust column widths and alignments as needed
      1: { alignment: 'left', width: 50 },
    },
  };

  // Generate the formatted table
  const formattedTable = table(data, options);

  // Print the formatted table to the console
  console.log(formattedTable);
};
