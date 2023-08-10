module.exports = ({client}) => {
  const {getChannel} = client.getFunctions()
  function updateChannel (guild) {
    const channel = getChannel("1132963369721282620") // VOICE CHANNEL
    if (!channel) return; // Check if the channel is valid

    channel
      .edit({ name: `Members: [${guild.memberCount}]` })
      .catch((error) => {
        console.error("Error updating channel:", error);
      });
  };
  client.on('ready', () => {
    setInterval(() => {
      let lastNum = Number(getChannel("1132963369721282620").name.split(": ")[1].replace("[", "").replace("]", ""))
      const guild = client.guilds.cache.find(guild => guild.name === "CLIMAX")
      let recentNum = Number(guild.memberCount)
      if(recentNum > lastNum ) return updateChannel(guild)
    }, 5000)
  })
}