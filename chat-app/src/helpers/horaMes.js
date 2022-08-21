import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');


export const horaMes = (fecha) => {
    const hoyMes = moment(fecha);

    return hoyMes.format('HH:mm a | MMMM Do');
}