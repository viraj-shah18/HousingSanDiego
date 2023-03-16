//This file is for homepage (both login and logout)
import * as React from 'react';
import { useState } from "react";
import "../styles.css";
import background from "../imgs/home.jpg";

import {useNavigate,useLocation} from 'react-router-dom';
import SearchBar from './searchBar';

function HomePage() {
    return (
        <Search />
    );
}


function Search({ details }) {
    const location = useLocation();
    const [searchField, setSearchField] = useState("");
    const [searchShow, setSearchShow] = useState(false);
    const navigate = useNavigate();
    
    function keyPress(e){      
      // 13 refers to Enter key 
      if(e.keyCode == 13){
        console.log('Search query: ', e.target.value);
        //navigate("/search")
        if (location.state){
          navigate("/search", {
            state: {loginInfo:location.state.loginInfo,
                query: e.target.value, //pass search query into state.query prop
            },
        });
        }
        else{
          navigate("/search", {
            state: {query: e.target.value, //pass search query into state.query prop
            }
          })
        }
      }
    }

    return (
      <div className="main" style={{ backgroundImage: `url(${background})` , backgroundSize: 'cover', }}>
      <h1>Abode Genius</h1>
      <SearchBar keyPress={keyPress}/>
    </div>
    
    );
  }
  

export default HomePage;