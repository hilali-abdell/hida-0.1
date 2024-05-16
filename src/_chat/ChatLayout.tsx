
import { useUserContext } from "@/context/AuthContext";
import { useGetCnvByUsers, useGetUserConversations } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import UserAvatar from "./pages/UserAvatar";
import Conversation from "./pages/Conversation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import NewUserModal from "./pages/NewUserModal";




const ChatLayout = () => {

  const { user } = useUserContext();
  const { data :cnvss } = useGetUserConversations(user.id)
  const [searchCnvValue1, setSearchCnvValue1] = useState("");
  const [searchCnvValue2, setSearchCnvValue2] = useState("");
  const { data: cnvSelected} = useGetCnvByUsers(searchCnvValue1,searchCnvValue2|| "");
  const [showNewUserModal,setShowNewUserModal] = useState(false)


  useEffect(() => {

  }, [showNewUserModal,searchCnvValue1,searchCnvValue2,cnvss]);

  return (
    <>
    <div className=" flex-1  w-full flex overflow-hidden">
      {!showNewUserModal &&
      <div className={cnvSelected  ? "transition-all  hidden sm:flex bg-slate-800 flex flex-col overflow-hidden  ":"transition-all  sm:w-[220px] md:w-[300px] bg-slate-800 flex-1 overflow-hidden "}>
        <div className="flex  items-center justify-between py-2 px-3 text-xl font-meduim">
          <div>
          <img
            src="../../public/assets/icons/chat.svg"
            alt="logo"
            width={50}
            height={20}
          />
          </div>
          Conversations :
          <div className="tooltip tooltip-left" data-tip="Create New Conversation">
            <button className="text-gray-400 hover: text-gray-200"
            onClick={() => setShowNewUserModal(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
              </svg>              
            </button>
          </div>
        </div>
        <div className="p-3">
          <Input
            type="text"
            placeholder="Search"
            className="w-full"
          />
        </div>
        <div className="flex-1 overflow-auto">
          {cnvss === null ? (
            <p className="text-light-4">No available Conversations !</p>
            ) : (
            cnvss?.documents.map((cnv: Models.Document) => (
              <li key={cnv.$id} className={"grap-10 flex-1 min-w-[200px] w-full"}>
                <Button className={ cnvSelected?.documents[0].$id===cnv.$id  ? "w-full flex items-center justify-start  bg-primary-500  hover:bg-primary-500":"w-full flex items-center justify-start    hover:bg-primary-500"}
                  onClick={() => {
                  setSearchCnvValue1(cnv.user1.$id);
                  setSearchCnvValue2(cnv.user2.$id);
                  }}>
                  <div className="flex flex-row-reverse items-center">
                  <UserAvatar user={cnv.user1.$id === user.id ? cnv.user2 : cnv.user1}/>
                  {(cnv.user1.$id ===user.id && cnv.see1===false)||(cnv.user2.$id ===user.id && cnv.see2===false)?
                    <img
                    src={"/assets/icons/newMsj.png"}
                    alt="creator"
                    className=" w-8 h-6"
                  />
                  :<img
                  src={"/assets/icons/newMsjR.png"}
                  alt="creator"
                  className=" w-8 h-6"
                  />}
                  </div>
                </Button>
              </li>
            ))
          )}
        </div>
      </div>
      }
      {showNewUserModal &&
      <div className={cnvSelected  ? "transition-all  hidden sm:flex bg-slate-800 flex flex-col overflow-hidden  ":"transition-all  sm:w-[220px] md:w-[300px] bg-slate-800 flex flex-1 overflow-hidden "}>
          <NewUserModal/>
      </div>
      }
      <div className={cnvSelected? "flex-1 flex flex-col overflow-hidden":"flex-1 hidden sm:flex flex-col overflow-hidden"}>
        {cnvSelected ? (
          <Conversation selCnv={cnvSelected.documents[0]}/>
        ):(
          <div className=" flex flex-col gap-8 justify-center items-center text-center h-full opacity-35">
            <div className="text-2xl md:text-4xl p-16 text-slate-200"> Select Conversation to show Messages !</div>
          </div>
        )}
      </div>

    </div>
  </>
    
  )
}

export default ChatLayout