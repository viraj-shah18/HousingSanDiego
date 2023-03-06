// import React from 'react';
import React, {Component, useState} from 'react';
import {
  MDBCardImage,
} from 'mdb-react-ui-kit';
import house1 from "../imgs/house1.jpg";
import house2 from "../imgs/nuevo-east.jpg";
import CardItem from './card';
import LaJollaMap from './map'; 
import axios from 'axios';



const get_flat_list = async() =>
  {
    return await axios.get("http://127.0.0.1:8000/api/property/search/UC_San_Diego").then(res => res.data);
  }



// export default function Cards() {

//   // This function displays multiple cards vertically on the left side of the searchPage (/search). It used CardItem element from card.js component.
//   // async function get_flat_list({query}){

//   let data_test;
//   get_flat_list().then(output => {
//     console.log("Testing...",output)
//     data_test = output;
//     }
//     );
  
//   console.log("Testing2...",data_test) // this does not get the output data
  
//   const test_data = get_flat_list().then(output => {
//       console.log("Testing...",output);
//       console.log("output.list: ",output.list);
//       console.log("output.list[0]: ",output.list[0]);
//       console.log("output.list[1]: ",output.list[1]);
//       console.log("output.list[1].miles: ",output.list[1].miles);

//       data_test = output.list[1];
//       return data_test
//       }      
//       )

//   console.log("data_test: ", data_test)  
//   console.log("test_data: ", test_data)

//   return (
//     <>
//     <div class="row">
//     <div className="left-pane-search">
//     {/* <div> */}

//       <CardItem title={"Aparment X"} short_desc={"Some quick description for property..."} btn_txt={"Show"} img={house1}/>
//       <CardItem title={"Aparment Z"} short_desc={"Some quick description for property..."} btn_txt={"Show"} img={house2}/>
//     </div>
//     {/* <div className="right-pane-search">     */}
//     <div>
//     {/* <MDBCardImage src='https://www.nationsonline.org/maps/Physical-World-Map-3360.jpg' position='center' alt='...' /> */}
//       {/* <LaJollaMap /> */}
//     </div>

//     </div> {/*  end of row */}
    
//     </>
//   );
// }




 //example: andreasbakir: https://laracasts.com/discuss/channels/servers/get-data-out-from-axios-javascript

 export default class Cards extends Component {


  componentDidMount(){
    // getUsers();
    
    axios.get("http://127.0.0.1:8000/api/property/search/UC_San_Diego")
    .then( (response) => {
      console.log("DidMount: ", response)
      // Get array of coordinates
      var data = response.data.list
      var coordinates = []
      var i ;
      for(i=0; i < data.length; i++){
        var lat = data[i].property.latitude
        var long = data[i].property.longitude
        coordinates.push(
          {
            latitude: lat,
            longitude: long,
            name:"test_name"

          }
        )
      }
      console.log("DidMount-coord: ", coordinates)

      this.setState({
        flats: response.data.list,
        coords: coordinates
      });
    })
    .catch( (error) => {
        console.log(error);
    });

  }

  constructor(props) {
      super(props);
      // this.state = {
      //     users: []
      // }
      this.state ={
        flats: [],
        coords: []
      }
      
  }

  render()  {
        console.log("this.state.flats" + this.state.flats)
        return (
          <>
          <div class="row">
          <div className="left-pane-search">
                      {/* {console.log("this.state.flats[0].miles" + this.state.flats[0].miles)}     */}
            {
              this.state.flats.map(
                (flat, index) => (
                <CardItem title={"Aparment X"} short_desc=
                                              {
                                                "Distance: " + flat.miles + " miles\n" +
                                               "Latitude: " + flat.property.latitude + "\n" +
                                               "longitude: " + flat.property.longitude + "\n" 
                                              } 
                                              btn_txt={"Show"} img={house1}/> 
                )

              )
            }            
            {/* <CardItem title={"Aparment X"} short_desc={"miles:"} btn_txt={"Show"} img={house1}/> */}
            {/* <CardItem title={"Aparment Z"} short_desc={"Some quick description for property..."} btn_txt={"Show"} img={house2}/> */}
          </div>
          {/* <div className="right-pane-search">     */}
          <div>
            {console.log("this.state.coords: test ", this.state.coords)}
            <LaJollaMap marks={this.state.coords}/>
          </div>

          </div> {/*  end of row */}
          
          </>
        );
 }
}

