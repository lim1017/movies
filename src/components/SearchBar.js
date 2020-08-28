import React from "react";
import TextField from "@material-ui/core/TextField";
import { debounce } from 'lodash';


function SearchBar({ type, nameSearch, setNameSearch }) {

  const handleSearch = debounce((text) =>{
    setNameSearch(text)
  },1000);

  return (
    <div
      style={{ width: "80%", margin: "auto" }}
      className="searchbar-container"
    >
      <TextField
        data-cy={type}
        id="filled-full-width"
        placeholder={`Search by ${type} name`}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={nameSearch.type}
        variant="filled"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
