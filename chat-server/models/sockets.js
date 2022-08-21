const { comprobarJWT } = require("../helpers/jwt");
const {usuarioConectado, usuarioDesconectado, getUsuarios, guardarMensaje} = require('../controllers/sockets.controller');

class Sockets {

    constructor(io){
        this.io = io;

        this.socketEvents();
    }

    socketEvents(){

        this.io.on('connection', async (socket) => { 

            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);

            if(!valido){
                console.log('Socket no identificado');
                return socket.disconnect();
            }

            const usuario = await usuarioConectado(uid);

            console.log(`Cliente conectado: ${uid}, ${usuario.nombre}`);

            socket.join(uid); //Se una a una sala de socket.io

            // TODO: Validar el JWT 
            // Si el token no es válido, desconectar

            // TODO: Saber que usuario está activo mediante el UID

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());

            // TODO: Socket join, uid

            // TODO: Escuchar cuando el cliente manda un mensaje
            // mensaje-personal
            socket.on('mensaje-personal', async (payload) => {
                const mensaje = await guardarMensaje(payload);
                this.io.to(payload.para).emit('mensaje-personal', mensaje);
                this.io.to(payload.de).emit('mensaje-personal', mensaje);
            })

            // TODO: Disconnect
            // Marcar en la BD que el usuario se desconecto
            // TODO: Emitir todos los usuarios conectados
        
            socket.on('disconnect', async () => {
                console.log(`Cliente desconectado: ${uid}, ${usuario.nombre}`);

                await usuarioDesconectado(uid);

                this.io.emit('lista-usuarios', await getUsuarios());
            })
            
        
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