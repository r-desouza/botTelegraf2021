const precios = require('../precios');

const handler = (bot, accion) => bot.action(accion, async ctx => {
    const { chat } = ctx;
    const { id: chatId } = chat;

    const ticket = {
        cliente: ctx.from.first_name,
        fecha: new Date().toLocaleString(),
        pedido: [],
        precioTotal: 0,
    };

    switch (accion){
        case 'hamburguesa': ticket.pedido.push(
            {
                nombre: "hamburguesa",
                precio: precios.hamburguesa.precio,
            }
        );
        ticket.precioTotal += precios.hamburguesa.precio;
        break;
        case 'lomito': ticket.pedido.push(
            {
                nombre: "lomito",
                precio: precios.lomito.precio,
            }
        );
        ticket.precioTotal += precios.lomito.precio;
        break;
        case 'pizza': ticket.pedido.push(
            {
                nombre: "pizza",
                precio: precios.pizza.precio,
            }
        );
        ticket.precioTotal += precios.pizza.precio;
        break;
        case 'generarTicket': ;
        break;
        case 'seguir': bot.command
    };

    console.log(ticket);

    let message = `Hiciste un pedido por: ${accion}\n Desea hacer otro pedido?`;

    await bot.telegram.sendMessage(chatId, message ,{
        reply_markup:{
            inline_keyboard:[
                [
                    {
                        text: "Seguir con el pedido",
                        callback_data: 'seguir'
                    },
                    {
                        text: "Finalizar pedido",
                        callback_data: 'generarTicket'
                    }
                ]
            ]
        }
    });

    // check accion y cfrear un pedido en base a ella
});

module.exports = { handleAccion: handler };