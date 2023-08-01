const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  description: 'Bulk delete messages in the channel',
  options: [
    {
      name: 'amount',
      type: ApplicationCommandOptionType.Integer,
      description: 'Number of messages to delete (1-100)',
      required: true,
      min_value: 1,
      max_value: 100,
    },
  ],
  category: "ServerManagement",
  run: async ({ interaction }) => {
    // Defer the reply to the interaction
    await interaction.deferReply({ ephemeral: true });

    // Check if the user has the 'MANAGE_MESSAGES' permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.followUp({
        content: 'You do not have permission to use this command.',
        ephemeral: true,
      });
    }

    const amount = interaction.options.getInteger('amount');

    try {
      const fetchedMessages = await interaction.channel.messages.fetch({ limit: amount });
      await interaction.channel.bulkDelete(fetchedMessages, true);

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setDescription(`**Successfully deleted ${amount} messages.**`);

      await interaction.followUp({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Error purging messages:', error);
      await interaction.followUp({
        content: 'An error occurred while purging messages. Please try again later.',
        ephemeral: true,
      });
    }
  },
};
