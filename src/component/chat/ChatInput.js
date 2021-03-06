import React, { useRef, useState, useCallback } from "react";
import db, { auth } from "../../firebase";
import Picker from "emoji-picker-react";
import "./ChatInput.css";
import firebase from "firebase";
import ApiService from "api/ApiService";

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState("");
  const emojiDiv = useRef(null);
  const [blEmoji, setBlEmoji] = useState(false);
  const [userImage, setUserImage] = useState("");
  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendMessage = useCallback((e) => {
    e.preventDefault();
    if (!input) return;
    const email = localStorage.getItem("userID");
    ApiService.fetchUserByID(email).then((res) => {
      console.log(res);
      const id = res.data.id;
      console.log(id);
      ApiService.fetchFirstImage(id).then((res) => {
        if (res.data.message === "photoURL") {
          setUserImage(res.data.photoURL);
        } else {
          setUserImage(`data:image/jpg;base64,${res.data.imageFile}`);
        }
      });
    });

    if (channelId) {
      db.collection("rooms").doc(channelId).collection("messages").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: auth.currentUser.displayName,
        userImage: userImage,
      });
    }
    setBlEmoji(false);
    setInput((e.target.value = ""));
  });
  const onEmojiClick = (e, emojiObject) => {
    if (e.target.className === "emoji-img") {
      if (emojiObject) {
        setInput(input + emojiObject.emoji);
      }
    }

    if (e.target.className === "btn-emoji") {
      setBlEmoji(blEmoji ? false : true);
    }
  };
  return (
    <div className="chatInput">
      <form>
        <button type="button" onClick={onEmojiClick} className="btn-emoji">
          ☺
        </button>
        <div
          className="emoji-picker"
          ref={emojiDiv}
          style={{ display: blEmoji ? "" : "none" }}
          onClick={onEmojiClick}
        >
          <Picker onEmojiClick={onEmojiClick} />
        </div>
        <input
          value={input}
          onChange={onChange}
          placeholder={`Message #${channelName}`}
        />
        <button type="submit" onClick={sendMessage} className="send-btn">
          보내기
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
