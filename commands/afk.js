const { EmbedBuilder } = require('discord.js');

module.exports = {
  description: 'Set or remove AFK status',
  cooldown: "10s",
  category: "userService",
  run: async ({ message, args, db }) => {
      let reason = args.join(' ');
      if (reason.length < 1) reason = 'AFK';

      const member = message.member;
      if (member) {
        member.reason = reason;
        member.afkDuration = Date.now()
        await db.set(`afk_${member.id}_${message.guild.id}`, JSON.stringify(member));
        const embed = new EmbedBuilder()
          .setColor('#0099ff')
          .setDescription(`**You are now AFK.\nReason**: ${reason}`);

        message.reply({ embeds: [embed] });
    }
  },
};