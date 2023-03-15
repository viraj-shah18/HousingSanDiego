import IconButton from '@mui/material/IconButton';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import axios from 'axios';



function getCollectionfromUser({username, password}){
  return "6402db2b31f63b058ad8832e"
}

function addPropertyToCollection(propertyID, collectionID, username, password){
  let auth = {
    'username': username,
    'password': password
  }
  let data;
  const _url = 'http://127.0.0.1:8000/api/collection/add/' + collectionID + '/' + propertyID;
  console.log({_url})
  axios.put(_url, {auth: auth}).then(res => {
        console.log({res})
        data = res.data;
        console.log({data})
  })
  .catch(err => {})
}


export function AddtoCollections({propertyID}){
  const navigate = useNavigate();
  const location = useLocation();
  const [added, setaddedState] = useState(false);
  
  const handleClick = event => {
    if (location.state.loginInfo == undefined){
      navigate('/login');
    }
    else{
      let username = location.state.loginInfo.username;
      let password = location.state.loginInfo.password;

      // get the collection id from userID
      let collectionID = getCollectionfromUser(username, password);
      console.log({propertyID, collectionID});
      
      // put a property id into collection id - api/collection/add/str:collection_id/str:property_id
      // <addPropertyToCollection propertyID={propertyID} collectionID = {collectionID} username={username} password={password}/>
      addPropertyToCollection(propertyID=propertyID, collectionID=collectionID, username=username, password=password)

      // change style of button
      // sx = {color}
    }
  }

  return <>
  <IconButton onClick={handleClick}>
    <CollectionsBookmarkIcon />
  </IconButton>
  <Button></Button>
  </>
}


export default function CardItem({title, short_desc, btn_comp, btn_txt, img , propertyID=0, details=""}) {
    // Single card component, img is imported as 'import house2 from "../imgs/nuevo-east.jpg";'     

    console.log({title, short_desc, btn_comp, btn_txt, img , propertyID, details});

    return (      
      <MDBCard className='card'>
        <MDBCardImage className="cardimg" src={img} position='top' alt='...' />
        <MDBCardBody>          
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
            {short_desc}
          </MDBCardText>
          <MDBCardText style={{ fontWeight: 'bold' }}>
            {details}
          </MDBCardText>
            
          <MDBBtn href='#'>{btn_comp ? null : btn_txt}</MDBBtn>
          {btn_comp ? btn_comp : null}
          <AddtoCollections propertyID={propertyID}/>
        </MDBCardBody>
      </MDBCard>    
      
    );
    }
