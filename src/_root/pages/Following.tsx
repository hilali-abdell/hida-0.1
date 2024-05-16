import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import {  useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useLocation } from "react-router-dom";


const Following = () => {
  const location = useLocation()
  const { data: currentUser } = useGetUserById(location.state.idu|| "");
  const followings = currentUser?.follow
    .map((following: Models.Document) => ({
      ...following.userF,
    }))
    .reverse();

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Followings</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="user-grid">
          {followings.length === 0 ? (
            <p className="text-light-4">No available followings</p>
          ) : (
            followings.map((follow:Models.Document) => (
              <li key={follow.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={follow} />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Following;
