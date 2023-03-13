//This page is for searching
import React, { useState,useEffect}  from 'react';
import SearchBar from './searchBar';
import Cards from './flatCardsWindow'
import {  useLocation } from "react-router-dom";
import {BedroomSelect,BathroomSelect,SetCostBounds} from './component1'
import Box from '@mui/material/Box';

function SearchPage() {

    // Get params passed through react-router-dom (e.g. search query)
    const location = useLocation(); 
    const [query, setQuery] = useState(location.state.query); // Is setQuery being used properly? double check
    const [costLowerBound,setCostLowerBound] = useState(0);
    const [costUpperBound,setCostUpperBound] = useState(9999999);
    const [bathroomBound,setBathroomBound] = useState(0);
    const [bedroomBound,setBedroomBound] = useState(0);
    const handleChangeCostLB = (event) => {
      setCostLowerBound(event.target.value);
    };
    const handleChangeCostUB = (event) => {
      setCostUpperBound(event.target.value);
    };   
    const handleChangeBathroom = (event) => {
      setBathroomBound(event.target.value);
      console.log("changebathroom",bathroomBound)
    };
    const handleChangeBedroom = (event) => {
      setBedroomBound(event.target.value);
      console.log("changebedroom",bathroomBound)
    };    
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
    useEffect(() => {
      console.log('the parameter has changed', bedroomBound,bathroomBound,costLowerBound,costUpperBound)
   }, [bedroomBound,bathroomBound,costLowerBound,costUpperBound])
    return (
        <div className="searchbar-searchpage" >
          {/* <SearchBar keyPress={(e) => e.keyCode == 13 ? setQuery({ query: e.target.value}) : null} default_text={location.state.query}/> */}
          <SearchBar keyPress={(e) => keyPress(e,setQuery)} default_text={location.state.query}/>
          <Box sx={{ms:'auto',display: 'flex'}}>
            <BedroomSelect bedroom={bedroomBound} handleChange={(e)=>handleChangeBedroom(e)}/>
            <BathroomSelect bathroom={bathroomBound} handleChange={(e)=>handleChangeBathroom(e)}/>
            <SetCostBounds handleSetLB={(e)=>handleChangeCostLB(e)} handleSetUB={(e)=>handleChangeCostUB(e)}/>
          </Box>
          {/* <Cards search_query={location.state.query}/> */}
<<<<<<< HEAD
          <Cards search_query={query}/>
=======
          <Cards search_query={query} filterData = {{bedroom:bedroomBound,bathroom:bathroomBound,costLB:costLowerBound,costUB:costUpperBound}}/>
>>>>>>> 7be1667e145f7709951f8861f8d25d86360a4d3f
         </div>
         

    );
}

export default SearchPage;