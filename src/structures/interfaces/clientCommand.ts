export interface clientCommand {
    name: string;
    execute: (ctx: any) => any;
}