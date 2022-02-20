import { CommandRunFunction } from "../helpers/loadCommand";

export const commands = ['ping'];

export const run: CommandRunFunction = async (message) => {
    message.channel?.sendMessage(`Pong! \`${message.client.websocket.ping}ms\``);
}