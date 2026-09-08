(() => {
  const PRODUCTS = [
    "dog biscuits", "designer coffee", "diamonds", "detergents",
    "hair gel", "cigarettes", "credit cards", "sneakers",
    "butt toners", "light beer", "recreational vehicles",
    "status quo", "brand development", "manufactured demand",
    "inessential things",
  ];

  const WORTHY = [
    "environmental crisis", "social crisis", "cultural crisis",
    "educational tools", "public discourse", "lasting forms",
    "democratic forms", "information design", "charitable causes",
    "a new kind of meaning",
  ];

  const orbit = document.getElementById("orbit");
  const stage = document.getElementById("stage");
  const meaning = document.getElementById("meaning");
  const footnote = document.getElementById("footnote");
  const modeLabel = document.getElementById("modeLabel");
  const reverseBtn = document.getElementById("reverseBtn");
  const glyphs = [...meaning.querySelectorAll(".glyph")];

  let reversed = false;
  let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let nodes = [];

  function scatter(list) {
    orbit.innerHTML = "";
    nodes = list.map((text, i) => {
      const el = document.createElement("span");
      el.className = "product";
      el.textContent = text;
      const seed = (i + 1) / list.length;
      const node = {
        el,
        angle: seed * Math.PI * 2,
        radius: 140 + (i % 5) * 70,
        speed: 0.00018 + (i % 7) * 0.00005,
        jitter: 8 + (i % 4) * 6,
      };
      orbit.appendChild(el);
      return node;
    });
  }

  function placeNodes(t) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2 - 20;
    const pullX = (pointer.x - cx) * 0.12;
    const pullY = (pointer.y - cy) * 0.12;

    nodes.forEach((node, i) => {
      const a = node.angle + t * node.speed * (reversed ? -2.4 : 1);
      const r = node.radius * (reversed ? 1.35 : 1);
      const x = cx + Math.cos(a) * r + pullX + Math.sin(t * 0.001 + i) * node.jitter;
      const y = cy + Math.sin(a) * 0.62 * r + pullY;
      node.el.style.left = `${x}px`;
      node.el.style.top = `${y}px`;
    });
  }

  function driftGlyphs(t) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (pointer.x - cx) / cx;
    const dy = (pointer.y - cy) / cy;

    glyphs.forEach((g, i) => {
      const n = i - glyphs.length / 2;
      if (reversed) {
        g.style.transform = `translate(${n * 1.5}px, ${Math.sin(t * 0.002 + i) * 2}px)`;
      } else {
        g.style.transform = `translate(${dx * n * 6}px, ${dy * 10 + Math.sin(t * 0.0015 + i) * 3}px) rotate(${dx * n * 1.4}deg)`;
      }
    });
  }

  function setMode(next) {
    reversed = next;
    document.body.classList.toggle("is-reversed", reversed);
    modeLabel.textContent = reversed ? "priority: civic" : "priority: commercial";
    reverseBtn.textContent = reversed ? "restore the market" : "reverse priorities";
    footnote.textContent = reversed
      ? "the exploration and production of a new kind of meaning"
      : "manufacturing demand for things that are inessential at best";

    nodes.forEach((node) => node.el.classList.add("is-falling"));
    window.setTimeout(() => scatter(reversed ? WORTHY : PRODUCTS), 280);
  }

  function toggle() { setMode(!reversed); }

  scatter(PRODUCTS);

  window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  });

  stage.addEventListener("click", (e) => {
    if (e.target.closest("button")) return;
    toggle();
  });

  reverseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "r" || e.key === "R") toggle();
  });

  function tick(t) {
    placeNodes(t);
    driftGlyphs(t);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
    const hintKey = document.querySelector("kbd");
  if (hintKey) {
    hintKey.style.cursor = "pointer";
    hintKey.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });
  }
})();
