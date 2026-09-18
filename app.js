const $=id=>document.getElementById(id);
const hitWrap=$("hits");
for(let i=1;i<=5;i++){
  const row=document.createElement("label");
  row.className="hit-row";
  row.innerHTML=`<span>Hit ${i}</span><input id="hit${i}" type="number" min="0" step="1" placeholder="Damage">`;
  hitWrap.appendChild(row);
}
const fmt=n=>Number(n||0).toLocaleString();
const vals=()=>[1,2,3,4,5].map(i=>Number($("hit"+i).value)||0).filter(Boolean);
function updateStats(){
  const a=vals(), total=a.reduce((x,y)=>x+y,0), best=a.length?Math.max(...a):0;
  $("best").textContent=best?fmt(best):"—";
  $("total").textContent=total?fmt(total):"—";
  $("average").textContent=a.length?fmt(Math.round(total/a.length)):"—";
}
function updateRatio(){
  const s=Number($("shield").value)||0,b=Number($("bomber").value)||0,r=Number($("shooter").value)||0,total=s+b+r;
  const st=$("ratioStatus"); st.textContent=`Ratio total: ${total}%`; st.className="status "+(total===100?"good":"bad");
  const cap=Number($("capacity").value)||0;
  if(!cap){$("troopBreakdown").textContent="Enter march capacity to calculate troop counts.";return}
  if(total!==100){$("troopBreakdown").textContent="Ratio must total 100% before troop counts are calculated.";return}
  let sc=Math.floor(cap*s/100),bc=Math.floor(cap*b/100),rc=cap-sc-bc;
  $("troopBreakdown").textContent=`Shield ${fmt(sc)} • Bomber ${fmt(bc)} • Shooter ${fmt(rc)}`;
}
["shield","bomber","shooter","capacity"].forEach(id=>$(id).addEventListener("input",updateRatio));
[1,2,3,4,5].forEach(i=>$("hit"+i).addEventListener("input",updateStats));

const key="loj-gorilla-lab-tests-v1";
const referenceBaselines={
  "Space Gorilla":{ratio:[0,4,96],label:"Stiletto test reference"},
  "Wise Gorilla":{ratio:[0,9,91],label:"Stiletto test reference"},
  "Primal Gorilla":{ratio:[0,29,71],label:"Stiletto test reference"},
  "Cyber Gorilla":{ratio:[0,10,90],label:"Stiletto test reference"},
  "Armed Gorilla":{ratio:[0,4,96],label:"Stiletto test reference"},
  "Gorilla Warlord":{ratio:[0,35,65],label:"Historical Stiletto test reference"}
};
const read=()=>JSON.parse(localStorage.getItem(key)||"[]");
const write=x=>localStorage.setItem(key,JSON.stringify(x));
function testFromForm(){
  const hits=vals(),s=Number($("shield").value)||0,b=Number($("bomber").value)||0,r=Number($("shooter").value)||0;
  if(s+b+r!==100) return {error:"Formation ratio must total 100%."};
  if(!hits.length) return {error:"Enter at least one hit result."};
  const total=hits.reduce((x,y)=>x+y,0);
  return {
    id:Date.now(),created:new Date().toISOString(),gorilla:$("gorilla").value,server:$("server").value.trim(),player:$("player").value.trim(),
    capacity:Number($("capacity").value)||0,ratio:[s,b,r],heroes:[$("hero1").value,$("hero2").value,$("hero3").value].map(x=>x.trim()).filter(Boolean),
    robots:[$("robot1").value,$("robot2").value].map(x=>x.trim()).filter(Boolean),hits,best:Math.max(...hits),average:Math.round(total/hits.length),total,notes:$("notes").value.trim()
  };
}
$("saveTest").onclick=()=>{
  const t=testFromForm(); if(t.error){alert(t.error);return}
  const data=read(); data.push(t); write(data); render();
};
function render(){
  const data=read(),body=$("historyBody"),empty=$("emptyState"); body.innerHTML="";
  empty.style.display=data.length?"none":"block";
  const maxBest=data.length?Math.max(...data.map(x=>x.best)):0;
  [...data].reverse().forEach(t=>{
    const tr=document.createElement("tr"); if(t.best===maxBest)tr.className="row-best";
    tr.innerHTML=`<td>${t.gorilla}</td><td>${t.ratio.join("/")}</td><td>${fmt(t.best)}</td><td>${fmt(t.average)}</td><td>${t.hits.length}/5</td><td>${t.heroes.join(", ")||"—"}</td><td>${t.robots.join(", ")||"—"}</td><td><button class="delete-btn" data-id="${t.id}">Delete</button></td>`;
    body.appendChild(tr);
  });
  document.querySelectorAll(".delete-btn").forEach(b=>b.onclick=()=>{write(read().filter(x=>x.id!==Number(b.dataset.id)));render()});
  renderBest(data);
}
function renderBest(data){
  const out=$("bestKnown");
  if(!data.length){out.textContent="Save at least one completed test to establish a baseline.";return}
  const t=[...data].sort((a,b)=>b.best-a.best)[0];
  out.innerHTML=`<div class="best-highlight">
    <div><small>Gorilla</small><strong>${t.gorilla}</strong></div>
    <div><small>Ratio</small><strong>${t.ratio.join("/")}</strong></div>
    <div><small>Best Hit</small><strong>${fmt(t.best)}</strong></div>
    <div><small>Average</small><strong>${fmt(t.average)}</strong></div>
  </div>`;
}
$("clearAll").onclick=()=>{if(confirm("Clear all saved Gorilla Lab tests from this browser?")){localStorage.removeItem(key);render()}};
$("gorilla").addEventListener("change",()=>renderBest(read()));\nupdateRatio();updateStats();render();
