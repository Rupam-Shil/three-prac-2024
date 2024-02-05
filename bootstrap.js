import * as THREE from 'three';

export class ThreeBootstrap {
	constructor(canvasId) {
		this.canvas = document.querySelector(canvasId);
		this.scene = new THREE.Scene();
		this.camera = this.createCamera();
		this.functionQueue = [];
		this.camera.position.z = 10;
		this.scene.add(this.camera);
		this.resizeListener();
		this.startRender();
	}

	resizeListener = () => {
		window.addEventListener('resize', () => {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		});
	};

	createCamera() {
		return new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
	}

	startRender() {
		this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.animate();
	}

	addFunctionToQueue(func) {
		const id = crypto.randomUUID();
		this.functionQueue.push({
			func,
			id: crypto.randomUUID(),
		});
		return id;
	}

	removeFunctionFromQueue(id) {
		this.functionQueue = this.functionQueue.filter(({ id: fId }) => fId !== id);
	}

	animate = () => {
		this.functionQueue.forEach(({ func }) => func());
		this.renderer?.render(this.scene, this.camera);
		requestAnimationFrame(this.animate);
	};
}
