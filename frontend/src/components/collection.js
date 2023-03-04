import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: 400,
    overflow: 'auto'
  };
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f00',
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
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img src={ require('../imgs/home.jpg') } width='200px' height='110px' />
            </Grid>
            <Grid item xs={6}>
              <Typography align='left'>Houses near UCSD {collection_ids[0]}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Item>Remove</Item>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img src={ require('../collectionpage.png') } width='200px' height='110px' />
            </Grid>
            <Grid item xs={6}>
              <Typography align='left'>Houses near Ralphs {collection_ids[1]}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Item>Remove</Item>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img src={ require('../home.png') } width='200px' height='110px' />
            </Grid>
            <Grid item xs={6}>
              <Typography align='left'>3 Bedrooms</Typography>
            </Grid>
            <Grid item xs={2}>
              <Item>Remove</Item>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img src={ require('../findroommate.png') } width='200px' height='110px' />
            </Grid>
            <Grid item xs={6}>
              <Typography align='left'>3 Bedrooms</Typography>
            </Grid>
            <Grid item xs={2}>
              <Item>Remove</Item>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img src={ require('../home.png') } width='200px' height='110px' />
            </Grid>
            <Grid item xs={6}>
              <Typography align='left'>3 Bedrooms</Typography>
            </Grid>
            <Grid item xs={2}>
              <Item>Remove</Item>
            </Grid>
          </Grid>

      </Box>
  </Box>


    );
}   


function collectionList({name, num_places, img}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <img src={ require(img) } width='200px' height='110px' />
      </Grid>
      <Grid item xs={6}>
        <Typography align='left'>{name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Item>Remove</Item>
      </Grid>
    </Grid>
  )
}
