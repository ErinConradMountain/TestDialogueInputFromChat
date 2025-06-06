/**
 * Retrieve a query parameter from the URL.
 * @param {string} name - Parameter name.
 * @returns {string|null} The parameter value or null.
 */
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/**
 * Load a conversation by index and display it.
 * @param {number} idx - Conversation index.
 * @returns {void}
 */
function loadConversation(idx) {
  const images = [
    "../images/file-72jQ6thojeuUeE7Kd8A1t7-IMG_2ACDECCE-CF79-481B-8AD6-AC6C6C6F27FB.jpeg",
    "../images/file-9e9vEQGrqMMNm9nYDzmaUt-IMG_DE34B664-8B17-46BA-9904-7B218C7A664C.jpeg",
    "../images/file-ASTUeW6XAHMhQjcH8pDWzW-IMG_064B4BE5-EC7C-480C-982E-368A5D9E1681.jpeg",
    "../images/file-CjjdBdQLaPwkmeBer68Ga2-IMG_D4A12851-2AFD-4571-9EE0-0A7AE0A2E8C5.jpeg",
  ];

  fetch("../data/conversations.json")
    .then((resp) => resp.json())
    .then((convos) => {
      const convo = convos[idx];
      if (!convo) return;
      document.getElementById("title").textContent =
        convo.title || "Conversation";
      const container = document.getElementById("conversation");
      const messages = Object.values(convo.mapping);
      messages.sort((a, b) => a.message.create_time - b.message.create_time);
      container.textContent = messages
        .map(
          (m) =>
            `${m.message.author.role}: ${m.message.content.parts.join("\n")}`,
        )
        .join("\n\n");
      document.getElementById("topicImage").src = images[idx % images.length];
      handleNavigation(idx, convos.length);
      loadNotes(idx);
    });
}

/**
 * Load and save notes for a given topic.
 * @param {number} idx - Conversation index.
 * @returns {void}
 */
function loadNotes(idx) {
  const noteKey = `note_${idx}`;
  const noteArea = document.getElementById("noteArea");
  noteArea.value = localStorage.getItem(noteKey) || "";
  document.getElementById("saveNote").onclick = () => {
    localStorage.setItem(noteKey, noteArea.value);
    alert("Note saved");
  };
}

/**
 * Enable previous/next buttons for navigation.
 * @param {number} idx - Current conversation index.
 * @param {number} count - Total conversations.
 * @returns {void}
 */
function handleNavigation(idx, count) {
  const prev = document.getElementById("prevTopic");
  const next = document.getElementById("nextTopic");
  prev.disabled = idx <= 0;
  next.disabled = idx >= count - 1;
  prev.onclick = () => {
    if (idx > 0) window.location.href = `topic.html?id=${idx - 1}`;
  };
  next.onclick = () => {
    if (idx < count - 1) window.location.href = `topic.html?id=${idx + 1}`;
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const id = parseInt(getParam("id"), 10);
  if (!isNaN(id)) loadConversation(id);
});
