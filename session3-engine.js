(function(){
var D=JSON.parse(document.getElementById('__d').textContent);
var R=D.rounds,UPP=D.upper,SN=D.sn,SD=D.sd,TQ=D.tq;
var cR=0,M={},sI=null,PA={},RS=[],CS=0,CC={};

// Inject CSS
var style=document.createElement('style');
style.textContent=[
  '*{box-sizing:border-box;margin:0;padding:0}',
  'body{font-family:sans-serif;background:#f3e7c9;min-height:100vh;display:flex;flex-direction:column}',
  'header{height:56px;background:#0c5a47;display:flex;align-items:center;justify-content:space-between;padding:0 20px;color:#fbe7b8;font-weight:700;font-size:15px}',
  '.badge{background:rgba(242,193,78,.9);border-radius:999px;padding:4px 14px;font-size:13px;color:#3c2a08}',
  'main{flex:1;overflow-y:auto;padding:22px 18px 70px;max-width:800px;margin:0 auto;width:100%}',
  '.banner{background:#0c5a47;border-radius:14px;padding:13px 18px;margin-bottom:18px}',
  '.bn{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#f2c14e;margin-bottom:4px}',
  '.br{font-size:15px;font-weight:600;color:#eafaf3}',
  '.rtit{font-size:24px;font-weight:800;color:#2f2110;margin-bottom:4px}',
  '.sub{font-size:13px;color:#8a7350;margin-bottom:18px}',
  '.cols{display:grid;grid-template-columns:1fr 36px 1fr;gap:12px;margin-bottom:4px}',
  '.col-lbl{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#8a7350;margin-bottom:8px}',
  '.card{width:100%;padding:12px 14px;background:#fff;border:2px solid #e6d8ba;border-radius:12px;cursor:pointer;font-weight:700;font-size:15px;color:#2f2110;text-align:left;margin-bottom:8px;display:block;font-family:sans-serif}',
  '.card.sel{background:#fef3c7;border-color:#f2c14e}',
  '.card.ok{background:#d1fae5;border-color:#059669;cursor:default}',
  '.card.no{background:#fee2e2;border-color:#dc2626;cursor:default}',
  '.arr-col{display:flex;flex-direction:column;align-items:center;padding-top:28px}',
  '.arr{height:46px;display:flex;align-items:center;color:#b07d2a;font-size:20px}',
  '.expl{border-radius:12px;padding:14px 16px;margin-top:14px}',
  '.expl-t{font-weight:700;font-size:14px;margin-bottom:4px}',
  '.expl-b{font-size:14px;line-height:1.55;color:#2f2110}',
  '.btn-row{display:flex;justify-content:flex-end;gap:10px;margin-top:14px}',
  '.btn{background:#0c5a47;color:#fff;border:none;border-radius:999px;padding:11px 24px;font-weight:700;font-size:15px;cursor:pointer;font-family:sans-serif}',
  '.btn2{background:#fff;color:#0c5a47;border:2px solid #0c5a47;border-radius:999px;padding:10px 20px;font-weight:700;font-size:14px;cursor:pointer;font-family:sans-serif}',
  '.pair-row{background:#fff;border:1px solid #e6d8ba;border-radius:14px;padding:13px 15px;margin-bottom:10px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}',
  '.pi{font-weight:800;font-size:17px;color:#2f2110;min-width:80px;flex:none}',
  '.pa-arr{color:#b07d2a;font-size:20px;flex:none;margin:0 4px}',
  '.ch{padding:8px 14px;border-radius:10px;border:2px solid #e6d8ba;background:#f3e7c9;cursor:pointer;font-weight:700;font-size:14px;font-family:sans-serif;margin:3px}',
  '.ch.ok{background:#d1fae5;border-color:#059669;cursor:default}',
  '.ch.no{background:#fee2e2;border-color:#dc2626}',
  '.rc{background:#fff;border-radius:22px;padding:30px;max-width:500px;margin:36px auto;box-shadow:0 12px 40px rgba(60,40,10,.12);border:1px solid #e6d8ba;text-align:center}',
  '.face{font-size:44px;margin-bottom:10px}',
  '.rc-tit{font-size:26px;color:#2f2110;margin-bottom:6px}',
  '.rc-sc{color:#8a7350;margin-bottom:14px}',
  '.sq{background:#f0faf5;border-radius:12px;padding:14px;margin-bottom:16px;text-align:left}',
  '.sq-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#117a60;margin-bottom:4px}',
  '.sq-txt{font-size:14px;line-height:1.6;font-style:italic;color:#2f2110}',
  '.cc{background:#0c5a47;border-radius:24px;padding:38px 30px;max-width:540px;margin:40px auto;text-align:center;color:#fff}',
  '.cc-star{font-size:60px;margin-bottom:12px}',
  '.cc-tit{font-size:32px;color:#fff;margin-bottom:8px}',
  '.cc-sc{color:#bfe6da;font-size:17px;margin-bottom:20px}',
  '.tq{background:rgba(255,255,255,.1);border-radius:14px;padding:16px;margin-bottom:22px;text-align:left}',
  '.tq-lbl{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#f2c14e;margin-bottom:6px}',
  '.tq-txt{font-size:15px;font-style:italic}',
  '.pb{background:#f2c14e;color:#3c2a08;border:none;border-radius:999px;padding:14px 32px;font-weight:800;font-size:17px;cursor:pointer;font-family:sans-serif}',
  '@keyframes ri{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}',
  '.an{animation:ri .3s ease}'
].join('');
document.head.appendChild(style);

function sh(a,s){return a.map(function(v,i){return{v:v,_s:(i*1664525+s)%31};}).sort(function(a,b){return a._s-b._s;}).map(function(x){return x.v;});}
function gc(i){var k=cR+'-'+i;if(CC[k])return CC[k];var pr=R[cR].pairs[i];CC[k]=sh([{t:pr.correct,c:1}].concat((pr.distractors||[]).map(function(d){return{t:d,c:0};})),i*7+cR*3);return CC[k];}
function ts(){return RS.reduce(function(a,b){return a+b;},0);}
function mk(tag,cls,tx){var el=document.createElement(tag);if(cls)el.className=cls;if(tx!=null)el.textContent=tx;return el;}
function ap(p){for(var i=1;i<arguments.length;i++)if(arguments[i])p.appendChild(arguments[i]);return p;}
function clr(el){while(el.firstChild)el.removeChild(el.firstChild);}
function uh(){var n=(R[cR]||{pairs:[]}).pairs.length;document.getElementById('sb').textContent=ts()+' / '+(RS.length*n);}

function render(){
  uh();var app=document.getElementById('app');clr(app);
  var r=R[cR]||{title:'',rule:'',pairs:[],explanation:''};var n=r.pairs.length;
  var ban=mk('div','banner an');ap(ban,mk('div','bn',SN+(SD?' \xb7 '+SD:'')),mk('div','br',r.rule));
  ap(app,ban,mk('h2','rtit',r.title));
  if(UPP){renderUpper(app,r,n);}else{renderLower(app,r,n);}
}

function renderUpper(app,r,n){
  var am=Object.keys(M).length>=n&&n>0;
  ap(app,mk('p','sub','Match each input to its output. '+(am?'All matched!':Object.keys(M).length+' / '+n+' matched')));
  var cols=mk('div','cols');
  var inCol=mk('div');ap(inCol,mk('div','col-lbl','INPUT'));
  r.pairs.forEach(function(pair,i){
    var mt=M[i]!==undefined,co=M[i]===i;
    var btn=mk('button',mt?(co?'card ok':'card no'):(sI===i?'card sel':'card'),pair.input);
    if(!mt)(function(idx){btn.onclick=function(){piClick(idx);};})(i);
    ap(inCol,btn);
  });
  var arCol=mk('div','arr-col');
  r.pairs.forEach(function(){ap(arCol,mk('div','arr','\u2192'));});
  var so=r.pairs.map(function(p,i){return{text:p.output,oi:i};}).map(function(v,i){return{text:v.text,oi:v.oi,_s:(i*1664525+cR*7)%31};}).sort(function(a,b){return a._s-b._s;});
  var outCol=mk('div');ap(outCol,mk('div','col-lbl','OUTPUT'));
  so.forEach(function(item){
    var tk=Object.values(M).includes(item.oi);
    var entry=Object.entries(M).find(function(x){return x[1]===item.oi;});
    var iF=entry?parseInt(entry[0]):-1;var co=iF===item.oi;
    var btn=mk('button',tk?(co?'card ok':'card no'):'card',item.text);
    if(!tk&&sI!==null)(function(oi){btn.onclick=function(){poClick(oi);};})(item.oi);
    ap(outCol,btn);
  });
  ap(cols,inCol,arCol,outCol);ap(app,cols);
  if(am){
    var sc=Object.entries(M).filter(function(x){return parseInt(x[0])===x[1];}).length;
    var good=sc>=Math.ceil(n*0.75);
    var ex=mk('div','expl an');ex.style.background=good?'#d1fae5':'#fef9c3';
    ap(ex,mk('div','expl-t',good?'Well done!':'Keep practising!'),mk('div','expl-b',r.explanation));
    var row=mk('div','btn-row');var nb=mk('button','btn',cR>=2?'Finish':'Next Round \u2192');nb.onclick=nr;ap(row,nb);
    ap(app,ex,row);
  }
}

function renderLower(app,r,n){
  var aa=Object.keys(PA).length>=n&&n>0;
  r.pairs.forEach(function(pr,pi){
    var ans=PA[pi]!==undefined;var ch=gc(pi);
    var row=mk('div','pair-row');
    ap(row,mk('span','pi',pr.input),mk('span','pa-arr','\u2192'));
    ch.forEach(function(c,ci){
      var pk=PA[pi]===ci;var cl=ans?(c.c?'ch ok':(pk?'ch no':'ch')):'ch';
      var btn=mk('button',cl,c.t);
      if(!ans)(function(pIdx,cIdx){btn.onclick=function(){pcClick(pIdx,cIdx);};})(pi,ci);
      ap(row,btn);
    });ap(app,row);
  });
  if(aa){
    var sc=Object.entries(PA).filter(function(e){var ch=gc(parseInt(e[0]));return ch[e[1]]&&ch[e[1]].c;}).length;
    var good=sc>=Math.ceil(n*0.75);
    var ex=mk('div','expl an');ex.style.background=good?'#d1fae5':'#fef9c3';
    ap(ex,mk('div','expl-t',good?'Well done!':'Keep practising!'),mk('div','expl-b',r.explanation));
    var row=mk('div','btn-row');var nb=mk('button','btn',cR>=2?'Finish':'Next Round \u2192');nb.onclick=nr;ap(row,nb);
    ap(app,ex,row);
  }
}

function piClick(i){var n=R[cR].pairs.length;if(Object.keys(M).length>=n||M[i]!==undefined)return;sI=sI===i?null:i;render();}
function poClick(oi){if(sI===null||Object.values(M).includes(oi))return;var co=oi===sI;M[sI]=oi;CS+=(co?1:0);sI=null;render();}
function pcClick(pi,ci){if(PA[pi]!==undefined)return;var ch=gc(pi);CS+=(ch[ci]&&ch[ci].c?1:0);PA[pi]=ci;render();}

function nr(){
  RS.push(CS);CS=0;M={};sI=null;PA={};Object.keys(CC).forEach(function(k){delete CC[k];});
  if(RS.length>=3){showComplete();return;}
  cR++;showRoundComplete();
}

function showRoundComplete(){
  var app=document.getElementById('app');clr(app);
  var ps=RS[RS.length-1]||0,n=(R[cR-1]||{pairs:[]}).pairs.length,r=R[cR-1]||{};
  var card=mk('div','rc an');
  ap(card,mk('div','face',ps>=Math.ceil(n*0.67)?'\u2B50':'\uD83D\uDCAA'),mk('h2','rc-tit','Round complete!'),mk('p','rc-sc',ps+' / '+n+' correct'));
  var sq=mk('div','sq');ap(sq,mk('div','sq-lbl',SN),mk('div','sq-txt',r.scholarQuote||''));ap(card,sq);
  var row=mk('div','btn-row');
  if(cR<3){var nb=mk('button','btn','Next Round \u2192');nb.onclick=render;ap(row,nb);}
  var rb=mk('button','btn2','\u21BB Replay');rb.onclick=function(){CS=0;M={};sI=null;PA={};RS=RS.slice(0,-1);cR--;render();};
  ap(row,rb);ap(card,row);ap(app,card);
}

function showComplete(){
  var app=document.getElementById('app');clr(app);
  var card=mk('div','cc an');
  ap(card,mk('div','cc-star','\u2B50'),mk('h2','cc-tit','Maa shaa Allah!'),mk('p','cc-sc','You completed all 3 rounds \u2014 '+ts()+' correct matches.'));
  var tq=mk('div','tq');ap(tq,mk('div','tq-lbl','This week\'s question'),mk('div','tq-txt',TQ));ap(card,tq);
  var pb=mk('button','pb','Play again');
  pb.onclick=function(){cR=0;M={};sI=null;PA={};RS=[];CS=0;Object.keys(CC).forEach(function(k){delete CC[k];});render();};
  ap(card,pb);ap(app,card);
}

render();
})();
