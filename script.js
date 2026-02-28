const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = `${mx - 6}px`;
  cursor.style.top = `${my - 6}px`;
});

function animateRing() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  ring.style.left = `${rx}px`;
  ring.style.top = `${ry}px`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('button, a').forEach((el) => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

function randomFlicker() {
  const pools = document.querySelectorAll('.card-pool');
  if (!pools.length) return;
  const idx = Math.floor(Math.random() * pools.length);
  pools[idx].style.opacity = '0.4';
  setTimeout(() => { pools[idx].style.opacity = '1'; }, 100);
}
setInterval(randomFlicker, 3000);
