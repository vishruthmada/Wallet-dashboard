import "./SearchBar.css";

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by merchant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
