import React , { useState, useEffect } from 'react'
import {getItem} from "../asyncStorage"

 function UserDetails() {
const [user, setUser] = useState(null)
const [userPassword, setUserPassword] = useState(null)


const getUser = async() => {
  const item = await getItem("username")
  const item2 = await getItem("password")
  if(item){
    setUser(item)
  }
 if(item2){
  setUserPassword(item2)
 }
  
}

  useEffect(() => {
getUser()
  },[])
  return [user, userPassword]
}

export default UserDetails