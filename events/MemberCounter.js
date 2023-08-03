module.exports = ({client}) => {
  const {getChannel} = client.getFunctions()
  function updateChannel (member) {
    const guild = client.guilds.cache.find(guild => guild.name === "CLIMAX")
    const isClimaxServer = member.guild.id === guild.id
    if (!guild && !isClimaxServer) return; // Check if the guild is valid
    const channel = getChannel("1132963369721282620") // VOICE CHANNEL
    if (!channel) return; // Check if the channel is valid

    channel
      .edit({ name: `Members: [${guild.memberCount}]` })
      .catch((error) => {
        console.error("Error updating channel:", error);
      });
  };
  client.on('guildMemberAdd', (member) => {
  updateChannel(member)
});

client.on('guildMemberRemove', (member) => {
  updateChannel(member)
});
}