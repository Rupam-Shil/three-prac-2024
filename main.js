import { ThreeBootstrap } from './bootstrap';
import './style.css';
import * as THREE from 'three';

const canvas = document.querySelector('#three-canvas');

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.z = 5;
scene.add(camera);

// Element
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// RENDERER
const renderer = new THREE.WebGLRenderer({
	canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// RESIZE LISTENER
window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ANIMATION
const animate = () => {
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

animate();
