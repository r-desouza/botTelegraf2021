//Documentación de telegraf: https://telegraf.js.org/

const { Telegraf } = require('telegraf');
const { TELEGRAF_TOKEN, GMAIL_PASSWORD, GMAIL_USER } = require('./utils/config');
const { handleAccion } = require('./actions/handler');
const bot = new Telegraf(TELEGRAF_TOKEN);
const precios = require('./precios')

const ticket = {
    cliente: "",
    fecha: new Date().toLocaleString(),
    pedido: [],
    precioTotal: 0,
};

bot.command('start', async ctx => {
    ticket.cliente = ctx.chat.first_name
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
                },
                    {
                    text: "Cancelar",
                    callback_data: 'cancelar'
                }]
            ]
        }
    })
});

bot.command('listo', async ctx => {
    await bot.telegram.sendMessage(ctx.chat.id, "Por favor confirme el pedido", {
    reply_markup: {
        inline_keyboard:
            [
            [{
            text: "confimar",
                callback_data: 'generarTicket',
            }]
        ]
    }
});

});

handleAccion(bot, 'hamburguesa', ticket);
handleAccion(bot, 'lomito', ticket);
handleAccion(bot, 'pizza', ticket);
handleAccion(bot,'generarTicket', ticket);
handleAccion(bot, 'cancelar', ticket);

bot.launch()
    .then(() => console.log('Bot online'))
    .catch(() => console.error('error al iniciar al bot'));

