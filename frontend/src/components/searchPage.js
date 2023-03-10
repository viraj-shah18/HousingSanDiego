//This page is for searching
import React, { useState}  from 'react';
import SearchBar from './searchBar';
import Cards from './flatCardsWindow'
import {  useLocation } from "react-router-dom";


function SearchPage() {

    // Get params passed through react-router-dom (e.g. search query)
    const location = useLocation(); 

    const [query, setQuery] = useState(location.state.query); // Is setQuery being used properly? double check

    function keyPress(e, setQuery){      
        // 13 refers to Enter key 
        if(e.keyCode == 13){
            // when Enter is pressed, refresh Flat Component
          // console.log("location.state.query: [1]", location.state.query)
          console.log('e.target.value: ', e.target.value);
          location.state.query = e.target.value          
          setQuery({ query: e.target.value}) 

      }
      }    
    return (
        <div className="searchbar-searchpage" >
          {/* <SearchBar keyPress={(e) => e.keyCode == 13 ? setQuery({ query: e.target.value}) : null} default_text={location.state.query}/> */}
          <SearchBar keyPress={(e) => keyPress(e,setQuery)} default_text={location.state.query}/>
          {/* <Cards search_query={location.state.query}/> */}
          <Cards search_query={query}/>
         </div>
         

    );
}

export default SearchPage;