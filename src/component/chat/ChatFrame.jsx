import React, { useEffect, useState,memo } from "react";
import "./ChatFrame.css";
//material ui
import db from "../../firebase";
import Channel from "./ChannelWrap";
import Chat from "./ChatWrap";

const ChatFrame = memo(() => {
  const [roomId, setRoomId] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [blBack, setBlBack] = useState(true);

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
    
      db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRoomMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [roomId]);

  return (
    <>
      <div className="chat-container">
        {
          blBack?
            <Channel channels={channels} setRoomId={setRoomId} setBlBack={setBlBack} />
          : 
            <Chat roomId={roomId} 
                  roomDetails={roomDetails} 
                  setRoomDetails={setRoomDetails} 
                  roomMessages={roomMessages} 
                  setRoomMessages={setRoomMessages} 
                  setBlBack={setBlBack} /> 
        }
      </div>
    </>
  );
});

export default ChatFrame;
