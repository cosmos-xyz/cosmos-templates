import { CosmosClient } from "@cosmos-xyz/cosmos";
import { loadCommands } from "./helpers/loadCommand";
import { config } from "dotenv";

config();

const client = new CosmosClient({
    revoltOpt: {
        autoReconnect: true
    }
});

const commands = loadCommands();

client.on("message", async (message) => {
    if (message.author?.bot?.owner) return;
    if (!message.content || typeof message.content !== "string") return;

    const args = message.content.slice(process.env.PREFIX!.length).split(/ +/);
    const commandName = args.shift();
    if (!commandName) return;

    const run = commands.get(commandName);
    if (!run) return;
    run(message, commandName);
});

client.on("ready", () => {
    console.log("Bot ready 🚀!");
});

client.login({ type: "BOT", token: process.env.TOKEN });