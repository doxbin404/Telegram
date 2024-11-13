import { clientCommand } from '../structures/interfaces/interfaces.js';

const startCommand: clientCommand = {
	name: 'start',
	async execute(ctx) {
		ctx.reply('Привет! Это команда /help, у меня еще есть команда /start.');
	},
};

export default startCommand;