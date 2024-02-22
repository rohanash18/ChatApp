import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"});
  },[message]);
  // Function to format the timestamp
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString(undefined, options);
  };
  return (
    <div ref = {ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageinfo">
        <img src={Message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        {/* <span>{formatTime(message.date)}</span> */}
        {/* <span>{message.date}</span> */}
      </div>
      <div className="messagecontent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message