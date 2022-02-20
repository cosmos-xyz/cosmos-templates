import { readdirSync } from "fs";
import { Message } from "revolt.js/dist/maps/Messages";

export interface CommandRunFunction {
    (message: Message, commandName: string): void;
}

export const loadCommands = () => {
    const commands = new Map<string, CommandRunFunction>();
    
    readdirSync((process.cwd().endsWith("dist") ? `./commands` : `./dist/commands`)).forEach(async (file) => {
        if (file.endsWith('.js')) {
            const command = await import(`../commands/${file}`);
            if (!command.commands) return console.log(`${file} has no command(s)`);
            command.commands.forEach((commandName: string) => {
                commands.set(commandName, command.run);
                console.log(`Command loaded: ${commandName}`);
            });
        }
    });

    return commands;
};