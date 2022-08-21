import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {

    const {auth, verificarToken} = useContext(AuthContext);

    useEffect(() => {
      verificarToken();
    }, [])

    if (auth.checking){
        return <></>
    }

  return (
        <Routes>

            {
                (!auth.logged)
                ? (
                <>
                    <Route path="/*" element={<AuthRouter />} />
                </>
                ) : (
                <>
                    <Route path="/" element={<ChatPage />} />
                    <Route path="/*" element={<Navigate to='/' />} />
                </>
                )
            }
            
        </Routes>
  )
}
