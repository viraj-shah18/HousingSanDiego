import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {useNavigate, useLocation } from "react-router-dom";


// styles for different components
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};
  
const RemoveItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#e34b4b',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
}));

const AddItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#24d42b',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
}));

const clickable = {
  cursor: 'pointer'
};


function CollectionListComponent({id, img, name, num_places}) {
    const navigate = useNavigate();

    const handleCollectionsClick = event => {
        navigate('/collections', {
        state: {
            collectionId: event.target.value
        }
        })
    }

    const handleAddtoCollectionsClick = event => {
      
    } 

    return (
        <Grid container spacing={2}>
        <Grid item xs={3}>
            <img src={ img } width='190px' height='110px' alt="No alt text"/>
        </Grid>
        <Grid item xs={7} value={id} onClick={handleCollectionsClick} sx={clickable}>
        <Typography align='left' margin='1.5rem 0px 0px 1rem' fontWeight={'bold'}> {name} </Typography>
            <Typography align='left' margin='0rem 0px 0px 1rem' fontSize={'12px'}> { num_places } places</Typography>
        </Grid>
        <Grid item xs={2}>
            <AddItem remove_name={name} onClick={handleAddtoCollectionsClick} sx={clickable}>Add</AddItem>
        </Grid>
        </Grid>
    )
};



function AddCollectionInput({collectionsList, setcollectionList}) {
    const [textInput, setTextInput] = useState('');
    
    const handleTextInputChange = event => {
      setTextInput(event.target.value);
    };
    
    const sendTextInput = event => {
      // create api request here
      if (textInput === ''){
        return;
      }
      setTextInput('');
      setcollectionList([
        ...collectionsList,
        {id: 0, name: textInput, num_places: 1, images: require("../home.png")}
      ]);
    }
    
    return (
      <Box paddingTop={'2rem'} >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography paddingTop={'0.4em'} fontSize={'16px'} fontWeight={'bold'}>
              Create and add to a new collection: 
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth size='small' id="outlined-basic" label="New Collection Name" variant="outlined" value= {textInput} onChange= {handleTextInputChange}/>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              <AddItem onClick={sendTextInput} sx={clickable}>Add</AddItem>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
};

export async function FetchCollections() {
    const location = useLocation();
    console.log({location});
    let auth= {
      'username': location.state.loginInfo.username,
      'password': location.state.loginInfo.password
    }
    let data;
    await axios.get('http://localhost:8000/api/user_collection/', {auth:auth})
      .then(res => {
          console.log({res})
          data = res.data;
          console.log({data})
    })
    .catch(err => {})
    return (data);
}  

// parent function
export default function Collection () {
  // from backend -> Need list of ids for collections present
  // let allcollections = FetchCollections();
  const [collectionsList, setcollectionList] = useState([{id:0, name: "Houses near UCSD", num_places: 1, images: require("../imgs/home.jpg")}])
    
    console.log({collectionsList})
    return (
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h5' component='h2' align='center'>
        Add to
        </Typography>
        <Divider variant="middle" sx={{ p:1}}/> 
        <Box sx={{ flexGrow: 1, maxHeight: 300, overflow: 'auto' }}>
          {collectionsList.map(collection => (<CollectionListComponent id={collection.id} name={collection.name} num_places={collection.num_places} img={collection.images} collectionsList={collectionsList} setcollectionList={setcollectionList}/>))}
        </Box>
        <Divider variant="middle" sx={{ p:0.2}}/> 
        <AddCollectionInput collectionsList={collectionsList} setcollectionList={setcollectionList}/>
      </Box>);
}