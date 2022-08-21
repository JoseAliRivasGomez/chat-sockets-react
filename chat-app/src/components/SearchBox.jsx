import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext";

export const SearchBox = () => {

    const {auth, logout} = useContext(AuthContext);
    const {vaciarChat} = useContext(ChatContext);

    const hacerLogout = () => {
        vaciarChat();
        logout();
    }

  return (
    <>
        <div className="headind_srch">
            <div className="recent_heading mt-2">
                <h4>{auth.name}</h4>
            </div>
            <div className="srch_bar">
                <div className="stylish-input-group">
                    <button className="btn text-danger" onClick={hacerLogout}>
                        Salir
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}
