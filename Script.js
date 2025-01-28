let score = 0;

const button = document.getElementById('scoreButton');
const scoreDisplay = document.getElementById('score');

// Obsługa kliknięcia w przycisk
button.addEventListener('click', () => {
  score++; // Zwiększ punkty o 1
  scoreDisplay.textContent = `Punkty: ${score}`; // Zaktualizuj wyświetlane punkty
});
