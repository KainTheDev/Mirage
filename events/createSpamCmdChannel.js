module.exports = ({client}) => {
    client.on("ready", () => {
    const {getChannel} = client.getFunctions()
    const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
    const channel = getChannel("create-channel")
    const row = new ActionRowBuilder()
    .setComponents(
        new ButtonBuilder()
        .setEmoji("➕")
        .setLabel("Create")
        .setCustomId("CREATE")
        .setStyle(ButtonStyle.Success)
        )
    // Send a message using the webhook
    if([...channel.messages.cache].length === 0) return channel.send({content: "Click to the button to create a new channel! (customizable)", components: [row]});
})
}