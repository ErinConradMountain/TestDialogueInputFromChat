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
  function applyTransform() {
    img.style.transform = `rotate(${rotation}deg) scale(${scale})`;
  }

  document.getElementById("rotateLeft").onclick = () => {
    rotation = (rotation - 90) % 360;
    applyTransform();
  };

  document.getElementById("rotateRight").onclick = () => {
    rotation = (rotation + 90) % 360;
    applyTransform();
  };

  img.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      scale += e.deltaY < 0 ? 0.1 : -0.1;
      scale = Math.min(Math.max(scale, 0.5), 3);
      applyTransform();
    },
    { passive: false },
  );
});
