import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
  } from 'mdb-react-ui-kit';


export default function CardItem({title, short_desc, btn_txt, img }) {
    return (      
      <MDBCard className='card'>
        <MDBCardImage className="cardimg" src={img} position='top' alt='...' />
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
            {short_desc}
          </MDBCardText>
          <MDBBtn href='#'>{btn_txt}</MDBBtn>
        </MDBCardBody>
      </MDBCard>    
      
    );
    }
