import React, {useState, memo } from "react";
import "./ChannelWrap.css";
import db from "../../firebase";

const fn_ranColorSet = () => {
  let colorArray = [];
  for(let i=0;i<20;i++){
    colorArray.push(`#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`);
  }
  return colorArray;
}

const Channel = memo(({channels, setRoomId, setBlBack}) => {
  const [ranColor, setRanColor] = useState(fn_ranColorSet);
  let ranIdx = 0;

  const fn_getRandomColor = (length, curIdx) => {
    (length-1) === curIdx? ranIdx = 0 : ranIdx++;
    return ranColor[ranIdx];
  }
  const selectChannel = (e) =>{
    console.log(e.target);
    console.log(e.target.attributes.value2.value);
    setRoomId(e.target.attributes.value2.value);
    setBlBack(false);
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
    </>
  );
});

export default Channel;
