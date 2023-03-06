//This page is for api connecting to backend

import React from 'react';
import axios from 'axios';
 
export async function FetchAllUsers() {
    let data ;
    try{
        await axios.get('http://localhost:8000/api/user')
        .then(res => {
            console.log("res:",res)
            data = res.data.list;
            console.log("data:",data)
        })
    }catch(error){

    }
}

export async function FetchUser(userId) {
    let data = {
        _id:null,
        display_name:null,
        is_profile_displayed:false,
        phone:null,
        email:null,
        aboutMe:null,
        hobbies:null,
        major:null,
        prefs:null,
    }
    let profile_info
    let social_info
    console.log("userId:",userId)
    try{
        await axios.get(`http://localhost:8000/api/user/${userId}`)
        .then(res => {
            console.log("res:",res)
            data._id = res.data._id
            data.display_name = res.data.display_name
            data.is_profile_displayed = res.data.is_profile_displayed
            profile_info = JSON.parse(res.data.profile_info)
            social_info = JSON.parse(res.data.social_info)
            if(profile_info){
                data.aboutMe = profile_info.intro
                data.hobbies = profile_info.hobbies
                data.major = profile_info.clubs
                data.prefs = profile_info.prefs
            }
            if(social_info){
                data.phone = social_info.phone
                data.email = social_info.email
            }
            console.log("data:",data)
            
        })
    }catch(error){
        console.log("fetchuser error:",error)
    }
    return(data)
}

export async function UploadUser(userInfo) {
    const data = {
        '_id': userInfo._id,
        'display_name': userInfo.display_name,
        'is_profile_displayed': userInfo.is_profile_displayed,
        'profile_info':null,
        'social_info':null,
    };
    data.profile_info = JSON.stringify({
        'intro': userInfo.aboutMe,
        'hobbies': userInfo.hobbies,
        'clubs': userInfo.major,
        'prefs':userInfo.prefs,
        'more':null,
    });
    data.social_info = JSON.stringify({
        'phone' : userInfo.phone,
        'email' : userInfo.email,
    });
    console.log("upload data pack: ",data)
    console.log(typeof(data.profile_info))
    try{
        await axios.put(`http://localhost:8000/api/user/${userInfo._id}`,data)
        .then(res=>{
            console.log(res)
        })
    }catch(error){
        console.log("uploaduser error :",error)
    }
}

export async function CreateUser(userId) {
    let data = {
        '_id': userId,
        'display_name': userId,
        'is_profile_displayed': true,
        phone:null,
        email:null,
        aboutMe:null,
        hobbies:null,
        major:null,
        prefs:null,
    }
    try{
        await axios.post(`http://localhost:8000/api/user`,data)
        .then(res=>{
            console.log(res)
            
        })
    }catch(error){
        console.log("uploaduser error :",error)
        return null
    }
    return data
}
