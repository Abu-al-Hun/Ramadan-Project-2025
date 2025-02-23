const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "توقيت_إلصلاة",
  description: "توقيت الصلاة حسب كل دولة",
  options: [
    {
      name: "country",
      type: 3,
      description: "Select your country to get prayer times",
      required: true,
      choices: [
        {
          name: "السعودية",
          value: "saudi_arabia",
        },
        {
          name: "مصر",
          value: "egypt",
        },
        {
          name: "الإمارات",
          value: "egypt",
        },
        {
          name: "اليمن",
          value: "Yemen",
        },
        {
          name: "فلسطين",
          value: "Palestine",
        },
        {
          name: "ليبيا",
          value: "Libya",
        },
        {
          name: "المغرب",
          value: "Morocco",
        },
        {
          name: "تونس",
          value: "Tunisia",
        },
        {
          name: "الجزائر",
          value: "Algeria",
        },
        {
          name: "العراق",
          value: "Iraq",
        },
        {
          name: "السودان",
          value: "Sudan",
        },
        {
          name: "الكويت",
          value: "Kuwait",
        },
        {
          name: "قطر",
          value: "Qatar",
        },
        {
          name: "الأردن",
          value: "Jordan",
        },
        {
          name: "لبنان",
          value: "Lebanon",
        },
        {
          name: "سوريا",
          value: "Syria",
        },
        {
          name: "عمان",
          value: "Oman",
        },
        {
          name: "البحرين",
          value: "Bahrain",
        },
        {
          name: "الصومال",
          value: "SOMALIA",
        },
        {
          name: "جيبوتي",
          value: "DJIBOUTI",
        },
        {
          name: "جزر القمر",
          value: "MutsamuduCOMOROS",
        },
        {
          name: "موريتانيا",
          value: "Mauritania",
        },
      ],
    },
    {
      name: "language",
      type: 3,
      description: "Select the language of the response",
      required: true,
      choices: [
        {
          name: "Arabic",
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
    const country = interaction.options.getString("country");
    const language = interaction.options.getString("language");

    const countries = {
      saudi_arabia: {
        name: "السعودية",
        url_ar: "https://timesprayer.com/prayer-times-cities-saudi-arabia.html",
        url_en:
          "https://timesprayer.com/en/prayer-times-cities-saudi-arabia.html",
        description_ar:
          "للحصول على مواعيد الصلاة في السعودية، اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Saudi Arabia, click the button below to visit the site",
      },
      egypt: {
        name: "مصر",
        url_ar: "https://timesprayer.com/prayer-times-cities-egypt.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-egypt.html",
        description_ar:
          "للحصول على مواعيد الصلاة في مصر، اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Egypt, click the button below to visit the site",
      },
      Emirates: {
        name: "الإمارات",
        url_ar: "https://timesprayer.com/prayer-times-cities-emirates.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-emirates.html",
        description_ar:
          "للحصول على مواعيد الصلاة في الإمارات اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Emirates, click the button below to visit the site",
      },
      Yemen: {
        name: "اليمن",
        url_ar: "https://timesprayer.com/prayer-times-cities-yemen.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-yemen.html",
        description_ar:
          "للحصول على مواعيد الصلاة في اليمن اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Yemen, click the button below to visit the site",
      },
      Palestine: {
        name: "فلسطين",
        url_ar: "https://timesprayer.com/prayer-times-cities-palestine.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-palestine.html",
        description_ar:
          "للحصول على مواعيد الصلاة في فلسطين اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Palestine, click the button below to visit the site",
      },
      Libya: {
        name: "ليبيا",
        url_ar: "https://timesprayer.com/prayer-times-cities-libya.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-libya.html",
        description_ar:
          "للحصول على مواعيد الصلاة في ليبيا اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Libya, click the button below to visit the site",
      },
      Morocco: {
        name: "المغرب",
        url_ar: "https://timesprayer.com/prayer-times-cities-morocco.html",
        url_en: "",
        description_ar:
          "للحصول على مواعيد الصلاة في المغرب اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Morocco, click the button below to visit the site",
      },
      Tunisia: {
        name: "تونس",
        url_ar: "https://timesprayer.com/prayer-times-cities-tunisia.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-tunisia.html",
        description_ar:
          "للحصول على مواعيد الصلاة في تونس اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Tunisia, click the button below to visit the site",
      },
      Algeria: {
        name: "الجزائر",
        url_ar: "https://timesprayer.com/prayer-times-cities-algeria.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-algeria.html",
        description_ar:
          "للحصول على مواعيد الصلاة في الجزائر اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Algeria, click the button below to visit the site",
      },
      Iraq: {
        name: "العراق",
        url_ar: "https://timesprayer.com/prayer-times-cities-iraq.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-iraq.html",
        description_ar:
          "للحصول على مواعيد الصلاة في العراق اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Iraq, click the button below to visit the site",
      },
      Sudan: {
        name: "السودان",
        url_ar: "https://timesprayer.com/prayer-times-cities-sudan.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-sudan.html",
        description_ar:
          "للحصول على مواعيد الصلاة في السودان اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Sudan, click the button below to visit the site",
      },
      Kuwait: {
        name: "الكويت",
        url_ar: "https://timesprayer.com/prayer-times-cities-kuwait.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-kuwait.html",
        description_ar:
          "للحصول على مواعيد الصلاة في الكويت اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Kuwait, click the button below to visit the site",
      },
      Qatar: {
        name: "قطر",
        url_ar: "https://timesprayer.com/prayer-times-cities-qatar.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-qatar.html",
        description_ar:
          "للحصول على مواعيد الصلاة في قطر اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Qatar, click the button below to visit the site",
      },
      Jordan: {
        name: "الأردن",
        url_ar: "https://timesprayer.com/prayer-times-cities-jordan.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-jordan.html",
        description_ar:
          "للحصول على مواعيد الصلاة في الأردن اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Jordan, click the button below to visit the site",
      },
      Lebanon: {
        name: "لبنان",
        url_ar: "https://timesprayer.com/prayer-times-cities-lebanon.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-lebanon.html",
        description_ar:
          "للحصول على مواعيد الصلاة في لبنان اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Lebanon, click the button below to visit the site",
      },
      Syria: {
        name: "لبنان",
        url_ar: "https://timesprayer.com/prayer-times-cities-syria.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-syria.html",
        description_ar:
          "للحصول على مواعيد الصلاة في سوريا اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Syria, click the button below to visit the site",
      },
      Oman: {
        name: "عمان",
        url_ar: "https://timesprayer.com/prayer-times-cities-oman.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-oman.html",
        description_ar:
          "للحصول على مواعيد الصلاة في عمان اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Oman, click the button below to visit the site",
      },
      Bahrain: {
        name: "البحرين",
        url_ar: "https://timesprayer.com/prayer-times-cities-bahrain.html",
        url_en: "https://timesprayer.com/en/prayer-times-cities-bahrain.html",
        description_ar:
          "للحصول على مواعيد الصلاة في البحرين اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Bahrain, click the button below to visit the site",
      },
      SOMALIA: {
        name: "الصومال",
        url_ar: "https://timesprayer.com/prayer-times-in-baidoa.html",
        url_en: "https://timesprayer.com/en/prayer-times-in-baidoa.html",
        description_ar:
          "للحصول على مواعيد الصلاة في الصومال اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in SOMALIA, click the button below to visit the site",
      },
      DJIBOUTI: {
        name: "جيبوتي",
        url_ar: "https://timesprayer.com/prayer-times-in-balbala.html",
        url_en: "https://timesprayer.com/en/prayer-times-in-balbala.html",
        description_ar:
          "للحصول على مواعيد الصلاة في جيبوتي اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in DJIBOUTI, click the button below to visit the site",
      },
      MutsamuduCOMOROS: {
        name: "جزر القمر",
        url_ar: "https://timesprayer.com/prayer-times-in-mutsamudu.html",
        url_en: "https://timesprayer.com/en/prayer-times-in-mutsamudu.html",
        description_ar:
          "للحصول على مواعيد الصلاة في جزر القمر اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Mutsamudu, COMOROS, click the button below to visit the site",
      },
      Mauritania: {
        name: "موريتانيا",
        url_ar: "https://timesprayer.com/prayer-times-cities-mauritania.html",
        url_en:
          "https://timesprayer.com/en/prayer-times-cities-mauritania.html",
        description_ar:
          "للحصول على مواعيد الصلاة في موريتانيا اضغط على الزر أدناه لزيارة الموقع",
        description_en:
          "To get prayer times in Mauritania, click the button below to visit the site",
      },
    };

    const selectedCountry = countries[country];

    if (!selectedCountry) {
      return interaction.reply({
        content: "❌ The selected country could not be found",
        flags: 64,
      });
    }

    const description =
      language === "ar"
        ? selectedCountry.description_ar
        : selectedCountry.description_en;
    const url =
      language === "ar" ? selectedCountry.url_ar : selectedCountry.url_en;

    const embedMessage = new EmbedBuilder()
      .setColor(0x00a3e0)
      .setTitle(language === "ar" ? "مواعيد الصلاة" : "Prayer Times")
      .setDescription(description);

    const button = new ButtonBuilder()
      .setLabel(
        language === "ar"
          ? "زيارة موقع مواعيد الصلاة"
          : "Visit Prayer Times Site"
      )
      .setStyle(ButtonStyle.Link)
      .setURL(url);

    const row = new ActionRowBuilder().addComponents(button);

    return interaction.reply({
      embeds: [embedMessage],
      components: [row],
      flags: 64,
    });
  },
};
