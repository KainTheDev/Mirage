const { EmbedBuilder } = require('discord.js');

module.exports = {
  description: "Display a panel with available commands",
  cooldown: "10s",
  category: "userService",
  run: ({ message, prefix, client }) => {
    // Your commands panel command code
    const commandsEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Commands Panel')
      .setDescription('Here are the available commands:')
      .setFooter({text: 'Mirage Bot', iconURL: client.user.avatarURL()});

    const tipEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Tip')
      .setDescription(`Use \`/commands\` for slash commands panel`)
      .setFooter({text: 'Mirage Bot', iconURL: client.user.avatarURL()});
    
    const categories = new Map();

    client.commands.forEach((command) => {
      const category = command.category || 'Uncategorized';
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category).push(command);
    });

    categories.forEach((commands, category) => {
      const commandList = commands.map((command) => {
        return `\`${prefix}${command.name}\`: ${command.description}`;
      });

      if (commandList.length > 0) {
        commandsEmbed.addFields({name: `**${category}**`, value: commandList.join('\n')});
      }
    });

    message.channel.send({ embeds: [commandsEmbed, tipEmbed] });
  },
};
