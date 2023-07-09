import "dotenv/config";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";

import { info, error } from "./utils.js";
import COMMANDS from "./commands/index.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
// @ts-ignore
client.commands = new Collection();

COMMANDS.forEach((command) => {
  // @ts-ignore
  client.commands.set(command.data.name, command);
});

client.once(Events.ClientReady, (client) => {
  info("app.ts", `${client.user.tag} ready 🚀`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return error(
      "InteractionCreate",
      "This interaction is not a chat input command"
    );
  }
  if (!interaction) {
    return error("InteractionCreate", "This interaction coud not be found");
  }
  // @ts-ignore
  const command = client.commands.get(interaction.commandName);

  if (!command) {
    return;
  }

  try {
    await command.execute(interaction);
  } catch (err) {
    error("InteractionCreate", err);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
