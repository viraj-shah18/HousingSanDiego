import React from 'react';
import {
  MDBCardImage,
} from 'mdb-react-ui-kit';
import house1 from "../imgs/house1.jpg";
import house2 from "../imgs/nuevo-east.jpg";
import CardItem from './card';
import LaJollaMap from './map'; 


export default function Cards() {
  // This function displays multiple cards vertically on the left side of the searchPage (/search). It used CardItem element from card.js component.
  return (
    <>
    <div class="row">
    <div className="left-pane-search">
    {/* <div> */}
      <CardItem title={"Aparment X"} short_desc={"Some quick description for property..."} btn_txt={"Show"} img={house1}/>
      <CardItem title={"Aparment Z"} short_desc={"Some quick description for property..."} btn_txt={"Show"} img={house2}/>
    </div>
    {/* <div className="right-pane-search">     */}
    <div>
    {/* <MDBCardImage src='https://www.nationsonline.org/maps/Physical-World-Map-3360.jpg' position='center' alt='...' /> */}
      <LaJollaMap />
    </div>

    </div> {/*  end of row */}
    
    </>
  );
}