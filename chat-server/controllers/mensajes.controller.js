const Mensaje = require('../models/mensaje');

const obtenerChat = async( req, res ) => {

    const miId = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find({
        $or: [
            { de: miId, para: mensajesDe },
            { de: mensajesDe, para: miId },
        ]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

    const last30Reverse = last30.reverse();

    res.json({
        ok: true,
        mensajes: last30Reverse
    });


}

module.exports = {
    obtenerChat
}