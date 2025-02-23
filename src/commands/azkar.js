const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "إذكار",
  description: "إذكار الصباح و المساء",
  options: [
    {
      name: "time",
      type: 3,
      description: "Choose the time of the adhkar (Morning or Evening)",
      required: true,
      choices: [
        {
          name: "أذكار الصباح",
          value: "morning",
        },
        {
          name: "أذكار المساء",
          value: "evening",
        },
      ],
    },
    {
      name: "language",
      type: 3,
      description: "Choose the language for the adhkar (Arabic or English)",
      required: true,
      choices: [
        {
          name: "العربية",
          value: "ar",
        },
        {
          name: "English",
          value: "en",
        },
      ],
    },
  ],
  async execute(interaction) {
    const time = interaction.options.getString("time");
    const language = interaction.options.getString("language");

    let adhkarFilePath = "";
    if (language === "ar") {
      if (time === "morning") {
        adhkarFilePath = "./src/data/adhkar/ar/adhkar_morning.json";
      } else if (time === "evening") {
        adhkarFilePath = "./src/data/adhkar/ar/adhkar_evening.json";
      }
    } else if (language === "en") {
      if (time === "morning") {
        adhkarFilePath = "./src/data/adhkar/en/adhkar_morning.json";
      } else if (time === "evening") {
        adhkarFilePath = "./src/data/adhkar/en/adhkar_evening.json";
      }
    }

    fs.readFile(adhkarFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return interaction.reply("An error occurred while loading the adhkar");
      }

      const adhkar = JSON.parse(data).adhkar;
      let formattedAdhkar = "";
      let count = 1;

      adhkar.forEach((dhikr) => {
        if (language === "ar") {
          formattedAdhkar += `${dhikr} - تكرر: ${count} مرة\n`;
        } else {
          formattedAdhkar += `${dhikr} - Repeat: ${count} time\n`;
        }
        count++;
      });

      const embed = new EmbedBuilder()
        .setColor("#00FF00")
        .setTitle(`أذكار ${time === "morning" ? "الصباح" : "المساء"}`)
        .setDescription(formattedAdhkar);

      interaction.reply({ embeds: [embed] });
    });
  },
};
