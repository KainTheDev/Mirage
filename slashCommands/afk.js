const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  description: 'Set or remove AFK status',
  options: [
    {
      name: 'reason',
      type: ApplicationCommandOptionType.String,
      description: 'The reason for being AFK',
      required: false,
    },
  ],
  category: "userService",
  run: async ({ interaction, db }) => {
    const reason = interaction.options.getString('reason') || 'AFK';
    const member = interaction.member;

    if (member) {
      member.reason = reason;
      member.afkDuration = Date.now();
      await db.set(`afk_${member.id}_${interaction.guild.id}`, JSON.stringify(member));
      // You might want to handle the database part as per your specific database setup
      // For this example, we'll assume you have a db object that can set AFK data.
      // Replace 'db.set' with your actual database function.
      // await db.set(`afk_${member.id}`, JSON.stringify(member));

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setDescription(`**You are now AFK.\nReason**: ${reason}`);

      interaction.reply({ embeds: [embed] });
    }
  },
};
