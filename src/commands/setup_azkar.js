const { ChannelType, PermissionsBitField } = require("discord.js");
const fs = require("fs");
const path = require("path");
const configPath = path.join(__dirname, "../../src/data/config/config.js");
let config = require(configPath);
const verify = require("../../verify");

module.exports = {
  name: "إعداد_إلاذكار",
  description: "تحديد_روم_المدة_ارسال_الاذكار",
  options: [
    {
      name: "channel",
      description: "Select a text channel for azkar",
      type: 7,
      required: true,
    },
    {
      name: "interval",
      description: "Set the interval for sending azkar (in seconds or minutes)",
      type: 4,
      required: true,
      choices: [
        { name: "5 minutes", value: 5 },
        { name: "10 minutes", value: 10 },
        { name: "15 minutes", value: 15 },
        { name: "30 minutes", value: 30 },
        { name: "1 hour", value: 60 },
        { name: "2 hours", value: 120 },
        { name: "3 hours", value: 180 },
        { name: "4 hours", value: 240 },
        { name: "5 hours", value: 300 },
      ],
    },
  ],
  async execute(interaction) {
    const roleid = verify.roleid;
    if (!interaction.member.roles.cache.has(roleid)) {
      return interaction.reply({
        content: "❌ You do not have the required role to use this command",
        flags: 64,
      });
    }

    const selectedChannel = interaction.options.getChannel("channel");
    const selectedInterval = interaction.options.getInteger("interval");

    if (
      selectedChannel.type !== ChannelType.GuildText ||
      !selectedChannel
        .permissionsFor(interaction.guild.members.me)
        .has(PermissionsBitField.Flags.SendMessages)
    ) {
      return interaction.reply({
        content:
          "❌ The selected channel is not a valid text channel or the bot lacks permissions",
        flags: 64,
      });
    }

    let intervalInMs = selectedInterval * 60000;

    config.azkarChannelId = selectedChannel.id;
    config.azkarInterval = intervalInMs;

    fs.writeFileSync(
      configPath,
      `module.exports = ${JSON.stringify(config, null, 2)};`,
      "utf-8"
    );

    console.log(`Azkar setup updated:
- Channel: ${selectedChannel.name} (ID: ${selectedChannel.id})
- Interval: ${intervalInMs} milliseconds`);

    await interaction.reply({
      content: `✅ Azkar setup completed successfully.\nChannel: <#${selectedChannel.id}>\nInterval: ${intervalInMs} milliseconds`,
      flags: 64,
    });

    console.log("🌀 Restarting the bot");
    process.exit(0);
  },
};
