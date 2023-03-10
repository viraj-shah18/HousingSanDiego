//This file is for homepage (both login and logout)
import * as React from 'react';
import TextField from "@mui/material/TextField";
import "../styles.css";



function SearchBar({keyPress, default_text="Search"}){
  return  (      
  <div className="search">
  <TextField
    id="outlined-basic"
    variant="outlined"
    fullWidth
    label={default_text}
    // onKeyDown={() => keyPress()}
    onKeyDown={keyPress}
  />
</div> )

}

export default SearchBar;