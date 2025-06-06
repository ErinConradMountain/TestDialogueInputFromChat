/**
 * Load topics and display them on the homepage.
 * @returns {void}
 *
 * Learner Note: This is the expected format.
 */
function getSnippet(convo) {
  const messages = Object.values(convo.mapping)
    .map((m) => m.message)
    .filter(Boolean)
    .sort((a, b) => a.create_time - b.create_time);
  for (const msg of messages) {
    const parts = msg.content?.parts;
    if (Array.isArray(parts) && parts.length) {
      return parts[0].slice(0, 100);
    }
  }
  return "";
}

function loadTopics() {
  const images = [
    "../images/file-72jQ6thojeuUeE7Kd8A1t7-IMG_2ACDECCE-CF79-481B-8AD6-AC6C6C6F27FB.jpeg",
    "../images/file-9e9vEQGrqMMNm9nYDzmaUt-IMG_DE34B664-8B17-46BA-9904-7B218C7A664C.jpeg",
    "../images/file-ASTUeW6XAHMhQjcH8pDWzW-IMG_064B4BE5-EC7C-480C-982E-368A5D9E1681.jpeg",
    "../images/file-CjjdBdQLaPwkmeBer68Ga2-IMG_D4A12851-2AFD-4571-9EE0-0A7AE0A2E8C5.jpeg",
  ];

  fetch("../data/conversations.json")
    .then((resp) => resp.json())
    .then((convos) => {
      const list = document.getElementById("topics");
      convos.forEach((c, idx) => {
        const div = document.createElement("div");
        div.className = "topic";
        const img = document.createElement("img");
        img.src = images[idx % images.length];
        img.alt = "topic image";
        img.className = "thumb";
        const link = document.createElement("a");
        link.href = `topic.html?id=${idx}`;
        link.textContent = c.title || `Conversation ${idx + 1}`;
        const snippet = document.createElement("p");
        snippet.textContent = getSnippet(c);
        div.appendChild(img);
        div.appendChild(link);
        div.appendChild(snippet);
        list.appendChild(div);
      });
    });
}

document.addEventListener("DOMContentLoaded", loadTopics);
