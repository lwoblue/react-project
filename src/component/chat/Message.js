import ApiService from "api/ApiService";
import React, {useRef, useEffect, useState} from "react";
import "./Message.css";
// const Message = ({ message, timestamp, user, userImage }) => {
  const Message = ({ message, timestamp, user }) => {
  const [userImage,setUserImage]= useState("")

  const chat_messages = useRef(null);
  const scrollToBottom = () => {
    chat_messages.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (chat_messages.current) {
      scrollToBottom();
    }
    console.log(user);
    ApiService.selectUserByName(user).then((res)=>{
      console.log(res);
      const id = res.data.id;
      console.log(id);
      ApiService.fetchFirstImage(id).then((res)=>{
        if(res.data.message === "photoURL"){
          setUserImage(res.data.photoURL);
        }else{
          setUserImage(`data:image/jpg;base64,${res.data.imageFile}`);
        }
      });
    })    
  }, [chat_messages]);

  return (
    <div className="message"  ref={chat_messages} >
      <img src={userImage} alt="" />
      <div className="message__info">
        <h5>
          {user}{" "}
          <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()} </span>
        </h5>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
