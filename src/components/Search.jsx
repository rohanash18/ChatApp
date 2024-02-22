import React, { useContext, useState } from 'react';
import { collection, getDocs,getDoc,doc, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";
import {db} from '../firebase';
const Search = () => {
  
  const [username,setUsername] = useState("");
  const [user,setUser] = useState(null);
  const [err,setErr] = useState(false);
  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () =>{
    console.log("Searching for:", username);
    const q = query(collection(db,"users"),
    where("displayName","==",username));
  
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
      console.log(doc.id, " => ", doc.data());
  });
  } catch (err) {
    console.error("Error occurred during search:", err); 
      setErr(true);
  }
};
  const handlekey = (e)=>{
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSelect = async() => {
      const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
      console.log("Combined ID:", combineId)
      try{
        const res = await getDoc(doc(db,"chats",combineId));
        console.log("Document exists:", res.exists());

        if(!res.exists()){
          console.log("Creating new chat document...");
          await setDoc(doc(db,"chats",combineId),{messages : []});
        }
          console.log("Updating userChats for currentUser...");
          await updateDoc(doc(db,"userChats",currentUser.uid),{
            [combineId+".userInfo"]:{
              uid:user.uid,
              displayName:user.displayName,
              photoURL:user.photoURL,
            },
            [combineId+".date"]:serverTimestamp(),
          });
          console.log("Updating userChats for user...");
          await updateDoc(doc(db,"userChats",user.uid),{
            [combineId+".userInfo"]:{
              uid:currentUser.uid,
              displayName:currentUser.displayName,
              photoURL:currentUser.photoURL,
            },
            [combineId+".date"]:serverTimestamp(),
          });
          console.log("New chat document and userChats updated successfully.");
        
      }catch(err){
        console.error("Error occurred during handleSelect:", err);
      }
      setUser(null);
      setUsername("");
  };
  return (
    <div className="search">
      <div className="searchform">
        <input type="text" placeholder="Find a user" onKeyDown={handlekey} onChange={(e)=>setUsername(e.target.value)} value={username}/>

      </div>
      {err && <span>User not found!</span>}
      {user && (<div className="userchat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userchatinfo">
          <span>{user.displayName}</span>

        </div>

      </div>)}
    </div>
  );
};

export default Search;