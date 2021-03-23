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
    console.log(e.target);
    console.log(e.target.id);
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
  const removeChannel = (e) => {
    
    let channelId = e.target.attributes.value2.value;
    let msg = "정말 삭제 하시겠습니까?\n삭제하시면 모든 대화 내용이 삭제됩니다.";
    if(window.confirm(msg)){
      db.collection("rooms").doc(channelId).delete().then(() => {
        alert("채널이 [삭제] 됐습니다.");
      }).catch((error) => {
        alert(`[code : ${error}]삭제 중 에러가 발생했습니다.`);
      });
    }
  }
  return (
    <>
      <div className="chat-container">
        <div className="channel-wrap"  >
          <div className="channel-btn-zone">
            <button type="button" onClick={addChannel} className="channel-add-btn">Add Channel</button>
          </div>
          <ul className="channel-list">
            {channels.map((channel) => (
              <li>
                <span className="channel-thumb">{channel.name.substring(0,1)}</span>
                <div onClick={selectChannel} id={channel.id} className="channel-div">{channel.name}
                </div>
                <span onClick={removeChannel} value2={channel.id} className="channel-span">삭제</span>
              </li> 
            ))}
          </ul>
        </div>
        <div className="chat-wrap">
          {/* <h2> You are in the {roomId} </h2> */}
          <div className="chat__header">
            <div className="chat__headerLeft">
              <h3 className="chat__channelName">
                <strong>#{roomDetails?.name}</strong>
                <StarOutlineIcon />
              </h3>
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
