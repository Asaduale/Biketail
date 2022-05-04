import React, { useEffect } from 'react';
import io from "socket.io-client";
import {useState} from 'react';
import '../../css/Chat.css'

const socket = io.connect('http://localhost:8080')
function Chat (){
  const [message, setMessage] = useState('');
  const [array_message, setarray_message] = useState([])

const sendMessage = async () => {
  const info = {
    message: message,
    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
  }
  await socket.emit("send_message", { message })
  setarray_message((list) => [...list, info])
  console.log(`array_message: ${array_message}`)
}

  useEffect(() => {
    socket.on("get_message", (obj) => {
      setarray_message((list) => [...list, obj])
      console.log(`OBJECT FROM BACKEND: ${obj}`)
    });
  }, [socket]);

  return (
  <div id='bodybox'>
    <div id='chatboarder'>
      {/* <div class="chatlog">{messageRecieve}</div> */}
      {array_message.map((messageContent) => {
        return <div class="chatlog">{messageContent.message}</div>
      })}
      <div>
        <input type="text" class="text-box" onChange={(event)=>{
          setMessage(event.target.value)
        }} /><button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  </div>
  )
}

export default Chat;