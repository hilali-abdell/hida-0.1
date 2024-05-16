
import { Models } from "appwrite";
import { Link } from "react-router-dom";


type CnvProps = {
    comment: Models.Document;
    createdBy : Models.Document;
};

const CommentItem = ({ comment,createdBy }: CnvProps) => {


  return (
    <div className={"chat chat-start" }>

        <div className="chat-header">
            {createdBy.name}<time className="text-xs opacity-50 ml-2">{new Date(comment.$createdAt).toLocaleString()}</time>
        </div>
        <div className={"gap-2 chat-bubble relative flex items-center"}>
            <Link to={`/profile/${createdBy.$id}`} className="flex gap-4 items-center "><img
                src={createdBy.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="profile"
                className="h-7 w-7 rounded-full"
            /></Link>
            <div className="chat-message">
                <div className="chat-message-content">
                    {comment.comment}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CommentItem