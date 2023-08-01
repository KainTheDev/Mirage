module.exports = ({client}) => {
  client.on("messageCreate", async (message) => {
    const {getChannel} = client.getFunctions()
    const starboardChannel = getChannel("suggestions")
    if(message.channel.id === starboardChannel.id && message.author.bot) {
      if(message.embeds[0].title !== "New Suggestion") return;
      setTimeout(() => {
      if(!message) return;
      message.react('👍');
      message.react('👎');
      }, 1000)
    }
  })
}