module.exports = ({client, db, fs, prefix}) => {
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const eventHandler = require(`../events/${file}`);
  eventHandler({client, db, prefix});
}
}