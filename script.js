// Import Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Renderer ustawiony w kontenerze
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('gameContainer').appendChild(renderer.domElement);

// Tworzenie podłogi
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Obrót, by podłoga była pozioma
scene.add(floor);

// Tworzenie ludzika (sześcian)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = 0.5; // Podniesienie nad podłogę
scene.add(cube);

// Kamera
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Obsługa dotyku
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchmove', (event) => {
  const touchMoveX = event.touches[0].clientX - touchStartX;
  const touchMoveY = event.touches[0].clientY - touchStartY;

  cube.position.x += touchMoveX * 0.01; // Ruch w poziomie
  cube.position.z += touchMoveY * 0.01; // Ruch w pionie

  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

// Animacja
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();