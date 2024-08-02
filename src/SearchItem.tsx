import { Dispatch, SetStateAction } from "react";

const SearchItem = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <form
      className="w-11/12 flex justify-start mt-2 mb-2 p-1 border rounded-lg border-b-1 border-solid border-black "
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="focus:outline-none w-full"
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Items"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
