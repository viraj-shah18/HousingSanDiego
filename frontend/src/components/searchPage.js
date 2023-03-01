//This page is for searching
import * as React from 'react';
import SearchBar from './searchBar';
import { Tile } from 'react-native-elements';

function TileComp(){
    return (
        <Tile
        // imageSrc={require('./img/path')}
        title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
        featured
        caption="Some Caption Text"
        />
    )
}

function SearchPage() {

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
        <SearchBar keyPress={keyPress}/>
         </div>

    );
}

export default SearchPage;