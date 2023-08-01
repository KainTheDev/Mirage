module.exports = async function deleteMessage(channel, id, timeout) {
  setTimeout(async () => {
    const message = channel.messages.cache.get(id);
    if (message) {
      try {
        await message.delete();
      } catch (error) {
        return;
      }
    }
  }, timeout);
};
