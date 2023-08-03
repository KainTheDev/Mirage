const client = require("../index")
module.exports = function getChannel(nameOrID) {
    const channel = client.channels.cache.find(ch => ch.name === nameOrID) || client.channels.cache.get(nameOrID)
    console.log(nameOrID)
    if(!channel) {
      console.error("ERROR: [getChannel.js]\nFailed to get channel.\nReason: [Invalid name.]")
      process.exit()
    }
    return channel
}