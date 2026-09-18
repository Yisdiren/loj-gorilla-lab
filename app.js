const $=id=>document.getElementById(id);
const hitWrap=$("hits");
const robotGorillas=new Set(["Cyber Gorilla","Gorilla Warlord"]);
function syncRobotFields(){
  const enabled=robotGorillas.has($("gorilla").value);
  $("robotFields").style.display=enabled?"contents":"none";
  $("supportHeading").textContent=enabled?"Heroes & Robots":"Heroes";
  if(!enabled){$("robot1").value="";$("robot2").value="";}
}
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
  renderQuality(a);
}
function renderQuality(a){
  const box=$("testQuality");
  if(!box)return;
  if(!a.length){box.className="quality-box";box.textContent="Enter all five hits for a full-quality test.";return}
  const avg=a.reduce((x,y)=>x+y,0)/a.length;
  const spread=Math.max(...a)-Math.min(...a);
  const spreadPct=avg?spread/avg*100:0;
  const selected=$("gorilla").value;
  const prior=read().filter(x=>x.gorilla===selected).sort((x,y)=>y.average-x.average)[0];
  let comparison="No prior personal baseline yet.";
  if(prior){
    const delta=((avg-prior.average)/prior.average)*100;
    comparison="Vs personal best average: "+(delta>=0?"+":"")+delta.toFixed(2)+"%.";
  }
  let consistency="High consistency";
  if(spreadPct>20) consistency="High variance";
  else if(spreadPct>10) consistency="Moderate variance";
  box.className="quality-box "+(a.length===5&&spreadPct<=10?"quality-good":"quality-warn");
  box.innerHTML="<strong>"+a.length+"/5 hits</strong> • "+consistency+" • spread "+fmt(spread)+" ("+spreadPct.toFixed(1)+"%).<br>"+comparison;
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
const profileKey="loj-gorilla-lab-profile-v1";
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
    robots:robotGorillas.has($("gorilla").value)?[$("robot1").value,$("robot2").value].map(x=>x.trim()).filter(Boolean):[],changeType:$("changeType").value,changeDetails:$("changeDetails").value.trim(),hits,best:Math.max(...hits),average:Math.round(total/hits.length),total,notes:$("notes").value.trim()
  };
}
$("saveTest").onclick=()=>{
  const t=testFromForm(); if(t.error){alert(t.error);return}
  const data=read(); data.push(t); write(data); render(); updateStats();
};
function clearHits(){
  [1,2,3,4,5].forEach(i=>$("hit"+i).value="");
  $("notes").value="";
  $("changeDetails").value="";
  updateStats();
}
$("newTest").onclick=clearHits;
$("loadBest").onclick=()=>{
  const selected=$("gorilla").value;
  const rows=read().filter(x=>x.gorilla===selected);
  if(!rows.length){alert("No personal best saved for this Gorilla yet.");return}
  const t=[...rows].sort((a,b)=>b.average-a.average||b.best-a.best)[0];
  [$("shield").value,$("bomber").value,$("shooter").value]=t.ratio;
  $("hero1").value=t.heroes?.[0]||"";
  $("hero2").value=t.heroes?.[1]||"";
  $("hero3").value=t.heroes?.[2]||"";
  syncRobotFields();
  if(robotGorillas.has(selected)){
    $("robot1").value=t.robots?.[0]||"";
    $("robot2").value=t.robots?.[1]||"";
  }
  if(t.capacity)$("capacity").value=t.capacity;
  updateRatio();clearHits();saveProfile();
};
function render(){
  const data=read(),body=$("historyBody"),empty=$("emptyState"); body.innerHTML="";
  empty.style.display=data.length?"none":"block";
  const maxBest=data.length?Math.max(...data.map(x=>x.best)):0;
  const filter=$("historyFilter")?.value||"all";
  const visible=filter==="selected"?data.filter(x=>x.gorilla===$("gorilla").value):data;
  [...visible].reverse().forEach(t=>{
    const tr=document.createElement("tr"); if(t.best===maxBest)tr.className="row-best";
    tr.innerHTML=`<td>${t.gorilla}</td><td>${t.ratio.join("/")}</td><td>${fmt(t.best)}</td><td>${fmt(t.average)}</td><td>${t.hits.length}/5</td><td>${fmt((Math.max(...t.hits)-Math.min(...t.hits))||0)}</td><td><span class="change-tag">${t.changeType||"legacy"}</span></td><td>${t.heroes.join(", ")||"—"}</td><td>${t.robots.join(", ")||"—"}</td><td><button class="delete-btn" data-id="${t.id}">Delete</button></td>`;
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
$("historyFilter").addEventListener("change",render);
$("exportData").onclick=()=>{
  const payload={app:"LoJ Gorilla Lab",version:"0.4",exportedAt:new Date().toISOString(),tests:read()};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="loj-gorilla-lab-"+new Date().toISOString().slice(0,10)+".json";a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
};
$("exportCsv").onclick=()=>{
  const rows=read();
  const esc=v=>'"'+String(v??"").replaceAll('"','""')+'"';
  const header=["Date","Gorilla","Server","Player","Capacity","Shield","Bomber","Shooter","Hit1","Hit2","Hit3","Hit4","Hit5","Best","Average","Total","ChangeType","ChangeDetails","Heroes","Robots","Notes"];
  const lines=[header.map(esc).join(",")];
  for(const t of rows){
    const line=[
      t.created,t.gorilla,t.server,t.player,t.capacity,
      t.ratio?.[0],t.ratio?.[1],t.ratio?.[2],
      ...(t.hits||[]),...Array(Math.max(0,5-(t.hits||[]).length)).fill(""),
      t.best,t.average,t.total,t.changeType||"",t.changeDetails||"",(t.heroes||[]).join(" | "),(t.robots||[]).join(" | "),t.notes
    ];
    lines.push(line.map(esc).join(","));
  }
  const blob=new Blob([lines.join("\n")],{type:"text/csv"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="loj-gorilla-lab-"+new Date().toISOString().slice(0,10)+".csv";a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
};
$("importData").addEventListener("change",async e=>{
  const file=e.target.files?.[0]; if(!file)return;
  try{
    const parsed=JSON.parse(await file.text());
    const incoming=Array.isArray(parsed)?parsed:parsed.tests;
    if(!Array.isArray(incoming))throw new Error("No test array found.");
    const existing=read(),merged=[...existing],seen=new Set(existing.map(x=>String(x.id)));
    let added=0;
    for(const t of incoming){
      if(!t||!t.gorilla||!Array.isArray(t.ratio)||!Array.isArray(t.hits))continue;
      if(seen.has(String(t.id)))continue;
      merged.push(t);seen.add(String(t.id));added++;
    }
    write(merged);render();alert("Imported "+added+" records.");
  }catch(err){alert("Could not import that Gorilla Lab JSON file.");}
  e.target.value="";
});
$("clearAll").onclick=()=>{if(confirm("Clear all saved Gorilla Lab tests from this browser?")){localStorage.removeItem(key);render()}};
$("gorilla").addEventListener("change",()=>{syncRobotFields();renderBest(read());renderExperiment(read());renderTopRatios(read());renderControlledCompare(read());updateStats();if($("historyFilter").value==="selected")render()});
function loadProfile(){
  try{
    const p=JSON.parse(localStorage.getItem(profileKey)||"{}");
    if(p.server)$("server").value=p.server;
    if(p.player)$("player").value=p.player;
    if(p.capacity)$("capacity").value=p.capacity;
    updateRatio();
  }catch{}
}
function saveProfile(){
  localStorage.setItem(profileKey,JSON.stringify({
    server:$("server").value.trim(),
    player:$("player").value.trim(),
    capacity:Number($("capacity").value)||0
  }));
}
["server","player","capacity"].forEach(id=>$(id).addEventListener("change",saveProfile));
function renderControlledCompare(data){
  const box=$("controlledCompare");if(!box)return;
  const selected=$("gorilla").value,rows=data.filter(x=>x.gorilla===selected).sort((a,b)=>new Date(b.created)-new Date(a.created));
  if(rows.length<2){box.innerHTML='<div class="empty">Save at least two tests for '+selected+' to compare them.</div>';return}
  const latest=rows[0],prev=rows[1],delta=latest.average-prev.average,pct=prev.average?delta/prev.average*100:0;
  const changes=[];
  if(ratioKey(latest.ratio)!==ratioKey(prev.ratio))changes.push("ratio");
  if(JSON.stringify(latest.heroes||[])!==JSON.stringify(prev.heroes||[]))changes.push("heroes");
  if(JSON.stringify(latest.robots||[])!==JSON.stringify(prev.robots||[]))changes.push("robots");
  if(latest.capacity!==prev.capacity)changes.push("capacity");
  const cls=delta>=0?"compare-positive":"compare-negative";
  box.innerHTML='<div class="compare-cell"><small>Previous</small><strong>'+fmt(prev.average)+'</strong></div><div class="compare-cell"><small>Latest</small><strong>'+fmt(latest.average)+'</strong></div><div class="compare-cell"><small>Average change</small><strong class="'+cls+'">'+(delta>=0?"+":"")+fmt(delta)+' ('+(pct>=0?"+":"")+pct.toFixed(2)+'%)</strong></div><div class="compare-cell"><small>Detected changes</small><strong>'+(changes.join(", ")||latest.changeType||"none")+'</strong></div>';
  const grade=$("controlGrade");
  const n=changes.length;
  grade.innerHTML=n===0?'<strong>Control:</strong> No setup variables changed — useful repeatability test.':n===1?'<strong>Clean controlled test:</strong> One detected setup variable changed.':n===2?'<strong>Mixed test:</strong> Two setup variables changed; attribution is less certain.':'<strong>Confounded test:</strong> '+n+' setup variables changed. Test one variable at a time when possible.';
}
function renderTopRatios(data){
  const box=$("topRatios"); if(!box)return;
  const selected=$("gorilla").value;
  const rows=data.filter(x=>x.gorilla===selected);
  if(!rows.length){box.innerHTML='<div class="empty">No saved tests for '+selected+' yet.</div>';return}
  const grouped=new Map();
  for(const t of rows){
    const key=ratioKey(t.ratio);
    if(!grouped.has(key))grouped.set(key,[]);
    grouped.get(key).push(t);
  }
  const ranked=[...grouped.entries()].map(([ratio,tests])=>{
    const avgOfAvgs=Math.round(tests.reduce((s,t)=>s+t.average,0)/tests.length);
    const best=Math.max(...tests.map(t=>t.best));
    return {ratio,tests:tests.length,average:avgOfAvgs,best};
  }).sort((a,b)=>b.average-a.average||b.best-a.best).slice(0,3);
  box.innerHTML=ranked.map((x,i)=>'<div class="ratio-rank"><div class="rank">#'+(i+1)+' • '+x.tests+' test'+(x.tests===1?'':'s')+'</div><div class="ratio">'+x.ratio+'</div><small>Mean test average</small><strong>'+fmt(x.average)+'</strong><small>Best single hit</small><strong>'+fmt(x.best)+'</strong><small>Evidence</small><strong>'+(x.tests>=5?'Strong':x.tests>=3?'Building':'Early')+'</strong></div>').join("");
  const note=$("confidenceNote");if(note){const lead=ranked[0];note.textContent=lead.tests>=5?"Leading ratio has 5+ saved tests. Confidence is stronger, but account changes can still shift results.":"Leading ratio has only "+lead.tests+" saved test"+(lead.tests===1?"":"s")+". Repeat it before treating it as established.";}
}
function renderLeaderboard(data){
  const box=$("leaderboard"); if(!box)return;
  const gorillas=[...$("gorilla").options].map(o=>o.value);
  box.innerHTML=gorillas.map(g=>{
    const rows=data.filter(x=>x.gorilla===g);
    if(!rows.length)return '<div class="leader-card"><h3>'+g+'</h3><small>No saved tests yet</small></div>';
    const bestAvg=[...rows].sort((a,b)=>b.average-a.average)[0];
    const bestHit=[...rows].sort((a,b)=>b.best-a.best)[0];
    return '<div class="leader-card"><h3>'+g+'</h3><small>Best average</small><strong>'+fmt(bestAvg.average)+' • '+bestAvg.ratio.join("/")+'</strong><small>Best single hit</small><strong>'+fmt(bestHit.best)+' • '+bestHit.ratio.join("/")+'</strong></div>';
  }).join("");
  const tested=gorillas.filter(g=>data.some(x=>x.gorilla===g)).length,total=data.length,complete=data.filter(x=>(x.hits||[]).length===5).length;
  const cov=$("coverageSummary");if(cov)cov.innerHTML="<strong>"+tested+"/6 Gorillas tested</strong> • "+total+" total experiments • "+complete+" complete five-hit sets.";
}\nlet pendingSuggestion=null;const skippedKey="loj-gorilla-lab-skipped-v1";function skipped(){try{return JSON.parse(localStorage.getItem(skippedKey)||"{}")}catch{return {}}}function saveSkipped(x){localStorage.setItem(skippedKey,JSON.stringify(x))}
function ratioKey(r){return r.join("/")}
function nearbyRatios(base){
  const [s,b,r]=base;
  const candidates=[];
  for(const step of [1,2,3,5]){
    if(b-step>=0) candidates.push([s,b-step,r+step]);
    if(r-step>=0) candidates.push([s,b+step,r-step]);
  }
  return candidates.filter(x=>x.every(v=>v>=0&&v<=100)&&x.reduce((a,b)=>a+b,0)===100);
}
function renderExperiment(data){
  const out=$("experimentSuggestion"), selected=$("gorilla").value;
  const scoped=data.filter(x=>x.gorilla===selected);
  const tested=new Set(scoped.map(x=>ratioKey(x.ratio)));const sk=skipped();(sk[selected]||[]).forEach(x=>tested.add(x));
  let base=null;
  if(scoped.length) base=[...scoped].sort((a,b)=>b.average-a.average||b.best-a.best)[0].ratio;
  else if(referenceBaselines[selected]) base=referenceBaselines[selected].ratio;
  if(!base){pendingSuggestion=null;out.textContent="No baseline available yet.";return}
  const next=nearbyRatios(base).find(r=>!tested.has(ratioKey(r)));
  if(!next){
    pendingSuggestion=null;
    out.innerHTML=`<strong>Local sweep complete</strong><p>You have tested the nearby ratios around ${ratioKey(base)}. Try a wider change or a hero/robot adjustment next.</p>`;
    return;
  }
  pendingSuggestion=next;
  const source=scoped.length?"your best average":"the reference baseline";
  out.innerHTML=`<strong>${ratioKey(next)}</strong><p>Next suggested test around ${ratioKey(base)}, using ${source}. Keep heroes, robots, and march capacity unchanged when possible so the ratio comparison stays clean.</p>`;
}
$("skipSuggestion").onclick=()=>{if(!pendingSuggestion)return;const s=skipped(),g=$("gorilla").value;s[g]=[...(s[g]||[]),ratioKey(pendingSuggestion)];saveSkipped(s);renderExperiment(read())};
$("resetSweep").onclick=()=>{const s=skipped();delete s[$("gorilla").value];saveSkipped(s);renderExperiment(read())};
$("applySuggestion").onclick=()=>{
  if(!pendingSuggestion)return;
  [$("shield").value,$("bomber").value,$("shooter").value]=pendingSuggestion;
  updateRatio();
  window.scrollTo({top:0,behavior:"smooth"});
};
loadProfile();syncRobotFields();updateRatio();updateStats();render();
