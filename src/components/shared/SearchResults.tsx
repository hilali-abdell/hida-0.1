import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

export type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document[];
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
    if (isSearchFetching) {
        return <Loader />;
    } else if (searchedPosts && searchedPosts.length > 0) { // Check the length of searchedPosts directly
        return (
            <GridPostList posts={searchedPosts} /> // Pass searchedPosts directly
        );
    } else {
        return (
            <p className="text-light-4 mt-10 text-center w-full">No results found !</p>
        );
    }
};

export default SearchResults;
