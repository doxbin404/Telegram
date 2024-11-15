import { clientCommand } from '../structures/interfaces/interfaces.js';

const startCommand: clientCommand = {
	name: 'start',
	async execute(ctx) {
		ctx.reply('Привет! Это команда /start.');
	},
};

export default startCommand;