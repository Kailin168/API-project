// QuerySelectors

const leftPane = document.querySelector('.left-container');
const messageContainer = document.querySelector('.messages-container');
const enterBox = document.querySelector('.enter-box');
const messageBox = document.querySelector('.message-box');
const textMessageInputBox = document.querySelector('.message-box');

messageBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleNewMessage();
  }
});
enterBox.addEventListener('click', () => {
  handleNewMessage();
});

// Derek Variables
let currentIndexGlobal = 0;
let chatObjGlobal = {};

fetch('http://localhost:3000/chat')
  .then((res) => res.json())
  .then((chats) => {
    chatObjGlobal = chats;
    chats.forEach(displayChats);
    leftPane.children[0].click(); // page to start with programming jokes
  });

function displayChats(chat) {
  const chatDiv = document.createElement('div');
  const chatImg = document.createElement('img');
  const textDiv = document.createElement('div');

  chatDiv.className = 'category-row';
  chatDiv.dataset.idx = chat.id - 1;
  chatImg.src = chat.image;
  chatImg.alt = chat.name;
  chatImg.className = 'category-icon';
  textDiv.className = 'category-text';
  textDiv.textContent = chat.name;

  chatDiv.append(chatImg, textDiv);

  chatDiv.addEventListener('click', handleChatClick);

  leftPane.append(chatDiv);
}

function handleChatClick(e) {
  leftPane.querySelectorAll('.category-row')[currentIndexGlobal].className = 'category-row';

  e.currentTarget.className = 'category-row selected';

  currentIndexGlobal = e.currentTarget.dataset.idx;
  const chatBuddy = document.querySelector('.chat_buddy');
  chatBuddy.textContent = `Chat Buddy: ${chatObjGlobal[currentIndexGlobal].name}`;

  removeAllChildNodes(messageContainer);

  fetch(`http://localhost:3000/chat/${chatObjGlobal[currentIndexGlobal].id}`)
    .then((res) => res.json())
    .then((chatData) => {
      chatData.messages.forEach((item) => {
        createMessageDiv(item);
      });
      document.querySelector('.messages-container').scrollTop = document.querySelector('.messages-container').scrollHeight;
    });
}

function createMessageDiv({ content, senderIsMe, timeStamp }) {
  const messageAndTimeDiv = document.createElement('div');
  messageAndTimeDiv.className = `message ${senderIsMe ? 'my' : 'other'}-message`;

  const newMessageDiv = document.createElement('div');
  newMessageDiv.className = 'message-text';

  const timeSpan = document.createElement('span');
  timeSpan.className = 'message-time';

  timeSpan.textContent = (new Date(timeStamp)).toLocaleString();
  newMessageDiv.textContent = content;

  messageAndTimeDiv.append(newMessageDiv, timeSpan);
  messageContainer.appendChild(messageAndTimeDiv);
  return newMessageDiv;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function handleNewMessage() {
  let timeStamp = Date.now();
  const newMessageDiv = createMessageDiv({ content: textMessageInputBox.value, senderIsMe: true, timeStamp });
  textMessageInputBox.value = '';
  addNewMsg({
    senderIsMe: true,
    content: newMessageDiv.textContent,
    timeStamp,
    chatId: chatObjGlobal[currentIndexGlobal].id,
  });

  document.querySelector('.messages-container').scrollTop = document.querySelector('.messages-container').scrollHeight;
  fetch(
    `https://v2.jokeapi.dev/joke/${chatObjGlobal[currentIndexGlobal].apiName
    }?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=1`,
  )
    .then((res) => res.json())
    .then((data) => {
      timeStamp = Date.now();
      const serverJokeDiv = createMessageDiv({ content: data.code === 106 ? data.message : data.joke, senderIsMe: false, timeStamp });
      addNewMsg({
        senderIsMe: false,
        content: serverJokeDiv.textContent,
        timeStamp,
        chatId: chatObjGlobal[currentIndexGlobal].id,
      });

      document.querySelector('.messages-container').scrollTop = document.querySelector('.messages-container').scrollHeight;
    });
}

function addNewMsg(obj) {
  fetch('http://localhost:3000/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
}

function toggleGreenMode(element) {
  element.textContent = `Green Mode: ${element.textContent.indexOf('OFF') !== -1 ? 'ON' : 'OFF'}`;

  const bodyElement = document.body;
  bodyElement.classList.toggle('green-mode');
}
