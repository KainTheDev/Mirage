const client = require("../index")
module.exports = function getChannel(nameOrID) {
  console.log([...client.channels.cache])
    const channel = client.channels.cache.find(ch => ch.name === nameOrID) || client.channels.cache.get(nameOrID)
    if(!channel) {
      console.error("ERROR: [getChannel.js]\nFailed to get channel.\nReason: [Invalid name.]")
      process.exit()
    }
    return channel
}