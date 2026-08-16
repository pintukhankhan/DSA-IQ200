const A=[2,4,7,11,15,19,23,27,31], target=23;
let step=4, timer=null, playing=false;

const $=s=>document.querySelector(s);
const indexRow=$("#indexRow"), arrayRow=$("#arrayRow"), pointerRow=$("#pointerRow");
function stateFor(n){
  const states=[
    {l:0,r:8,m:4},
    {l:0,r:3,m:1},
    {l:2,r:3,m:2},
    {l:3,r:3,m:3},
    {l:3,r:8,m:5},
    {l:6,r:8,m:7},
    {l:6,r:6,m:6},
    {l:6,r:8,m:7},
    {l:6,r:6,m:6}
  ];
  return states[Math.min(n,states.length-1)];
}
function render(){
  const s=stateFor(step);
  indexRow.innerHTML=A.map((_,i)=>`<span>${i}</span>`).join("");
  arrayRow.innerHTML=A.map((v,i)=>`<div class="cell ${i===s.m?"mid":""} ${v===target?"target":""}">${v}</div>`).join("");
  pointerRow.innerHTML=A.map((_,i)=>{
    const labels=[];
    if(i===s.l) labels.push(`<div class="pointer left">▲<br>left = ${s.l}</div>`);
    if(i===s.m) labels.push(`<div class="pointer mid">▲<br>mid = ${s.m}</div>`);
    if(i===s.r) labels.push(`<div class="pointer right">▲<br>right = ${s.r}</div>`);
    return labels.join("");
  }).join("");
  $("#stepNo").textContent=step+1;
  $("#vars").innerHTML=[
    ["arr","[2, 4, 7, 11, 15, 19, 23, 27, 31]"],
    ["target","23"],["left",s.l],["right",s.r],["mid",s.m],["arr[mid]",A[s.m]]
  ].map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td></tr>`).join("");
  const texts=[
    "We begin with the full sorted array. The middle value is 15, so the target 23 must be to the right.",
    "15 is smaller than 23. Discard the left half and keep only the possible right range.",
    "The middle of the remaining range is 7. It is still smaller than 23, so continue right.",
    "We narrowed the search to the right side. The next comparison moves us toward index 5.",
    "We compared target 23 with middle element 19. Since 19 < 23, discard the left half including mid. New search range → [6, 8].",
    "Now the middle value is 27. Because 27 > 23, discard the right half.",
    "The search has narrowed to the target position. Compare 23 with 23.",
    "Target 23 is found. Return its index.",
    "Execution complete. Binary search found the target in logarithmic time."
  ];
  $("#executionText").textContent=texts[step];
}
function go(n){step=Math.max(0,Math.min(8,n));render()}
$("#firstBtn").onclick=()=>go(0);$("#prevBtn").onclick=()=>go(step-1);$("#nextBtn").onclick=()=>go(step+1);$("#lastBtn").onclick=()=>go(8);$("#resetBtn").onclick=()=>{stop();go(0)};
function stop(){playing=false;clearInterval(timer);timer=null;$("#playBtn").textContent="▶ Play"}
$("#playBtn").onclick=()=>{
 if(playing){stop();return}
 playing=true;$("#playBtn").textContent="Ⅱ Pause";
 const speed=()=>Math.round(1000/Number($("#speed").value));
 timer=setInterval(()=>{if(step>=8){stop()}else go(step+1)},speed());
};
$("#speed").oninput=e=>{$("#speedVal").textContent=Number(e.target.value).toFixed(1)+"x";if(playing){stop();$("#playBtn").click()}};
$("#answerBtn").onclick=()=>{$("#answer").classList.toggle("show");$("#answerBtn").textContent=$("#answer").classList.contains("show")?"Hide Answer":"Show Answer"};
function speak(text){if(!("speechSynthesis" in window))return; speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(text);u.rate=.92;speechSynthesis.speak(u)}
$("#listenBtn").onclick=()=>speak($("#executionText").textContent);
$("#voiceTop").onclick=()=>speak("Welcome to DSA IQ 200. Predict the next state before you press Next.");
$("#mobileMenu").onclick=()=>$("#sidebar").classList.toggle("open");
$("#themeBtn").onclick=()=>document.body.classList.toggle("light");
document.querySelectorAll(".arena-card button").forEach(b=>b.onclick=()=>{b.textContent="Challenge Active ✓";b.style.borderColor="#35d77d"});
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");
});
document.querySelector(".run").onclick=()=>{document.querySelector(".code-actions span").textContent="✓ Execution trace ready";go(4)};
render();
