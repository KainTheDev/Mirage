module.exports = ({ client, db }) => {
  const { deleteMessage, getChannel } = client.getFunctions()
  client.on('messageCreate', async (message) => {
    const imagesChannel = getChannel("images")
    const description = message.content
    const images = []
    for(const attachment of message.attachments) {
      if(["png", "jpg", "jpeg", "tiff"].includes(attachment[1].contentType.split("/")[1])) return images.push(attachment)
    }
    if (message.author.bot) {
      await deleteMessage(imagesChannel, message.id, 500)
      return;
    }else if(!message.author.bot && images.length === 0) {
      await deleteMessage(imagesChannel, message.id, 500)
      return;
    }
  })
}