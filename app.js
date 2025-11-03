
// Page enter transition
document.documentElement.classList.add('page-enter');
window.addEventListener('load', () => {
  setTimeout(() => document.documentElement.classList.remove('page-enter'), 50);
});

// Theme toggle (prefers-color-scheme aware)
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('light');
  if (dark) {
    document.documentElement.style.setProperty('color-scheme', 'light');
  } else {
    document.documentElement.style.setProperty('color-scheme', 'dark');
  }
});

/** Animated grid background (canvas) **/
(() => {
  const canvas = document.getElementById('grid');
  const ctx = canvas.getContext('2d', { alpha: true });
  let dpr = Math.min(2, window.devicePixelRatio || 1);
  let W=0, H=0;
  function resize(){
    const rect = canvas.getBoundingClientRect();
    W = Math.floor(rect.width);
    H = Math.floor(rect.height);
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // points in grid
  const cols = 22;
  const rows = 12;
  const points = [];
  function seed(){
    points.length = 0;
    for (let i=0; i<=cols; i++){
      for(let j=0; j<=rows; j++){
        points.push({
          x: (i/cols) * W,
          y: (j/rows) * H,
          z: Math.random() * 1,
        });
      }
    }
  }
  seed();

  let t = 0; 
  let hidden = false;
  document.addEventListener('visibilitychange', ()=> hidden=document.hidden);

  function loop(){
    if (!hidden) {
      ctx.clearRect(0,0,W,H);
      ctx.lineWidth = 1;
      // animated lines
      for (let i=0; i<=cols; i++){
        for(let j=0; j<=rows; j++){
          const idx = i*(rows+1)+j;
          const p = points[idx];
          // small wave
          const yy = p.y + Math.sin((p.x*0.01)+t*0.9)*3 + Math.cos((p.y*0.01)+t*0.8)*3;
          if (i < cols){
            const p2 = points[idx+(rows+1)];
            const yy2 = p2.y + Math.sin((p2.x*0.01)+t*0.9)*3 + Math.cos((p2.y*0.01)+t*0.8)*3;
            ctx.strokeStyle = `rgba(16,184,255,0.12)`;
            ctx.beginPath(); ctx.moveTo(p.x, yy); ctx.lineTo(p2.x, yy2); ctx.stroke();
          }
          if (j < rows){
            const p3 = points[idx+1];
            const yy3 = p3.y + Math.sin((p3.x*0.01)+t*0.9)*3 + Math.cos((p3.y*0.01)+t*0.8)*3;
            ctx.strokeStyle = `rgba(16,184,255,0.12)`;
            ctx.beginPath(); ctx.moveTo(p.x, yy); ctx.lineTo(p3.x, yy3); ctx.stroke();
          }
        }
      }
      // glowing nodes
      for (const p of points){
        const yy = p.y + Math.sin((p.x*0.01)+t*0.9)*3 + Math.cos((p.y*0.01)+t*0.8)*3;
        ctx.fillStyle = `rgba(255,255,255,0.8)`;
        ctx.beginPath(); ctx.arc(p.x, yy, 1.2, 0, Math.PI*2); ctx.fill();
      }
      t += 0.02;
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

// Featured filters
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(ch => ch.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('is-active'));
  ch.classList.add('is-active');
  const tag = ch.dataset.filter;
  cards.forEach(card => {
    const tags = card.dataset.tags || '';
    const show = tag === 'all' || tags.includes(tag);
    card.style.display = show ? 'block' : 'none';
  });
}));

// Feed items (seed + reveal on scroll)
const feed = document.getElementById('feed');
const seedItems = [
  {title:'Запуск портала театров Турана', cat:'culture', img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop'},
  {title:'Турнир “AI & Robotics” для студентов', cat:'science', img:'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1600&auto=format&fit=crop'},
  {title:'Совет директоров: план мероприятий 2026', cat:'events', img:'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1600&auto=format&fit=crop'},
  {title:'Академия Манаса: набор на курсы', cat:'culture', img:'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1600&auto=format&fit=crop'},
  {title:'Исследование степных ветров', cat:'science', img:'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop'},
  {title:'Дни Турана в Анкаре', cat:'events', img:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop'}
];
let shown = 0;
const BATCH = 4;

function addBatch(){
  const next = seedItems.slice(shown, shown+BATCH);
  next.forEach(n => {
    const el = document.createElement('article');
    el.className = 'item';
    el.innerHTML = `
      <div class="img" style="--img:url('${n.img}')"></div>
      <div class="body">
        <strong>${n.title}</strong>
        <p class="muted">Категория: ${n.cat}</p>
      </div>
    `;
    feed.appendChild(el);
  });
  shown += next.length;
  if (shown >= seedItems.length) document.getElementById('loadMore').style.display = 'none';
  revealOnScroll.observeBatch();
}
addBatch();
document.getElementById('loadMore').addEventListener('click', addBatch);

// Reveal on scroll (IntersectionObserver with batching)
const revealOnScroll = (() => {
  const items = () => Array.from(document.querySelectorAll('.feed .item'));
  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    }
  }, { rootMargin: '0px 0px -15% 0px', threshold: 0.01 });

  function observeBatch(){
    items().forEach(el => io.observe(el));
  }
  observeBatch();
  return { observeBatch };
})();

// Search filter
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase().trim();
  document.querySelectorAll('.feed .item').forEach(el => {
    const t = el.textContent.toLowerCase();
    el.style.display = t.includes(q) ? 'block' : 'none';
  });
});

// Keyboard navigation for carousel
const carousel = document.getElementById('featuredCarousel');
carousel.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') carousel.scrollBy({ left: 300, behavior: 'smooth' });
  if (e.key === 'ArrowLeft') carousel.scrollBy({ left: -300, behavior: 'smooth' });
});
