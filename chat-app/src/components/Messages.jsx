import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import { IncomingMessage } from "./IncomingMessage"
import { OutgoingMessage } from "./OutgoingMessage"
import { SendMessage } from "./SendMessage"

export const Messages = () => {

    const {chatState} = useContext(ChatContext);
    const {auth} = useContext(AuthContext);


  return (
    <>
        <div className="mesgs">

            <div id="mensajesDiv" className="msg_history">

                {
                    chatState.mensajes.map((msg) => (
                        (msg.para === auth.uid)
                        ?   <IncomingMessage key={msg._id} msg={msg} />
                        :   <OutgoingMessage key={msg._id} msg={msg} />
                    ))
                }


            </div>

            <SendMessage />

        </div>
    </>
  )
}
