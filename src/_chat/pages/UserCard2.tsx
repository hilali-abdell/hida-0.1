import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useCreateCnv, useGetCnvByUsers, useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useState } from "react";
import { Link} from "react-router-dom";


type UserCardProps = {
  user: Models.Document;
};

const UserCard2 = ({ user }: UserCardProps) => {

    const { mutate:  addNewUserCnv,isPending:creatinCnv} = useCreateCnv();
    const { user:puser } = useUserContext();
    const { data: pUser } = useGetUserById(puser.id|| "");
    const [searchCnvValue1, setSearchCnvValue1] = useState("");
    const [searchCnvValue2, setSearchCnvValue2] = useState("");
    const { data: cnvSelected} = useGetCnvByUsers(searchCnvValue1,searchCnvValue2|| "");
  

  const  handleNewCnv = async(
  ) => {

    if(!cnvSelected){await addNewUserCnv({ userId: pUser?.$id, userFId: user.$id })}
    setTimeout(() => {
      window.location.reload();
    }, 2000);

  };

  
    
  return (
    <div className="flex gap-4 overflow-x-auto w-full mt-10">
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center w-full">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-12 w-12 rounded-full"
            />

            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <div className="flex items-center justify-center gap-1">
                <p className="small-regular text-light-3">
                @{user?.username}
                </p>
                <div className={`${user?.Verified!== true && "hidden"}`}>
                  <img
                    src={"/assets/icons/verifed.svg"}
                    alt="creator"
                    className="rounded-full w-4 h-4"
                  />
                </div>
              </div>
            </div>
        </Link>
       
        <Button
            type="button" className="shad-button_primary px-8"
            style={{ background:'#d4040f'}}
            onClick={() => {
                setSearchCnvValue1(user.$id);
                setSearchCnvValue2(puser.id);
            handleNewCnv();
            
          }}
        >{creatinCnv ?(
            <div className="flex-center gap-2">
            <Loader/> Loading...
            </div>
           ) : (
            "ADD CNV"
         )}</Button>
    </div>
    );
};

export default UserCard2;
