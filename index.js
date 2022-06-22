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

function createMessageDiv({ content, senderIsMe }) {
  const newMessageDiv = document.createElement('div');
  newMessageDiv.textContent = content;
  newMessageDiv.className = `message ${senderIsMe ? 'my' : 'other'}-message`;
  messageContainer.appendChild(newMessageDiv);
  return newMessageDiv;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function handleNewMessage() {
  const newMessageDiv = createMessageDiv({ content: textMessageInputBox.value, senderIsMe: true });
  textMessageInputBox.value = '';

  newMeMsgObj = {
    senderIsMe: true,
    content: newMessageDiv.textContent,
    timeStamp: Date.now(),
    chatId: chatObjGlobal[currentIndexGlobal].id,
  };
  addNewMsg(newMeMsgObj);

  document.querySelector('.messages-container').scrollTop = document.querySelector('.messages-container').scrollHeight;
  fetch(
    `https://v2.jokeapi.dev/joke/${chatObjGlobal[currentIndexGlobal].apiName
    }?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=1`,
  )
    .then((res) => res.json())
    .then((data) => {
      const serverJokeDiv = createMessageDiv({ content: data.code === 106 ? data.message : data.joke, senderIsMe: false });

      const newMsgObj = {
        senderIsMe: false,
        content: serverJokeDiv.textContent,
        timeStamp: Date.now(),
        chatId: chatObjGlobal[currentIndexGlobal].id,
      };

      addNewMsg(newMsgObj);

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
  })
    .then((res) => res.json())
    .then((data) => { });
}

function toggleGreenMode() {
  const element = document.body;
  element.classList.toggle('green-mode');
}
