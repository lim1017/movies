import React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  type: string;
  searchTerm: string;
  setSearchTerm: Function;
}


const SearchBar: React.FC<Props> = ({ type, searchTerm, setSearchTerm }) => {

  const handleSearch = (text) =>{
      setSearchTerm(text)
  };

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
        value={searchTerm}
        variant="filled"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
