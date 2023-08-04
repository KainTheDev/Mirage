module.exports = ({ client, db }) => {
  const { deleteMessage, getChannel } = client.getFunctions()
  client.on('messageCreate', async (message) => {
    if(!message.guild) return;
    if(message.guild.name !== "CLIMAX") return;
    const imagesChannel = getChannel("images")
    const description = message.content
    const images = []
    for(const attachment of message.attachments) {
      if(["png", "jpg", "jpeg", "tiff"].includes(attachment[1].contentType.split("/")[1])) return images.push(attachment)
    }
    if(!message.author.bot && images.length === 0) {
      await deleteMessage(imagesChannel, message.id, 500)
      return;
    }
  })
}
