

class Sockets {

    constructor(io){
        this.io = io;

        this.socketEvents();
    }

    socketEvents(){

        this.io.on('connection', (socket) => { 

            console.log('Cliente conectado');

            // TODO: Validar el JWT 
            // Si el token no es válido, desconectar

            // TODO: Saber que usuario está activo mediante el UID

            // TODO: Emitir todos los usuarios conectados

            // TODO: Socket join, uid

            // TODO: Escuchar cuando el cliente manda un mensaje
            // mensaje-personal

            // TODO: Disconnect
            // Marcar en la BD que el usuario se desconecto
            // TODO: Emitir todos los usuarios conectados
        
            
        
            // socket.emit('mensaje-bienvenida', {
            //     msg: 'Bienvenido al servidor',
            //     fecha: new Date(),
            // });
        
            // socket.on('mensaje-cliente', (data) => {
            //     console.log(data);
            // });
        
        
        
        });

    }

}

module.exports = Sockets;