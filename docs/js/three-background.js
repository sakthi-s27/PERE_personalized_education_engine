/* PERE - 3D Three.js Interactive Neural Network Background */

(function () {
  let scene, camera, renderer;
  let nodesMesh, linesMesh, mathSymbolsGroup, particleSystem;
  let nodes = [];
  const nodeCount = 50;
  const connectionDistance = 14;

  function initThreeBackground() {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    // Check WebGL availability
    if (!window.WebGLRenderingContext) {
      console.warn("WebGL not supported. Fallback to CSS background.");
      return;
    }

    // 1. Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.015);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 45);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 2, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 100);
    pointLight2.position.set(-20, -20, 10);
    scene.add(pointLight2);

    // 5. Create Neural Nodes
    const geometry = new THREE.SphereGeometry(0.35, 16, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8
    });

    const instancedNodes = new THREE.InstancedMesh(geometry, material, nodeCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40
      );
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03
      );
      nodes.push({ pos, velocity });

      dummy.position.copy(pos);
      dummy.updateMatrix();
      instancedNodes.setMatrixAt(i, dummy.matrix);
    }
    nodesMesh = instancedNodes;
    scene.add(nodesMesh);

    // 6. Connections (Lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25
    });
    const lineGeometry = new THREE.BufferGeometry();
    linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 7. Math Symbols Canvas Textures
    createMathSymbols();

    // 8. Event Listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('scroll', onScrollMoveCamera);

    // 9. Animation Loop
    animate();
  }

  function createMathSymbols() {
    mathSymbolsGroup = new THREE.Group();
    const symbols = ['∑', 'π', '∫', '½', '√', 'θ', 'λ', 'Δ', '∞'];

    symbols.forEach((sym, idx) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'Bold 72px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sym, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.6
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30
      );
      sprite.scale.set(3.5, 3.5, 1);
      mathSymbolsGroup.add(sprite);
    });

    scene.add(mathSymbolsGroup);
  }

  function animate() {
    requestAnimationFrame(animate);

    // Move nodes
    const dummy = new THREE.Object3D();
    const linePositions = [];

    for (let i = 0; i < nodeCount; i++) {
      const node = nodes[i];
      node.pos.add(node.velocity);

      // Bounce boundaries
      if (Math.abs(node.pos.x) > 45) node.velocity.x *= -1;
      if (Math.abs(node.pos.y) > 35) node.velocity.y *= -1;
      if (Math.abs(node.pos.z) > 25) node.velocity.z *= -1;

      dummy.position.copy(node.pos);
      dummy.updateMatrix();
      nodesMesh.setMatrixAt(i, dummy.matrix);

      // Check connections
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = node.pos.distanceTo(nodes[j].pos);
        if (dist < connectionDistance) {
          linePositions.push(node.pos.x, node.pos.y, node.pos.z);
          linePositions.push(nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z);
        }
      }
    }
    nodesMesh.instanceMatrix.needsUpdate = true;

    // Update lines
    linesMesh.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    // Rotate math symbols slowly
    if (mathSymbolsGroup) {
      mathSymbolsGroup.rotation.y += 0.0015;
      mathSymbolsGroup.rotation.x += 0.0008;
    }

    renderer.render(scene, camera);
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onScrollMoveCamera() {
    if (!camera) return;
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    camera.position.z = 45 + scrollPercent * 15;
    camera.position.y = -scrollPercent * 20;
    camera.rotation.z = scrollPercent * 0.2;
  }

  window.addEventListener('DOMContentLoaded', initThreeBackground);
})();
