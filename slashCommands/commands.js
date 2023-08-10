const { EmbedBuilder } = require('discord.js');

module.exports = {
  description: 'Display a panel with available commands',
  category: "userService",
  run: ({ interaction, client, prefix }) => {
    const commandsEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Commands Panel')
      .setDescription('Here are the available commands:')
    
   const tipEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Tip')
      .setDescription(`Use \`${prefix}commands\` for text commands panel`)
      .setFooter({text: 'Mirage Bot', iconURL: client.user.avatarURL()});
    
    const categories = new Map();

    client.slashCommands.forEach((command) => {
      const category = command.category || 'Uncategorized';
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category).push(command);
    });

    categories.forEach((commands, category) => {
      const commandList = commands.map((command) => {
        return `\`/${command.name}\`: ${command.description}`;
      });

      if (commandList.length > 0) {
        commandsEmbed.addFields({name: `**${category}**`, value: commandList.join('\n')});
      }
    });
    
    interaction.reply({ embeds: [commandsEmbed, tipEmbed]});
  },
};
