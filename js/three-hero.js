import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export function initHeroScene(canvas) {
  if (!canvas) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 5, 5);
  scene.add(dir);
  const point = new THREE.PointLight(0xff8a65, 0.8, 20);
  point.position.set(-3, 2, 3);
  scene.add(point);

  // Materials
  const mat1 = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.3, metalness: 0.2 });
  const mat2 = new THREE.MeshStandardMaterial({ color: 0xe8e0d9, roughness: 0.4, metalness: 0.1 });
  const mat3 = new THREE.MeshStandardMaterial({ color: 0xc19a6b, roughness: 0.5, metalness: 0.15, wireframe: false });

  // Objects
  const group = new THREE.Group();
  scene.add(group);

  const torus = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.35, 32, 100), mat2);
  torus.position.set(2.5, 0.5, -1);
  torus.rotation.set(0.5, 0.2, 0);
  group.add(torus);

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.9, 64, 64), mat1);
  sphere.position.set(-2.8, -0.8, -0.5);
  group.add(sphere);

  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.6, 0.18, 120, 16), mat3);
  knot.position.set(0, 1.8, -0.8);
  group.add(knot);

  const box = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), mat2);
  box.position.set(-1.2, 1.2, -1.2);
  box.rotation.set(0.6, 0.8, 0);
  group.add(box);

  // Floating particles
  const particlesGeo = new THREE.BufferGeometry();
  const count = 120;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    pos[i] = (Math.random() - 0.5) * 12;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const particlesMat = new THREE.PointsMaterial({ size: 0.02, color: 0x0a0a0a, transparent: true, opacity: 0.25 });
  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);

  // Mouse parallax
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let raf;
  const clock = new THREE.Clock();
  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    group.rotation.y = t * 0.08 + targetX * 0.3;
    group.rotation.x = Math.sin(t * 0.2) * 0.15 + targetY * 0.2;

    torus.rotation.x += 0.003;
    torus.rotation.y += 0.005;
    sphere.position.y = -0.8 + Math.sin(t * 0.8) * 0.15;
    knot.rotation.y += 0.006;
    box.rotation.y += 0.004;
    box.rotation.x += 0.003;

    particles.rotation.y = t * 0.02;

    camera.position.x += (targetX * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (-targetY * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onResize);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    }
  };
}

export function initProductViewer(canvas, imageUrl) {
  if (!canvas) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 2.5);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xffffff, 0.6);
  dir.position.set(2, 3, 2);
  scene.add(dir);

  const loader = new THREE.TextureLoader();
  const texture = imageUrl ? loader.load(imageUrl) : null;
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }

  const geometry = new THREE.BoxGeometry(1.2, 1.6, 0.08);
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0xffffff }),
    new THREE.MeshStandardMaterial({ color: 0xffffff }),
    new THREE.MeshStandardMaterial({ color: 0xffffff }),
    new THREE.MeshStandardMaterial({ color: 0xffffff }),
    new THREE.MeshStandardMaterial({ map: texture || null, color: texture ? 0xffffff : 0xe8e0d9, roughness: 0.6 }),
    new THREE.MeshStandardMaterial({ color: 0x111111 })
  ];

  const mesh = new THREE.Mesh(geometry, materials);
  scene.add(mesh);

  let isDragging = false;
  let prevX = 0;
  let rotY = 0;
  let rotX = 0.15;
  canvas.addEventListener('pointerdown', e => { isDragging = true; prevX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointerup', () => { isDragging = false; });
  canvas.addEventListener('pointermove', e => {
    if (!isDragging) return;
    const delta = e.clientX - prevX;
    rotY += delta * 0.01;
    prevX = e.clientX;
  });

  let raf;
  const clock = new THREE.Clock();
  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    if (!isDragging) {
      rotY += 0.005;
    }
    mesh.rotation.y = rotY;
    mesh.rotation.x = rotX + Math.sin(t * 0.5) * 0.05;
    mesh.position.y = Math.sin(t * 0.6) * 0.05;
    renderer.render(scene, camera);
  }
  animate();

  function onResize() {
    if (!canvas.clientWidth) return;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }
  window.addEventListener('resize', onResize);
  const ro = new ResizeObserver(onResize);
  ro.observe(canvas);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    }
  };
}
