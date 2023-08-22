module.exports = {
  description: "Create a role",
  cooldown: "10 seconds",
  category: "ServerManagement",
  run: async ({client, message, args}) => {
    const {getRole} = client.getFunctions()
    const role = getRole("Administrator")
    if (message.member.id !== message.guild.ownerId && !message.member.roles.cache.get(role.id)) {
      return message.reply("You don't have the permission to create roles.");
    }
    // Get the role name from the command arguments
    const roleNames = args.join(" ").split("|")
      const guild = message.guild;
    if(roleNames[0] === '') return message.react("❌")
    console.log(roleNames)
    roleNames.forEach(async name => {  
    await guild.roles.create({
        name: name,
      });
    })
      message.react("✅")
  }
}