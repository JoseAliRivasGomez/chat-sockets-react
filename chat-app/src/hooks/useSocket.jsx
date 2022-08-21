import { useCallback, useMemo } from 'react';
import io from 'socket.io-client';
import { useEffect, useState } from 'react'


export const useSocket = (serverPath) => {

    const [socket, setSocket] = useState(null);

    const [online, setOnline] = useState(false);

    const conectarSocket = useCallback(() => {
        const token = localStorage.getItem('token');
        const socketTemp = io.connect(serverPath, {
                transports: ['websocket'],
                autoConnect: true,
                forceNew: true,
                query: {
                    'x-token': token
                }
        })
        setSocket(socketTemp);
    },[serverPath]);

    const desconectarSocket = useCallback(() => {
        socket?.disconnect();
    },[socket]);

    useEffect(() => {

        return () => {
          socket?.disconnect();
        }
    }, [])
  
    useEffect(() => {
        setOnline(socket?.connected);
    }, [socket]);

    useEffect(() => {
        socket?.on('connect', () => {
            setOnline(true);
        });
        //return socket.disconnect();
    }, [socket])

    useEffect(() => {
        socket?.on('disconnect', () => {
            setOnline(false);
        })
    }, [socket])

    return {
        conectarSocket,
        desconectarSocket,
        socket,
        online
    }

}
