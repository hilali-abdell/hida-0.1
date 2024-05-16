import { databases, appwriteConfig, client } from "@/lib/appwrite/config";
import { useEffect, useRef, useState } from "react";
import { ID,Query, Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext";
import CommentItem from "@/components/shared/CommentItem";


type CnvProps = {
  post: Models.Document;
};

const Comments = ({ post }: CnvProps) => {
  const [messages, setMessages] = useState<Models.Document[]>([]);
  const [messageBody, setMessageBody] = useState("");
  const { user } = useUserContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  useEffect(() => {
    getMessages();
    
    const unsubscribe = client.subscribe(`databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messagesCollectionId}.documents`, response => {

      if(response.events.includes("databases.*.collections.*.documents.*.create")){
          setMessages(prevState => [ ...prevState,response.payload as Models.Document])
      }

      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
          setMessages(prevState => prevState.filter(message => message.$id !== (response.payload as Models.Document).$id))
      }
    });

    return () => {
      unsubscribe();
    };
    
  },[messages]);


  let payload = {
    post :post.$id,
    user :user.id,
    comment : messageBody
  }


  /*const deleteMessage = async (message_id) => {
    await databases.deleteDocument(appwriteConfig.databaseId,appwriteConfig.messagesCollectionId, message_id);
 } */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await databases.createDocument(appwriteConfig.databaseId,appwriteConfig.commentsCollectionId,ID.unique(),payload)
    if(!response){console.log("can't send comment")}
    setMessageBody("")
    scrollToBottom()
  }

  const getMessages = async () => {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.commentsCollectionId,
        [Query.equal("post", post.$id),Query.orderDesc('$createdAt')]
      );
      setMessages(response.documents);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
    
  };

  

  return (
    <>
      <div className="max-h-40 overflow-x-hidden overflow-scroll   md:px-8 lg:p-1 custom-scrollbar">
        {messages===null ? (
          <div className="flex justify-center items-center h-full ">
            <div className="text-lg text-slate-200 ">
              No yet Comments To Show !
            </div>
          </div>
        ):(
          <div className="">
            <div ref={messagesEndRef}></div>
            {messages.map((message : Models.Document) => (
              <CommentItem key={message.$id} comment={message} createdBy={message.user}/>
            ))
            } 
          </div>

        )}
      </div>
      <div className="flex flex-wrap items-start border-t border-slate-700 py-3 ">
        <div className="order-2 flex-1 xs:flex-none xs:order-1 p-2">
          <button className="p-1 text-gray-400 hover:text-gray-300 relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 0 1 5.91 15.66l7.81-7.81a.75.75 0 0 1 1.061 1.06l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z" clipRule="evenodd" /></svg>
            <input type="file" multiple className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer "/>
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-300 relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"> <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" /></svg>
            <input type="file" multiple accept="image/*"className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer "/>
          </button>
        </div>
        <div className="order-1 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0 xs:order-2 flex-1 relative">
          <form id="message--form" onSubmit={handleSubmit}>
            <div className="flex">
              <textarea 
                placeholder="Say something..." 
                onChange={(e) => {setMessageBody(e.target.value)}}
                value={messageBody}
                rows={1}
              ></textarea>
              <div className="btn bg-primary-500 ">
                <input className="" type="submit" value="send"/>
              </div>
            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default Comments;
