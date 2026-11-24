/* ==========================================================
   hero3d.js — the 3D animation at the top (uses Three.js)
   ----------------------------------------------------------
   This is the READABLE source. The site loads the small,
   packed version: js/hero3d.min.js
   After editing this file, rebuild it with:
     npx esbuild src/hero3d.js --bundle --minify --format=esm --outfile=js/hero3d.min.js
   (needs: npm install three esbuild)
   ========================================================== */

import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, Points,
  IcosahedronGeometry, TorusGeometry, BufferGeometry, Float32BufferAttribute,
  MeshStandardMaterial, MeshBasicMaterial, PointsMaterial, AmbientLight, PointLight,
  Color, AdditiveBlending, NormalBlending, MathUtils,
} from "three";

export function startHero(canvas) {
  // 1) Renderer: draws the 3D scene onto the <canvas>
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); // sharp, but not too heavy

  // 2) Scene + camera (the "eye" looking at the scene)
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 7;

  // 3) Lights: soft base light + coloured lights for the glow
  scene.add(new AmbientLight(0xffffff, 0.35));
  const red = new PointLight(0xc8102e, 60, 30);  red.position.set(-4, 2, 4);
  const gold = new PointLight(0xf5a623, 45, 30); gold.position.set(4, -2, 3);
  const blue = new PointLight(0x3e8bff, 30, 30); blue.position.set(0, 4, -3);
  scene.add(red, gold, blue);

  // 4) The main object: a shiny gem + a thin wire shell + two rings
  const group = new Group();
  group.position.z = -2.5;          // push it back so the text stays easy to read
  scene.add(group);

  const gem = new Mesh(
    new IcosahedronGeometry(1.35, 1),
    new MeshStandardMaterial({ color: 0x1a1f2e, metalness: 0.9, roughness: 0.18, flatShading: true }),
  );
  const shell = new Mesh(
    new IcosahedronGeometry(1.75, 1),
    new MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.08 }),
  );
  const ring1 = new Mesh(
    new TorusGeometry(2.5, 0.012, 8, 160),
    new MeshBasicMaterial({ color: 0xf5a623, transparent: true, opacity: 0.55 }),
  );
  const ring2 = new Mesh(
    new TorusGeometry(2.9, 0.008, 8, 160),
    new MeshBasicMaterial({ color: 0xc8102e, transparent: true, opacity: 0.45 }),
  );
  ring1.rotation.x = 1.2;
  ring2.rotation.set(1.9, 0.4, 0);
  group.add(gem, shell, ring1, ring2);

  // 5) Floating dust (little glowing dots around everything)
  const count = innerWidth < 700 ? 350 : 700;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 3 + Math.random() * 6;
    const a = Math.random() * Math.PI * 2;
    const b = Math.acos(Math.random() * 2 - 1);
    pos.set([r * Math.sin(b) * Math.cos(a), r * Math.sin(b) * Math.sin(a), r * Math.cos(b)], i * 3);
  }
  const dustGeo = new BufferGeometry();
  dustGeo.setAttribute("position", new Float32BufferAttribute(pos, 3));
  const dustMat = new PointsMaterial({ size: 0.035, color: 0xffffff, transparent: true, opacity: 0.6, blending: AdditiveBlending, depthWrite: false });
  const dust = new Points(dustGeo, dustMat);
  scene.add(dust);

  // 6) Colours that change with light / dark mode
  function applyTheme(theme) {
    const light = theme === "light";
    gem.material.color = new Color(light ? 0xf3f5fa : 0x1a1f2e);
    gem.material.metalness = light ? 0.35 : 0.9;   // paler, softer gem in light mode
    gem.material.roughness = light ? 0.4 : 0.18;
    shell.material.color = new Color(light ? 0x0b0f19 : 0xffffff);
    shell.material.opacity = light ? 0.1 : 0.08;
    dustMat.color = new Color(light ? 0x8a93a6 : 0xffffff);
    dustMat.blending = light ? NormalBlending : AdditiveBlending;
    dustMat.needsUpdate = true;
    draw();
  }

  // 7) Follow the mouse a little (parallax)
  let mx = 0, my = 0;
  addEventListener("pointermove", (e) => {
    mx = (e.clientX / innerWidth) * 2 - 1;
    my = (e.clientY / innerHeight) * 2 - 1;
  }, { passive: true });

  // 8) Keep the right size when the window changes
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // move the camera back on narrow phones so it all fits
    camera.position.z = w < 600 ? 9.5 : 7;
    camera.updateProjectionMatrix();
    draw();
  }
  addEventListener("resize", resize);

  function draw() { renderer.render(scene, camera); }

  // 9) Animation loop — runs ONLY when the hero is on screen
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let running = false, onScreen = true, last = performance.now();

  function frame(now) {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    group.rotation.y += dt * 0.25;
    group.rotation.x = MathUtils.lerp(group.rotation.x, my * 0.25, 0.04);
    group.position.x = MathUtils.lerp(group.position.x, mx * 0.3, 0.04);
    ring1.rotation.z += dt * 0.3;
    ring2.rotation.z -= dt * 0.2;
    shell.rotation.y -= dt * 0.12;
    dust.rotation.y += dt * 0.02;
    gem.position.y = Math.sin(now / 1400) * 0.12;  // gentle floating
    draw();
    requestAnimationFrame(frame);
  }
  function update() {
    const shouldRun = onScreen && !document.hidden && !reduce.matches;
    if (shouldRun && !running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
    if (!shouldRun) running = false;
  }

  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; update(); }).observe(canvas);
  document.addEventListener("visibilitychange", update);
  reduce.addEventListener?.("change", update);
  addEventListener("themechange", (e) => applyTheme(e.detail));

  applyTheme(document.documentElement.dataset.theme);
  resize();
  update();
}
