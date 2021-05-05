const dmForm = document.getElementById('dm-form');
const chatMessages = document.querySelector('.dm-messages');
const roomName = document.getElementById('room-name');
const ownerList = document.getElementById('owners');

const socket = io();

const { name, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

socket.emit('joinRoom', { name, room });

// socket.on('roomUsers', ({ room, owners }) => {
//     outputRoomName(room);
//     outputOwners(owners);
// });

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
})

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.name} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.dm-messages').appendChild(div);
    // const p = document.createElement('p');
    // p.classList.add('meta');
    // p.innerText = message.username;
    // p.innerHTML += `<span>${message.time}</span>`;
    // div.appendChild(p);
    // const para = document.createElement('p');
    // para.classList.add('text');
    // para.innerText = message.text;
    // div.appendChild(para);
    // document.querySelector('.dm-messages').appendChild(div);
}

// function outputRoomName(room) {
//     roomName.innerText = room;
// }

// function outputOwners(owners) {
//     ownerList.innerHTML = `
//         ${owners.map(owner => `<li>${owner.name}</li>`).join()}
//     `;
//     // owners.forEach((owner) => {
//     //   const li = document.createElement('li');
//     //   li.innerText = owner.name;
//     //   ownerList.appendChild(li);
//     // });
// }

document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '/messages';
    } else {
    }
});

dmForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const msg = event.target.elements.msg.value;

    console.log(msg);

    socket.emit('chatMessage', msg);

    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
})