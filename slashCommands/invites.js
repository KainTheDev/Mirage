const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  description: "Manage invites. Subcommands: Display, Manage",
  options: [
    {
      name: "Manage",
      type: ApplicationCommandOptionType
    }
  ],
  category: "ServerManagement"
}