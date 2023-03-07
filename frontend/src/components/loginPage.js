//This page is for user login
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {FetchAllUsers,FetchUser,CreateUser} from './api';
import {useNavigate} from 'react-router-dom';

function LoginPage(props) {
    const navigate = useNavigate();
    //false = login true = create account
    const [loginAndCreate,setLoginAndCreate] = useState("SignIn");
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [isSignUpFailed, setIsSignUpFailed] = useState(false);
    // const [loginInfo, setLoginInfo] = useState(null);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleChange = (event,newSelection) => {
        setLoginAndCreate(newSelection);
      };
    const handleClickLogin = async () => {
        setIsLoginFailed(false);
        let userInfo;
        console.log("username:",userName,"password:",password);
        try{
            userInfo = await FetchUser(userName)
            console.log('fetchUserInfo',userInfo)

            if(typeof(userInfo) === 'undefined'){
                setIsLoginFailed(true)
                console.log("cannot fetch")
            }else{
                navigate('/',{state:{loginInfo:userInfo}});
            }            
        }catch(error){
            setIsLoginFailed(true)
        }
    }
    const handleClickSignUp = async () => {
        setIsSignUpFailed(false);
        let userInfo;
        try{
            userInfo = await CreateUser(userName)
            if(userInfo===null){
                console.log("create failed")
                setIsSignUpFailed(true)
            }else{
                navigate('/',{state:{loginInfo:userInfo}});
            }
        }catch(error){
            setIsSignUpFailed(true)
            console.log(error)
        }
    }
    return (
        <div>
            <Paper elevation={3} sx={{ width: '30%', mx:'auto', pr:15,pl:15,pb:15 }}>
            <Box sx={{ mx:'auto' }}>
                <Stack
                    justifyContent="center"
                    gap={2}
                    flexDirection="column"
                    width={1.0}
                    flexWrap="wrap"
                >
                    <Typography variant="h3" gutterBottom align='center'>
                    Abode Genius
                    </Typography>
                    <ToggleButtonGroup
                    color="primary"
                    value={loginAndCreate}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{ width: '40%', mx:'auto'}}
                    align='center'
                    >
                        <ToggleButton value="SignIn" sx={{ width: '90%', mx:'auto' }}>Sign In</ToggleButton>
                        <ToggleButton value="SignUp" sx={{ width: '90%', mx:'auto' }}>Sign Up</ToggleButton>
                    
                    </ToggleButtonGroup>

                    <TextField
                        label="Username"
                        id="login-username"
                        sx={{ mx:'auto', width: '35ch' }}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <FormControl sx={{mx:'auto', width: '35ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </FormControl>
                    
                    {(loginAndCreate==="SignIn")?
                        <Box align='center'>
                            {isLoginFailed?
                                <Typography variant="h6" gutterBottom align='center' >
                                    <text style={ {color:'red'} }>Incorrect username or password.</text>
                                </Typography>                            
                            :<></>}

                            <Button  variant="contained" sx={{ mx:'auto',px:'10%' }} align='center'
                                onClick={handleClickLogin}
                            >Login</Button>
                        </Box>
                    :
                        <Box align='center'>
                            {isSignUpFailed?
                                <Typography variant="h6" gutterBottom align='center' >
                                    <text style={ {color:'red'} }>Invalid username!</text>
                                </Typography>                            
                            :<></>}
                            <Button  variant="contained" sx={{ mx:'auto',px:'10%' }} align='center'
                            onClick={handleClickSignUp}
                            >Create Account</Button>
                        </Box>
                    }
                    
                </Stack>
            </Box>
            </Paper>
        </div>
    );
}

export default LoginPage;