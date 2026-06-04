export default function SearchBar({
  search,
  setSearch
}) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search by code, player, or country..."
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
    />
  );
}