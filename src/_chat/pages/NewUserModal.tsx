
import Loader from "@/components/shared/Loader";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {  useGetUserConversations, useGetUserss,  useSearchUsers } from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import UserCard2 from "./UserCard2";
import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import SearchResult3 from "./SearchResult3";



const NewUserModal= () => {
  const { user } = useUserContext();
  const { ref, inView } = useInView();
  const { data: users, fetchNextPage, hasNextPage } = useGetUserss();
  const { data :cnvss } = useGetUserConversations(user.id)
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedUsers, isFetching: isSearchFetching } = useSearchUsers(debouncedSearch);
  
  const cnvUsers: Models.Document[] = [];
  cnvss?.documents.forEach((cnv: Models.Document) => {
    cnvUsers.push(cnv.user1);
    cnvUsers.push(cnv.user2);
  });
  let cnvUsersIdIds :string[]=[] ;
  if(cnvUsers){
    cnvUsersIdIds = cnvUsers.map((user: Models.Document) => user.$id);
  }
  

  

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!users)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowUsers = !shouldShowSearchResults && 
    users.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Users</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="overflow-scroll custom-scrollbar flex-col overflow-x-hidden">
        {shouldShowSearchResults ? (
          <SearchResult3
          isSearchFetching={isSearchFetching}
          searchedUsers={ searchedUsers?.documents||[]}
        />
        ) : shouldShowUsers ? (
          <p className="text-light-4 mt-10 text-center w-full">End of users</p>
        ) : (
          <ul className="">
          {users.pages[0]?.documents.length === 0 ? (
            <p className="text-light-4">No available users</p>
          ) : (
            users.pages[0]?.documents.map((item, index) => (
              
              <li key={`page-${index}`} className={`${cnvUsersIdIds.includes(item.$id)&& "hidden"}`}>
                <UserCard2 user={item} />
              </li>
            ))
          )}
        </ul>

        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default NewUserModal;
