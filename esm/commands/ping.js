export const commands = ['ping'];

export const run = async (message) => {
    message.channel?.sendMessage(`Pong! \`${message.client.websocket.ping}ms\``);
}