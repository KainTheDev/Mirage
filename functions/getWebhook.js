const client = require("../index")
module.exports = function getWebhook(name) {
  const {WebhookClient} = require("discord.js")
  const webhooks = client.config.webhooks
  const webhook = new WebhookClient({ url: webhooks[name] });
  return webhook
}