import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import axios from 'axios';


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
    backgroundColor: '#f00',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  }));

  const AddItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#0f0',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  }));


export default function Collection () {
    // from backend -> Need list of ids for collections present
    const collection_ids = [1, 2, 3, 4]    
    const num_collections = collection_ids.length;
    console.log(num_collections)
    
    return (
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h5' component='h2' align='center'>
        My Collections
        </Typography>
        <Divider variant="middle" sx={{ p:1}}/> 
        <Box sx={{ flexGrow: 1, maxHeight: 300, overflow: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img src={ require('../imgs/home.jpg') } width='190px' height='110px' />
            </Grid>
            <Grid item xs={7}>
              <Typography align='left' margin='1.5rem 0px 0px 1rem' fontWeight={'bold'}>Houses near UCSD {collection_ids[0]}</Typography>
              <Typography align='left' margin='0rem 0px 0px 1rem' fontSize={'12px'}>7 places</Typography>
            </Grid>
            <Grid item xs={2}>
              <RemoveItem>Remove</RemoveItem>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img src={ require('../collectionpage.png') } width='190px' height='110px' />
            </Grid>
            <Grid item xs={7}>
            <Typography align='left' margin='1.5rem 0px 0px 1rem' fontWeight={'bold'}>Houses near UCSD {collection_ids[0]}</Typography>
            <Typography align='left' margin='0rem 0px 0px 1rem' fontSize={'12px'}>7 places</Typography>
            </Grid>
            <Grid item xs={2}>
              <RemoveItem>Remove</RemoveItem>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={3}>
                <img src={ require('../home.png') } width='190px' height='110px' />
            </Grid>
            <Grid item xs={7}>
            <Typography align='left' margin='1.5rem 0px 0px 1rem' fontWeight={'bold'}>Houses near UCSD {collection_ids[0]}</Typography>
                <Typography align='left' margin='0rem 0px 0px 1rem' fontSize={'12px'}>7 places</Typography>
            </Grid>
            <Grid item xs={2}>
                <RemoveItem>Remove</RemoveItem>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img src={ require('../findroommate.png') } width='190px' height='110px' />
            </Grid>
            <Grid item xs={7}>
            <Typography align='left' margin='1.5rem 0px 0px 1rem' fontWeight={'bold'}>Houses near UCSD {collection_ids[0]}</Typography>
              <Typography align='left' margin='0rem 0px 0px 1rem' fontSize={'12px'}>7 places</Typography>
            </Grid>
            <Grid item xs={2}>
              <RemoveItem>Remove</RemoveItem>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img src={ require('../home.png') } width='190px' height='110px' />
            </Grid>
            <Grid item xs={7}>
            <Typography align='left' margin='1.5rem 0px 0px 1rem' fontWeight={'bold'}>Houses near UCSD {collection_ids[0]}</Typography>
              <Typography align='left' margin='0rem 0px 0px 1rem' fontSize={'12px'}>7 places</Typography>
            </Grid>
            <Grid item xs={2}>
              <RemoveItem>Remove</RemoveItem>
            </Grid>
          </Grid>
      </Box>

      {/* Create new collection */}
      <Divider variant="middle" sx={{ p:1}}/> 
      <Box paddingTop={'2rem'} >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography>
              Create new collection: 
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>
              Placeholder
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              <AddItem>Add</AddItem>
            </Typography>
          </Grid>
        </Grid>
      </Box>
  </Box>
    );
}   


export async function FetchCollections(userId) {
  let data;
  await axios.get('http://localhost:8000/api/user_collection/${userId}')
    .then(res => {
      console.log({res})
      data = res.data;
      console.log({data})
  })
  .catch(err => {})
  return (data);
}

function collectionList({name, num_places, img}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <img src={ require('../home.png') } width='190px' height='110px' />
      </Grid>
      <Grid item xs={7}>
      <Typography align='left' margin='1.5rem 0px 0px 1rem' fontWeight={'bold'}> {name} </Typography>
        <Typography align='left' margin='0rem 0px 0px 1rem' fontSize={'12px'}> { num_places } </Typography>
      </Grid>
      <Grid item xs={2}>
        <RemoveItem>Remove</RemoveItem>
      </Grid>
    </Grid>
  )
}
