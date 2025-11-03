function toggleMenu(){document.getElementById('nav').classList.toggle('open')}
const yearEl=document.getElementById('year'); if(yearEl){yearEl.textContent=new Date().getFullYear()}
// fake chat
const log=document.getElementById('log'); if(log){add('ai','Салам! Я AsmanAI. Спроси о проектах Турана или мероприятиях.');}
function send(){const inp=document.getElementById('msg'); const t=(inp.value||'').trim(); if(!t) return; add('user',t); add('ai','(демо) Ответ будет здесь. Интеграция позже.'); inp.value=''; log.scrollTop=log.scrollHeight;}
function add(role, text){const div=document.createElement('div'); div.className='msg '+role; div.innerHTML='<div class="tiny muted">'+(role==='ai'?'AsmanAI':'Вы')+'</div><div>'+escapeHtml(text)+'</div>'; log.appendChild(div);}
function escapeHtml(s){return s.replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
// reveal on scroll
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');}})},{threshold:.08});
document.querySelectorAll('.card, .title, .lead, .chip, .row, .grid4 > *, .grid3 > *').forEach(el=>{el.classList.add('reveal'); observer.observe(el)})
