
import { useReducer } from "react";
import { scrollToBottom, scrollToBottomAnimated } from "../helpers/scrollToBottom";
import { types } from "../types/types";
import { ChatContext } from "./ChatContext";
import { chatReducer } from "./chatReducer";

const initialState = {
    uid: '',
    chatActivo: null,
    usuarios: [],
    mensajes: [],
}

export const ChatProvider = ({children}) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState);

    const cargarUsuarios = (usuarios) => {
        dispatch({
            type: types.usuariosCargados,
            payload: usuarios
        });
    }

    const activarChat = (uid) => {
        dispatch({
            type: types.activarChat,
            payload: uid
        });
    }

    const nuevoMensaje = (mensaje) => {
        dispatch({
            type: types.nuevoMensaje,
            payload: mensaje
        });

    }

    const cargarMensajes = (mensajes) => {
        dispatch({
            type: types.cargarMensajes,
            payload: mensajes
        });
        scrollToBottom('mensajesDiv');
    }

    const vaciarChat = () => {
        dispatch({
            type: types.logout,
        });
    }

    return (
        <ChatContext.Provider value={{
            chatState,
            cargarUsuarios,
            activarChat,
            nuevoMensaje,
            cargarMensajes,
            vaciarChat
        }}>
            {children}
        </ChatContext.Provider>
    )
}
