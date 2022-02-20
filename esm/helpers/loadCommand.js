import { readdirSync } from "fs";

export const loadCommands = () => {
    const commands = new Map();

    readdirSync(`./commands`).forEach(async (file) => {
        if (file.endsWith('.js')) {
            const command = await import(`../commands/${file}`);
            if (!command.commands) return console.log(`${file} has no command(s)`);
            command.commands.forEach((commandName) => {
                commands.set(commandName, command.run);
                console.log(`Command loaded: ${commandName}`);
            });
        }
    });

    return commands;
};