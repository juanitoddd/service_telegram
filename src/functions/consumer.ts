import { bot } from 'src';
import { RabbitMsg } from '../types/rabbit'

const consumer = (_msg: RabbitMsg) => {
    console.log('[consumer] Telegram');
    console.log(_msg);
    bot.telegram.sendMessage(173199779, JSON.stringify(_msg));
}

export default consumer;