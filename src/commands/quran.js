const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "..", "data", "quran", "savedPages.json");

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({}));
}

const loadSavedPages = () => {
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
};

const saveSavedPages = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

let savedPages = loadSavedPages();

module.exports = {
  name: "المصحف_المرتل",
  description: "ألقران الكريم",
  options: [
    {
      name: "moshaf",
      type: 3,
      description: "Select the Quran you want",
      required: true,
      choices: [
        {
          name: "مصحف المدينة المنورة صفحة واحدة",
          value: "Holy_Quran_of_Medina_Single",
        },
        {
          name: "مصحف المدينة المنورة صفحتين",
          value: "Holy_Quran_of_Medina_Dual",
        },
        {
          name: "مصحف المدينة 800x600",
          value: "Medina_800x600",
        },
        {
          name: "المصحف بالرسم العثماني",
          value: "Uthmani_Quran",
        },
        {
          name: "مصحف نسخة الشمرلي",
          value: "Shamarli_Quran",
        },
      ],
    },
  ],
  async execute(interaction) {
    const moshaf = interaction.options.getString("moshaf");

    let baseUrl;
    let totalPages = 604;

    if (moshaf === "Medina_800x600") {
      baseUrl = "https://www.islamicbook.ws/6/";
    } else if (moshaf === "Uthmani_Quran") {
      baseUrl = "https://www.islamicbook.ws/3/";
      totalPages = 302;
    } else if (moshaf === "Shamarli_Quran") {
      baseUrl = "https://www.islamicbook.ws/4/";
      totalPages = 522;
    } else {
      baseUrl = "https://www.islamicbook.ws/1-1/";
    }

    let currentPage =
      (savedPages[interaction.user.id] &&
        savedPages[interaction.user.id][moshaf]) ||
      1;

    const createEmbed = () => {
      return new EmbedBuilder()
        .setTitle(
          moshaf === "Holy_Quran_of_Medina_Single"
            ? "مصحف المدينة المنورة صفحة واحدة"
            : moshaf === "Holy_Quran_of_Medina_Dual"
            ? "مصحف المدينة المنورة صفحتين"
            : moshaf === "Medina_800x600"
            ? "مصحف المدينة 800x600"
            : moshaf === "Uthmani_Quran"
            ? "المصحف بالرسم العثماني"
            : "مصحف نسخة الشمرلي"
        )
        .setImage(`${baseUrl}${currentPage}.png`)
        .setFooter({ text: `الصفحة ${currentPage} من ${totalPages}` })
        .setColor(0x080808);
    };

    const embed = createEmbed();
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("prev_page")
        .setLabel("⬅️")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(currentPage === 1),
      new ButtonBuilder()
        .setCustomId("next_page")
        .setLabel("➡️")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(currentPage === totalPages),
      new ButtonBuilder()
        .setCustomId("save_page")
        .setLabel("💾")
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
    const message = await interaction.fetchReply();

    const collector = message.createMessageComponentCollector({ time: 3600000 });

    collector.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id) {
        return i.reply({ content: "لا يمكن استخدام هذا الزر", flags: 64 });
      }

      if (i.customId === "prev_page" && currentPage > 1) {
        currentPage--;
      } else if (i.customId === "next_page" && currentPage < totalPages) {
        currentPage++;
      } else if (i.customId === "save_page") {
        if (!savedPages[interaction.user.id]) {
          savedPages[interaction.user.id] = {};
        }
        savedPages[interaction.user.id][moshaf] = currentPage;
        saveSavedPages(savedPages);
        return i.reply({
          content: `تم حفظ الصفحة ${currentPage}`,
          flags: 64,
        });
      }

      const updatedEmbed = createEmbed();
      const updatedRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("prev_page")
          .setLabel("⬅️")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(currentPage === 1),
        new ButtonBuilder()
          .setCustomId("next_page")
          .setLabel("➡️")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(currentPage === totalPages),
        new ButtonBuilder()
          .setCustomId("save_page")
          .setLabel("💾")
          .setStyle(ButtonStyle.Secondary)
      );

      await i.update({ embeds: [updatedEmbed], components: [updatedRow] });
    });

    collector.on("end", async () => {
      const disabledRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("prev_page")
          .setLabel("⬅️")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId("next_page")
          .setLabel("➡️")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId("save_page")
          .setLabel("💾")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
      );

      await message.edit({ components: [disabledRow] });
    });
  },
};
