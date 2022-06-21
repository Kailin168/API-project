<<<<<<< HEAD
// Setting global variables
const messageStorage = {};
const TYPE_ME = 1;
const TYPE_OTHER = 2;

function setAttributeForCategoryRow(row) {
  const selectedRow = document.querySelector('.category-row.selected');
  if (selectedRow) {
    selectedRow.setAttribute('class', 'category-row');
  }
  row.setAttribute('class', 'category-row selected');
  const chatBuddy = document.querySelector('.chat_buddy');
  chatBuddy.textContent = `Chat Buddy: ${row.textContent}`;
}

function addEventListenerToAllCategoryRows() {
  const categoryRows = document.querySelectorAll('.category-row');
  categoryRows.forEach((row) => {
    messageStorage[row.querySelector('.category-text').textContent] = [];
    row.addEventListener('click', () => {
      setAttributeForCategoryRow(row);
      const messageContainer = document.querySelector('.messages-container');
      Array.from(messageContainer.children).forEach((child) => {
        child.remove();
      });

      messageStorage[row.querySelector('.category-text').textContent].forEach(
        (messageObj) => {
          if (messageObj.type === TYPE_ME) {
            const newMessageDiv = document.createElement('div');

            newMessageDiv.textContent = messageObj.message;
            newMessageDiv.setAttribute('class', 'message my-message');
            messageContainer.appendChild(newMessageDiv);
          } else {
            const newMessageDiv = document.createElement('div');

            newMessageDiv.textContent = messageObj.message;
            newMessageDiv.setAttribute('class', 'message other-message');
            messageContainer.appendChild(newMessageDiv);
          }
        },
      );
    });
=======
//QuerySelectors

const leftPane = document.querySelector(".left-container");
const messageContainer = document.querySelector(".messages-container");
const enterBox = document.querySelector(".enter-box");
const messageBox = document.querySelector(".message-box");
const textMessageInputBox = document.querySelector(".message-box");

messageBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleNewMessage();
  }
});
enterBox.addEventListener("click", () => {
  handleNewMessage();
});

//Derek Variables
let currentIndexGlobal = 0;
let chatObjGlobal = {};

fetch("http://localhost:3000/chat")
  .then((res) => res.json())
  .then((chats) => {
    chatObjGlobal = chats;
    chats.forEach(displayChats);
>>>>>>> 866e52817f91c089f9484fb9c978d9ffb7c17cbb
  });

function displayChats(chat) {
  const chatDiv = document.createElement("div");
  const chatImg = document.createElement("img");
  const textDiv = document.createElement("div");

  chatDiv.className = "category-row";
  chatDiv.dataset.idx = chat.id - 1;
  chatImg.src = chat.image;
  chatImg.alt = chat.name;
  chatImg.className = "category-icon";
  textDiv.className = "category-text";
  textDiv.textContent = chat.apiName;

  chatDiv.append(chatImg, textDiv);

  chatDiv.addEventListener("click", handleChatClick);

  leftPane.append(chatDiv);
}

function handleChatClick(e) {
  leftPane.querySelectorAll("div");
  leftPane.querySelectorAll(".category-row")[currentIndexGlobal].className =
    "category-row";

  e.currentTarget.className = "category-row selected";

  currentIndexGlobal = e.currentTarget.dataset.idx;
  const chatBuddy = document.querySelector(".chat_buddy");
  chatBuddy.textContent =
    "Chat Buddy: " + chatObjGlobal[currentIndexGlobal].name;

  removeAllChildNodes(messageContainer);

  fetch("http://localhost:3000/chat/" + chatObjGlobal[currentIndexGlobal].id)
    .then((res) => res.json())
    .then((chatData) => {
      chatData.messages.forEach((item) => {
        if (item.senderIsMe) {
          const newMessageDiv = document.createElement("div");
          newMessageDiv.textContent = item.content;
          newMessageDiv.setAttribute("class", "message my-message");
          messageContainer.appendChild(newMessageDiv);
        } else {
          const newMessageDiv = document.createElement("div");
          newMessageDiv.textContent = item.content;
          newMessageDiv.setAttribute("class", "message other-message");
          messageContainer.appendChild(newMessageDiv);
        }
      });
    });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function handleNewMessage() {
<<<<<<< HEAD
  const textMessageInputBox = document.querySelector('.message-box');
  const messageContainer = document.querySelector('.messages-container');
  const selectedRow = document.querySelector(
    '.category-row.selected .category-text',
  );
  const newMessageDiv = document.createElement('div');
=======
  const newMessageDiv = document.createElement("div");

>>>>>>> 866e52817f91c089f9484fb9c978d9ffb7c17cbb
  newMessageDiv.textContent = textMessageInputBox.value;
  textMessageInputBox.value = '';
  newMessageDiv.setAttribute('class', 'message my-message');
  messageContainer.appendChild(newMessageDiv);
<<<<<<< HEAD
  messageStorage[selectedRow.textContent].push({
    message: newMessageDiv.textContent,
    type: TYPE_ME,
  });
  document.querySelector('.messages-container').scrollTop = document.querySelector('.messages-container').scrollHeight;
  fetch(
    `https://v2.jokeapi.dev/joke/${selectedRow.textContent}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=1`,
=======

  document.querySelector(".messages-container").scrollTop =
    document.querySelector(".messages-container").scrollHeight;
  fetch(
    "https://v2.jokeapi.dev/joke/" +
      chatObjGlobal[currentIndexGlobal].apiName +
      "?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=1"
>>>>>>> 866e52817f91c089f9484fb9c978d9ffb7c17cbb
  )
    .then((res) => res.json())
    .then((data) => {
      const serverJokeDiv = document.createElement('div');
      if (data.code === 106) {
        serverJokeDiv.textContent = data.message;
      } else {
        serverJokeDiv.textContent = data.joke;
      }
      serverJokeDiv.setAttribute('class', 'message other-message');
      messageContainer.appendChild(serverJokeDiv);
<<<<<<< HEAD
      document.querySelector('.messages-container').scrollTop = document.querySelector('.messages-container').scrollHeight;
      messageStorage[selectedRow.textContent].push({
        message: serverJokeDiv.textContent,
        type: TYPE_OTHER,
      });
    });
}
function sendingMessageUsingEnterEvent() {
  const enterBox = document.querySelector('.enter-box');
  enterBox.addEventListener('click', () => {
    handleNewMessage();
  });
}
function sendingMessageUsingKeydownEvent() {
  const messageBox = document.querySelector('.message-box');
  messageBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleNewMessage();
    }
  });
}

setAttributeForCategoryRow(document.querySelectorAll('.category-row')[0]);
addEventListenerToAllCategoryRows();
sendingMessageUsingEnterEvent();
sendingMessageUsingKeydownEvent();
=======
      document.querySelector(".messages-container").scrollTop =
        document.querySelector(".messages-container").scrollHeight;
    });
}
>>>>>>> 866e52817f91c089f9484fb9c978d9ffb7c17cbb
