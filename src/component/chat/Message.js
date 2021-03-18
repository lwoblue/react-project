import React, {useRef, useEffect} from "react";
import "./Message.css";
const Message = ({ message, timestamp, user, userImage }) => {
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
