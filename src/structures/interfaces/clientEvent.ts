export interface clientEvent {
	eventName: string;
    execute: (ctx: any) => Promise<void>;
}