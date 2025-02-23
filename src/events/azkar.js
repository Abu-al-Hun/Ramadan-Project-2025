const IIMDB = require('iimdb.js');
const path = require('path');
const config = require(path.join(__dirname, '..', '..', 'src', 'data', 'config', 'config.js'));
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ready',
    execute(client) {
        if (!config.azkarChannelId || !config.azkarInterval) {
            return;
        }

        const channelId = config.azkarChannelId;
        const interval = config.azkarInterval;
        const db = new IIMDB();

        const channel = client.channels.cache.get(channelId);
        if (!channel) {
            return;
        }

        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        setInterval(async () => {
            try {
                const result = db.sendPrayer(client.user.id, 1);
                const prayers = result.prayers;

                if (prayers.length > 0) {
                    const prayer = prayers[0];

                    const embed = new EmbedBuilder()
                        .setTitle('ذكر من الأذكار')
                        .setDescription(prayer)
                        .setColor(getRandomColor())
                        .setFooter({ 
                            text: `${channel.guild.name} • ${new Date().toLocaleString()}`,
                            iconURL: channel.guild.iconURL() 
                        });

                    await channel.send({ embeds: [embed] });
                }
            } catch (error) {
            }
        }, interval);
    },
};
