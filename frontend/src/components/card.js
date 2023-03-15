import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
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



function getCollectionfromUser(auth){
  return "6402db2b31f63b058ad8832e"
}

async function CheckPropertyinCollection(auth, collectionID){
  const _url = 'http://127.0.0.1:8000/api/collection/id/' + collectionID;
  console.log({_url});
  let data = await axios.get(_url, {auth: auth})
  return data
}


function removePropertyFromCollection(propertyID, collectionID, auth, setaddedState){
  let data;
  const _url = 'http://127.0.0.1:8000/api/collection/remove/' + collectionID + '/' + propertyID;
  console.log({_url})
  axios.put(_url, {auth: auth}).then(res => {
        data = res.data;
        setaddedState(false);
  })
  .catch(err => {})
}

function addPropertyToCollection(propertyID, collectionID, auth, setaddedState){
  let data;
  const _url = 'http://127.0.0.1:8000/api/collection/add/' + collectionID + '/' + propertyID;
  console.log({_url})
  axios.put(_url, {auth: auth}).then(res => {
        data = res.data;
        setaddedState(true);
  })
  .catch(err => {})
}

function navigateToLogin(navigate){
  navigate('/login');
}


export function AddtoCollections({propertyID}){
  const location = useLocation();
  const navigate = useNavigate();
  const [added, setaddedState] = useState(false);
  if (location.state.loginInfo == undefined){
    return <>
    <IconButton onClick={() => navigateToLogin(navigate)}>
      <FavoriteBorderIcon />
    </IconButton>
    <Button></Button>
    </>
  }
  
  let auth = {
    'username': location.state.loginInfo.username,
    'password': location.state.loginInfo.password
  }
  let collectionID = getCollectionfromUser(auth);
  
  let properties;
  let propertiesInCollection = CheckPropertyinCollection(auth, collectionID);
  propertiesInCollection.then(res => {
    properties = res.data.properties;
    console.log({properties})
    for (let i=0; i < properties.length; i++){
      if (properties[i]._id == propertyID){
        setaddedState(true);
        console.log("true")
        break;
      }
    }
  }).catch(err => {console.log(err)});


  if (added){
    return <>
    <IconButton onClick={() => removePropertyFromCollection(propertyID, collectionID, auth, setaddedState)}>
      <FavoriteIcon />
    </IconButton>
    <Button></Button>
    </>
  }
  else{
    return <>
    <IconButton onClick={() => addPropertyToCollection(propertyID, collectionID, auth, setaddedState)}>
      <FavoriteBorderIcon />
    </IconButton>
    <Button></Button>
    </>
  }
  
}


export default function CardItem({title, short_desc, btn_comp, btn_txt, img , propertyID=0, details="", showFav=true}) {
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
          {showFav ? <AddtoCollections propertyID={propertyID}/>: <></>}
        </MDBCardBody>
      </MDBCard>    
      
    );
    }
