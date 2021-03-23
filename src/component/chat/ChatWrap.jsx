import React, {memo } from "react";
import "./ChatWrap.css";
//material ui
import Message from "./Message";
import ChatInput from "./ChatInput";

const Chat = memo(({roomId, roomDetails, setRoomDetails, roomMessages, setRoomMessages, setBlBack }) => {
  const onClickBack = () => {
    setBlBack(true);
    setRoomMessages([]);
    setRoomDetails(null);
  }
  return (
    <>
      <div className="chat-wrap">
        <div className="chat__header">
          <div className="chat__headerLeft">
            <span className="chat__channelGo">
              <strong onClick={onClickBack}>←</strong>
            </span>
          </div>
          <div className="chat__headerRight">
            <span className="chat__channelName">
              <strong>{roomDetails?.name}</strong>
            </span>
          </div>
        </div>
        <div className="chat__messages">
            {roomMessages.map(({message , timestamp, user, userImage})=>(
                <Message
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage} />
            ))}
        </div>
        <div className="chat-input">
          <ChatInput channelName={roomDetails?.name} channelId={roomId}/>
        </div>
      </div>
    </>
  );
});

export default Chat;
