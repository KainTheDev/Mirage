module.exports = ({ client }) => {
const { PermissionsBitField } = require("discord.js");
const AntiSpam = require("discord-anti-spam");
const antiSpam = new AntiSpam({
  warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
  muteTreshold: 6, // Amount of messages sent in a row that will cause a mute.
  unMuteTime: 5, // Time in minutes before the user will be able to send messages again.
  verbose: true, // Whether or not to log every action in the console.
  removeMessages: true, // Whether or not to remove all messages sent by the user.
  ignoredPermissions: [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ModerateMembers], // If the user has the following permissions, ignore him.
  // For more options, see the documentation:
});

client.on("messageCreate", (message) => {
  if(message.guild.id !== client.guilds.cache.find(guild => guild.name === "CLIMAX").id) return;
  antiSpam.message(message)
});
};
