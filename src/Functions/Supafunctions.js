import { TableNames } from "../Utils/Config/Table"
import { InsertData } from "./CRUD"

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