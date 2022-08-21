import { AppRouter } from "./router/AppRouter"
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketProvider";
import { ChatProvider } from "./context/ChatProvider";


function App() {



  return (
    <>
      <AuthProvider>
        <ChatProvider>
          <SocketProvider>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
          </SocketProvider>
        </ChatProvider>
      </AuthProvider>
    </>
  )
}

export default App
