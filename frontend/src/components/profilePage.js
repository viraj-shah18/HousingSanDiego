//This page is for personal profile
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from "react";
import { Button } from '@mui/material';
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
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate,useLocation} from 'react-router-dom';
import {UploadUser} from './api';

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
  ];
  function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }
  function ProfilePage() {
    const location = useLocation();
    const [userName, setUserName] = useState(location.state.loginInfo.display_name);
    const [userImage, setUserImage] = useState("../profile.png");
    const [selectedImage, setSelectedImage] = useState(null);
    const [missUserName, setMissUserName] = useState(false);
    const [phoneIsInt, setPhoneIsInt] = useState(true);
    const [aboutMe, setAboutMe] = useState(location.state.loginInfo.aboutMe);
    const [userEmail, setUserEmail] = useState(location.state.loginInfo.email);
    const [userPhone, setUserPhone] = useState(location.state.loginInfo.phone);
    const [hobbies, setHobbies] = useState(location.state.loginInfo.hobbies);
    const [major, setMajor] = useState(location.state.loginInfo.major);
    const [preference, setPreference] = useState(location.state.loginInfo.major);
    const [profileLocked, setProfileLocked] = useState(!location.state.loginInfo.is_profile_displayed);
    const [editMode, setEditMode] = useState(false);
    const [modifyAlbum, setModifyAlbum] = useState(false);
    const [album, setAlbum] = useState(itemData);
    const [anchorElEdit, setAnchorElEdit] = useState(null);
    const [anchorElVisi, setAnchorElVisi] = useState(null);
    const [deleteImagePopup, setDeleteImagePopup] = useState(false);
    const [deleteImage,setDeleteImage] = useState(null);

    const handleDeleteImageOpen = (curDeleteImage) => {
        setDeleteImage(curDeleteImage);
        setDeleteImagePopup(true);
    };
  
    const handleDeleteImageClose = () => {
        setDeleteImagePopup(false);
    };
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
        handleDeleteImageClose();
    }
    const openEdit = Boolean(anchorElEdit);
    const openVisi = Boolean(anchorElVisi);
    const handleSaveEdit = async () => {
        let data = {
            _id:location.state.loginInfo._id,
            display_name:userName,
            is_profile_displayed:!profileLocked,
            phone:userPhone,
            email:userEmail,
            aboutMe:aboutMe,
            hobbies:hobbies,
            major:major,
            prefs:preference,
        }
        if(editMode===true){
            console.log(typeof(userPhone),userPhone)
            if(userName===""){
                console.log("name empty!")
                setMissUserName(true)
            }else if(!isNumeric(userPhone)){
                console.log("phone not int!")
                setPhoneIsInt(false)
            }
            else{
                setMissUserName(false)
                setPhoneIsInt(true)
                setEditMode(false);
                console.log("SaveEdit");
                try{
                    let result = await UploadUser(data)
                    console.log(result)
                }catch(error){

                }
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
            <Box sx={{ width: '90%', mx:'auto' ,display: 'block'}}>
                <Paper elevation={3} sx={{ width: '90%', mx:'auto', pr:15,pl:15,pb:15 }}>
                {/* This box contains the button of edit and hide profile */}
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
                {/* Profile image */}
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


                <Typography variant="h5" gutterBottom align='center'>
                    My userid: {location.state.loginInfo._id}
                </Typography>
                {/* username textarea (required)*/}
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
                {missUserName?
                                <Typography variant="h6" gutterBottom align='center' >
                                    <text style={ {color:'red'} }>Username must not be empty!</text>
                                </Typography>                            
                            :<></>}
                <Divider variant="middle" sx={{ p:5}}/>
                <Typography variant="h4" gutterBottom>
                Contact information
                </Typography>
                {!phoneIsInt?
                                <Typography variant="h6" gutterBottom align='center' >
                                    <text style={ {color:'red'} }>Phone must contain number only!</text>
                                </Typography>                            
                            :<></>}
                {/* email and phone textarea*/}
                <Box sx={{ width: '90%' ,display: 'flex'}}>
                <Typography variant="h5" gutterBottom sx={{ p:3}}>
                Email:
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ p:3}}>
                    {editMode ? <TextField
                                    required
                                    id="userEmailText"
                                    multiline
                                    fullWidth
                                    rows={1}
                                    defaultValue={userEmail}
                                    onChange={(event) => setUserEmail(event.target.value)}
                                    /> : <text>{userEmail}</text>
                                    }
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ p:3}}>
                Phone:
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ p:3}}>
                    {editMode ? <TextField
                                    required
                                    id="userPhoneText"
                                    multiline
                                    fullWidth
                                    rows={1}
                                    defaultValue={userPhone}
                                    onChange={(event) => setUserPhone(event.target.value)}
                                    /> : <text>{userPhone}</text>
                                    }
                </Typography>                
                </Box>
                <Divider variant="middle" sx={{ p:5}}/>
                <Typography variant="h4" gutterBottom>
                    About Me
                </Typography>
                {/* aboutme textarea*/}
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
                {/* hobbies textarea*/}     
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
                    Roommate Preferences
                </Typography> 
                {/* Preferences textarea*/}     
                <Typography variant="h5" gutterBottom >
                {editMode ? <TextField
                                    required
                                    id="PrefsText"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    defaultValue={preference}
                                    onChange={(event) => setPreference(event.target.value)}
                                    /> : <text>{preference}</text>
                                    }
                </Typography>   
                <Divider variant="middle" sx={{ p:5}}/>
                <Typography variant="h4" gutterBottom>
                    Major
                </Typography>
                {/* major textarea*/}
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
                    {/* Album button of adding image*/}
                    <IconButton color="primary" aria-label="upload picture" component="label" size="large">
                        <input hidden accept="image/*" type="file" onChange={handleAddImage}/>
                        <AddPhotoAlternateIcon sx={{ width: 30, height: 30}}/>
                    </IconButton>
                  
                </Box>  
                {/* image delete and display area*/}
                <Typography variant="h4" gutterBottom>
                    <ImageList sx={{ width: 1024, height: 1024 }} cols={2} rowHeight={500}>
                        {album.map((item) => (
                            <div>
                                <Button onClick={()=>handleDeleteImageOpen(item)} > 
                                    <ImageListItem key={item.img}>  
                                    <img 
                                        src={`${item.img}`}
                                        loading="lazy"
                                        style={{ width: 512, height: 512 }}
                                    />
                                    </ImageListItem>
                                </Button> 
                                <Dialog
                                    open={deleteImagePopup}
                                    onClose={handleDeleteImageClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    BackdropProps={{ style: { backgroundColor: "transparent" } }}
                                >
                                    <DialogTitle id="alert-dialog-title">
                                    {"Are you sure to delete this image?"}
                                    </DialogTitle>
                                    <DialogActions>
                                    <Button onClick={handleDeleteImageClose}>No</Button>
                                    <Button onClick={() => handleDeleteImage(deleteImage)} autoFocus>
                                        Yes
                                    </Button>
                                    </DialogActions>
                                </Dialog>                            
                            </div>
                        ))}
                    </ImageList>
                    
                </Typography>

                </Paper>
            </Box>        
        </div>
    );
}


export default ProfilePage;