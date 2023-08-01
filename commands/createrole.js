module.exports = {
  description: "Create a role",
  cooldown: "10 seconds",
  category: "ServerManagement",
  run: async ({message, args}) => {
    const {PermissionsBitField} = require("discord.js")
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.reply("You don't have the permission to create roles.");
    }
    // Get the role name from the command arguments
    const roleNames = args.join(" ").split("|")
      const guild = message.guild;
    roleNames.forEach(async name => {  
    await guild.roles.create({
        name: name,
      });
    })
      message.react("✅")
  }
}