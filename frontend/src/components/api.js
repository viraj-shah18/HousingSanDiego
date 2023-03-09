//This page is for api connecting to backend

import React from 'react';
import axios from 'axios';
const config = {
    headers:{
        'Access-Control-Allow-Origin': "*",
    }
  };
// export async function FetchAllUsers() {
//     let data ;
//     try{
//         await axios.get('http://localhost:8000/api/user')
//         .then(res => {
//             console.log("res:",res)
//             data = res.data.list;
//             console.log("data:",data)
//         })
//     }catch(error){

//     }
// }

export async function FetchUser(userId,password) {

    let auth= {
          'username': userId,
          'password': password
        }

    let data = {
        username:null,
        //display_name:null,
        is_profile_displayed:false,
        phone:null,
        email:null,
        aboutMe:null,
        hobbies:null,
        major:null,
        prefs:null,
        password:password
    }
    let profile_info
    console.log("userId:",userId)
    try{
        //await axios.get(`http://localhost:8000/api/user/${userId}`)
        await axios.get(`http://localhost:8000/profile/`,{auth:auth})
        .then(res => {
            console.log("res:",res)
            data.username = res.data.username
            //data.display_name = res.data.display_name
            //data.is_profile_displayed = res.data.is_profile_displayed
            data.email = res.data.email
            profile_info = res.data.profile
            if(profile_info){
                data.aboutMe = profile_info.intro
                data.hobbies = profile_info.hobbies
                data.major = profile_info.clubs
                data.prefs = profile_info.prefs
                data.phone = profile_info.phone
                //data.is_profile_displayed = profile_info.is_profile_displayed
              
            }

            console.log("data:",data)
            
        })
    }catch(error){
        console.log("fetchuser error:",error)
        return null
    }
    return(data)
}

export async function UploadUser(userInfo) {
    let auth= {
        'username': userInfo.username,
        'password': userInfo.password
      }
    const data = {
        'username': userInfo.username,
        'email' : userInfo.email,
        'profile':null,
    };
    data.profile = {
        'intro': userInfo.aboutMe,
        'hobbies': userInfo.hobbies,
        'clubs': userInfo.major,
        'prefs':userInfo.prefs,
        'more':null,
        'phone' : userInfo.phone,
        //'is_profile_displayed' : userInfo.is_profile_displayed,
    }
    console.log("auth",auth)
    console.log("upload data pack: ",data)
    console.log(typeof(data.profile_info))
    try{
        await axios.put(`http://localhost:8000/profile/`,data,{auth:auth})
        .then(res=>{
            console.log(res)
        })
    }catch(error){
        console.log("uploaduser error :",error)
    }
}

export async function CreateUser(userId,userEmail,password) {
    let data = {
        'email': userEmail,
        'username': userId,
        'password': password,
        "name": "Custom User Create",
        "description": "",
        renders: `["application/json", "text/html"]`,
        parses: `[
            "application/json",
            "application/x-www-form-urlencoded",
            "multipart/form-data"
        ]`,
        "Media type": "application/json",
        // 'is_profile_displayed': true,
        // phone:null,
        // email:null,
        // aboutMe:null,
        // hobbies:null,
        // major:null,
        // prefs:null,
    }
    try{
        console.log(data)
        await axios.post(`http://localhost:8000/register/`,data,{"content-type": "application/json"})
        .then(res=>{
            console.log(res)
            
        })
    }catch(error){
        console.log("uploaduser error :",error)
        return null
    }
    let auth= {
        'username': userId,
        'password': password
      }
    const profiledata = {
        username:userId,
        //display_name:null,
        is_profile_displayed:false,
        phone:null,
        email:userEmail,
        aboutMe:"Please input intro.",
        hobbies:"Please input hobbies.",
        major:"Please input major.",
        prefs:"Please input roommate preferences.",
        password:password
    };

    try{
        await UploadUser(profiledata)
        .then(res => {
            console.log("res:",res)
            
        })
    }catch(error){
        console.log(error)
        return null
    }
    return profiledata
}

export async function GoogleLoginAPI (token){
    let googleData,userData
    try {
        await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                console.log("axiosres:",res.data.id,res.data.email)
                googleData = res.data
            }).catch((err) => console.log(err));
    }catch(error){
        console.log(error)
        return null;
    }
    console.log("googleData",googleData)
    try {
        userData = await CreateUser(googleData.id,googleData.email,googleData.id)
    }catch(error){
        console.log(error)
        return null;
    }
    try {
        userData = await FetchUser(googleData.id,googleData.id)
    }catch(error){
        console.log(error)
        return null;
    }
    return userData
}