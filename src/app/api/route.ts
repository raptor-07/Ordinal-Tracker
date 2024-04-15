import TelegramBot from "node-telegram-bot-api";

export async function POST(req: Request, res: Response) {

    // I am not sure if we have to configure bot to hit this endpoint??
    // alternatively we can add this endpoint in nestJS app as well and handle adding telegram Id logic from that backend



    //The following code is my naive attempt at copying the telegram bot code from the stokastix project


    
    // const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    // const bot = new TelegramBot(telegramToken || '', { polling: true });

    // bot.on('message', (msg) => {
    //     //on message event -> get userId from telegram message -> check the user in the db -> if user exists, add telegramId to the user

    //     // if (msg.text && msg.text.startsWith('/start')){
    //     //     const commandParts = msg.text.split(' ');

    //     //     if (commandParts.length === 2) {
    //     //         const userId = parseInt(commandParts[1], 10);
    //     //         if (!isNaN(userId)) {
                  
    //     //         }
    //     //     }
    //     // }

    //     //here the start={userId} is a string created by prisma in the db that uniquely identifies the user

    //     //
    // });
}