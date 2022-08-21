import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { SocketContext } from "../context/SocketContext";

export const SendMessage = () => {

    const [mensaje, setMensaje] = useState('');
    const {socket} = useContext(SocketContext);
    const {auth} = useContext(AuthContext);
    const {chatState} = useContext(ChatContext);

    const onChange = ({target}) => {
        setMensaje(target.value);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        if(mensaje.length === 0) return;

        socket.emit('mensaje-personal', {
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje
        });

        setMensaje('');
    }

  return (
    <>
        <form onSubmit={onSubmit}>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input type="text" className="write_msg" placeholder="Mensaje..." value={mensaje} onChange={onChange} />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        Enviar
                    </button>
                </div>
            </div>
        </form>
    </>
  )
}
