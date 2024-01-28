import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { socket } from '../socket';

const Chat = () => {

  const navigate = useNavigate();
 

  useEffect(() => {

    // Dom Variables
    const myKeyValues = window.location.search;
    const urlParams = new URLSearchParams(myKeyValues);
    const username = urlParams.get('name');
    const room = urlParams.get('room');
    console.log(username, room);
    localStorage.setItem('user-info', { username, room });

    socket.connect();

    // Sending user details to server
    socket.emit("user-details", { username, room });

    // receiving a message
    socket.on('message', message => {
      console.log(message);
      outputMessage(message);
    });

    // Receiving Room and User List
    socket.on('room-users', ({ sRoom, sUsers }) => {
      outputRoom(sRoom);
      outputUsers(sUsers);
    });

    //random room chat
    socket.on('random-chat', randomRoom => {
      console.log(randomRoom);
    })


  }, [])




  // Sending a message to Server through DOM
  const handleSubmit = (event) => {
    event.preventDefault();

    const msg = event.target.elements.messageInp.value;
    // Sending a Message
    socket.emit('chat-message', msg);

    event.target.elements.messageInp.value = '';
    event.target.elements.messageInp.focus();

  }

  // Disconnecting a user from chat through Client Side

  const handleLeaveChat = () => {
    socket.disconnect(true);
    const url = `/joinchat`;
    navigate(url);
    window.location.reload();
  }


  // Output Room Name to DOM
  function outputRoom(room) {
    const roomName = document.getElementById('room-name');
    roomName.innerText = room;
  }

  // Output Current Users
  function outputUsers(activeUsers) {
    const userList = document.getElementById('users');
    userList.innerHTML = "";
    if (activeUsers.length > 0){
      activeUsers.forEach(function (user) {
        var listItem = document.createElement('li');
        listItem.textContent = user.username;
        userList.appendChild(listItem);
      })
    }
    else{
      userList.innerText = 'No User Found';
    }
    // userList.innerHTML = `${users?.map(user => `<li> ${user.username}</li>`).join('')}`;
    console.log(activeUsers)
  }

  // Output message to DOM
  function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('incoming-inner');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <div class="message left">
      ${message.text}
    </div>`;
    document.querySelector('.incoming-box').append(div);
  }

  return (

    <>

      <header className="chat-header">
        <h1><i className="fas fa-smile"></i> Real-Chat</h1>
        <button className="btn-leave" onClick={handleLeaveChat}>Leave Chat</button>
      </header>

      <div className="row">

        <div className="col-lg-3 left">
          <div className="chat-sidebar">
            <h3><i className="fas fa-comments"></i> Room Info:</h3>
            <h2 id="room-name">kk</h2>
            <h3><i className="fas fa-users"></i> Users</h3>
            <ul id="users"></ul>

          </div>
        </div>
        <div className="col-lg-9 chat-main p-1">
          <div className="chat-container">
            <div className="incoming-box">
              {/* <div className="incoming-inner divMessage">
                <p className="meta">Nikhil <span>9:12pm</span></p>
                <div className="message left">
                  Hey Tripti! How are you. fdlfl fdl fdl fldfj ljf dlf l fldjljdlf
                  lf
                </div>
              </div> */}
            </div>
            <div className="outgoing-box" id="outgoing-box">
              {/* <div className="outgoing-inner">
                <h4 className="heading-u">Tripti</h4>
                <p className="meta">Tripti <span>9:12pm</span></p>
                <div className="message right">
                  Vertical margins between two floated elements on the other hand
                  will not collapse. When applied to floating elements, the margin
                  edge of.
                </div>
              </div> */}
            </div>
          </div>

          <div className="send container my-2">

            <form className="input-group mb-3" id="send-message-form" onSubmit={handleSubmit}>
              <input
                type="text"
                id="messageInp"
                name="messageInp"
                className="form-control message-input"
                placeholder="Enter Your message"
                aria-label="Sender's message"
                aria-describedby="basic-addon2"
              />
              <button className="btn" type="submit">Send</button>
            </form>

          </div>
        </div>

      </div>


    </>
  )
}

export default Chat