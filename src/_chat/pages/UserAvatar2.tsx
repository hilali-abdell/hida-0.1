import { Models } from "appwrite";
import { Link } from "react-router-dom";
type UserCardProps = {
  user: Models.Document;
};

const UserAvatar = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="flex gap-4 items-center ">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />

            <div className="flex flex-col">
              <div className="flex items-center justify-center gap-1">
              <p className="body-meduim">{user.name}</p>  
                <div className={`${user.Verified!== true && "hidden"}`}>
                  <img
                    src={"/assets/icons/verifed.svg"}
                    alt="creator"
                    className="rounded-full w-3 h-3"
                  />
                  
                </div>
              </div>
            </div>
          </Link>
  );
};

export default UserAvatar;
