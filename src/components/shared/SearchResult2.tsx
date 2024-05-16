import { Models } from "appwrite";
import Loader from "./Loader";
import UserCard from "./UserCard";

export type SearchResultProps = {
    isSearchFetching: boolean;
    searchedUsers: Models.Document[];
};

const SearchResult2 = ({ isSearchFetching, searchedUsers }: SearchResultProps) => {
    if (isSearchFetching) {
        return <Loader />;
    } else if (searchedUsers && searchedUsers.length > 0) { // Remove .documents
        return (
            <ul className="user-grid">
                {searchedUsers.map((follow: Models.Document) => ( // Remove .documents
                    <li key={follow.$id} className="flex-1 min-w-[200px] w-full">
                        <UserCard user={follow} />
                    </li>
                ))}
            </ul>
        );
    } else {
        return (
            <p className="text-light-4 mt-10 text-center w-full">No results found !</p>
        );
    }
};

export default SearchResult2;
