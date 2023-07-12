import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import {
  error,
  openai,
  APIErrorHandler,
  contentErrorHandler,
} from "../utils.js";

export default {
  data: new SlashCommandBuilder()
    .setName("dall-e")
    .setDescription("Generate an image through Dall-e")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("A detailed description of your image")
        .setRequired(true)
    ),

  execute: async (interaction: CommandInteraction) => {
    try {
      if (!interaction) {
        return error(
          "dall-e InteractionCreate",
          "This interaction coud not be found"
        );
      }
      const userInput = interaction.options.get("text")?.value as string;

      if (!userInput || typeof userInput !== "string") {
        return error("dall-e", "userInput is not valid");
      }

      await interaction.deferReply();

      const createdImage = await openai.createImage({
        prompt: userInput,
        n: 1,
        size: "512x512",
        response_format: "url",
      });

      if (!createdImage.data?.data[0]?.url) {
        return contentErrorHandler(interaction);
      }

      await interaction.editReply(createdImage.data?.data[0]?.url);
    } catch (err) {
      return APIErrorHandler(interaction, err);
    }
  },
};
