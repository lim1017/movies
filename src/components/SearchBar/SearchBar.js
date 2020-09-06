import React from "react";
import TextField from "@material-ui/core/TextField";




const SearchBar = ({ type, searchTerm, setSearchTerm, setCurrentPage }) => {

  const handleSearch = (text) =>{
      setSearchTerm(text)
      setCurrentPage(1)
  };

  return (
    <div
      style={{ width: "80%", margin: "auto", color:"white" }}
      className="searchbar-container"
    >
      <TextField
        data-cy={type}
        id="outlined-full-width"
        placeholder={`Search by ${type} name`}
        fullWidth
        style={{ backgroundColor:"white", borderRadius:"10px" }}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={searchTerm}
        variant="outlined"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
