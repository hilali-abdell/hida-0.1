import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";


type CnvProps = {
    message: Models.Document;
    sendBy : Models.Document;
};

const MessageItem = ({ message,sendBy }: CnvProps) => {

    const { user } = useUserContext();


  return (
    <div className={user.id ===sendBy.$id ? "chat chat-end " :"chat chat-start"}>

        <div className="chat-header">
            <time className="text-xs opacity-50 ml-2">{new Date(message.$createdAt).toLocaleString()}</time>
        </div>
        <div className={user.id ===sendBy.$id ? "chat-bubble relative chat-bubble-info flex gap-2 items-center " :"gap-2 chat-bubble relative flex items-center"}>
            <Link to={`/profile/${sendBy.$id}`} className="flex gap-4 items-center "><img
                src={sendBy.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="profile"
                className="h-7 w-7 rounded-full"
            /></Link>
            <div className="chat-message">
                <div className="chat-message-content">
                    {message.body}
                </div>
            </div>
        </div>
    </div>
  )
}

export default MessageItem