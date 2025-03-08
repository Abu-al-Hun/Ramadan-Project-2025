const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const verify = require("../../verify");
const path = require("path");
const config = require(path.join(__dirname, "../../src/data/config/config.js"));

const radioStations = {
  "Yasser al dosari": "https://backup.qurango.net/radio/yasser_aldosari",
  "Maher al meaqli": "https://Qurango.net/radio/maher_al_meaqli",
  "Saoud Al Shouraim": "https://backup.qurango.net/radio/saud_alshuraim",
  "Mouhammed Ayyub": "https://backup.qurango.net/radio/mohammed_ayyub",
  "Khalid AL Jalil": "https://Qurango.net/radio/khalid_aljileel",
  "Mishary Rachid Al Afasy": "https://Qurango.net/radio/mishary_alafasi",
  "Idris Abkar": "https://backup.qurango.net/radio/idrees_abkr",
  "Ali jaber": "https://backup.qurango.net/radio/ali_jaber",
  "NAsser AL Qatami": "https://backup.qurango.net/radio/nasser_alqatami",
  "Muhammed AL Luhaiden":"https://backup.qurango.net/radio/mohammed_allohaidan",
  "Abdurahman As Soudais": "https://Qurango.net/radio/abdulrahman_alsudaes",
};

const connections = new Map();

module.exports = {
  name: "إذاعة_القرأن",
  description: "إختر القارئ",
  options: [
    {
      name: "station",
      type: 3,
      description: "Choose a radio station",
      required: true,
      choices: Object.keys(radioStations).map((station) => ({
        name: station,
        value: station,
      })),
    },
  ],
  async execute(interaction) {
    if (interaction.replied || interaction.deferred) return;

    const roleid = verify.roleid;
    if (!interaction.member.roles.cache.has(roleid)) {
      return interaction.reply({
        content: "You do not have the required role to use this command",
        flags: 64,
      });
    }

    const stationName = interaction.options.getString("station");
    const stationUrl = radioStations[stationName];

    if (!interaction.guild) {
      return interaction.reply({
        content: "You need to be in a server to use this command",
        flags: 64,
      });
    }

    const member = interaction.member;
    const voiceChannel = interaction.guild.channels.cache.get(
      config.voiceChannelId
    );

    if (!voiceChannel) {
      return interaction.reply({
        content:
          "The bot could not find the registered voice channel. Please ask an admin to link the voice channel",
        flags: 64,
      });
    }

    if (!member.voice.channel) {
      return interaction.reply({
        content: "You need to join a voice channel first",
        flags: 64,
      });
    }

    try {
      await interaction.deferReply();

      let connection = connections.get(interaction.guild.id);
      let player;

      if (!connection) {
        connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: interaction.guild.id,
          adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        player = createAudioPlayer();
        connection.subscribe(player);

        connections.set(interaction.guild.id, { connection, player });
      } else {
        player = connections.get(interaction.guild.id).player;
      }

      const stream = await fetch(stationUrl);
      const resource = createAudioResource(stream.body);

      player.play(resource);

      player.on(AudioPlayerStatus.Playing, () => {
        interaction.editReply({
          content: `Live streaming now: ${stationName}`,
        });
      });

      player.on("error", (error) => {
        console.error(error);
        interaction.editReply({
          content: "There was an error playing the station",
          flags: 64,
        });
      });

    } catch (error) {
      console.error(error);
      interaction.editReply({
        content: "An error occurred while connecting to the voice channel",
        flags: 64,
      });
    }
  },
};
