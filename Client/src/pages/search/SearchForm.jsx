import React from "react";
import Card from "../../components/Card";
import classes from "../../styles/UI/search/SearchForm.module.css";
import { FaSearch } from "react-icons/fa";

const SearchForm = ({
  fecthSearch,
  setInputValue,
  inputValue,
  setQuery,
  setCurrentPage,
  setGenreType,
  setLanguage,
  setMediaType,
  setYear,
}) => {
  setGenreType("");
  setLanguage("all");
  setMediaType("all");
  setYear(0);
  setCurrentPage(1);
  const handleSubmit = () => {
    setQuery(inputValue);
    fecthSearch();
  };

  const handleKeyDown = (event) => {
    if (event?.key === "Enter") {
      return handleSubmit();
    }
  };
  return (
    <Card>
      <div className={classes.search}>
        {/* Search */}
        <div className={classes.searchBox}>
          <div className="">
            <FaSearch />
            Search ...
          </div>
          <input
            type="text"
            placeholder="Movie Name"
            className={classes.inputBox}
            onChange={(e) => {
              e.preventDefault();
              setInputValue(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        {/* Button */}
        <button onClick={handleSubmit}>Search</button>
      </div>
    </Card>
  );
};

export default SearchForm;
