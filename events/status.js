module.exports = ({client}) => {
  const {ActivityType} = require("discord.js")
  client.once('ready', () => {
    console.log('Bot is ready! ' + client.user.tag);
    client.user.setPresence({
  activities: [{ name: `you and others`, type: ActivityType.Watching }],
  status: 'online',
});
  });
};
