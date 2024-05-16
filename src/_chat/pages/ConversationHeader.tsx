import { Models } from "appwrite";
import UserAvatar2 from "./UserAvatar2";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";



type CnvProps = {
    selectedCnv: Models.Document;
  };

const ConversationHeader = ({ selectedCnv }: CnvProps) => {

    const { user } = useUserContext();

  return (
    <div className="p-3 flex justify-between items-center border-b border-slate-700 ">
        <div className="flex items-center gap-3 ">
            <div  className="inline-block sm:hidden">
              <Button onClick={() => {
                 window.location.reload();
                }}>
              
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" /></svg>
              </Button>
            </div>
            <UserAvatar2 user={selectedCnv.user1.$id === user.id ? selectedCnv.user2 : selectedCnv.user1}/>
        </div>  
    </div>
  )
}

export default ConversationHeader