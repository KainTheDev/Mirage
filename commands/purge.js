const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const ms = require("ms")
module.exports = {
  description: 'Bulk delete messages in the channel',
  cooldown: "5 seconds",
  category: "ServerManagement",
  run: async ({ client, message, args }) => {
    // Check if the user has the 'MANAGE_MESSAGES' permission
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      const embed = new EmbedBuilder()
        .setColor('#ff0000') // Set embed color to red
        .setDescription('You do not have permission to use this command.');

      return message.channel.send({ embeds: [embed] });
    }

    // Parse the amount argument
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount < 1 || amount > 100) {
      const embed = new EmbedBuilder()
        .setColor('#ff0000') // Set embed color to red
        .setDescription('Please provide a valid number of messages to delete (1-100).')
      .then((msg) => {
        setTimeout(() => {
          if(message.channel.messages.cache.get(msg.id)) {
            msg.delete()
          }
        }, ms("10 sec"))
      }).catch(error => console.error)

      return message.channel.send({ embeds: [embed] });
    }

    try {
      const messages = []
      const fetchedMessages = await message.channel.messages.fetch({ limit: amount+1 })
        fetchedMessages.map(m => {
        if(m) {
          const SPECIFIC_USER = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(member => member.name === args[1])
          if(SPECIFIC_USER) {
            if(m.author.id === SPECIFIC_USER.id) {
              return messages.push(m)
            }
          }
            return messages.push(m)
        }
      })
      await message.channel.bulkDelete(messages, true);

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setDescription(`**Successfully deleted ${amount} messages.**`);

      await message.channel.send({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
          if(message.channel.messages.cache.get(msg.id)) {
            msg.delete()
          }
        }, ms("10 sec"))
      }).catch(error => console.error)
    } catch (error) {
      console.error('Error purging messages:', error);
      const embed = new EmbedBuilder()
        .setColor('#ff0000') // Set embed color to red
        .setDescription('An error occurred while purging messages. Please try again later.')
      .then((msg) => {
        setTimeout(() => {
          if(message.channel.messages.cache.get(msg.id)) {
            msg.delete()
          }
        }, ms("10 sec"))
      }).catch(error => console.error)

      await message.channel.send({ embeds: [embed] });
    }
  },
};
