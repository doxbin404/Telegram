import { clientCommand } from '../structures/interfaces/interfaces.js';

const startCommand: clientCommand = {
	name: 'chat',
	async execute(ctx) {
		ctx.reply('Привет! Это команда /chat, у меня еще есть команда /start, /help и /continue.');
	},
};

export default startCommand;