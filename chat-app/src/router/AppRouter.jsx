import { Routes, Route, Navigate } from "react-router-dom";
import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {

    const status = 'not-authenticated-';

  return (
        <Routes>

            {
                (status === 'not-authenticated')
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
