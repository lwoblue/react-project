// import React, {useEffect} from 'react';

// const Chat = () => {

//     useEffect(() => {
//         if (roomId) {
//           db.collection("rooms")
//             .doc(roomId)
//             .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
//         }
//         db.collection("rooms")
//           .doc(roomId)
//           .collection("messages")
//           .orderBy("timestamp", "asc")
//           .onSnapshot((snapshot) =>
//             setRoomMessages(snapshot.docs.map((doc) => doc.data()))
//           );
//       }, [roomId]);

//     return (
//         <>
//             <h2>chat 화면</h2>
//         </>
//     )
// }
// export default Chat;