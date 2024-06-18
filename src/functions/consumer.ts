import { bot } from 'src';
import { RabbitMsg } from '../types/rabbit'

const users: number[] = [
    173199779
]

const consumer = (_msg: RabbitMsg) => {
    console.log('[consumer] Telegram');
    console.log(_msg);
    switch(_msg.format) {
        case 'string':
            send(JSON.stringify(_msg.payload))
            break;
        case 'json':
            send(JSON.stringify(_msg.payload))
            break;
        case 'table':
            send(JSON.stringify(_msg.payload))
            break;
        default:
            console.log('_msg does not have a format')
    }    
}

const send = (_string: string) => {
    for(const user of users) {
        bot.telegram.sendMessage(user, _string);
    }
}

export default consumer;