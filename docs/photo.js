/**
 * Handles rotation and zoom interactions for image pages.
 *
 * Learner Note: This is the expected format.
 */
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("mainImage");
  let rotation = 0;
  let scale = 1;

  /**
   * Apply current rotation and zoom to the image.
   *
   * @returns {void}
   */
  function updateTransform() {
    img.style.transform = `rotate(${rotation}deg) scale(${scale})`;
  }

  document.getElementById("rotateLeft").onclick = () => {
    rotation -= 90;
    updateTransform();
  };

  document.getElementById("rotateRight").onclick = () => {
    rotation += 90;
    updateTransform();
  };

  img.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      scale = Math.min(scale + 0.1, 3);
    } else {
      scale = Math.max(scale - 0.1, 0.5);
    }
    updateTransform();
  });
});
