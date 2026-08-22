/* PERE v2 — Data-driven 3D Cognitive Misconception Map */
window.PERE_3DMap = (function () {
  let container, scene, camera, renderer, nodeGroup, lineGroup, particleGroup;
  let raycaster, mouse, activeStudentKey = 'student-a', animationId;
  let isDragging = false, lastPointer = null, rotationY = 0.0, rotationX = 0.0;
  let bound = false;

  function initMap(studentKey) {
    activeStudentKey = studentKey || 'student-a';
    container = document.getElementById('misconception-map-3d');
    if (!container || !window.THREE) return;
    cleanup();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(48, Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight), 0.1, 1000);
    camera.position.set(0, 1.5, 25);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
    renderer.outputColorSpace = THREE.SRGBColorSpace || renderer.outputColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    raycaster = new THREE.Raycaster(); mouse = new THREE.Vector2();
    const amb = new THREE.AmbientLight(0xffffff, 0.55); scene.add(amb);
    const key = new THREE.PointLight(0x38bdf8, 3.0, 80); key.position.set(12, 10, 18); scene.add(key);
    const fill = new THREE.PointLight(0xa855f7, 2.0, 70); fill.position.set(-14, -5, 10); scene.add(fill);
    buildGraph(activeStudentKey);
    bindEvents();
    animate();
  }

  function cleanup() {
    if (animationId) cancelAnimationFrame(animationId);
    if (container && bound) {
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
    }
    bound = false;
    if (renderer) renderer.dispose();
    renderer = null; scene = null; camera = null; nodeGroup = null; lineGroup = null; particleGroup = null;
  }

  function buildGraph(studentKey) {
    const data = PERE_CONFIG.students[studentKey];
    if (!data) return;
    nodeGroup = new THREE.Group(); lineGroup = new THREE.Group(); particleGroup = new THREE.Group();
    scene.add(lineGroup, nodeGroup, particleGroup);

    const defs = [
      ...data.nodes3d,
      { id:'risk', label:'Recurrence Risk', type:'risk', color:0xf59e0b },
      { id:'mastery', label:'Mastery Check', type:'mastery', color:0x22c55e }
    ];
    const positions = {
      concept: [-9, 4, 0], understanding: [-3.5, 4.2, 0.8], mental_model: [2, 3.1, -0.6],
      observed_error: [7.5, 1.8, 0], root_cause: [1, -0.3, 0.8], intervention: [-3.8, -3.3, -0.3],
      risk: [4.8, -2.4, 1.2], mastery: [9, -3.6, 0]
    };
    const nodes = {};
    defs.forEach((def, i) => {
      const pos = positions[def.id] || [(i-3.5)*3, 0, 0];
      const group = new THREE.Group();
      group.position.set(...pos);
      const glow = new THREE.MeshBasicMaterial({ color:def.color, transparent:true, opacity:0.08, depthWrite:false });
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.65, 20, 20), glow));
      const mat = new THREE.MeshStandardMaterial({ color:def.color, emissive:def.color, emissiveIntensity:0.65, metalness:0.7, roughness:0.2 });
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(def.id === 'concept' ? 1.0 : 0.78, 28, 28), mat);
      sphere.userData = {...def, studentKey};
      group.add(sphere);
      const sprite = createTextSprite(def.label);
      sprite.position.set(0, -1.45, 0);
      group.add(sprite);
      nodeGroup.add(group); nodes[def.id] = group;
    });

    const edges = [['concept','understanding'],['understanding','mental_model'],['mental_model','observed_error'],['observed_error','root_cause'],['root_cause','intervention'],['root_cause','risk'],['intervention','mastery'],['risk','mastery'],['understanding','root_cause']];
    edges.forEach(([a,b], idx) => {
      const pa = nodes[a].position, pb = nodes[b].position;
      const pts = [pa.clone(), pb.clone()];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: idx % 3 === 0 ? 0x38bdf8 : 0xa855f7, transparent:true, opacity:0.55 });
      lineGroup.add(new THREE.Line(geo, mat));
    });

    // Data-flow particles that travel from diagnosis toward intervention/mastery.
    for (let i=0;i<24;i++) {
      const g = new THREE.SphereGeometry(0.06, 8, 8);
      const m = new THREE.MeshBasicMaterial({ color: i%2 ? 0x38bdf8 : 0x22c55e });
      const p = new THREE.Mesh(g,m); p.userData.t=Math.random(); p.userData.phase=Math.random()*Math.PI*2; particleGroup.add(p);
    }
  }

  function createTextSprite(text) {
    const canvas = document.createElement('canvas'); canvas.width=512; canvas.height=96;
    const ctx=canvas.getContext('2d'); ctx.clearRect(0,0,512,96); ctx.font='700 24px Outfit, sans-serif'; ctx.fillStyle='#f8fafc'; ctx.textAlign='center'; ctx.shadowColor='rgba(56,189,248,.75)'; ctx.shadowBlur=10; ctx.fillText(text,256,56);
    const tex=new THREE.CanvasTexture(canvas); const mat=new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false}); const sprite=new THREE.Sprite(mat); sprite.scale.set(5.4,1,1); return sprite;
  }

  function bindEvents() {
    if (bound) return; bound=true;
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, {passive:true});
    window.addEventListener('resize', onResize);
  }
  function onPointerDown(e){ isDragging=true; lastPointer={x:e.clientX,y:e.clientY}; container.style.cursor='grabbing'; }
  function onPointerUp(){ isDragging=false; if(container) container.style.cursor='grab'; }
  function onPointerMove(e){
    if (!container || !camera) return;
    if (isDragging && lastPointer) { rotationY += (e.clientX-lastPointer.x)*0.006; rotationX += (e.clientY-lastPointer.y)*0.004; rotationX=Math.max(-0.65,Math.min(0.65,rotationX)); lastPointer={x:e.clientX,y:e.clientY}; }
    const rect=container.getBoundingClientRect(); mouse.x=((e.clientX-rect.left)/container.clientWidth)*2-1; mouse.y=-((e.clientY-rect.top)/container.clientHeight)*2+1;
    raycaster.setFromCamera(mouse,camera); const spheres=[]; nodeGroup.traverse(o=>{if(o.isMesh && o.userData && o.userData.label) spheres.push(o);});
    const hits=raycaster.intersectObjects(spheres,false); const info=document.getElementById('map-node-info');
    if(hits.length){ const d=hits[0].object.userData; container.style.cursor=isDragging?'grabbing':'pointer'; if(info) info.innerHTML=`<strong>${escapeHtml(d.label)}</strong> <span style="opacity:.6">· ${escapeHtml(d.type.toUpperCase())}</span> <span style="opacity:.75">· Student ${d.studentKey.slice(-1).toUpperCase()}</span>`; }
    else if(!isDragging){ container.style.cursor='grab'; if(info) info.innerHTML='<em>Drag to rotate · scroll to zoom · hover/click a node to inspect the reasoning pipeline.</em>'; }
  }
  function onWheel(e){ if(!camera) return; camera.position.z=Math.max(14,Math.min(34,camera.position.z+e.deltaY*0.01)); }
  function onClick(){
    if(!raycaster||!camera||!nodeGroup) return; const spheres=[]; nodeGroup.traverse(o=>{if(o.isMesh&&o.userData&&o.userData.label)spheres.push(o);}); const hits=raycaster.intersectObjects(spheres,false); if(!hits.length)return; const d=hits[0].object.userData; const modal=document.getElementById('node-detail-modal'); if(!modal)return;
    document.getElementById('modal-node-title').innerText=d.label; document.getElementById('modal-node-type').innerText=`NODE CATEGORY: ${d.type.toUpperCase()}`; document.getElementById('modal-node-desc').innerText=nodeExplanation(d, activeStudentKey); modal.classList.remove('hidden');
  }
  function nodeExplanation(d, key){ const s=PERE_CONFIG.students[key]; const extra={concept:`This is the target concept. PERE checks whether the learner's answer, reasoning and mental model agree.`,understanding:`Observed understanding layer: ${s.rootCause}`,mental:`Mental-model signal: ${s.misconception}.`,observed_error:`Observed answer: ${s.answer}. The same output can come from a different reasoning path.`,root:`Root cause identified from evidence: ${s.rootCause}`,intervention:`Selected intervention: ${s.learningPath[0].title}`,risk:`Recurrence risk is inferred from the mismatch between the learner's current pattern and the target concept.`,mastery:`Mastery check verifies that the learner can transfer the corrected idea to a new question.`}; return extra[d.id] || `Student-specific diagnostic node for ${s.name}.`; }
  function animate(){
    if(!renderer||!scene||!camera)return; animationId=requestAnimationFrame(animate); const t=performance.now()*0.001;
    if(nodeGroup){ nodeGroup.rotation.y += (rotationY-nodeGroup.rotation.y)*0.06; nodeGroup.rotation.x += (rotationX-nodeGroup.rotation.x)*0.06; nodeGroup.children.forEach((g,i)=>{g.position.y += Math.sin(t*1.2+i)*0.0008;}); }
    if(lineGroup){ lineGroup.rotation.y=nodeGroup?nodeGroup.rotation.y:0; lineGroup.rotation.x=nodeGroup?nodeGroup.rotation.x:0; }
    if(particleGroup && nodeGroup){ particleGroup.rotation.copy(nodeGroup.rotation); const route=[[-9,4,0],[2,3.1,-.6],[7.5,1.8,0],[1,-.3,.8],[-3.8,-3.3,-.3],[9,-3.6,0]]; particleGroup.children.forEach((p,i)=>{ const tt=(p.userData.t+t*0.06+i*0.017)%1; const seg=Math.min(route.length-2,Math.floor(tt*(route.length-1))); const lt=tt*(route.length-1)-seg; const a=route[seg],b=route[seg+1]; p.position.set(a[0]+(b[0]-a[0])*lt,a[1]+(b[1]-a[1])*lt,a[2]+(b[2]-a[2])*lt); }); }
    renderer.render(scene,camera);
  }
  function onResize(){ if(!camera||!renderer||!container)return; camera.aspect=Math.max(1,container.clientWidth)/Math.max(1,container.clientHeight); camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth,container.clientHeight); }
  function escapeHtml(v){return String(v).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
  return { renderForStudent:initMap };
})();
