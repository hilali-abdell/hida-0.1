import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Button } from "@/components/ui/button"
import { LikedPosts, Saved } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import { useCreateFollow, useDeleteFollow, useGetUserById } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import { Models } from "appwrite";
import { useEffect, useState } from "react";


interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);
if(!StatBlock){console.log("noo")}
const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const navigate = useNavigate() ;
  const { data: currentUser } = useGetUserById(id || "");
  const { data: pUser } = useGetUserById(user.id|| "");
  const { mutate: followUser } = useCreateFollow();
  const { mutate: UnFollowwUser } = useDeleteFollow();
  const [isFollowed, setIsFollowed] = useState(false);
  const  followsRecord = pUser?.follow.find(
    (record: Models.Document) => record.userF.$id === currentUser?.$id
  );
  const followwers = currentUser?.followed
  .map((following: Models.Document) => ({
    ...following.user,
  }))
  .reverse();
  const followings = currentUser?.follow
  .map((following: Models.Document) => ({
    ...following.userF,
  }))
  .reverse();

  
  useEffect(() => {
  
      setIsFollowed(!!followsRecord);
 
  }, [followsRecord]);

  if (!currentUser  ){
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }
  const  idu = currentUser.$id ; 
  const  handleFollow = async(
  ) => {

    if (followsRecord) {
        await UnFollowwUser(followsRecord.$id);
        
    }else{
        await followUser({ userId: pUser?.$id, userFId: currentUser.$id });
    }
    setIsFollowed(prevIsFollowed => !prevIsFollowed);
  };
  
  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
               
              </h1>
              <div className="flex gap-2 mt-1 items-center justify-center xl:justify-start flex-wrap z-20">
                <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
                </p>
                <div className={`${currentUser.Verified!== true && "hidden"}`}>
                  <img
                    src={"/assets/icons/verifed.svg"}
                    alt="creator"
                    className="rounded-full w-6 h-6"
                  />
                </div>
              </div>
              
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20 text-primary-500 text-small-semibold ml-1">
              <Button>{currentUser.posts.length}   Posts</Button>
              <Button onClick={() => {
                navigate('/profile/:id/followers',{state:{idu}});
                }}>{ followwers.length}   Followers</Button>
              <Button onClick={() => {
                navigate('/profile/:id/following',{state:{idu}});
                }}>{ followings.length}   Following</Button>
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.id === id && "hidden"}`}>
            <div className="flex gap-2">
                <Button  type="button" className={`${isFollowed ?  ' ':'shad-button_primary px-8' }`}
                  style={{ background:'#d4040f'}}
                  onClick={() => {
                  handleFollow();
                  
                }}>
                {isFollowed ?(
                    "UnFollow"
                    ) : (
                      "Follow"
                    )}
                </Button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
          <Link
            to={`/profile/${id}/saved-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/saved-posts` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/save.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Saved Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList  posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
          
        )}
        {currentUser.$id === user.id && (
          <Route path="/saved-posts" element={<Saved />} />
          
        )}
        
        
        
      </Routes>
      <Outlet />
    </div>
);
};

export default Profile;
