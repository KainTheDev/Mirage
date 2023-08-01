module.exports = ({client}) => {
  function updateChannel () {
    const guild = client.guilds.cache.get("1130371134047658084");
    if (!guild) return; // Check if the guild is valid
    const channel = guild.channels.cache.get("1132963369721282620");
    if (!channel) return; // Check if the channel is valid

    channel
      .edit({ name: `Members: [${guild.memberCount}]` })
      .catch((error) => {
        console.error("Error updating channel:", error);
      });
  };
  client.on('guildMemberAdd', (member) => {
  updateChannel()
});

client.on('guildMemberRemove', (member) => {
  updateChannel()
});
}