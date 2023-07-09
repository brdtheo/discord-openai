import "dotenv/config";
import chalk from "chalk";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_TOKEN,
});
export const openai = new OpenAIApi(configuration);

export const success = (title: string, text: unknown) => {
  return console.log(`${chalk.green.bold(title)} ${chalk.green(text)}`);
};

export const info = (title: string, text: unknown) => {
  return console.log(`${chalk.blueBright.bold(title)}`, chalk.blueBright(text));
};

export const warn = (title: string, text: unknown) => {
  return console.log(`${chalk.yellow.bold(title)} ${chalk.yellow(text)}`);
};

export const error = (title: string, text: unknown) => {
  return console.log(`${chalk.red.bold(title)} ${chalk.red(text)}`);
};
