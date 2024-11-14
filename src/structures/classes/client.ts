import * as dotenv from 'dotenv';
import { Telegraf, Context } from 'telegraf';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

dotenv.config();

export default class Client {
	private client: Telegraf<Context>;
	constructor() {
		if (!process.env.TELEGRAM_BOT_TOKEN) {
			throw new Error('Missing TELEGRAM_BOT_TOKEN environment variable');
		}
		this.client = new Telegraf(`${process.env.TELEGRAM_BOT_TOKEN!}`);
		this.loadCommands();
		this.loadEvents();
	}

	private loadCommands(): void {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		const commandsPath = path.resolve(__dirname, '../../commands');

		fs.readdirSync(commandsPath).forEach(async (file) => {
			if (file.endsWith('.ts') || file.endsWith('.js')) {
				try {
					const filePath = pathToFileURL(path.join(commandsPath, file)).href;
					const commandModule = await import(filePath);
					const command = commandModule.default;

					// Валидация структуры команды
					if (!command || typeof command.name !== 'string' || typeof command.execute !== 'function') {
						console.error(`Invalid command in file ${file}: missing 'name' or 'execute' function.`);
						return;
					}

					this.client.command(command.name, command.execute);
				}
				catch (error) {
					console.error(`Failed to load command from file ${file}:`, error);
				}
			}
		});
	}

	private loadEvents(): void {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		const eventsPath = path.resolve(__dirname, '../../events');

		fs.readdirSync(eventsPath).forEach(async (file) => {
			if (file.endsWith('.ts') || file.endsWith('.js')) {
				try {
					const filePath = pathToFileURL(path.join(eventsPath, file)).href;
					const eventModule = await import(filePath);
					const event = eventModule.default;

					if (event && event.eventName && event.execute) {
						this.client.on(event.eventName, event.execute);
					}
					else {
						console.error(`Event in file ${file} is not properly defined.`);
					}
				}
				catch (error) {
					console.error(`Failed to load event from file ${file}:`, error);
				}
			}
		});
	}

	public async start() {
		try {
			this.client.launch();
			console.log('Bot has been started');
		}
		catch (error) {
			console.error('Failed to start the bot:', error);
		}
	}
}