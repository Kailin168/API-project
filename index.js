//Setting global variables
const messageStorage = {};
const TYPE_ME = 1;
const TYPE_OTHER = 2;

function setAttributeForCategoryRow(row) {
  const selectedRow = document.querySelector(".category-row.selected");
  if (selectedRow) {
    selectedRow.setAttribute("class", "category-row");
  }
  row.setAttribute("class", "category-row selected");
  const chatBuddy = document.querySelector(".chat_buddy");
  chatBuddy.textContent = `Chat Buddy: ${row.textContent}`;
}

function addEventListenerToAllCategoryRows() {
  const categoryRows = document.querySelectorAll(".category-row");
  categoryRows.forEach((row) => {
    messageStorage[row.querySelector(".category-text").textContent] = [];
    row.addEventListener("click", () => {
      setAttributeForCategoryRow(row);
      const messageContainer = document.querySelector(".messages-container");
      Array.from(messageContainer.children).forEach((child) => {
        child.remove();
      });

      messageStorage[row.querySelector(".category-text").textContent].forEach(
        (messageObj) => {
          if (messageObj.type === TYPE_ME) {
            const newMessageDiv = document.createElement("div");

            newMessageDiv.textContent = messageObj.message;
            newMessageDiv.setAttribute("class", "message my-message");
            messageContainer.appendChild(newMessageDiv);
          } else {
            const newMessageDiv = document.createElement("div");

            newMessageDiv.textContent = messageObj.message;
            newMessageDiv.setAttribute("class", "message other-message");
            messageContainer.appendChild(newMessageDiv);
          }
        }
      );
    });
  });
}
function handleNewMessage() {
  const textMessageInputBox = document.querySelector(".message-box");
  const messageContainer = document.querySelector(".messages-container");
  const selectedRow = document.querySelector(
    ".category-row.selected .category-text"
  );
  const newMessageDiv = document.createElement("div");
  newMessageDiv.textContent = textMessageInputBox.value;
  textMessageInputBox.value = "";
  newMessageDiv.setAttribute("class", "message my-message");
  messageContainer.appendChild(newMessageDiv);
  messageStorage[selectedRow.textContent].push({
    message: newMessageDiv.textContent,
    type: TYPE_ME,
  });
  document.querySelector(".messages-container").scrollTop =
    document.querySelector(".messages-container").scrollHeight;
  fetch(
    `https://v2.jokeapi.dev/joke/${selectedRow.textContent}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=1`
  )
    .then((res) => res.json())
    .then((data) => {
      const serverJokeDiv = document.createElement("div");
      if (data.code === 106) {
        serverJokeDiv.textContent = data.message;
      } else {
        serverJokeDiv.textContent = data.joke;
      }
      serverJokeDiv.setAttribute("class", "message other-message");
      messageContainer.appendChild(serverJokeDiv);
      document.querySelector(".messages-container").scrollTop =
        document.querySelector(".messages-container").scrollHeight;
      messageStorage[selectedRow.textContent].push({
        message: serverJokeDiv.textContent,
        type: TYPE_OTHER,
      });
    });
}
function sendingMessageUsingEnterEvent() {
  const enterBox = document.querySelector(".enter-box");
  enterBox.addEventListener("click", () => {
    handleNewMessage();
  });
}
function sendingMessageUsingKeydownEvent() {
  const messageBox = document.querySelector(".message-box");
  messageBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleNewMessage();
    }
  });
}

setAttributeForCategoryRow(document.querySelectorAll(".category-row")[0]);
addEventListenerToAllCategoryRows();
sendingMessageUsingEnterEvent();
sendingMessageUsingKeydownEvent();
