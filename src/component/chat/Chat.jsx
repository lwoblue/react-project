import React, { useEffect, useState } from "react";
import "./Chat.css";
//material ui
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import db from "../../firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";

const Chat = () => {
  const [roomId, setRoomId] = useState('DVWjjfbmPMGni08saFJA');
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
    setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRoomMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  const selectChannel = (e) =>{
    setRoomId(e.target.id);
  }
  const addChannel = ()=>{
    const channelName = prompt('Please enter the channel name');
    if(channelName){
        db.collection('rooms').add({
            name:channelName,
        })
    }
  };
  return (
    <>
      <div className="chat-container">
        <div className="channel-wrap"  >
          <button type="button" onClick={addChannel} className="channel-add-btn">+ channel</button>
          <ul className="channel-list">
            {channels.map((channel) => (
              <li onClick={selectChannel} id={channel.id}>{channel.name}</li> 
            ))}
          </ul>
        </div>
        <div className="chat-wrap">
          {/* <h2> You are in the {roomId} </h2> */}
          <div className="chat__header">
            <div className="chat__headerLeft">
              <h4 className="chat__channelName">
                <strong>#{roomDetails?.name}</strong>
                <StarOutlineIcon />
              </h4>
            </div>
          </div>
          <div className="chat__messages">
              {/* <Message .../> */}
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
      </div>
    </>
  );
};

export default Chat;
