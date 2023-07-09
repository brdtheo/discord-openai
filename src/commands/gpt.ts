import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { error, info, openai } from "../utils.js";

export default {
  data: new SlashCommandBuilder()
    .setName("gpt")
    .setDescription("Send a text to ChatGPT")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The input to send to ChatGPT")
        .setRequired(true)
    ),

  execute: async (interaction: CommandInteraction) => {
    try {
      if (!interaction) {
        return error(
          "gpt InteractionCreate",
          "This interaction coud not be found"
        );
      }
      const userInput = interaction.options.get("text")?.value as string;

      if (!userInput || typeof userInput !== "string") {
        return error("gpt", "userInput is not a string");
      }

      await interaction.deferReply({});

      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
      });

      if (!chatCompletion.data?.choices[0]?.message?.content) {
        return interaction.editReply(
          "Whoops! It seems I could not find an answer to that question 😬"
        );
      }

      await interaction.editReply(
        chatCompletion.data.choices[0].message?.content
      );
    } catch (err) {
      error("gpt", err);
      return interaction.editReply(
        "Oh no! It seems that the assigned rate limit for the API has been hit 😰"
      );
    }
  },
};
