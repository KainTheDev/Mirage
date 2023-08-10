module.exports = ({ client }) => {
    const { ChannelType, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, TextInputStyle, TextInputBuilder, ModalBuilder } = require("discord.js");

    client.on("messageCreate", (message) => {
        if (!message.guild) return;
        if (message.guild.name !== "CLIMAX") return;

        const { getChannel } = client.getFunctions();
        const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
        channel = getChannel("create-channel");

        const row = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                    .setEmoji("➕")
                    .setLabel("Create")
                    .setCustomId("create_channel")
                    .setStyle(ButtonStyle.Success)
            );

        // Send a message using the webhook
        if (message.content.includes("#SEND_DEFAULT_MESSAGE") && message.author.id === message.guild.ownerId) {
            return channel.send({
                embeds: [
                    {
                        color: 0x0099ff,
                        title: 'Create a spam commands channel (customizable)',
                        description: 'Click the button below to create a new channel for spam commands.',
                      image: {
                        url: "https://cdn.discordapp.com/attachments/1133650931565744201/1137427541473382431/MIRAGE.png"
                      }
                    }
                ],
                components: [row]
            });
        }
    });

    client.on('interactionCreate', async (interaction) => {
        if (interaction.customId === 'create_channel') {  
            const guild = client.guilds.cache.find(guild => guild.name === "CLIMAX");
            const alreadyCreated = guild.channels.cache.find(channel => channel.name.includes(interaction.user.id) || channel.topic === interaction.user.id);

            if (alreadyCreated) {
                return interaction.reply({
                    content: `You already owned a channel (<#${alreadyCreated.id}>)!`,
                    ephemeral: true
                });
            }

            const channelName = `${interaction.user.id} channel'`; // Change this to the desired channel name

            try {
                const createdChannel = await guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildText, // Change this to the desired channel type
                    topic: interaction.user.id
                });
  
                const date = Math.floor(Date.now() / 1000);
                const type = {
                    0: "GUILD_TEXT",
                    1: "DM",
                    2: "GUILD_VOICE"
                };

                const guide = new EmbedBuilder()
                    .setTitle("Created channel - " + createdChannel.name)
                    .setDescription(`ID: \`${createdChannel.id}\`\nType: \`${type[createdChannel.type]}\`\nCreated: <t:${date}:R> | \`${new Date()}\``)

                const changeVisibility = new StringSelectMenuBuilder()
                    .setCustomId('visibility')
                    .setPlaceholder('Change channel\'s visibility')
                    .addOptions(
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Public')
                            .setDescription('Everyone can view and chat in your channel.')
                            .setValue('P'),
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Private')
                            .setDescription('Your channel is private, no one can view / chat in it.')
                            .setValue('B')
                    );

                const changeName = new ButtonBuilder()
                    .setCustomId('change_name')
                    .setLabel('Change channel name')
                    .setStyle(ButtonStyle.Primary);
                const closeChannel = new ButtonBuilder()
        .setCustomId('close_channel')
        .setLabel('Close')
        .setStyle(ButtonStyle.Danger);
                const selectMenus = new ActionRowBuilder()
                    .addComponents(changeVisibility);

                const buttons = new ActionRowBuilder()
                    .addComponents(changeName, closeChannel);

                const message = await createdChannel.send({ embeds: [guide], components: [selectMenus, buttons] });
              message.pin()
                await interaction.reply({ content: `Channel ${createdChannel} has been created!`, ephemeral: true });
            } catch (error) {
                console.error('Error creating channel:', error);
                await interaction.reply({ content: 'An error occurred while creating the channel.', ephemeral: true });
            }
        } else if (interaction.customId === 'change_name') {
            const modal = new ModalBuilder()
                .setCustomId('ccn_modal')
                .setTitle('Change channel\'s name');

            // Add components to modal

            const input = new TextInputBuilder()
                .setCustomId('channel_name')
                .setLabel("Write the new name here")
                .setStyle(TextInputStyle.Short);

            const ModalRow = new ActionRowBuilder().addComponents(input);

            modal.addComponents(ModalRow);

            await interaction.showModal(modal);
        } else if (interaction.customId === 'ccn_modal') {
            const new_channel_name = interaction.fields.getTextInputValue("channel_name");
            try {
              const createdChannel = client.channels.cache.find(channel => channel.topic === interaction.user.id)
                await createdChannel.setName(new_channel_name);
                await interaction.reply({ content: `Channel name has been changed to ${new_channel_name}!`, ephemeral: true });
            } catch (error) {
                console.error('Error changing channel name:', error);
                await interaction.reply({ content: 'An error occurred while changing the channel name.', ephemeral: true });
            }
        }else if (interaction.customId === 'visibility') {
    const selectedVisibility = interaction.values[0]; // Get the selected option value
    const createdChannel = client.channels.cache.find(channel => channel.topic === interaction.user.id);
    
    try {
        if (selectedVisibility === 'P') {
            await createdChannel.permissionOverwrites.edit(createdChannel.guild.roles.cache.get("1133031635160403978"), {
                ViewChannel: true, // Allow everyone to view the channel
                SendMessages: true // Allow everyone to send messages
            });
            await interaction.reply({ content: 'Channel visibility set to Public!', ephemeral: true });
        } else if (selectedVisibility === 'B') {
            await createdChannel.permissionOverwrites.edit(createdChannel.guild.roles.cache.get("1133031635160403978"), {
                ViewChannel: false, // Deny everyone from viewing the channel
                SendMessages: false // Deny everyone from sending messages
            });
            await interaction.reply({ content: 'Channel visibility set to Private!', ephemeral: true });
        }
    } catch (error) {
        console.error('Error changing channel visibility:', error);
        await interaction.reply({ content: 'An error occurred while changing the channel visibility.', ephemeral: true });
    }
        }else if (interaction.customId === "close_channel") {
          const createdChannel = client.channels.cache.find(channel => channel.topic === interaction.user.id);
                createdChannel.delete();
                interaction.user.send(`> **NOTIFICATION**: Delete channel **${createdChannel.name}**.`);
        }
    });
};