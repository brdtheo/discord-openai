import "dotenv/config";
import chalk from "chalk";
import { Configuration, OpenAIApi } from "openai";
import { CommandInteraction } from "discord.js";

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_TOKEN,
});
export const openai = new OpenAIApi(configuration);

export const success = (title: string, text: unknown) => {
  return console.log(`${chalk.green.bold(title)} ${chalk.green(text)}`);
};

export const info = (title: string, text: unknown) => {
  return console.log(chalk.blueBright.bold(title), chalk.blueBright(text));
};

export const warn = (title: string, text: unknown) => {
  return console.log(chalk.yellow.bold(title), chalk.yellow(text));
};

export const error = (title: string, text: unknown) => {
  return console.log(chalk.red.bold(title), chalk.red(text));
};

export const contentErrorHandler = (interaction: CommandInteraction) => {
  return interaction.editReply(
    "It looks like I cannot generate the content you're looking for 😔"
  );
};

export const APIErrorHandler = (
  interaction: CommandInteraction,
  err: unknown
) => {
  const isUnauthorizedRequest = (err as Error).message.includes("400");
  const isCreditBlockedRequest = (err as Error).message.includes("409");

  warn(interaction.commandName, err);

  if (isUnauthorizedRequest) {
    return interaction.editReply(
      "The content you asked for is prohibited from the description you provided ⛔"
    );
  }
  if (isCreditBlockedRequest) {
    return interaction.editReply(
      "Oh no! It seems the assigned rate limit for the API has been hit 😰"
    );
  }
};
