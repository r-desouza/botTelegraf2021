const precios = require('../precios');

const handler = (bot, accion, ticket) => bot.action(accion, async ctx => {
    const { chat } = ctx;
    const { id: chatId } = chat;
    let flag = 0;

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
        case 'generarTicket':
            await bot.telegram.sendMessage(chatId, `Ticket: \n ${ticket.pedido} \n Precio final: ${ticket.precioTotal}`);
            flag = 1;
        break;
        case 'cancelar':
            await bot.telegram.sendMessage(chatId, "Pedido Cancelado, use /hacerpedido para volver a realizar un pedido");
            flag = 1;
        break;
    };

    if(flag == 0) {
        let message = `Hiciste un pedido por: ${accion}\n Para finalizar con sus pedidos use el comando /listo`;
        await bot.telegram.sendMessage(chatId, message);
    }
});

module.exports = { handleAccion: handler };