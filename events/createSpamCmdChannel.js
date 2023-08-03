module.exports = ({client}) => {
    const {ChannelType} = require("discord.js")
    client.on("messageCreate", (message) => {
    if(message.guild.name !== "CLIMAX") return;
    const {getChannel} = client.getFunctions()
    const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
    const channel = getChannel("create-channel")
    const row = new ActionRowBuilder()
    .setComponents(
        new ButtonBuilder()
        .setEmoji("➕")
        .setLabel("Create")
        .setCustomId("create_channel")
        .setStyle(ButtonStyle.Success)
        )
    // Send a message using the webhook
    if(message.content.includes("#SEND_WEBHOOK") && message.author.id === message.guild.ownerId) return channel.send({content: "Click to the button to create a new channel! (customizable)", components: [row]});
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
  
    if (interaction.customId === 'create_channel') {
      const guild = client.guilds.cache.find(guild => guild.name === "CLIMAX");
      const channelName = interaction.user.username+' - Channel'; // Change this to the desired channel name
  
      try {
        const createdChannel = await guild.channels.create(channelName, {
          type: ChannelType.GuildText, // Change this to the desired channel type
        });
  
        await interaction.reply({ content: `Channel ${createdChannel} has been created!`, ephemeral: true });
      } catch (error) {
        console.error('Error creating channel:', error);
        await interaction.reply({ content: 'An error occurred while creating the channel.', ephemeral: true });
      }
    }
  });
}