import "dotenv/config";
import { REST, Routes } from "discord.js";

import { info, error, success } from "./utils.js";
import ALL_COMMANDS from "./commands/index.js";

(async () => {
  try {
    if (
      !process.env.DISCORD_TOKEN ||
      !process.env.APP_ID ||
      !process.env.GUILD_ID
    ) {
      return;
    }
    const commands = ALL_COMMANDS.map((command) => command.data);

    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    info("Register commands", "Started...");

    await rest.put(
      Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
      { body: commands }
    );

    success("Register commands", "done");
  } catch (err) {
    error("Register commands", err);
  }
})();
