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


export default class Cards extends Component {


  componentDidMount(){
    console.log("search_query: "+ this.props.search_query.replace(/ /g,"_"))
    // Get request to backend: It hits Django backedn and the text after search/ is the search query with _ instead of spaces
    axios.get("http://127.0.0.1:8000/api/property/search/" + this.props.search_query.replace(/ /g,"_") )
    .then( (response) => {
      // console.log("DidMount: ", response)
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
      // console.log("DidMount-coord: ", coordinates)

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
      this.state ={
        flats: [],
        coords: []
      }
      
  }

  render()  {
        // console.log("this.state.flats" + this.state.flats)
        return (
          <>
          <div className="row">
          <div className="left-pane-search">
            {
              this.state.flats.map(
                (flat, index) => (
                // <CardItem title={"Aparment X"} short_desc=
                //                               {
                //                                 "Distance: " + flat.miles + " miles\n" +
                //                                "Latitude: " + flat.property.latitude + "\n" +
                //                                "longitude: " + flat.property.longitude + "\n" 
                //                               } 
                //                               btn_txt={"Show"} img={house1}/> 
                // )
                <CardItem title={flat.property.name} 
                          short_desc={flat.property.desc} 
                          details={"Price: $"+flat.property.cost+
                                   " Distance: "+flat.miles.toFixed(2)+" miles."+
                                   " Beds: "+flat.property.num_bedrooms+
                                   " Bathrooms: "+ flat.property.num_bathrooms
                                  }
                          btn_txt={"Show"} 
                          img={flat.property.img_id ? require("../imgs/"+flat.property.img_id): require("../imgs/house1.jpg") }/> 
                )
              )
            }            
            {/* <CardItem title={"Aparment X"} short_desc={"miles:"} btn_txt={"Show"} img={house1}/> */}
            {/* <CardItem title={"Aparment Z"} short_desc={"Some quick description for property..."} btn_txt={"Show"} img={house2}/> */}
          </div>
          {/* <div className="right-pane-search">     */}
          <div>
            <LaJollaMap marks={this.state.coords}/>
          </div>

          </div> {/*  end of row */}
          
          </>
        );
 }
}

