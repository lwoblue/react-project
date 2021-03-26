import React, { useRef, useState, useCallback } from 'react';
import db from '../../firebase';
import Picker from 'emoji-picker-react';
import { useStateValue } from '../chat/state/StateProvider';
import './ChatInput.css';
import firebase from 'firebase';

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();
  const emojiDiv = useRef(null);
  const [blEmoji, setBlEmoji] = useState(false);
  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const sendMessage = useCallback((e) => {
    e.preventDefault();
    if (!input) return;
    if (channelId) {
      db.collection('rooms').doc(channelId).collection('messages').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
    setBlEmoji(false);
    setInput((e.target.value = ''));
  });
  const onEmojiClick = (e, emojiObject) => {
    if (e.target.className === 'emoji-img') {
      if (emojiObject) {
        setInput(input + emojiObject.emoji);
      }
    }

    if (e.target.className === 'btn-emoji') {
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
          style={{ display: blEmoji ? '' : 'none' }}
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
