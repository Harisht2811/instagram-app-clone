import { TableNames } from "../Utils/Config/Table"
import { FetchData, FetchDataByEmail, InsertData } from "./CRUD"

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

