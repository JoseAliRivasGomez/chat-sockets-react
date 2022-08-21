import { useContext, useEffect, useState } from "react"
import { getEnvVariables } from "../helpers/getEnvVariables";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./ChatContext";
import { SocketContext } from "./SocketContext"

const {VITE_API_URL} = getEnvVariables();

export const SocketProvider = ({children}) => {

    const {socket, online, conectarSocket, desconectarSocket} = useSocket(VITE_API_URL);

    const {auth} = useContext(AuthContext);

    const {cargarUsuarios, nuevoMensaje} = useContext(ChatContext);

    useEffect(() => {
        if(auth.logged){
            conectarSocket();
        }
    }, [auth]);

    useEffect(() => {
        if(!auth.logged){
            desconectarSocket();
        }
    }, [auth]);

    useEffect(() => {
        socket?.on('lista-usuarios', (usuarios) => {
            cargarUsuarios(usuarios);
        })
        return () => {
            socket?.off('lista-usuarios');
        }
    }, [socket])

    useEffect(() => {
        socket?.on('mensaje-personal', (mensaje) => {
            nuevoMensaje(mensaje);
        })
        return () => {
            socket?.off('mensaje-personal');
        }
    }, [socket])
    

    return (
        <SocketContext.Provider value={{
            socket, 
            online,
        }}>
            {children}
        </SocketContext.Provider>
    )
}
