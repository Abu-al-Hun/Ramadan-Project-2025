const { ChannelType, PermissionsBitField } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const fs = require("fs");
const path = require("path");
const configPath = path.join(__dirname, "../../src/data/config/config.js");
let config = require(configPath);
const verify = require("../../verify");

module.exports = {
  name: "إعدات_قناة_الازاعة",
  description: "تحديد_القناة_الصوتية",
  options: [
    {
      name: "channel",
      type: 7,
      description: "Select a voice channel",
      required: true,
    },
  ],
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");

    const roleid = verify.roleid;
    if (!interaction.member.roles.cache.has(roleid)) {
      return interaction.reply({
        content: "You do not have the required role to use this command",
        flags: 64,
      });
    }

    if (
      !channel ||
      (channel.type !== ChannelType.GuildVoice &&
        channel.type !== ChannelType.GuildStageVoice)
    ) {
      return interaction.reply({
        content: "Please select a valid voice channel",
        flags: 64,
      });
    }

    const botPermissions = channel.permissionsFor(interaction.guild.members.me);
    if (
      !botPermissions.has(PermissionsBitField.Flags.Connect) ||
      !botPermissions.has(PermissionsBitField.Flags.Speak)
    ) {
      return interaction.reply({
        content:
          "The bot lacks the permissions to connect or speak in the selected channel",
        flags: 64,
      });
    }

    try {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      config.voiceChannelId = channel.id;
      fs.writeFileSync(
        configPath,
        `module.exports = ${JSON.stringify(config, null, 2)};`,
        "utf-8"
      );

      await interaction.reply({
        content: "The channel has been successfully linked",
        flags: 64,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "An error occurred while trying to join the voice channel",
        flags: 64,
      });
    }
  },
};
