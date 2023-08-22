const client = require("../index")
module.exports = function getRole(nameOrID) {
    const role = client.guilds.cache.find(role => role.name === "CLIMAX").roles.cache.get(nameOrID) || client.guilds.cache.find(role => role.name === "CLIMAX").roles.cache.find(role => role.name === nameOrID)
    return role
}