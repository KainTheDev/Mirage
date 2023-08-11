const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
  description: "Manage invites. Subcommands: Display, Manage",
  options: [
    {
      name: "manage",
      description: "Manage invites. Subcommands: Display, Manage",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: "create",
          description: "Create an invite",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "delete",
          description: "Delete an invite",
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    },
    {
      name: "list",
      description: "List of invites",
      type: ApplicationCommandOptionType.Subcommand
    }
  ],
  category: "ServerManagement"
}