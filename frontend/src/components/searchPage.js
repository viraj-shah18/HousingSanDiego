//This page is for searching
import * as React from 'react';
import SearchBar from './searchBar';
import Cards from './flatCardsWindow'
import { useLocation } from "react-router-dom";


function SearchPage() {

    // Get params passed through react-router-dom (e.g. search query)
    const location = useLocation(); 

    function keyPress(e){      
        // 13 refers to Enter key 
        if(e.keyCode == 13){
            // when Enter is pressed, refresh Flat Component
          console.log('Search query: ', e.target.value);
        //   navigate("/search")
        }
      }    
    return (
        <div className="searchbar-searchpage" >
          <SearchBar keyPress={keyPress} default_text={location.state.query}/>
          <Cards />
         </div>
         

    );
}

export default SearchPage;