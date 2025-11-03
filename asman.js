(function(){
  const btn=document.createElement('button')
  btn.id='asman-btn';btn.textContent='🤖'
  btn.onclick=()=>document.body.classList.toggle('asman-open')
  document.body.appendChild(btn)
  const win=document.createElement('div')
  win.id='asman-window'
  win.innerHTML=`<div class='asman-header'><b>AsmanAI</b><button onclick='document.body.classList.remove("asman-open")' style='background:transparent;border:1px solid var(--b);color:var(--text);border-radius:10px;padding:4px 8px'>×</button></div>
  <div class='asman-log' id='asman-log'></div>
  <div class='asman-row'><input id='asman-input' class='asman-input' placeholder='Напишите вопрос...'><button id='asman-send' class='btn primary' style='border:none;border-radius:12px;padding:10px 14px'>Отпр.</button></div>`
  document.body.appendChild(win)
  const log=win.querySelector('#asman-log'),inp=win.querySelector('#asman-input'),send=win.querySelector('#asman-send')
  const KEY='asman_hist';function hist(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}function save(h){localStorage.setItem(KEY,JSON.stringify(h))}
  function add(r,t){const d=document.createElement('div');d.className='msg '+r;d.innerHTML=`<div class='who'>${r==='ai'?'AsmanAI':'Вы'}</div><div>${t}</div>`;log.appendChild(d);log.scrollTop=log.scrollHeight;const h=hist();h.push({r,t});save(h)}
  function reply(t){if(/салам|hi|hello|merhaba/i.test(t))return'Салам! Чем помочь в мире Турана?';if(/кыргыз/i.test(t))return'Мир Кыргыздар: kyrgyz.html';if(/казак/i.test(t))return'Мир Казактар: kazakh.html';return'(демо) Ответ будет здесь.'}
  function sendMsg(){const t=(inp.value||'').trim();if(!t)return;add('user',t);inp.value='';setTimeout(()=>add('ai',reply(t)),200)}
  send.onclick=sendMsg;inp.onkeydown=e=>{if(e.key==='Enter')sendMsg()}
  const h=hist();if(h.length)h.forEach(m=>add(m.r,m.t));else add('ai','Салам! Я AsmanAI.')
})()
