const ms = require('ms');
const {EmbedBuilder} = require("discord.js")
module.exports = ({ client, prefix, db }) => {
  client.on('messageCreate', async (message) => {
    if(!message.guild) return;
    if(message.guild.name !== "CLIMAX") return;
    // Check if the message author is a bot
    if (message.author.bot) return;

    // Check if the message starts with the prefix
    if (!message.content.startsWith(prefix)) return;

    // Split the message content into command and arguments
    const [commandName, ...commandArgs] = message.content.slice(prefix.length).trim().split(/\s+/);

    // Get the command from the client's command collection
    const command = client.commands.get(commandName);
    // If the command doesn't exist, return
    if (!command) return;

    // Get the user's cooldown data from the database
    const userCooldownData = await db.get(`${message.author.id}_${commandName}_cooldown`);
    const cooldownData = userCooldownData ? JSON.parse(userCooldownData) : { timestamp: 0, duration: 0 };

    // Check if the command is on cooldown for this user
    if (cooldownData.timestamp + cooldownData.duration > Date.now()) {
      const timeLeft = cooldownData.timestamp + cooldownData.duration - Date.now();
      const embed = new EmbedBuilder()
        .setColor('#FF0000') // Red color
        .setDescription(`Please wait \`${ms(timeLeft).replace("s", " second(s)")}\` before using the command again.`);
      
      message.reply({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
          if(message.channel.messages.cache.get(msg.id)) {
            msg.delete()
          }
        }, ms("5 sec"))
      }).catch(console.error)
      return;
    }

    try {
      // Execute the command
      await command.run({ client, message, args: commandArgs, db, prefix });

      // Set the user's cooldown for this command
      if (command.cooldown) {
        const newCooldownData = {
          timestamp: Date.now(),
          duration: ms(command.cooldown),
        };
        await db.set(`${message.author.id}_${commandName}_cooldown`, JSON.stringify(newCooldownData));
      }
    } catch (error) {
      console.error(`Error executing command '${commandName}':`, error);
    }
  });
};
