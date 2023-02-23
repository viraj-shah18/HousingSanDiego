//This file is for homepage (both login and logout)
import * as React from 'react';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import "../styles.css";
import background from "../imgs/home.jpg";



function HomePage() {
    return (

        // {/* <div> 
        //     <text>This is homepage!!!</text>
        //     <img src={ require('../home.png') } />            
        // </div>
        //  */}
        <Search />
    );
}


function Search({ details }) {
    const [searchField, setSearchField] = useState("");
    const [searchShow, setSearchShow] = useState(false);
  
    return (
      <div className="main" style={{ backgroundImage: `url(${background})` }}>
      <h1>Abode Genius</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
    </div>
    );
  }
  

export default HomePage;