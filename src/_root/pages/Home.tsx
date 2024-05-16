import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { useUserContext } from "@/context/AuthContext";
import { useGetRecentPosts, useGetUserById, useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";


const Home = () => {
  // const { toast } = useToast();
  const { user } = useUserContext();
  const { data: currentUser } = useGetUserById(user.id|| "");

  const followings = currentUser?.follow
    .map((following: Models.Document) => ({
      ...following.userF,
    }))
  .reverse();
let followingUserIds :string[]=[] ;
if(followings){
  followingUserIds = followings.map((user: Models.Document) => user.$id);
}

 const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader
             />
          ) : (<></>)}
          {!posts || followingUserIds.length===0? (
            <p>Please follow someone to see posts !</p>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                 <div key={`${post.$id}`} className={`${!followingUserIds.includes(post.creator?.$id)&& post.creator?.$id!==currentUser?.$id && "hidden"}`}>
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              
                <li key={creator?.$id}>
                  <UserCard user={creator} />
                </li>

            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
