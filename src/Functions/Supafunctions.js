import { TableNames } from "../Utils/Config/Table"
import { FetchData, FetchDataByEmail, InsertData ,UpdateData,FetchDataNotByUsername,FetchDataByUsername ,FetchUserImage ,UpdateDataLikes,DeleteData } from "./CRUD"

export const CreateUser = async(userData) =>{
    try{
        const {data,error} = await InsertData(TableNames.user,userData)
        if(error){
            throw error;
        }
        return data;
    }
    catch(err){
        console.log(err)
    }

}

export const GetUser = async()=>{
    try{
        const {data:user,error} = await FetchData(TableNames.user)
        if(error){
            throw error;
        }
        return user;
    }
    catch(err){
        console.log(err)
    }
}
export const GetNotUserPost = async(name)=>{
    try{
        const {data,error} = await FetchDataNotByUsername(TableNames.user_post,name)
        if(error){
            throw error;
        }
        return data;
    }
    catch(err){
        console.log(err)
    }
}
export const GetUserPost = async(name)=>{
    try{
        const {data,error} = await FetchDataByUsername(TableNames.user_post,name)
        if(error){
            throw error;
        }
        return data;
    }
    catch(err){
        console.log(err)
    }
}
export const GetUserByEmail = async(email)=>{
    try{
        const {data:userByEmail,error} = await FetchDataByEmail(TableNames.user,email)
        if(error){
            throw error;
        }
        return userByEmail;
    }
    catch(err){
        console.log(err)
    }
}

export const GetUserProfile = async(name)=>{
    try{
        const {data,error} = await FetchUserImage(TableNames.user,name)
        if(error){
            throw error;
        }
        return data;
    }
    catch(err){
        console.log(err)
    }
}

export const CreatePost = async(postData) =>{
    try{
        const {data,error} = await InsertData(TableNames.user_post,postData)
        if(error){
            throw error;
        }
        return data;
    }
    catch(err){
        console.log(err)
    }
}

export const UpdateProfilePhoto = async(imagedata,conditionValue) =>{
    try{
        const {data,error} = await UpdateData(TableNames.user,{profileimage:imagedata},conditionValue)
        if(error){
            throw error;
        }
        return data;
    }
    catch(err){
        console.log(err)
    }
}


export const UpdateLikes = async(likeData,conditionValue) =>{
    console.log(conditionValue)
    try{
        const {data,error} = await UpdateDataLikes(TableNames.user_post,{likes:likeData},conditionValue)
        if(error){
            throw error;
        }
        return data;
    }
    catch(err){
        console.log(err)
    }
}

export const DeletePost = async(conditionValue) =>{
    try{
        const {data,error} = await DeleteData(TableNames.user_post,conditionValue)
        if(error){
            throw error;
        }
        console.log(data,"sasd")
        return data;
    }
    catch(err){
        console.log(err)
    }
}