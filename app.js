const curriculum=[
["Arrays","FOUNDATION","Indexing, traversal, prefix sums, difference arrays, two pointers"],
["Strings","FOUNDATION","Frequency maps, palindrome logic, substring search, hashing"],
["Linked Lists","FOUNDATION","Reverse, merge, fast/slow pointers, cycle detection"],
["Stacks","FOUNDATION","LIFO, parsing, monotonic stack, next greater element"],
["Queues","FOUNDATION","FIFO, deque, BFS frontier, sliding-window techniques"],
["Hashmaps / Hashing","FOUNDATION","Hash functions, collisions, chaining, frequency counting"],
["Recursion","FOUNDATION","Base cases, call stack, recursion trees, memoization"],
["Trees","FOUNDATION","Binary trees, BST, traversals, LCA, balancing"],
["Graphs","FOUNDATION","BFS, DFS, components, cycles, topological order"],
["Dynamic Programming","FOUNDATION","State, transition, memoization, tabulation, optimization"],
["Sorting","CORE","Merge, quicksort, heap sort, stability"],
["Binary Search","CORE","Bounds, lower/upper bound, answer-space search"],
["Two Pointers","PATTERN","Opposite ends, fast/slow, partitioning"],
["Sliding Window","PATTERN","Fixed and variable windows"],
["Prefix Sum","PATTERN","1D/2D range queries and difference arrays"],
["Bit Manipulation","ADVANCED","Masks, XOR, shifts and subsets"],
["Heaps / Priority Queue","ADVANCED","Heapify, scheduling and k-th elements"],
["Trie","ADVANCED","Prefix search and autocomplete"],
["Union-Find / DSU","ADVANCED","Path compression and connectivity"],
["Greedy","ADVANCED","Exchange arguments and interval scheduling"],
["Divide & Conquer","ADVANCED","Recurrences and decomposition"],
["Backtracking","ADVANCED","Pruning and constraint search"],
["Shortest Paths","EXPERT","Dijkstra, Bellman-Ford, DAG and Floyd-Warshall"],
["Minimum Spanning Tree","EXPERT","Kruskal, Prim and cut property"],
["Advanced Graphs","EXPERT","SCC, bridges and articulation points"],
["Network Flow","EXPERT","Residual graphs and max-flow/min-cut"],
["Advanced DP","EXPERT","Knapsack, LIS, interval, tree and bitmask DP"],
["Segment Tree","EXPERT","Range query/update and lazy propagation"],
["Fenwick Tree","EXPERT","Prefix aggregation and point updates"],
["String Algorithms","EXPERT","KMP, Z-function and rolling hash"],
["Complexity Theory","RESEARCH","Big-O, amortized analysis and lower bounds"],
["Correctness Proofs","RESEARCH","Invariants, induction and exchange proofs"],
["Algorithm Design","RESEARCH","Constraints, tradeoffs and adversarial analysis"]
];

const state={xp:Number(localStorage.getItem("dsa_xp")||0), step:0, playing:false, arr:[10,20,30,40], timer:null, mode:"linear"};
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

function save(){localStorage.setItem("dsa_xp",state.xp);updateProgress()}
function addXP(n){state.xp+=n;save();$("#xpTop").textContent=state.xp}

