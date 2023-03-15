// import React from 'react';
import React, {Component, useState} from 'react';
// import house1 from "../imgs/house1.jpg";
// import house2 from "../imgs/nuevo-east.jpg";
import CardItem from './card';
import LaJollaMap from './map'; 
import axios from 'axios';
import PropertyPopup from './propertyPopup'
import { useLocation } from 'react-router-dom';

// Used for testing when backend is not working
const default_flat_list = [{"property": {
                                        "_id": "1", 
                                        "name": "Mirada at La Jolla Colony Apartments[test]", 
                                        "cost": "2600", 
                                        "address": null, 
                                        "latitude": 32.866220000000000, 
                                        "longitude": -117.226360000000000, 
                                        "num_bedrooms": 1, 
                                        "num_bathrooms": 1, 
                                        "street_address": "7568 Charmant Dr", 
                                        "secondary_street_address": "", 
                                        "city": "San Diego", 
                                        "state": "CA", 
                                        "zipcode": 92092, 
                                        "img_id": "7568CharmantDr.jpg", 
                                        "desc": "Mirada at La Jolla Colony Apartments is located at 7568 Charmant Drive San Diego, CA and is managed by TIAA-CREF - Pinnacle Family of Companies, a reputable property management company with verified listings on RENTCafe. Mirada at La Jolla Colony Apartments offers 1 to 2 bedroom apartments ranging in size from 535 to 925 sq.ft. Amenities include BBQ/Picnic Area, Bike Racks, Business Center, Cable Ready, Ceiling Fan and more. This rental community is pet friendly, welcoming both cats and dogs. Property is located in the 92122 ZIP code.", 
                                        "contact_info": null}, 
                                        "miles": 0.8003237575172774},
                                        
                                        {"property": {"_id": "64082c73617ed7ce58fb89d7", "name": "La Jolla Palms Apartment Homes[test]", "cost": "3435", "address": null, "latitude": "32.869710000000000", "longitude": "-117.223450000000000", "num_bedrooms": 2, "num_bathrooms": 2, "street_address": "3535 Lebon Dr", "secondary_street_address": "", "city": "San Diego", "state": "CA", "zipcode": 92122, "img_id": "3535LebonDr.jpg", "desc": "In one of San Diego's most sought-after locations, this tech-connected community is near neighborhood eateries, UCSD Health and iconic white sand beaches. Modern homes designed for wellness offer dramatic picture windows and private outdoor space.", "contact_info": null}, "miles": 0.8047387367532339}, 
                                        {"property": {"_id": "64082d9b617ed7ce58fb89d8", "name": "La Jolla International Gardens[test]", "cost": "2545", "address": null, "latitude": "32.866711000000000", "longitude": "-117.223991000000000", "num_bedrooms": 1, "num_bathrooms": 1, "street_address": "3417 Lebon Dr", "secondary_street_address": "", "city": "San Diego", "state": "CA", "zipcode": 92122, "img_id": "3417LebonDr.jpg", "desc": "Our apartments are newly renovated with all new cabinetry, countertops, appliances, fixtures and flooring. The units have fully equipped kitchens, ceiling fans, wood burning fireplaces and spacious walk in closets. Dramatic vaulted ceilings are in all top floor homes. Reserved underground parking spaces are assigned to all units. All applicants are required to submit a rental application, authorize a credit and background check, and pay a $45 application fee. We are just minutes from La Jolla Cove, UCSD, major freeways, shopping centers, theaters, restaurants and beautiful beaches. You can have it all at La Jolla International Gardens!", 
                                        "contact_info": null
                                      }, "miles": 0.8825049502283719}]


export default class CollectionCards extends Component {
  // This component displays a two column screen. Left column contains a vertical sequence of CardItem components and the right side shows a map centered in La Jolla. 
  // These components are integrated with the backend and axios.get() is used to retrived data from search queries. Search query is expecte to come as a prop. 

  constructor(props) {
    super(props);
    this.state ={
      flats: [],
      coords: [],
      username: props.username,
      password: props.password
      //componentDidMount_run: false
    }
  }

  
  // runs one time when rendered first time
  componentDidMount(){
    let auth= {
        'username': this.state.username,
        'password': this.state.password
      }
    console.log("Cards- didMount")
    // console.log("search_query: "+ this.props.search_query.replace(/ /g,"_"))
    // Get request to backend: It hits Django backedn and the text after search/ is the search query with _ instead of spaces
    const url_ = "http://127.0.0.1:8000/api/collection/id/6402db2b31f63b058ad8832e"
    console.log("url_: "+ url_)
    console.log({auth})
    // this.setState({componentDidMount_run: true});
    

    axios.get(url_, {auth:auth})
    .then( (response) => {
      console.log("DidMount: ", response)
      // Get array of coordinates
      var data = response.data.properties
      var coordinates = []
      var i ;
      console.log({test:data[0]})
      for(i=0; i < data.length; i++){
        var lat = data[i].latitude
        var long = data[i].longitude
        var property_name = data[i].name
        coordinates.push(
          {
            latitude: lat,
            longitude: long,
            name: property_name,  
            property: data[i], // to save property info for each marker           
            property_miles: data[i].miles // to display miles for each marker           
          }
        )
      }
      // console.log("DidMount-coord: ", coordinates)

      this.setState({
        flats: response.data.properties,
        coords: coordinates,
        search_query: this.props.search_query, // to keep track of updated search
        componentDidMount_run: true, // to keep track of firs time the page is loaded, otherwise shouldUpdate thinks it's the same query and does not update

      });
    })
    .catch( (error) => {
        console.log(error);
        this.setState({
          flats: default_flat_list,
          // coords:  []
          coords: [{
            latitude: 32.866220000000000,
            longitude: -117.226360000000000,
            name:"test"
          }]
        });
    });

  }

  render()  {
        // console.log("this.state.flats" + this.state.flats)
        return (
          <>
          <div className="row">
            {console.log(this.state.flats)}
          <div className="left-pane-search">
            {
              this.state.flats.map(
                (flat, index) => (
                <CardItem title={flat.name} 
                          details={"Price: $"+flat.cost+
                                   " Beds: "+flat.num_bedrooms+
                                   " Bathrooms: "+ flat.num_bathrooms
                                  }
                          btn_txt={"Show"} 
                          img={flat.img_id ? require("../imgs/"+flat.img_id): require("../imgs/house1.jpg") }
                          key={index}
                          id={flat._id}
                          showFav={false}
                          btn_comp= {<PropertyPopup miles={10}  data={flat} />} //This is the popup component that shows the "SHOW MORE" button
                        /> 
                )
              )
            }                        
          </div>
          <div>
            <LaJollaMap marks={this.state.coords}/>
          </div>

          </div> {/*  end of row */}
          
          </>
        );
 }
}


