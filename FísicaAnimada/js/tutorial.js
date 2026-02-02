const slides = [
  { type: "image", src: "img/t1.jpg" },
  { type: "video", src: "video/v1.mp4" },
  { type: "video", src: "video/v2.mp4" },
  { type: "image", src: "img/t2.jpg" },
  { type: "image", src: "img/t3.jpg" },
  { type: "video", src: "video/v3.mp4" },
  { type: "image", src: "img/t4.jpg" },
  { type: "image", src: "img/t5.jpg" },
  { type: "image", src: "img/t6.jpg" },
  { type: "image", src: "img/t7.jpg" },
  { type: "image", src: "img/t8.jpg" },
  { type: "image", src: "img/t9.jpg" },
  { type: "image", src: "img/t10.jpg" },
];

let i = 0;

const container = document.getElementById("slideContainer");
const nextBtn = document.getElementById("nextBtn");

function render() {
  container.innerHTML = "";
  const s = slides[i];

  if (s.type === "image") {
    const img = document.createElement("img");
    img.src = s.src;
    img.alt = `Slide ${i + 1}`;
    container.appendChild(img);
    return;
  }

  const v = document.createElement("video");
  v.src = s.src;

  v.autoplay = true;
  v.muted = true;        // essencial pro autoplay
  v.playsInline = true;  // iOS
  v.preload = "auto";
  v.controls = false;

  container.appendChild(v);

  const p = v.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

function next() {
  i++;
  if (i >= slides.length) {
    window.location.href = "index.html";
    return;
  }
  render();
}

nextBtn.addEventListener("click", next);

// teclado (opcional, mas útil)
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
    e.preventDefault();
    next();
  }
});

render();
