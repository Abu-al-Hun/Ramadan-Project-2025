const {  
  ActionRowBuilder,  
  ButtonBuilder,  
  ButtonStyle,  
  AttachmentBuilder,  
} = require("discord.js");  
const path = require("path");  
const { createCanvas, loadImage } = require("canvas");  
const fs = require("fs");  

const questionsPath = path.resolve(  
  __dirname,  
  "..",  
  "..",  
  "src",  
  "data",  
  "questions",  
  "questions.json"  
);  
const iconPath = path.resolve(__dirname, "..", "Image", "Icon.png");  

module.exports = {  
  name: "سؤال",  
  description: "إسئلة دينية",  
  options: [],  

  async execute(interaction) {  
    await interaction.deferReply();

    const questions = JSON.parse(fs.readFileSync(questionsPath, "utf-8"));  
    const randomIndex = Math.floor(Math.random() * questions.length);  
    const questionData = questions[randomIndex];  

    const question = questionData.question;  
    const answers = questionData.answers;  
    const correctAnswer = questionData.correctAnswer;  

    const image = await loadImage(iconPath);  
    const canvas = createCanvas(image.width, image.height);  
    const ctx = canvas.getContext("2d");  

    ctx.drawImage(image, 0, 0);  
    ctx.font = "30px Arial";  
    ctx.fillStyle = "white";  
    ctx.textAlign = "center";  

    const x = canvas.width / 2;
    const y = 150;  

    const wrapText = (text, ctx, x, y, maxWidth) => {
      const words = text.split(" ");
      let line = "";
      let lineHeight = 40;
      let lines = [];
  
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const testWidth = ctx.measureText(testLine).width;
  
        if (testWidth > maxWidth && i > 0) {
          lines.push(line);
          line = words[i] + " ";
        } else {
          line = testLine;
        }
      }
  
      lines.push(line);
      lines.forEach((lineText, index) => {
        ctx.fillText(lineText, x, y + index * lineHeight);
      });
    };
    
    const maxWidth = canvas.width - 40;
    wrapText(question, ctx, x, y, maxWidth);

    const buffer = canvas.toBuffer();  

    const attachment = new AttachmentBuilder(buffer, {  
      name: "quiz-image.png",  
    });  

    const sentMessage = await interaction.editReply({  
      content: "",  
      files: [attachment],  
      components: [  
        new ActionRowBuilder().addComponents(  
          answers.map((answer, index) => {  
            return new ButtonBuilder()  
              .setCustomId(`answer_${index}`)  
              .setLabel(answer)  
              .setStyle(ButtonStyle.Primary);  
          })  
        ),  
      ],  
    });  

    const filter = (i) => i.user.id === interaction.user.id;  
    const collector = interaction.channel.createMessageComponentCollector({  
      filter,  
      time: 30000,  
    });  

    let isAnswered = false;  

    collector.on("collect", async (i) => {  
      if (isAnswered) return;  

      await sentMessage.edit({  
        components: [],  
      });  

      const userMention = `<@${i.user.id}>`;  

      if (i.customId === `answer_${answers.indexOf(correctAnswer)}`) {  
        await i.reply({ content: `${userMention} إجابة صحيحة` });  
      } else {  
        await i.reply({ content: `${userMention} إجابة خطأ` });  
      }  

      isAnswered = true;  
    });  

    collector.on("end", async (collected, reason) => {  
      if (reason === "time" && !isAnswered) {  
        await interaction.followUp({ content: "انتهت مهلة الاجابة" });  
      }  

      if (!isAnswered) {  
        await sentMessage.edit({  
          components: [],  
        });  
      }  
    });  
  },  
};
