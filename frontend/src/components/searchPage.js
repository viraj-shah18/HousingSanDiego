//This page is for searching
import React, {Component, useState}  from 'react';
import SearchBar from './searchBar';
import Cards from './flatCardsWindow'
import { useNavigate, useLocation } from "react-router-dom";



// export default class Cards extends Component {

// export default class SearchPage extends Component {
  
//   constructor(props) {
//     super(props);
//     this.state ={
//       query: ""
//     }
//   }

//   componentDidMount(){
//     // const location = useLocation();
//     const searchParams = useSearchParams();
//     this.query = location.state.query //this.props.query
//   }

//   keyPress(e){      
//     // 13 refers to Enter key 
//     if(e.keyCode == 13){
//         // when Enter is pressed, refresh Flat Component
//       // console.log("query: [1]", query)
//       // // console.log("location.state.query: [1]", location.state.query)
//       console.log('e.target.value: ', e.target.value);
//       // location.state.query = e.target.value          
//       // setQuery({ query: e.target.value}) 
//       // console.log("query [2]: ", query)

//       // navigate(location.pathname, {state: {
//       //                                         query: e.target.value, //pass search query into state.query prop
//       //                                     },
//       //                                   });
//       this.query = e.target.value
//       console.log('this.query : ', this.query );

//   }
//   }  
//     render()  {
//           // console.log("this.state.flats" + this.state.flats)
//           return (
//             <div className="searchbar-searchpage" >
//               <SearchBar keyPress={this.keyPress} default_text={this.query}/>
//               {/* <Cards search_query={location.state.query}/> */}
//               <Cards search_query={this.query}/>
//             </div>
            

//         );    
//     }
//   }


// -------------------------------

function SearchPage() {

    // Get params passed through react-router-dom (e.g. search query)
    const location = useLocation(); 
    const navigate = useNavigate();

    const [query, setQuery] = useState(location.state.query);

    function keyPress(e){      
        // 13 refers to Enter key 
        if(e.keyCode == 13){
            // when Enter is pressed, refresh Flat Component
          console.log("query: [1]", query)
          // console.log("location.state.query: [1]", location.state.query)
          console.log('e.target.value: ', e.target.value);
          location.state.query = e.target.value          
          setQuery({ query: e.target.value}) 
          console.log("query [2]: ", query)

          navigate(location.pathname, {state: {
                                                  query: e.target.value, //pass search query into state.query prop
                                              },
                                            });

        //   navigate(0, {
        //     state: {
        //         query: e.target.value, //pass search query into state.query prop
        //     },
        // });
      }
      }    
    return (
        <div className="searchbar-searchpage" >
          <SearchBar keyPress={keyPress} default_text={location.state.query}/>
          {/* <Cards search_query={location.state.query}/> */}
          <Cards search_query={query}/>
         </div>
         

    );
}

export default SearchPage;