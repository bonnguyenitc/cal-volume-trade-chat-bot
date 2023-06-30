import TelegramBot from 'node-telegram-bot-api';

let bot: TelegramBot | undefined;

if (!bot) {
  bot = new TelegramBot(process.env.NEXT_PUBLIC_TOKEN as string, { polling: true });
  bot.setWebHook('https://cal-volume-trade-chat-bot.vercel.app/api/webhook');
}

export default bot;
