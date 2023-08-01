const client = require("../index")
module.exports = function getChannel(name) {
    const channel = client.channels.cache.find(ch => ch.name === name)
    if(!channel) {
      console.error("ERROR: [getChannel.js]\nFailed to get channel.\nReason: [Invalid name.]")
      process.exit()
    }
    return channel
}