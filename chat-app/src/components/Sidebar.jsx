import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext"
import { SidebarChatItem } from "./SidebarChatItem"

export const Sidebar = () => {

    const {chatState} = useContext(ChatContext);
    const {auth} = useContext(AuthContext);


  return (
    <>
        <div className="inbox_chat">

            {
                chatState.usuarios.filter(usuario => usuario.uid !== auth.uid)
                .map((usuario) => (
                    <SidebarChatItem key={usuario.uid} usuario={usuario} />
                ))
            }

            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>


        </div>
    </>
  )
}
