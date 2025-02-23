module.exports = {
  name: "help",
  description: "Displays help instructions for using the bot",
  options: [
    {
      name: "language",
      type: 3,
      description: "Choose the language for the help instructions",
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
    const language = interaction.options.getString("language");

    let responseMessage = "";

    if (language === "ar") {
      responseMessage = `
**أوامر البوت**

1. **/إذاعة_القرأن**: اختر محطة راديو لتشغيلها في القناة الصوتية
2. **/إعدات_قناة_الازاعة**: اجعل البوت ينضم إلى القناة الصوتية المختارة
3. **/إعداد_إلاذكار**: إعداد قناة نصية ووقت إرسال الأذكار اليومية
4. **/توقيت_إلصلاة**: عرض توقيت الصلاة
5. **/سؤال**: للعبة الاسئلة الدينية
6. **/إذكار**: عرض أذكار الصباح أو المساء مع التكرار
7. **/المصحف_المرتل**: عرض عرض المصحف المرتل

ألدعم الفنى: https://discord.gg/witon
            `;
    } else if (language === "en") {
      responseMessage = `
**Bot Commands**

1. **/radio_select**: Choose a radio station to play in the voice channel
2. **/select_voice**: Make the bot join the selected voice channel
3. **/setup_azkar**: Set up a text channel and interval for daily azkar
4. **//prayer_times**: Prayer timing display
5. **/games**: The game of religious questions
6. **/adhkar**: Display morning or evening adhkar with a count
7. **/recited Quran**: View recited Quran recitation

Technical support: https://discord.gg/witon
            `;
    }

    return interaction.reply({
      content: responseMessage,
      flags: 64,
    });
  },
};
