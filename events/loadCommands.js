module.exports = async ({client}) => {
client.on('ready', async () => {
  let slashCommands = client.slashCommands.map(slashCommand => slashCommand)
  if(slashCommands[0]) {
  const GUILD = client.guilds.cache.find(guild => guild.name === "CLIMAX")
  GUILD
    .commands.set(slashCommands).then(() => console.log("Loaded slash commands."))
  }else{
    slashCommands = []
  }
})
};