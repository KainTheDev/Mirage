const client = require("../index")
module.exports = function getChannel(nameOrID) {
    const channel = client.channels.cache ? client.channels.cache.find(ch => ch.name === nameOrID) || client.channels.cache.get(nameOrID) : client.guilds.cache.find(guild => guild.name === "CLIMAX").channels.cache.find(ch => ch.name === nameOrID) || client.guilds.cache.find(guild => guild.name === "CLIMAX").channels.cache.get(nameOrID)
    if(!channel) {
      console.error("ERROR: [getChannel.js]\nFailed to get channel.\nReason: [Invalid name.]")
      process.exit()
    }
    return channel
}