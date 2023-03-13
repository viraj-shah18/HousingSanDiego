import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {

    MDBCardImage,
    
  } from 'mdb-react-ui-kit';

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
    overflowY: 'scroll',
};

export default function PropertyPopup ({miles=999, data = {name:"test title", desc:"This is a description", img_id: "house1.jpg"}}) {
    // POPUP for property 
    
    const [open, setOpen] = React.useState(false);    
    console.log("PropertyPopup" +data);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
        <Button onClick={handleOpen}>Show more</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {data.name}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>                 
                 <MDBCardImage className="cardimg-popup" src={require("../imgs/"+data.img_id)} position='top' alt='...' />
                 <br></br>
                {data.desc}
                <br></br>
                </Typography>
                <Typography id="modal-modal-description" sx={ {fontWeight: 'bold'} } >
                {
                    "Price: $"+data.cost+
                    " Distance: "+miles.toFixed(2)+" miles."+
                    " Beds: "+data.num_bedrooms+
                    " Bathrooms: "+ data.num_bathrooms
                }
                </Typography>
                
            </Box>
            </Modal>
        </div>
    );
}  