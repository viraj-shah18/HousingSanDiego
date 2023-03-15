//This page is for searching
import React, { useState,useEffect}  from 'react';
import SearchBar from './searchBar';
import {  useLocation } from "react-router-dom";
import {BedroomSelect,BathroomSelect,SetCostBounds} from './component1'
import Box from '@mui/material/Box';
import CollectionCards from './viewCollections';



export default function CollectionsSearchPage() {

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
      console.log("changebedroom",bedroomBound)
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
          <CollectionCards search_query={query} username={location.state.loginInfo.username} password={location.state.loginInfo.password} filterData = {{bedroom:bedroomBound,bathroom:bathroomBound,costLB:costLowerBound,costUB:costUpperBound}}/>         
    );
}