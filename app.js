/**
 * Fetches journal entries from entries.json and renders them.
 *
 * Learner Note: This is the expected format.
 */
async function loadEntries() {
  const response = await fetch("entries.json");
  const data = await response.json();
  const list = document.getElementById("entry-list");
  data.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "entry";
    li.textContent = entry.title;
    list.appendChild(li);
  });
}

/**
 * Loads photos from the images directory and links each one to
 * its dedicated article page.
 *
 * @returns {void}
 */
function loadPhotos() {
  const container = document.getElementById("photos");
  const photos = [
    "images/journal-photo1.jpeg",
    "images/journal-photo2.jpeg",
    "images/journal-photo3.jpeg",
    "images/journal-photo4.jpeg",
    "images/journal-photo5.jpeg",
  ];
  photos.forEach((src, idx) => {
    const link = document.createElement("a");
    link.href = `docs/photo${idx + 1}.html`;
    const img = document.createElement("img");
    img.src = src;
    link.appendChild(img);
    container.appendChild(link);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadEntries();
  loadPhotos();
});
