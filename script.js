// Inicjalizacja sceny, kamery i renderera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('gameContainer').appendChild(renderer.domElement);

// Dodanie światła
const light = new THREE.AmbientLight(0xffffff, 1); // Uniwersalne oświetlenie
scene.add(light);

// Podłoga w kratkę
const floorSize = 20;
const floorSegments = 10;
const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize, floorSegments, floorSegments);
const floorMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00, // Zielony
  wireframe: true, // Wyświetlaj jako siatka (kratka)
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Obróć, by była pozioma
scene.add(floor);

// Ludzik (sześcian)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 0.5, 0); // Podniesienie sześcianu nad podłogę
scene.add(cube);

// Ustawienia kamery
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Obsługa dotyku
let touchStartX = 0;
let touchStartY = 0;
let floorOffsetX = 0;
let floorOffsetY = 0;

document.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchmove', (event) => {
  const touchMoveX = event.touches[0].clientX - touchStartX;
  const touchMoveY = event.touches[0].clientY - touchStartY;

  // Przesuwanie ludzika
  cube.position.x += touchMoveX * 0.01; // Ruch w poziomie
  cube.position.z += touchMoveY * 0.01; // Ruch w pionie

  // Przesuwanie podłogi
  floorOffsetX += touchMoveX * 0.01;
  floorOffsetY += touchMoveY * 0.01;

  // Przesuwanie podłogi
  floor.position.x = floorOffsetX;
  floor.position.z = floorOffsetY;

  // Zaktualizowanie pozycji dotyku
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

// Animacja
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();