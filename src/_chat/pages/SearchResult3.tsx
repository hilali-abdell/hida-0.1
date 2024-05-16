import { Models } from "appwrite";

import { useGetUserConversations } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";
import UserCard2 from "./UserCard2";



export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedUsers:  Models.Document[] ;
};


const SearchResult3 = ({isSearchFetching ,searchedUsers}: SearchResultProps) => {

    const { user } = useUserContext();
    const { data :cnvss } = useGetUserConversations(user.id)
    const cnvUsers: Models.Document[] = [];
    cnvss?.documents.forEach((cnv: Models.Document) => {
      cnvUsers.push(cnv.user1);
      cnvUsers.push(cnv.user2);
    });
    let cnvUsersIdIds :string[]=[] ;
    if(cnvUsers){
      cnvUsersIdIds = cnvUsers.map((user: Models.Document) => user.$id);
    }

    if (isSearchFetching) {
        return <Loader />;
      } else if (searchedUsers && searchedUsers.length > 0) {
         return (
            <ul className="overflow-scroll custom-scrollbar flex-col overflow-x-hidden">
            {searchedUsers.map((follow:Models.Document) => (
              <li key={follow.$id} className={`${cnvUsersIdIds.includes(follow.$id)&& "hidden"}`}>
                <UserCard2 user={follow} />
              </li>
            ))}
        </ul>
         )
      } else {
        return (
          <p className="text-light-4 mt-10 text-center w-full">No results found !</p>
        );
    }
}

export default SearchResult3
