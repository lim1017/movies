import React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  type: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}


const SearchBar: React.FC<Props> = ({ type, searchTerm, setSearchTerm }) => {

  const handleSearch = (text) =>{
      setSearchTerm(text)
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
