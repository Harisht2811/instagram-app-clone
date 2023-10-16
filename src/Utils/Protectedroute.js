import React,{children} from "react"
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./userAuthContext";


const ProtectedRoute = ({children})=>{
  let {user} = useUserAuth;
  const navigate = useNavigate();
  if(!user){
      return navigate("/login");
  }
  return children;
}


export default ProtectedRoute;