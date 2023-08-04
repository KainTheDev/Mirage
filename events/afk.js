const { EmbedBuilder } = require('discord.js');
const ms = require("ms")
module.exports = ({ client, db }) => {
  client.on('messageCreate', async (message) => {
    if(!message.guild) return;
    if(message.guild.name !== "CLIMAX") return;
    if (message.author.bot) return;

    const memberIsInDatabase = await db.get(`afk_${message.member.id}_${message.guild.id}`);
    if (memberIsInDatabase) {
      const member = JSON.parse(memberIsInDatabase);
      let afkDuration = Date.now() - member.afkDuration;

      const timeUnits = [
        { unit: 'week', duration: 1000 * 60 * 60 * 24 * 7 },
        { unit: 'day', duration: 1000 * 60 * 60 * 24 },
        { unit: 'hour', duration: 1000 * 60 * 60 },
        { unit: 'minute', duration: 1000 * 60 },
        { unit: 'second', duration: 1000 },
      ];

      let durationText = '';
      for (const unit of timeUnits) {
        const duration = Math.floor(afkDuration / unit.duration);
        if (duration > 0) {
          durationText = `${duration} ${unit.unit}(s)`;
          break;
        }
      }

      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setDescription(`**You are no longer AFK.**\nAFK duration: \`${durationText}\``);

      message.reply({ embeds: [embed] });
      await db.delete(`afk_${message.member.id}_${message.guild.id}`);
    }

    const mentionedMemberIsInDatabase = await db.get(`afk_${message.mentions.members.first()?.id}_${message.guild.id}`);
    if (mentionedMemberIsInDatabase) {
      const mentionedMember = JSON.parse(mentionedMemberIsInDatabase);
      const afkReason = mentionedMember.reason;
      const afkTimestamp = Math.floor(mentionedMember.afkDuration / 1000);
      const embed = new EmbedBuilder() 
        .setColor('#FF0000')
        .setDescription(`**${message.mentions.members.first().username} is AFK <t:${afkTimestamp}:R>.\nReason**: ${afkReason}.`)

      message.reply({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
          if(message.channel.messages.cache.get(msg.id)) {
            msg.delete()
          }
        }, ms("10 sec"))
      }).catch(error => console.error(error))
    }
  });
};
