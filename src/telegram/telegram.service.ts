import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import * as TelegramBot from 'node-telegram-bot-api';
import { UsersService } from 'src/users/users.service';
// import User from 'src/users/entities/user.entity';
// import { Repository } from 'typeorm';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;

  constructor(
    private readonly userService: UsersService
    // @InjectRepository(User)
    // private readonly userService: Repository<User>
  ) {
    this.bot = new TelegramBot('7513402778:AAFEKvnyBtiyvQZVjaU70zGCcpiVor_nrx0', { polling: true });

    // Ожидание команды /start
    this.bot.onText(/\/start/, async (msg) => {

      const chatId = (msg.chat.id).toString();

      console.log(chatId)

      const userExist = await userService.findOneByTelegramId(chatId)

      console.log(userExist)

      if (userExist) {
        this.sendStartMessage(chatId, 'Вы вернулись!');
      } else {
        // const result = userService.create({ idTelegram: chatId, username: 'Guest', avatar: 'google.com' })
        this.sendStartMessage(
          chatId,
          `Добро пожаловать в Paradox!

Ты стал партнером нашего маркетингового агентства и теперь можешь строить собственный бизнес прямо здесь! Исследуй мир блогеров, собирай монеты, развивай пассивный доход и создавай стратегию, которая приведет тебя к успеху.

Совсем скоро мы объявим дату листинга токена, где твой прогресс будет оценен.

Не забывай приглашать друзей — вместе вы сможете зарабатывать еще больше!

Начни свой путь в Paradox уже сейчас!`);
      }

    });

    // // Ожидание команды /start
    // this.bot.onText(/\/start/, async (msg) => {

    //   const chatId = (msg.chat.id).toString();

    //   console.log(chatId)

    //   const userExist = await userService.findOneByTelegramId(chatId)

    //   console.log(userExist)

    //   if (userExist) {
    //     this.sendStartMessage(chatId, 'Вы вернулись!');
    //   } else {
    //     // const result = userService.updateOrCreate({ idTelegram: chatId, username: 'Guest', avatar: 'google.com' })
    //     this.sendStartMessage(chatId, 'Добро пожаловать!');
    //   }

    // });

    this.bot.on('message', async (msg: any) => {
      if (msg.web_app_data) {
        const webAppData = msg.web_app_data.data; // Получаем данные от Web App
        const referralId = webAppData.referral_id;

        if (referralId) {
          this.bot.sendMessage(msg.chat.id, `Вы пришли по реферальной ссылке с ID ${referralId}`);
        } else {
          this.bot.sendMessage(msg.chat.id, 'Запуск Web App без реферальной ссылки');
        }
      }
    });

  }


  // \n Если вас кто-то пригласил, пожалуйста, введите его telegram ID

  // Функция отправки сообщения с Web App кнопкой (синяя кнопка)
  sendStartMessage(chatId: string, msg = '') {
    console.log('ID!: ', chatId);

    const webAppUrl = `https://paradoxlive.pro`; // URL вашего Web App
    const telegramChannelUrl = `https://t.me/your_channel`; // URL вашего Telegram-канала

    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Играть',
              web_app: { url: webAppUrl }, // Web App синяя кнопка
            },
            {
              text: 'Подписаться на канал',
              url: telegramChannelUrl // Кнопка со ссылкой на ТГ-канал
            },
          ],
        ],
        resize_keyboard: true, // Automatically resize the keyboard
        one_time_keyboard: true, // Keyboard disappears after one use
      },
    };

    console.log('id: ', chatId);

    !msg
      ? this.bot.sendMessage(chatId, msg, options)
      : this.bot.sendMessage(chatId, msg, options);
}

}