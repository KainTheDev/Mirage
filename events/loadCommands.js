module.exports = async ({client}) => {
client.on('ready', async () => {
  let slashCommands = client.slashCommands.map(slashCommand => slashCommand)
  if(slashCommands[0]) {
  await client.application.commands.set([])
  await client.guilds.cache
    .get(client.guilds.cache.find(guild => guild.name === "CLIMAX"))
    .commands.set(slashCommands);
  console.log("Loaded slash commands.")
  }else{
    slashCommands = []
  }
})
};