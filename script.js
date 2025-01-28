// Import biblioteki Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js';

let scene, camera, renderer;
let cube, floor;
let touchStartX = 0, touchStartY = 0;

// Funkcja inicjująca scenę
function init() {
  // Tworzenie sceny
  scene = new THREE.Scene();

  // Tworzenie kamery
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);

  // Tworzenie renderera
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Tworzenie podłogi
  const floorGeometry = new THREE.PlaneGeometry(50, 50);
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2; // Obrót, aby leżała poziomo
  scene.add(floor);

  // Tworzenie gracza (sześcianu)
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.y = 0.5; // Aby gracz "stał" na podłodze
  scene.add(cube);

  // Dodanie światła
  const ambientLight = new THREE.AmbientLight(0x404040); // Światło otoczenia
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Światło kierunkowe
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // Obsługa zmiany rozmiaru okna
  window.addEventListener('resize', onWindowResize);

  // Obsługa dotyku
  document.addEventListener('touchstart', handleTouchStart);
  document.addEvent