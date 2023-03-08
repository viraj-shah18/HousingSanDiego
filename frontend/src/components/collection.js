import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { useLocation } from "react-router-dom";


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

function CollectionListComponent(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <img src={ props.img } width='190px' height='110px' alt="No alt text"/>
      </Grid>
      <Grid item xs={7}>
      <Typography align='left' margin='1.5rem 0px 0px 1rem' fontWeight={'bold'}> {props.name} </Typography>
        <Typography align='left' margin='0rem 0px 0px 1rem' fontSize={'12px'}> { props.num_places } places</Typography>
      </Grid>
      <Grid item xs={2}>
        <RemoveItem>Remove</RemoveItem>
      </Grid>
    </Grid>
  )
};
  

export default function Collection () {
    // from backend -> Need list of ids for collections present
    // await FetchCollections();
    const [collectionsList, setcollectionList] = useState([])
    
    // const collection_names = ["Houses near UCSD", "Houses near Ralphs", "3 Bedrooms" , "4 Bedrooms", "Inexpensive options"];
    // const num_places = [1, 2, 3, 4, 5];
    // const images = ['../imgs/home.jpg', '../collectionpage.png', '../home.png', '../findroommate.png', '../imgs/home.jpg'];

    function AddCollectionInput(props) {
      const [textInput, setTextInput] = useState('');
      
      const handleTextInputChange = event => {
        setTextInput(event.target.value);
      };
      
      const sendTextInput = event => {
        // create api request here
        setTextInput('');
        setcollectionList([
          ...collectionsList,
          { name: textInput, num_places: 0, img: ''}
        ]);

        props.collections_list.push(textInput);
        props.num_places.push(0);
        props.img.push('../imgs/home.jpg');
    
      }
      
      return (
        <Box paddingTop={'2rem'} >
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography paddingTop={'0.4em'} fontSize={'16px'} fontWeight={'bold'}>
                Create new collection: 
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField fullWidth size='small' id="outlined-basic" label="New Collection Name" variant="outlined" value= {textInput} onChange= {handleTextInputChange}/>
            </Grid>
            <Grid item xs={2}>
              <Typography>
                <AddItem onClick={sendTextInput}>Add</AddItem>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )
    };
    
    
    return (
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h5' component='h2' align='center'>
        My Collections
        </Typography>
        <Divider variant="middle" sx={{ p:1}}/> 
        <Box sx={{ flexGrow: 1, maxHeight: 300, overflow: 'auto' }}>
          {collectionsList.map(collection => (<CollectionListComponent name={collection.name} num_places={collection.num_places} img={collection.img}/>))}
        </Box>
        <Divider variant="middle" sx={{ p:0.2}}/> 
        <AddCollectionInput/>
      </Box>);
}   


export async function FetchCollections() {
  const location = useLocation();
  const username = location.state.username;
  let data;
  await axios.get('http://localhost:8000/api/user_collection/', )
    .then(res => {
        console.log({res})
        data = res.data;
        console.log({data})
  })
  .catch(err => {})
  return (data);
}
