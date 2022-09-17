const { MessageEmbed } = require('discord.js'),
  st = require('../../core/settings').bot,
  db = require('../../core/db.js');


module.exports = {
  name: 'setlogs',
  aliases: ['logs', 'setlog', 'logging'],
  run: async (client, message, args) => {
    const antinuke = await db.get(`${message.guild.id}_antinuke`);
    if (antinuke) {
    let prefix = await db.get(`${message.guild.id}_prefix`);
    if (!prefix) prefix = st.info.prefix;
    // check dm
    const guide = new MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`_**DM Logging**_

**Commands**
﹒To enable DM Logging: *${prefix}setlogs #channel*
﹒To disable DM Logging: *${prefix}setlogs none*

**If Logging is Enabled:**
﹒info of unauthorized actions will ve sent in dms.
﹒this info will be sent to the server owner only.`);

    const channel = message.mentions.channels.first();

    if (message.author.id === message.guild.ownerId) {
      if (channel) {
        await db.set(`${channel.guild.id}_dmlogs`, channel.id);
        message.reply(':thumbsup: the logs have been set to <#'+channel.id+'>');
      } else {
        if (channel === 'none') {
          await db.delete(`${channel.guild.id}_dmlogs`);
          message.reply(':thumbsup: disabled logging for that channel.');
        } else {
          message.reply({ embeds: [guide] });
        }
      }
        } else {
          message.reply({ embeds: [guide] });
        }
      } else {
      message.reply('to use this command, you need to enable the antinuke.')
    }
  }
}