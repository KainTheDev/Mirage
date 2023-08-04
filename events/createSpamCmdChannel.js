module.exports = ({client}) => {
    const {ChannelType, EmbedBuilder} = require("discord.js")
    client.on("messageCreate", (message) => {
    if(!message.guild) return;
    if(message.guild.name !== "CLIMAX") return;
    let channel = message.guild.channels.cache.find(channel => channel.name.includes(message.author.id))
    if(channel) {
    if(channel.id === message.channel.id && message.content.includes("#DELETE_CHANNEL")) {
      channel.delete()
      message.author.send(`> **NOTIFICATION**: Delete channel **${channel.name}**.`)
    }
    }
    const {getChannel} = client.getFunctions()
    const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
    channel = getChannel("create-channel")
    const row = new ActionRowBuilder()
    .setComponents(
        new ButtonBuilder()
        .setEmoji("➕")
        .setLabel("Create")
        .setCustomId("create_channel")
        .setStyle(ButtonStyle.Success)
        )
    // Send a message using the webhook
    if(message.content.includes("#SEND_DEFAULT_MESSAGE") && message.author.id === message.guild.ownerId) return channel.send({embeds: [
      {
      color: 0x0099ff,
      title: 'Create a spam commands channel (customizable)',
      description: 'Click the button below to create a new channel for spam commands.',
      fields: [
        {
          name: "Guide - closing channel",
          value: "To close / delete this channel, use this command:\n```#DELETE_CHANNEL```"
        }
      ]
      }
    ], components: [row]});
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
  
    if (interaction.customId === 'create_channel') {
      const guild = client.guilds.cache.find(guild => guild.name === "CLIMAX");
      const alreadyCreated = guild.channels.cache.find(channel => channel.name.includes(interaction.user.id))
      if(alreadyCreated) return interaction.reply({content: `You already owned a channel (<#${alreadyCreated.id}>)!\n > **TIPS**: If you want to delete it, send \`#DELETE_CHANNEL\` in the channel.`, ephemeral: true})
      const channelName = interaction.user.id+' - Spam commands'; // Change this to the desired channel name
  
      try {
        const createdChannel = await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText, // Change this to the desired channel type
        });
        const date = Math.floor(Date.now() / 1000)
        const type = {
          0: "GUILD_TEXT",
          1: "DM",
          2: "GUILD_VOICE"
        }
        const guide = new EmbedBuilder()
        .setTitle("Created channel - "+createdChannel.name)
        .setDescription(`ID: \`${createdChannel.id}\`\nType: \`${type[createdChannel.type]}\`\nCreated: <t:${date}:R> | \`${new Date()}\``)
        .addFields({name: "Need help / tutorial?", value: "Check out"})
        createdChannel.send({embeds: [guide]})
        await interaction.reply({ content: `Channel ${createdChannel} has been created!`, ephemeral: true });
      } catch (error) {
        console.error('Error creating channel:', error);
        await interaction.reply({ content: 'An error occurred while creating the channel.', ephemeral: true });
      }
    }
  });
}