const qs=s=>document.querySelector(s), qsa=s=>[...document.querySelectorAll(s)];
function say(text){if('speechSynthesis' in window){speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(text));}}
function toast(t){let x=qs('#toast');if(!x){x=document.createElement('div');x.id='toast';document.body.appendChild(x)}x.textContent=t;x.classList.add('show');clearTimeout(x.t);x.t=setTimeout(()=>x.classList.remove('show'),1800)}
function wireCommon(){
 qsa('[data-speak]').forEach(b=>b.onclick=()=>say(b.dataset.speak));
 qsa('[data-toggle]').forEach(b=>b.onclick=()=>{const x=qs(b.dataset.toggle);x.classList.toggle('show');b.textContent=x.classList.contains('show')?'Hide':'Show';});
 qsa('[data-toast]').forEach(b=>b.onclick=()=>toast(b.dataset.toast));
 const menu=qs('#mobileMenu'), side=qs('#sidebar'); if(menu&&side) menu.onclick=()=>side.classList.toggle('open');
 const theme=qs('#themeBtn'); if(theme) theme.onclick=()=>{document.body.classList.toggle('light');theme.textContent=document.body.classList.contains('light')?'☾':'☼'};
 qsa('.nav-link').forEach(a=>{if(location.pathname.endsWith(a.getAttribute('href')))a.classList.add('active')});
}
function renderArray(){
 const arr=[12,7,19,3,25,8,14], box=qs('#arrayViz'); if(!box)return;
 let selected=2;
 function draw(){box.innerHTML=arr.map((v,i)=>`<button class="big-cell ${i===selected?'sel':''}" data-i="${i}"><small>index ${i}</small><b>${v}</b><em>${i===0?'base address':i===selected?'current focus':'element'}</em></button>`).join('');qsa('.big-cell').forEach(b=>b.onclick=()=>{selected=+b.dataset.i;draw();qs('#focusText').textContent=`Index ${selected} stores ${arr[selected]}. Random access is O(1) because the address is computed directly from the base address and element offset.`})} draw();
 qsa('[data-array-op]').forEach(b=>b.onclick=()=>{const op=b.dataset.arrayOp; if(op==='append'){arr.push(Math.floor(Math.random()*90)+10);selected=arr.length-1} if(op==='pop'){arr.pop();selected=Math.max(0,arr.length-1)} if(op==='reverse'){arr.reverse();selected=0} if(op==='sort'){arr.sort((a,b)=>a-b);selected=0} draw();toast(op.toUpperCase()+' executed')});
}
function renderLinked(){
 const vals=[10,25,40,55,80], box=qs('#listViz'); if(!box)return;
 let focus=2;
 function draw(){box.innerHTML=vals.map((v,i)=>`<div class="node-wrap"><button class="node ${i===focus?'sel':''}" data-i="${i}"><small>node ${i}</small><b>${v}</b><em>next → ${i<vals.length-1?i+1:'null'}</em></button>${i<vals.length-1?'<span class="arrow">→</span>':''}</div>`).join('');qsa('.node').forEach(b=>b.onclick=()=>{focus=+b.dataset.i;draw();qs('#focusText').textContent=`Node ${focus} contains ${vals[focus]} and a pointer to ${focus<vals.length-1?vals[focus+1]:'null'}. Unlike an array, nodes are not required to be contiguous in memory.`})} draw();
 qsa('[data-list-op]').forEach(b=>b.onclick=()=>{const op=b.dataset.listOp;if(op==='prepend')vals.unshift(Math.floor(Math.random()*90)+10);if(op==='append')vals.push(Math.floor(Math.random()*90)+10);if(op==='delete'){if(vals.length>1)vals.splice(Math.min(focus,vals.length-1),1);focus=Math.min(focus,vals.length-1)}if(op==='reverse')vals.reverse();draw();toast(op.toUpperCase()+' executed')});
}
function quiz(){qsa('.quiz-option').forEach(b=>b.onclick=()=>{const ok=b.dataset.correct==='true';b.classList.add(ok?'correct':'wrong');toast(ok?'Correct. +25 XP':'Not yet. Re-check the invariant.');if(ok)qs('#quizExplain').textContent=b.dataset.explain||'Good reasoning.'})}
wireCommon();renderArray();renderLinked();quiz();
