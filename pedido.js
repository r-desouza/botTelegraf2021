export class Ticket {
    numeroDeTicket: number;

    pedido: [];

    total = this.pedido.reduce((prev,cur) => prev + cur.precio);

    constructor(numeroDeTicket, pedido) {
        this.numeroDeTicket = numeroDeTicket;
        this.pedido = pedido;
    }
}

export class Pedido{
    nombreComida: string;
    precio: string;
}
