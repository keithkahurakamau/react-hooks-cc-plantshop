import React from "react";

function Search({ searchTerm, onSearchChange }) {
  const handleChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
