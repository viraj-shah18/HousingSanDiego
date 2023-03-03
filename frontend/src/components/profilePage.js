//This page is for personal profile
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Fab from '@mui/material/Fab';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const editIconStyle = {
    margin: 0,
    top: '20',
    right: 80,
    bottom: 'auto',
    left: 'auto',
    position: 'fixed',
};

const lockIconStyle = {
    margin: 0,
    top: '20',
    right: 20,
    bottom: 'auto',
    left: 'auto',
    position: 'fixed',
};


const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    },
  ];

function ProfilePage() {
    const [userName, setUserName] = useState("Anonymous");
    const [userImage, setUserImage] = useState("../profile.png");
    const [selectedImage, setSelectedImage] = useState(null);
    const [missUserName, setMissUserName] = useState(false);
    const [aboutMe, setAboutMe] = useState("This person wrote nothing about him/herself.");
    const [hobbies, setHobbies] = useState("This person wrote nothing about hobbies.");
    const [major, setMajor] = useState("This person wrote nothing about major.");
    const [profileLocked, setProfileLocked] = useState("false");
    const [editMode, setEditMode] = useState(false);
    const [modifyAlbum, setModifyAlbum] = useState(false);
    const [album, setAlbum] = useState(itemData);
    const [anchorElEdit, setAnchorElEdit] = React.useState(null);
    const [anchorElVisi, setAnchorElVisi] = React.useState(null);
    const handleEditPopoverOpen = (event) => {
      setAnchorElEdit(event.currentTarget);
    };
  
    const handleEditPopoverClose = () => {
      setAnchorElEdit(null);
    };
    const handleVisiPopoverOpen = (event) => {
        setAnchorElVisi(event.currentTarget);
      };
    const handleVisiPopoverClose = () => {
        setAnchorElVisi(null);
    };
    const handleUploadAvatar = (event) => {
        setSelectedImage(event.target.files[0])
        console.log(selectedImage);
        // var file = event.target.files[0];
        // console.log(file);
        // const reader = new FileReader();
        // var url = reader.readAsDataURL(file);
        // reader.onloadend = function(e) {
        //     this.setState({
        //       selectedFile: [reader.result]
        //     });
        // }.bind(this);

        // console.log(url);
    }
    const handleAddImage = (event) => {
        setModifyAlbum(true);
        console.log("addimage");
        var file = event.target.files[0];
        console.log(file);
        var fileURL = URL.createObjectURL(file);
        console.log(fileURL);
        const newList = [...album,{img:`${fileURL}`}];
        setAlbum(newList);
        console.log(album);
        console.log(newList);
        setModifyAlbum(false);
    }
    const handleDeleteImage = (item) => {
        setModifyAlbum(true);
        console.log(item);
        const newList = album.filter((newitem) => newitem.img !== item.img);

        setAlbum(newList);
        console.log(album);
        setModifyAlbum(false);
    }
    const openEdit = Boolean(anchorElEdit);
    const openVisi = Boolean(anchorElVisi);
    const handleSaveEdit = () => {
        if(editMode===true){
            if(userName===""){
                console.log("name empty!")
            }else{
                setEditMode(false);
                console.log("SaveEdit");                
            }
        }else{
            console.log("StartEdit");
            setEditMode(true);
        }
        
    };
    const handleProfileLock = () => {
        setProfileLocked(!profileLocked)
    }

    return (
        <div>
            <Box sx={{ width: '90%', mx:'auto' }}>
                <Box sx={{ width: '90%', mx:'auto' ,display: 'block'}}>
                <Paper elevation={3} sx={{ width: '90%', mx:'auto', pr:15,pl:15,pb:15 }}>
                <Box sx={{ width: '90%' ,display: 'flex'}}>

                        <Fab color="secondary" aria-label="edit" sx={{ mx:150}} style={editIconStyle}
                            onClick={handleSaveEdit}
                            onMouseEnter={handleEditPopoverOpen}
                            onMouseLeave={handleEditPopoverClose}
                        >  
                            {editMode ? <SaveIcon/> : <EditIcon />}
                        </Fab>
                        <Popper id={"popperForEdit"} open={openEdit} anchorEl={anchorElEdit} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                                Click to save/edit your profile.
                                </Box>
                                </Fade>
                            )}
                        </Popper>

                        <Fab color="warning" aria-label="lock" sx={{ mx:150}} style={lockIconStyle}
                            onClick={handleProfileLock}
                            onMouseEnter={handleVisiPopoverOpen}
                            onMouseLeave={handleVisiPopoverClose}
                        >  
                            {profileLocked ? <VisibilityOffIcon/> : <VisibilityIcon />}
                        </Fab> 
                        <Popper id={"popperForVisi"} open={openVisi} anchorEl={anchorElVisi} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                                Click to make your profile visible/invisible to other users.
                                </Box>
                                </Fade>
                            )}
                        </Popper>
              
                </Box>

                <Typography variant="h1" gutterBottom align='center'>
                    My Profile
                </Typography>
                <Divider variant="middle" sx={{ p:5}}/>
                <Typography variant="h1" gutterBottom align='center' sx={{ width: 200, height: 200, mx:'auto' }}>
                    <label htmlFor="contained-button-file">
                        <Fab component="span" sx={{ width: 200, height: 200, mx:'auto' }}>
                            {(selectedImage!==null)?
                            <Avatar
                                alt="New Picture"
                                src={URL.createObjectURL(selectedImage)}
                                sx={{ width: 200, height: 200, mx:'auto' }}
                            />:
                            <Avatar
                                alt="My Picture"
                                src={require('../profile.png') }
                                sx={{ width: 200, height: 200, mx:'auto' }}
                            />
                            }
                        </Fab>
                    </label> 
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        //multiple
                        type="file"
                        onChange={handleUploadAvatar}
                        hidden = "true"
                    />                                       
                </Typography>


                <Typography variant="h3" gutterBottom align='center' >
                    {editMode ? <TextField
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    defaultValue={userName}
                                    onChange={(event) => setUserName(event.target.value)}
                                    /> : <text>{userName}</text>
                                    }
                    
                </Typography>
                <Divider variant="middle" sx={{ p:5}}/>
                <Typography variant="h4" gutterBottom>
                    About Me
                </Typography>
                
                <Typography variant="h5" gutterBottom >
                    {editMode ? <TextField
                                    required
                                    id="aboutMeText"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    defaultValue={aboutMe}
                                    onChange={(event) => setAboutMe(event.target.value)}
                                    /> : <text>{aboutMe}</text>
                                    }

                </Typography>
                <Divider variant="middle" sx={{ p:5}}/>
                <Typography variant="h4" gutterBottom>
                    Hobbies
                </Typography>      
                <Typography variant="h5" gutterBottom >
                {editMode ? <TextField
                                    required
                                    id="hobbiesText"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    defaultValue={hobbies}
                                    onChange={(event) => setHobbies(event.target.value)}
                                    /> : <text>{hobbies}</text>
                                    }
                </Typography>   
                <Divider variant="middle" sx={{ p:5}}/>
                <Typography variant="h4" gutterBottom>
                    Major
                </Typography>
                <Typography variant="h5" gutterBottom >
                {editMode ? <TextField
                                    required
                                    id="majorText"
                                    fullWidth
                                    defaultValue={major}
                                    onChange={(event) => setMajor(event.target.value)}
                                    /> : <text>{major}</text>
                                    }
                </Typography>    
                <Divider variant="middle" sx={{ p:5}}/> 
                <Box sx={{ display: 'flex'}}>
                    <Typography variant="h4" gutterBottom>
                        Album
                    </Typography>
                    <IconButton color="primary" aria-label="upload picture" component="label" size="large">
                        <input hidden accept="image/*" type="file" onChange={handleAddImage}/>
                        <AddPhotoAlternateIcon sx={{ width: 30, height: 30}}/>
                    </IconButton>
                  
                </Box>  

                <Typography variant="h4" gutterBottom>
                    <ImageList sx={{ width: 1024, height: 1024 }} cols={2} rowHeight={500}>
                        {album.map((item) => (
                            <Button onClick={() => handleDeleteImage(item)} > 
                                <ImageListItem key={item.img}>  
                                <img 
                                    src={`${item.img}`}
                                    loading="lazy"
                                    style={{ width: 512, height: 512 }}
                                />
                                </ImageListItem>
                            </Button>  
                        ))}
                    </ImageList>
                    
                </Typography>
                </Paper>
                </Box>
            </Box>        
        </div>
    );
}

export default ProfilePage;