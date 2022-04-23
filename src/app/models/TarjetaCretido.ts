export class TarjetaCredito {
    id?: string;
    titular: string;
    numero_tarjeta: string;
    fechaExpiracion: string;
    cvv: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;

    constructor(titular: string, numeroTarjeta: string, fechaExpiracion: string, cvv: number) {
        this.titular = titular;
        this.numero_tarjeta = numeroTarjeta;
        this.fechaExpiracion = fechaExpiracion;
        this.cvv = cvv;
        this.fechaCreacion = new Date();
        this.fechaActualizacion = new Date();
    }
}