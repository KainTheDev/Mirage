module.exports = ({client}) => {
    client.on("ready", () => {
    const {getChannel} = client.getFunctions()
    const { ButtonBuilder, ButtonStyle, ActionRowBuilder, WebhookClient } = require('discord.js');
    const channel = getChannel("create-channel")
    const webhookClient = new WebhookClient({ url: "https://discord.com/api/webhooks/1136649645557305384/_l_EVWPMdRD4xlIwHkjPVvCjSzIk-hEDnVZieI7zyF-TGmyIFn1JiH8Qt1_4ZMxuX6nm" });
    const row = new ActionRowBuilder()
    .setComponents(
        new ButtonBuilder()
        .setEmoji("➕")
        .setLabel("Create")
        .setCustomId("CREATE")
        .setStyle(ButtonStyle.Success)
        )
    // Send a message using the webhook
    if([...channel.messages.cache].length === 0) return webhookClient.send({components: [row]});
})
}