import { clientCommand } from '../structures/interfaces/interfaces.js';

const scheduleCommand: clientCommand = {
    name: 'schedule',
    async execute(ctx) {
        const imagePath = 'image\image.jpg'; 

        await ctx.replyWithPhoto({ source: imagePath });
    },
};

export default scheduleCommand;
