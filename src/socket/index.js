import { socket } from "../socket";


const { username, room } = localStorage.getItem('user-info');

const chatDashboard = (socket) => {

  // Creating a new connection or user
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



  // Output Room Name to DOM
  function outputRoom(room) {
    const roomName = document.getElementById('room-name');
    roomName.innerText = room;
  }

  // Output Current Users
  function outputUsers(users) {
    const userList = document.getElementById('users');
    userList.innerHTML = `
      ${users.map(user => `<li> ${user.username}</li>`).join('')}
    `;
  }

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


//Sending a message

const sendForm = document.getElementById('send-message-form');

sendForm.addEventListener('submit', event => {
  event.preventDefault();

  const msg = event.target.elements.messageInp.value;
  console.log(msg)

  socket.emit('chat-message', msg);
});

module.exports = {
  chatDashboard
}