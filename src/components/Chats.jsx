import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Chats = () => {

  const [chats,setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(()=>{
    console.log("useEffect is triggered");
    const getChats = ()=>{
      console.log("getChats function is called");
    const unsub = onSnapshot(doc(db,"userChats",currentUser.uid),(doc)=>{
        setChats(doc.data());
    });

    return ()=>{
      console.log("Cleanup function is called");
      unsub();
    };
  };

  currentUser.uid && getChats();
  },[currentUser.uid]);
// Check if chats is not null or undefined before calling Object.entries
  console.log("Something Something",chats ? Object.entries(chats) : []);
const handleSelect = (u)=>{
  dispatch({type:"CHANGE_USER",payload:u})
}
  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>( 
      <div className="userchat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
      <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userchatinfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
        </div>
     ))}
    </div>
  );
};


export default Chats