function renderRoadmap(){
  $("#roadmapGrid").innerHTML=curriculum.map((m,i)=>`
    <article class="roadmap-card ${i<10?"foundation":""}" data-topic="${m[0]}">
      <span class="num">${String(i+1).padStart(2,"0")} · ${m[1]}</span>
      <h3>${m[0]}</h3><p>${m[2]}</p>
    </article>`).join("");
}
function render(){
  const box=$("#visualCanvas"); box.innerHTML="";
  state.arr.forEach((v,i)=>{
    const d=document.createElement("div"); d.className="cell";
    if(i===state.step) d.classList.add("active");
    if(state.mode==="linear" && v===Number($("#targetInput").value) && i<state.step) d.classList.add("found");
    d.innerHTML=`${v}<small>i=${i}</small>`;box.appendChild(d);
  });
  $("#stepCounter").textContent=`STEP ${state.step}`;
  $("#opsText").textContent=state.step;
  $("#stateText").textContent=state.step>=state.arr.length?"Complete":`Inspecting index ${state.step}`;
  $("#complexityText").textContent=state.mode==="linear"?"O(n)":"O(n²)";
  $("#stageTitle").textContent=`Array · ${state.mode==="linear"?"Linear Search":"Bubble Sort"}`;
  if(state.mode==="linear"){
    const target=Number($("#targetInput").value);
    if(state.step<state.arr.length && state.arr[state.step]===target){
      $("#teacherText").textContent=`Found ${target} at index ${state.step}. Why can linear search stop here?`;
      $("#invariantText").textContent=`All indices before ${state.step} were checked and did not contain the target.`;
    } else if(state.step>=state.arr.length){
      $("#teacherText").textContent=`Search finished. No unchecked position remains.`;
      $("#invariantText").textContent=`Every position has been inspected.`;
    } else {
      $("#teacherText").textContent=`Predict: compare ${state.arr[state.step]} with target ${target}.`;
      $("#invariantText").textContent=`Indices before ${state.step} are already ruled out.`;
    }
  } else {
    $("#teacherText").textContent="Bubble Sort: compare adjacent values and predict whether they swap.";
    $("#invariantText").textContent="After each completed pass, the largest remaining value moves toward the end.";
  }
}
function reset(){clearInterval(state.timer);state.playing=false;$("#playBtn").textContent="Play";state.step=0;state.arr=[10,20,30,40];render()}
function step(){
  if(state.mode==="linear"){if(state.step<state.arr.length)state.step++;else return}
  else { // tiny visual bubble-sort demo
    const i=state.step%Math.max(1,state.arr.length-1);
    if(state.arr[i]>state.arr[i+1]) [state.arr[i],state.arr[i+1]]=[state.arr[i+1],state.arr[i]];
    state.step++; if(state.step>12) state.step=0;
  }
  addXP(2);render();
}
function togglePlay(){
  state.playing=!state.playing;$("#playBtn").textContent=state.playing?"Pause":"Play";
  if(state.playing) state.timer=setInterval(()=>{step();if(state.mode==="linear"&&state.step>state.arr.length)togglePlay()},700);
  else clearInterval(state.timer);
}
function updateProgress(){
  const level=Math.floor(state.xp/100)+1;$("#levelTop").textContent=level;
  const score=Math.min(100,Math.floor(state.xp/10));$("#masteryScore").textContent=score;$("#masteryBar").style.width=score+"%";
  const ring=$("#masteryScore").parentElement;ring.style.background=`conic-gradient(var(--cyan) ${score*3.6}deg,#1b263b ${score*3.6}deg)`;
  const skills=[["Conceptual Understanding",Math.min(100,30+score)],["Prediction",Math.min(100,20+Math.floor(score*.9))],["Debugging",Math.min(100,15+Math.floor(score*.8))],["Optimization",Math.min(100,10+Math.floor(score*.75))]];
  $("#skills").innerHTML=skills.map(x=>`<div class="skill"><div class="skill-head"><b>${x[0]}</b><span>${x[1]}%</span></div><div class="skill-bar"><i style="width:${x[1]}%"></i></div></div>`).join("");
}
function speak(){
  const text=$("#teacherText").textContent;
  if("speechSynthesis" in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.rate=.92;u.pitch=1; speechSynthesis.speak(u)}
}
function challenge(type){
  const data={
    predict:["PREDICT NEXT STATE","Array = [4, 7, 9, 12]. Pointer i = 1. The algorithm checks whether arr[i] > 8. What is the next state?","7 is not greater than 8, so the condition is false and the pointer advances."],
    debug:["FIND THE BUG","A binary search uses while (left < right) and sets left = mid when arr[mid] < target. Which edge case can make it loop forever?","When left and right become adjacent, mid can equal left. The update must guarantee progress."],
    complexity:["PROVE THE COMPLEXITY","A loop runs n times and inside it performs a binary search. What is the total complexity?","The outer loop contributes n and each binary search contributes log n, so the total is O(n log n)."],
    optimize:["BEAT THE BOTTLENECK","Two nested loops search whether each pair of values sums to target. What data structure can reduce the work?","A hash set/map can remember previous values, reducing the typical solution to O(n) time."]
  }[type];
  const p=$("#challengePanel");p.classList.remove("hidden");p.innerHTML=`<span class="eyebrow">${data[0]}</span><h3>${data[1]}</h3><button class="btn small primary" id="revealBtn">Reveal reasoning +10 XP</button><p id="answer"></p>`;
  $("#revealBtn").onclick=()=>{$("#answer").textContent=data[2];addXP(10);$("#revealBtn").textContent="Completed ✓";$("#revealBtn").disabled=true};
}
renderRoadmap();render();updateProgress();
$("#stepBtn").onclick=step;$("#resetBtn").onclick=reset;$("#playBtn").onclick=togglePlay;$("#speakBtn").onclick=speak;
$("#algoSelect").onchange=e=>{state.mode=e.target.value;reset()};
$("#targetInput").oninput=render;
$("#themeBtn").onclick=()=>document.body.classList.toggle("light");
$$("[data-challenge]").forEach(b=>b.onclick=()=>challenge(b.dataset.challenge));
