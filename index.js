const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const Database = require('./Database.js');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildModeration,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.GuildInvites,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildScheduledEvents,
  GatewayIntentBits.AutoModerationConfiguration,
  GatewayIntentBits.AutoModerationExecution
  ],
  partials: [Partials.Channel],
  allowedMentions: { repliedUser: false }
});
client.config = require("./config.json")
client.commands = new Collection();
client.slashCommands = new Collection();
const prefix = client.config.bot.prefix;
const db = new Database()
client.getFunctions = function () {
  const functions = fs.readdirSync('./functions').filter(file => file.endsWith('.js')).map(file => {
    const functionName = file.slice(0, -3); // Extract the function name from the file name (excluding the ".js" extension)
    const function_ = require(`./functions/${file}`);
    return { [functionName]: function_ };
  });

  return Object.assign({}, ...functions); // Merge all objects into a single object
};
module.exports = client
// Load handlers dynamically
const eventFiles = fs.readdirSync('./handlers').filter(file => file.endsWith('.js') || file.endsWith('.cjs'));
for (const file of eventFiles) {
  const handler = require(`./handlers/${file}`);
  handler({client, db, fs, prefix});
}

client.on('error', (error) => console.log(error));

require('dotenv').config()
client.login(process.env.token);