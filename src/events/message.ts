import { clientEvent } from '../structures/interfaces/interfaces.js';
import { Context, NarrowedContext } from 'telegraf';
import { Update, Message } from '@telegraf/types';

const messageEvent: clientEvent = {
	eventName: 'text',
	async execute(ctx: NarrowedContext<Context, Update.MessageUpdate<Message.TextMessage>>) {
		const messageText = ctx.message.text;
		if (messageText.toLowerCase() === 'привет') {
			await ctx.reply('Привет! Чем могу помочь?');
		}
	},
};

export default messageEvent;