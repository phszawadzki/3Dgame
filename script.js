let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (event) => {
  // Zapisanie pozycji startowej dotyku
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchmove', (