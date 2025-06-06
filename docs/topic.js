/**
 * Load a conversation by index and display it.
 *
 * @param {number} idx - Conversation index.
 * @returns {void}
 */
function loadConversation(idx) {
  const images = [
    "../images/topic1.jpeg",
    "../images/topic2.jpeg",
    "../images/topic3.jpeg",
    "../images/topic4.jpeg",
    "../images/topic5.jpeg",
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
    });
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof TOPIC_INDEX !== "undefined") {
    loadConversation(TOPIC_INDEX);
  }
});
