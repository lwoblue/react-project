import React, { useEffect, useState,memo } from "react";
import "./Chat.css";
//material ui
import db from "../../firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";

const fn_ranColorSet = () => {
  let colorArray = [];
  for(let i=0;i<20;i++){
    colorArray.push(`#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`);
  }
  return colorArray;
}

const Chat = memo(() => {
  const [roomId, setRoomId] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [ranColor, setRanColor] = useState(fn_ranColorSet);
  let ranIdx = 0;

  const fn_getRandomColor = (length, curIdx) => {
    (length-1) === curIdx? ranIdx = 0 : ranIdx++;
    return ranColor[ranIdx];
  }
  
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

  const selectChannel = (e) =>{
    console.log(e.target);
    console.log(e.target.attributes.value2.value);
    setRoomId(e.target.attributes.value2.value);
  }
  const addChannel = ()=>{
    const channelName = prompt('Please enter the channel name');
    if(channelName){
      db.collection('rooms').add({
          name:channelName,
      })
    }
    setRanColor(fn_ranColorSet);
  };
  const removeChannel = (e) => {
    let channelId = e.target.attributes.value2.value;
    let msg = "정말 삭제 하시겠습니까?\n삭제하시면 모든 대화 내용이 삭제됩니다.";
    if(window.confirm(msg)){
      db.collection("rooms").doc(channelId).delete().then(() => {
        alert("채널이 [삭제] 됐습니다.");
        setRanColor(fn_ranColorSet);
      }).catch((error) => {
        alert(`[code : ${error}]삭제 중 에러가 발생했습니다.`);
      });
    }
  }
  return (
    <>
      <div className="chat-container">
        <div className="channel-wrap">
          <div className="channel-btn-zone">
            <button type="button" onClick={addChannel} className="channel-add-btn"><span>+</span></button>
          </div>
          <ul className="channel-list">
            {channels.map((channel,idx) => (
              <li>
                <div onClick={selectChannel} value2={channel.id} className="channel-list-div">
                  <span className="channel-list-thumb" value2={channel.id} style={{
                    borderColor:fn_getRandomColor(channels.length,idx)
                  }}>{channel.name.substring(0,1)}</span>
                  <span className="channel-list-name" value2={channel.id} >{channel.name}</span>
                </div>
                <div className="channel-del-btn" value2={channel.id}>
                  <span onClick={removeChannel} value2={channel.id} >삭제</span>
                </div>
              </li> 
            ))}
          </ul>
        </div>
        <div className="chat-wrap">
          <div className="chat__header">
            <div className="chat__headerLeft">
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
      </div>
    </>
  );
});

export default Chat;
