import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Cards() {
  return (
    <>
    <div class="row">
    <div className="left-pane-search">
    <MDBCard className='card'>
      <MDBCardImage className="card" src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='top' alt='...' />
      <MDBCardBody>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
        <MDBBtn href='#'>Button</MDBBtn>
      </MDBCardBody>
    </MDBCard>        
    <MDBCard className='card'>
      <MDBCardBody>
      <MDBCardImage className="card" src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='top' alt='...' />
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
        <MDBBtn href='#'>Button</MDBBtn>
      </MDBCardBody>
    </MDBCard>
    </div>
    <div className="right-pane-search">    
    <MDBCardImage src='https://www.nationsonline.org/maps/Physical-World-Map-3360.jpg' position='top' alt='...' />
    Map will be here
    </div>

    </div> {/*  end of row */}
    
    </>
  );
}