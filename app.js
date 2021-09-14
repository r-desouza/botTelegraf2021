//Documentación de telegraf: https://telegraf.js.org/

const { Telegraf } = require('telegraf');
const { TELEGRAF_TOKEN, GMAIL_PASSWORD, GMAIL_USER } = require('./utils/config');
const { handleAccion } = require('./actions/handler');
const bot = new Telegraf(TELEGRAF_TOKEN);
const precios = require('./precios')

bot.command('start', async ctx => {
    await bot.telegram.sendMessage(ctx.chat.id, "Bienvenido a la rotiseria! Los comandos disponibles son:\n /hacerpedido")
});

bot.command('hacerpedido', async ctx => {
    let message = `Seleccione lo que desea pedir`;
    ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard:
            [
                [{
                    text: `Hamburguesa ${precios.hamburguesa.precio}`,
                    callback_data: 'hamburguesa'
                },
                {
                    text: `Lomito ${precios.lomito.precio}`,
                    callback_data: 'lomito'
                },
                {
                    text: `Pizza ${precios.pizza.precio}`,
                    callback_data: 'pizza'
                }]
            ]
        }
    })
});

handleAccion(bot, 'hamburguesa');
handleAccion(bot, 'lomito');
handleAccion(bot, 'pizza');

bot.launch()
    .then(() => console.log('Bot online'))
    .catch(() => console.error('error al iniciar al bot'));

