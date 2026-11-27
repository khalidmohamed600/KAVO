(function(){
var d=document,root=d.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
root.setAttribute('data-motion',reduce?'soft':'full');
/* intro: remove from the page once it has faded */
var intro=d.getElementById('intro');
if(intro){setTimeout(function(){intro.remove()},reduce?0:1100)}
/* language */
function setLang(l){
  root.lang=l;root.dir=l==='ar'?'rtl':'ltr';
  d.querySelectorAll('[data-en]').forEach(function(e){var v=e.getAttribute('data-'+l);if(v!=null)e.innerHTML=v});
  d.querySelectorAll('[data-en-ph]').forEach(function(e){var v=e.getAttribute('data-'+l+'-ph');if(v!=null)e.placeholder=v});
  d.title=l==='ar'?'KAVO | خالد عبد العزيز - تسويق بالأداء':'KAVO | Khalid Abdelzizz - Performance Marketing';
  try{localStorage.setItem('kavo-lang',l)}catch(e){}
}
if(root.lang==='ar')setLang('ar');
d.getElementById('lang').addEventListener('click',function(){setLang(root.lang==='ar'?'en':'ar')});
/* reveal */
var els=d.querySelectorAll('.r');
if('IntersectionObserver' in window&&!reduce){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0,rootMargin:'0px 0px 18% 0px'});
  els.forEach(function(e,i){e.style.transitionDelay=(Math.min(i%4,3)*60)+'ms';io.observe(e)});
  setTimeout(function(){els.forEach(function(e){if(e.getBoundingClientRect().top<innerHeight)e.classList.add('in')})},900);
}else els.forEach(function(e){e.classList.add('in')});
/* brand panels */
/* figures show their final value immediately: no counting through wrong numbers */
function count(b){}
var brands=d.querySelectorAll('.brand');
brands.forEach(function(b){
  var bt=b.querySelector('button');
  bt.addEventListener('click',function(){
    var open=!b.classList.contains('open');
    brands.forEach(function(x){x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false')});
    if(open){b.classList.add('open');bt.setAttribute('aria-expanded','true');count(b)}
  });
});
var first=d.querySelector('.brand.open');
if(first&&'IntersectionObserver' in window){var o2=new IntersectionObserver(function(es){if(es[0].isIntersecting){count(first);o2.disconnect()}},{threshold:.4});o2.observe(first)}
})();
(function(){
var d=document,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
d.documentElement.classList.add('js');
/* loading screen */
(function(){var ld=d.getElementById('loader');if(!ld)return;
  var hide=function(){if(ld.classList.contains('done'))return;ld.classList.add('done');setTimeout(function(){ld.remove()},650)};
  if(reduce){hide();return}
  var t0=Date.now();
  addEventListener('load',function(){setTimeout(hide,Math.max(0,700-(Date.now()-t0)))});
  ['pointerdown','keydown','wheel','touchstart'].forEach(function(ev){addEventListener(ev,hide,{once:true,passive:true})});
  setTimeout(hide,1800)})();
/* stagger inside each group, not across the page */
d.querySelectorAll('main').forEach(function(m){m.querySelectorAll('.r').forEach(function(e){
  var sib=[].filter.call(e.parentNode.children,function(c){return c.classList.contains('r')});
  e.style.transitionDelay=(Math.min(sib.indexOf(e),5)*90)+'ms';
})});
d.addEventListener('transitionend',function(e){if(e.propertyName==='opacity'&&e.target.classList&&e.target.classList.contains('r'))e.target.style.transitionDelay='0ms'});
/* active section in nav */
var links={};d.querySelectorAll('.top nav a').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
if('IntersectionObserver' in window){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){Object.keys(links).forEach(function(k){links[k].classList.toggle('on',k===e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
d.querySelectorAll('main section[id]').forEach(function(s){so.observe(s)})}
})();
(function(){var d=document,r=d.documentElement,b=d.getElementById('theme');if(!b)return;
var mode='auto';try{var s=localStorage.getItem('kavo-theme');if(s==='light'||s==='dark')mode=s}catch(e){}
function auto(){var h=new Date().getHours();return(h>=7&&h<19)?'light':'dark'}
function apply(){var t=mode==='auto'?auto():mode;
  if(r.getAttribute('data-theme')!==t)r.setAttribute('data-theme',t);
  b.setAttribute('data-mode',t);
  b.setAttribute('aria-label',r.lang==='ar'?'المظهر: '+(t==='light'?'فاتح':'داكن'):'Theme: '+t);
  var c=d.querySelector('meta[name=theme-color]');if(c)c.content=t==='dark'?'#121211':'#F7F3EA'}
b.addEventListener('click',function(){
  /* auto -> the other look -> the first look -> back to auto */
  mode=(r.getAttribute('data-theme')==='dark')?'light':'dark';
  try{localStorage.setItem('kavo-theme',mode)}catch(e){}
  apply()});
apply();
setInterval(function(){if(mode==='auto')apply()},30000);
d.addEventListener('visibilitychange',function(){if(!d.hidden&&mode==='auto')apply()});
new MutationObserver(apply).observe(r,{attributes:true,attributeFilter:['lang']});
})();
/* floating dust: slow gold specks drifting through the page, like the reel's particles but tuned to KAVO */
(function(){var d=document;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var cv=d.getElementById('dust');if(!cv||!cv.getContext)return;
var cx=cv.getContext('2d'),W,H,P=[],run=true,dpr=Math.min(devicePixelRatio||1,2);
function size(){W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr;cv.style.width=innerWidth+'px';cv.style.height=innerHeight+'px'}
function make(){P=[];var n=innerWidth<760?26:54;
  for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.6+.5)*dpr,s:(Math.random()*.22+.06)*dpr,dr:(Math.random()-.5)*.12*dpr,o:Math.random()*.5+.15,ph:Math.random()*6.283,tw:Math.random()*.9+.3,ci:Math.random()<.75?0:1})}
function frame(n){if(!run)return;
  if(window.__kavoDustOff){requestAnimationFrame(frame);return}
  var dark=d.documentElement.getAttribute('data-theme')==='dark',c=dark?['201,162,75','226,198,119']:['138,109,44','20,33,61'],mul=dark?1:.7,t=n/1000;
  cx.clearRect(0,0,W,H);
  for(var i=0;i<P.length;i++){var p=P[i];
    p.y-=p.s;p.x+=p.dr+Math.sin(t*.4+p.ph)*.08*dpr;
    if(p.y<-8){p.y=H+8;p.x=Math.random()*W}
    if(p.x<-8)p.x=W+8;else if(p.x>W+8)p.x=-8;
    var a=p.o*(0.55+0.45*Math.sin(t*p.tw+p.ph))*mul;
    cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);
    cx.fillStyle='rgba('+c[p.ci]+','+a.toFixed(3)+')';cx.fill()}
  requestAnimationFrame(frame)}
size();make();
addEventListener('resize',function(){size();make()});
d.addEventListener('visibilitychange',function(){if(d.hidden)run=false;else if(!run){run=true;requestAnimationFrame(frame)}});
requestAnimationFrame(frame);
})();
/* lead form -> Cloudflare Worker -> Telegram group */
(function(){
var f=document.getElementById('leadform');if(!f)return;
var stat=document.getElementById('fstat'),btn=f.querySelector('.sendb'),els=f.elements;
var ENDPOINT='https://kavo-leads.adhmstarrrr.workers.dev';
var T={verify:{en:'Please tick "Verify you are human" above the button, then send again.',ar:'علّم على "Verify you are human" فوق الزرار وبعدين ابعت تاني.'},sending:{en:'Sending...',ar:'بنبعت...'},ok:{en:'Got it, your brief reached us. We reply on WhatsApp shortly.',ar:'وصلنا، تفاصيلك عندنا. هنرد عليك على واتساب قريب.'},err:{en:'Could not send. Please try again, or message us directly below.',ar:'حصلت مشكلة في الإرسال. جرب تاني، أو كلمنا مباشرة من تحت.'},req:{en:'Please fill your name, brand and WhatsApp number.',ar:'من فضلك املأ الاسم والبراند ورقم الواتساب.'}};
function L(){return document.documentElement.lang==='ar'?'ar':'en'}
f.addEventListener('submit',function(e){
  e.preventDefault();
  if(els['company2'].value)return;
  var token='';try{token=(f.querySelector('[name=cf-turnstile-response]')||{}).value||''}catch(e){}
  var data={name:els['name'].value.trim(),brand:els['brand'].value.trim(),whatsapp:els['whatsapp'].value.trim(),product:els['product'].value.trim(),budget:els['budget'].value,goal:els['goal'].value.trim(),turnstile:token};
  if(!data.name||!data.brand||!data.whatsapp){stat.className='fstat err';stat.textContent=T.req[L()];return}
  btn.disabled=true;stat.className='fstat';stat.textContent=T.sending[L()];
  function done(){btn.disabled=false;try{if(window.turnstile)window.turnstile.reset()}catch(x){}}
  fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
  .then(function(r){if(!r.ok)throw 0;stat.className='fstat ok';stat.textContent=T.ok[L()];f.reset();done()})
  .catch(function(){stat.className='fstat err';stat.textContent=token?T.err[L()]:T.verify[L()];done()});
});
})();
/* cinematic scroll scenes: hero slides + assembly, driven by scroll position */
(function(){
var d=document;
/* prefers-reduced-motion keeps the scenes but runs them as calm in-place crossfades (soft mode) */
var soft=matchMedia('(prefers-reduced-motion: reduce)').matches,root=d.documentElement;
var cine=d.querySelector('.cine'),cine2=d.querySelector('.cine2');
if(!cine||!cine2)return;
var s1=d.getElementById('s1'),s2=d.getElementById('s2'),s3=d.getElementById('s3');
var v1=d.getElementById('v1'),v2=d.getElementById('v2'),v3=d.getElementById('v3');
var c21=d.getElementById('c21'),c22=d.getElementById('c22'),c31=d.getElementById('c31');
var dots=d.getElementById('dots2'),hint=d.getElementById('hint2'),top=d.querySelector('.top');
var pill=d.querySelector('.pill2');
var blabel=d.getElementById('blabel');
var pc1=d.getElementById('pc1'),pc2=d.getElementById('pc2'),pc3=d.getElementById('pc3'),result=d.getElementById('result2');
var dotEls=dots.querySelectorAll('i');
var sidx=d.getElementById('sidx'),sidxEls=sidx?sidx.children:[];
var tiltA=matchMedia('(max-width:820px)').matches?7:16,tiltP=matchMedia('(pointer:fine)').matches?5:0,px=0,py=0;
if(tiltP&&!soft)addEventListener('pointermove',function(e){px=e.clientX/innerWidth-0.5;py=e.clientY/innerHeight-0.5;force=true},{passive:true});
function clamp(v,a,b){return Math.min(b,Math.max(a,v))}
function ease(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
function seg(p,a,b){return ease(clamp((p-a)/(b-a),0,1))}
function putScene(el,vis,bo,co,rise,pa,float){
  el.style.setProperty('--bo',bo);
  el.style.setProperty('--co',co);
  if(soft){rise=0;float=0}
  el.style.transform='translateY('+rise+'px)';
  if(vis){
    var par=(pa-0.5)*-40*float;
    vis.style.opacity=co;
    if(soft){vis.style.transform='translateY(var(--vbase, -50%))'}
    else{
      /* small-element depth: perspective lives in the transform of the card itself, no big layers */
      var ty=Math.sin(pa*12.6)*tiltA+px*tiltP,tx=Math.cos(pa*12.6)*tiltA*0.45-py*tiltP*0.7;
      vis.style.transform='perspective(1100px) rotateY('+ty.toFixed(2)+'deg) rotateX('+tx.toFixed(2)+'deg) translateY(calc(var(--vbase, -50%) + '+(rise+par)+'px)) rotate('+(rise/90*6)+'deg)';
    }
  }
}
function piece(el,pb,x0,y0,r0,t0,t1,yEnd){
  x0*=U;y0*=U;yEnd*=U;
  var t=seg(pb,t0,t1);
  var x=(1-t)*x0,y=(1-t)*y0+t*yEnd,r=(1-t)*r0;
  var merge=seg(pb,0.40,0.52);
  var sc=(0.9+0.1*t)*(1-merge*0.35);
  if(soft){x=0;y=yEnd;r=0;sc=0.98+0.02*t}
  el.style.opacity=t*(1-merge);
  el.style.transform='translate(-50%,-50%) translate('+x+'px,'+y+'px) rotate('+r+'deg) scale('+sc+')';
}
/* scene geometry is cached and only re-measured on resize/load/lang change:
   no layout reads and no painted-property writes while scrolling, which is
   what made iPhone Safari apply the scene state in bursts instead of per frame */
var U=1,stackw=d.querySelector('.stackwrap');
var g={vh:1,c1t:0,c1b:1,c1r:1,c2t:0,c2b:1,c2r:1};
function measure(){
  var y=window.pageYOffset||d.documentElement.scrollTop||0;
  var r1=cine.getBoundingClientRect(),r2=cine2.getBoundingClientRect();
  g.vh=window.innerHeight;U=stackw?Math.max(1,stackw.offsetWidth/300):1;
  g.c1t=r1.top+y;g.c1b=g.c1t+cine.offsetHeight;g.c1r=Math.max(cine.offsetHeight-g.vh,1);
  g.c2t=r2.top+y;g.c2b=g.c2t+cine2.offsetHeight;g.c2r=Math.max(cine2.offsetHeight-g.vh,1);
}
var lastHdr=null,lastPa=-1,lastPb=-1,lastOver=null,lastInv=null,lastCover=null,force=true,run=true;
var themeMeta=d.querySelector('meta[name=theme-color]'),lastChrome=null;
/* mouse wheels move in coarse steps: ease the scene progress toward the real scroll
   position on fine-pointer devices (touch keeps exact 1:1). Big jumps (nav clicks,
   keyboard End/Home) snap so the page never glides through the scenes. */
var smooth=matchMedia('(pointer:fine)').matches,sy=null,lastT=0;
function eased(y,now){
  if(!smooth||sy===null){sy=y;lastT=now;return y}
  var dt=Math.min(now-lastT,64);lastT=now;
  var diff=y-sy;
  if(Math.abs(diff)>g.vh*1.6||Math.abs(diff)<0.4){sy=y;return y}
  sy+=diff*(1-Math.exp(-dt/110));
  return sy;
}
function render(now){
  var ry=window.pageYOffset||d.documentElement.scrollTop||0;
  var y=eased(ry,now||performance.now());
  var pa=clamp((y-g.c1t)/g.c1r,0,1),pb=clamp((y-(g.c2t-g.vh*0.6))/(g.c2r+g.vh*0.6),0,1);
  var over=(ry+70>g.c1t&&ry<g.c1b)||(ry+70>g.c2t&&ry<g.c2b);
  var cover=(ry+g.vh>g.c1t&&ry<g.c1b)||(ry+g.vh>g.c2t&&ry<g.c2b);
  if(!force&&pa===lastPa&&pb===lastPb&&over===lastOver&&cover===lastCover)return;
  lastPa=pa;lastPb=pb;lastCover=cover;force=false;
  /* hero scenes: backgrounds crossfade with the outgoing one fully opaque
     underneath until covered, while the CONTENT is sequential: the outgoing
     heading and card fade out in the first 40% of the swap and the incoming
     ones fade in only in the last 40%, with a clean text-free beat between,
     so no frame ever shows two headings or two cards at once */
  var t12=seg(pa,0.20,0.29),t23=seg(pa,0.56,0.65);
  var coOut12=1-seg(t12,0.05,0.36),coIn12=seg(t12,0.26,0.9);
  var coOut23=1-seg(t23,0.05,0.36),coIn23=seg(t23,0.26,0.9);
  putScene(s1,v1,t12<1?1:0,coOut12,0,pa,0.6);
  if(pill)pill.style.pointerEvents=t12<0.02?'auto':'none';
  putScene(s2,v2,t23>0?(t23<1?1-seg(t23,0,0.14):0):seg(t12,0,0.25),t23>0?coOut23:coIn12,t23>0?0:(1-t12)*90,pa,1.0);
  putScene(s3,v3,seg(t23,0.08,0.28),coIn23,(1-t23)*90,pa,0.8);
  var a2=soft?0.8:pa*2.2;
  c21.style.left=(30+22*Math.cos(a2))+'%';c21.style.top=(6+5*Math.sin(a2))+'%';
  c22.style.left=(26+20*Math.cos(a2+2.4))+'%';c22.style.top=(86+4*Math.sin(a2+2.4))+'%';
  c21.style.opacity=c22.style.opacity=v2.style.opacity;
  c31.style.left='-4%';c31.style.top='5%';c31.style.opacity=v3.style.opacity;
  var active=pa<0.25?0:(pa<0.6?1:2);
  for(var i=0;i<3;i++)dotEls[i].className=(i===active&&pa<1)?'on':'';
  var ui=(t12>0.5)?'#F2ECDF':'#141412';
  dots.style.color=ui;hint.style.color=ui;
  if(sidx){sidx.style.color=ui;sidx.style.opacity=(pa>0.01&&pa<0.985)?1:0;for(var k=0;k<3;k++)sidxEls[k].className=k===(pa<0.25?0:(pa<0.6?1:2))?'on':''}
  dots.style.opacity=pa<1?1:0;
  hint.style.opacity=pa<0.04?1:0;
  /* keep the phone status area and any sliver below the short viewport in
     sync with the scene on screen, not the page's cream base */
  var inC1=(ry+70>g.c1t&&ry<g.c1b),inC2=(ry+70>g.c2t&&ry<g.c2b);
  var sceneCol=inC1?(pa<0.245?'#F2ECDF':(pa<0.60?'#131311':'#0E0E0D')):(inC2?'#131311':(d.documentElement.getAttribute('data-theme')==='dark'?'#121211':'#F7F3EA'));
  if(sceneCol!==lastChrome){lastChrome=sceneCol;if(themeMeta&&themeMeta.content!==sceneCol)themeMeta.content=sceneCol;cine.style.background=inC1?sceneCol:''}
  /* assembly scene */
  blabel.style.opacity=seg(pb,0,0.04)*(1-seg(pb,0.42,0.52));
  blabel.style.transform=soft?'none':'translateY('+((1-seg(pb,0,0.04))*30)+'px)';
  if(g.gw!==innerWidth||!g.gp){g.gw=innerWidth;g.gp=Math.max(86,pc2.offsetHeight+12)/U}var gap=g.gp;
  piece(pc1,pb,-240,-220,-22,0.00,0.18,-gap);
  piece(pc2,pb,250,-110,18,0.06,0.24,0);
  piece(pc3,pb,-230,240,14,0.12,0.30,gap);
  var rin=seg(pb,0.34,0.6);
  result.style.opacity=rin;
  result.style.transform=soft?'translate(-50%,-50%) scale('+(0.97+0.03*rin)+')':'translate(calc(-50% + '+((1-rin)*(root.dir==='rtl'?-1:1)*150)+'px),-50%) scale('+(0.7+0.3*rin)+') rotate('+((1-rin)*-4)+'deg)';
  /* header over scenes */
  var inv=(over&&t12>0.5)||(ry+70>g.c2t&&ry<g.c2b);
  if(over!==lastOver){top.classList.toggle('over-cine',over);lastOver=over}
  if(over&&sceneCol!==lastHdr){lastHdr=sceneCol;top.style.setProperty('--hdr',sceneCol)}
  if(inv!==lastInv){top.classList.toggle('inv',inv);lastInv=inv}
  /* the dust canvas sits behind the opaque scene stages: stop painting it while they cover the screen */
  window.__kavoDustOff=cover;
}
function kick(){force=true;render()}
/* a continuous frame loop, not scroll-event delivery: every composited scroll
   position gets its matching scene state in the same frame */
function loop(t){if(!run)return;render(t);requestAnimationFrame(loop)}
addEventListener('scroll',kick,{passive:true});
addEventListener('resize',function(){measure();kick()});
addEventListener('load',function(){measure();kick()});
if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){measure();kick()});
new MutationObserver(function(){measure();kick()}).observe(d.documentElement,{attributes:true,attributeFilter:['lang']});
d.addEventListener('visibilitychange',function(){if(d.hidden)run=false;else if(!run){run=true;measure();requestAnimationFrame(loop)}});
measure();render();requestAnimationFrame(loop);
})();

/* section depth: transform-only, uses the independent translate property so it never fights the reveal transitions */
(function(){
var d=document,root=d.documentElement;
if(root.getAttribute('data-motion')!=='full')return;
if(!('translate' in d.documentElement.style))return;
/* stagger lists */
d.querySelectorAll('ul,ol').forEach(function(u){var n=0;Array.prototype.forEach.call(u.children,function(li){if(li.classList&&li.classList.contains('r')){li.style.transitionDelay=(n*80)+'ms';n++}})});
var items=[];
function collect(){
  items=[];var y=window.pageYOffset||0;
  d.querySelectorAll('main .lab, main h2.r, main .brand, main .svcc, main .steps li').forEach(function(e){
    if(e.closest('#about,.bhead'))return;
    var r=e.getBoundingClientRect();
    var k=e.matches('.lab,h2')?-0.07:(e.matches('.brand')?0.035:0.05);
    items.push({e:e,c:r.top+y+r.height/2,k:k,last:null});
  });
}
var vh=innerHeight,run=true,lastY=-1;
function frame(){
  if(!run)return;
  var y=window.pageYOffset||0;
  if(y!==lastY){lastY=y;
    for(var i=0;i<items.length;i++){var it=items[i],off=it.c-y-vh/2;
      if(off>vh*1.1||off<-vh*1.1){continue}
      var v=Math.round(off*it.k*10)/10;
      if(v!==it.last){it.last=v;it.e.style.translate='0 '+v+'px'}
    }
  }
  requestAnimationFrame(frame)
}
function re(){vh=innerHeight;var t=[];items.forEach(function(it){it.e.style.translate=''});collect();lastY=-1}
addEventListener('load',function(){setTimeout(re,200)});
addEventListener('resize',re);
d.addEventListener('click',function(){setTimeout(re,700)});
if(d.fonts&&d.fonts.ready)d.fonts.ready.then(re);
new MutationObserver(function(){setTimeout(re,100)}).observe(root,{attributes:true,attributeFilter:['lang']});
d.addEventListener('visibilitychange',function(){if(d.hidden)run=false;else if(!run){run=true;lastY=-1;requestAnimationFrame(frame)}});
collect();requestAnimationFrame(frame);
})();

/* About: pinned beats, one at a time (opacity/translate classes, progress line) */
(function(){
var d=document,sec=d.getElementById('about');if(!sec||!d.documentElement.classList.contains('js'))return;
var beats=[].slice.call(sec.querySelectorAll('.beat')),prog=sec.querySelector('.bprog'),n=beats.length,top=0,h=1,last=-1,tick=0;
if(!n)return;
function m(){var r=sec.getBoundingClientRect();top=r.top+(window.pageYOffset||0);h=Math.max(sec.offsetHeight-innerHeight,1);f()}
function f(){tick=0;var p=Math.min(1,Math.max(0,((window.pageYOffset||0)-top)/h));
  var i=Math.min(n-1,Math.floor(p*n));
  if(i!==last){last=i;beats.forEach(function(b,k){b.classList.toggle('on',k===i)})}
  if(prog)prog.style.setProperty('--bp',p.toFixed(3))}
addEventListener('scroll',function(){if(!tick){tick=1;requestAnimationFrame(f)}},{passive:true});
addEventListener('resize',m);addEventListener('load',m);
if(d.fonts&&d.fonts.ready)d.fonts.ready.then(m);
m();
})();
/* Brands: proof chips and thumbnail slot on every row, live index, focus on the row in view */
(function(){
var d=document,root=d.documentElement,list=d.querySelector('.blist');if(!list)return;
var LOGOS = {'Logo Drip':'data:image/png;base64,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','Cavelle':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAABgFBMVEX+/v4AAAD2AQL+/v726Of+/v7y1tXmJif+/v7lSkzuuLfvx8fql5bjNzfod3frqarmFhfoh4f9/f3kaGj9/f3lWFj+/v7UaG/XdnrZhojdOTnZREfdqa3lgXz24dz+/v7XfIHlPEHnfYHnvMLvwb3TWmTbnaLjHSLlXGPcJijYWV3clprMzMzf39/y3eDoQTvlnaPsop3dAwfds7TiYl7v7/eqqqqqqv/eEw/HOkPeQD7nIB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAjG3GAAAAgHRSTlP+AP8F/2///9D///////////81/7P/Tv//////////lP///////////////wUI/////////xADA/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGxlRPMAAAejSURBVHjazVsJm5ssEJ4owSgqGmNMNtn7aHfbbs/v/v//6wM84oGCxDSZPk+TKOv7ygwzwwAwGyE2k/xzzgRqwn+X9/JPXYEx6PxjOZ8voEcW8/my1nRSAuKR9rof/EBibZftpyPAH2evV0r0gsOKc9CkAJrwy7kmetkPS00KoAe/gtGy0qMAJ4LXpqAgcAR8ReEIAoz++gh4QWGt6AQYhLfncLTM7UEKcKre19UD9ONP8fqHThhLgP3JAiaTRT8D6FP/fEJ87pj6DAF61D+HiWXeYwgg7/5bmFxu5WqAU6tfZQjw2/B7GMDvw5czaBP4Uw9/43UvPRkxgPb7/6GDn1h/49alzHKICQNo5316+FaAWtdiy3KwDoOWP2gRmN3q4UdYdlWHwe1sgICt5X8YkhV3L6NIj8G8yQAa+GtN/A9IciO09BisGwxg7ADk+FYqu+NZegyahggjDVDgyzSQ60CTQc0QYZwB+ALfotKbgbgXjDMDOOAvNQzAzQl4Qzc13MHywAAOCtDJv34NEfia39Sww9VBCTBqBAJ2BIYvtYH83rVedtAiYNtLvXiChaWF0ltW7y2JEsouKAnMlAqgaYzKPgh6DVTg048xUilh1iCgYYExx71hX0jUYwRuiS+aIk07LAgoLTC2qkHOGbiSHqrjqxms7BoBdQfkD60x6Lgi/FrgPxRNVQyKLhAEPqs6oMSvMWj5IhQU+NdVUwWDlf25JKDsgAN+jUFjKOKg0f+5uEijCwSBLyttfMagtMS0cnkoZj+TbtNhBqsvBQGVDxDDK0hi34/dqDEW3NgjhNDEadhfkPjf/YeUN9ghpS8ApRPkD03Kl0W+UyhXMDhIIm96hVTuEHgUUHTAh/qoR4mMQYnvNJqmCiXwiMAJKPIgSjqZj2DwdGDwq8APWoHIHzbDdU5gNrYMkbYZpAV+hMc9iPtj0MzE22FPMPCiBr48SCpSI9DLRLvj4sAgrS6NfhDLT1kPjC8FiMifM3Dv42qofjOo3fAeMJiLJi1XK/DHWgDXAe+B5Xj8IjetBjnVzUYlvgiMijGeVc9+UM0WRxduwMAGKwJu45cJgTUbhgtzAtf1PNGIwIKpAIxtoAo1vrENMHjb5M+SmgKOGQUsHIBRQdApg73nBnEVh30TKzQi4Jf4tIqEvqEOjAigMtDn49/6aBoLTAkk9fe3atHAwAp04D0szweoJB9pNaVTVBdpK81Juvj9GVEyAYE7eU7oWT05Ia6avipyQl0RQ+w+9FlWnFZxWLx/6nsEF1nxISsP8qb/8XB1M0mJN2y8a/X+tXmBX84LrrtNp5CH2kOvykyoOTO6l8xM7qfCr/dBlYlJ5obJqLmhgR30vr/ogw8tBsENTClhE7+nPpAcmgYYppW4kQnL1gburdoMfXJ8Xvh5qPCVNaIQwYnkaaIq2bhocJBiRkoH6oThSPhxBNKhSmmgXSk1J+BqlGrJKQloVMv/HakC28QfSFOfd931gmZSOjYtvx5eMRk7/g0mJrwPItSTq1+NxOcTk9FTM87gQeIGIgP/x6ZmBpPTWGrqqUn8Y5NTk+k564NX1LUNA/+/NCxQxF1jD03i78KwRMMYdFUQG8S/uWGRajLJi1Sn27CgVaYzKFROJqJQqS7VnlADRa1YFQ6QR7181GGPG997/pNQAh5l4lGEvCJA4rKyTPI7g6ExL1Yr1yxjnmg4MXs4zwZcwp0+D4dXVoqLDNgn5Yp+WOarReDeDXohW2fBgu+XcCLrVaT+kZiDOzz9ZeDfbxgzLpRYTodAxO9kg17I1liy+S7mmzijzPtEPvI4eMLh2E+Ec5+MWKd0CYTs+pBvrpZshhetgir2uiLd8y2H68BjP10QBPK5opTA8IpNtWg1tGyHoir/CkQeIqAcK2Y3fE7AcaJEToCpYGh2Xlu2G+oCFmRJlwCDodwYcFkwlRFg8gOrOkC5dMtybb8i4LiuG3Aoz4oCjsQIxNR/rBG4PhBIqU/RQAfYeovXSb5DiqAy6+ZQYgrgCwKoSMecMiimJYHhmllz8XrAH7NZb5T4/LnsnR/CMBXvWuxlYgr6GIZhQliXJPwLZoE65IJc62uYhIk/4IU1NzAQp5gYlzbAE0KaT5ArR/RUfinm8T/eC0d0NeQDNLdwoNi9d30Emx0fD2THfQt623FnePPmpq6b7jy8c7nsHmn+5Q2F/CN1NwNO0GQTy1RhsLuJRXMbz0Qi2cajjEl7pvHtHsEnAj83e9gjCnTrwbctUwXafmJmsSFA7l6AbGh+QRGFRm7lQkzz3m4P6J8t4GcMb9kzZBmB54xpeevvMdngDDK8wdTfUpRt0XAiNGIzG77bbtmLPVNG4AVesgwBI5PRDDaZB9lmy15+m/1E2csd3H3bILq5I+jTMyGb7ZZ1lQxfvpmtbzsfIkwwkD3LOh4RhncE3APwf574n7V5ZM4QM/2gPYtNPGl5JOXfSTPR4zY0HikDGxp1t3QeJYNbOmenz9EVm1p1t/UegT+8rXc2+2t2yj5Qb2w+/9bu829uP//2/vMfcDj/EY/zH3I5/zGfCzjodP6jXuc/7Hb+434XcODxAo58nv/Q6wUc+72Ag88XcPT7Ag6/n+z4//+aImejegWSaAAAAABJRU5ErkJggg==','Remo Dessert':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAABgFBMVEVdY1qe1delmVuV1tdlnZuZ19mfp5NooKWTz9JjTB3h3KCrx63LqF9IUlRafIIfHSFthXJJLRHHuJA1QjVpvcIZGyIpPEJMc3Rsw8MwNWFovL1pvMFovMBvwsSKeWj17c04RkkuVFNyvsPd0XCNvMRCOztmu7uDrbB3wL1twb6ahDqPv8ZFPUBtwLwxMjRmuLr9+oaY0tQCAgOKysx6w8RvvMEnJyoxNi3s6Yz5930WFhJORjCup3DZ14jZ1nXp5np0wL1vaEik19htWDH8/KcrJheMhlaLt7UpKyd4dlFeuLdXVDhPNxRvp6nNyIdJZ2kuSEptl5WMeU/NxXXJunLi24mWlWpKOylRdXe4tXQXJylrtLRSV09yYzaOimni3XhlSilmqquX1tipllOommkjGxNttraNxsdvw8W2t4s6ZGdWhokXJBpniYlqw8R0w8SGaDQbNDQvNU03VVdswsOFqa02MhppXEdluryOqI+SxbmS1dUeHSCFakePdTiGtbcDjfDNAAAAgHRSTlP/6P+c/1v/FCr/////Bv8C/////6r//0WoAqhqySb//wL/Hf//AmoJHMn/DwJSAP7//v/+/v4C/////////////v/+//////////7/////////////////////D///////Ds7///9HEFP//////5HN//8C/2v////R//9tAv//C5NpdsQAABOJSURBVHjatZv5Q+LIs8ADIt6uzvV2Z+fY6+1+j/cIJITEHGAIAcJ9gwiIgjOeo47X6Hx1/vXXnQNydFB39+WHyDiY+nRVdXV1pRoLPO2KgEv7NLO09F/6tTQzY//fR1/YE6XDHx9nP/z4esoTwsNUKA7uOBnfefH69+nZj+qX/hP5/wHQpG/vfdoJkTiOk457OBQ6+bS3OQb9OwG0R85Oe5CijXsIYuxMv32KHrDHiYc2vzgJhcIPA4DPby7+Af7gu8jfBADFf5uemihaN8Hojk9Nbz4OAXuM+O2LHTh2KvTA2EPUCAD4wwVAeNgQDwFA8Z/g8zSA8GQA3AQAvvoJTIvv/hIAGP636RPjefhkH3AC4DvAEA/MCOyB4e/thNZtALoh4uqdtACMTEAZXz3Ze0AJ2MThb36yiTYBhEifDyfzOJ4/tAFQ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','Sugar Rush':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAABgFBMVEWcnaXVpZ6bVWrs2dJUcZe5KnvgiWyyi2u3t7jhGHjdIoHWemHhu8rs0Lfe3+BBLDRuOmtnk7ymj8KUzuEvP2Y+QUQ5b5c6kr0fqdAbwt9fYGJgXHpXjsC/YZz+/v4vMDQvpswoJyrs5+5LmcPUGHj+/v7+/v6sR5P4+PgxnMVxd7C4OYrk2+j+/v7n5udHp8r////LJXzRyNvQKIHFNIYYGh3P6u+XVZuGZqb+//+Mp8nUt8/7+/vZ1OMcHSGquNNWirseISSJytyQXKKs2uZkg7hwosZ3wte0V5fDeKvX19gusdNVtM96bKppu9S34erGh7NDODtSk7zSzeCqhq5vnMO1darIlrnOqcfCRo6a0+JIRUiZs9G5lrTlfFXDYZ3EZqPMy8zb8fTCWpnLncLt2NKsrMjYDXM+PkAsR2w4jruX0t6xd4zs7O0xVXpWV1idTZmNdJGMi7SNlcOyaae3dHCrhZm2wtnSxrThh2doZImLZZGYppawZ26spoWtrK3PeUUCAAAAgHRSTlP//////////wL//////w8C//////8D/////wL////+AP8C////zU3/Ef////9tD/+S/////wP///+t//8u/wL//wL//////////wn///////8C////////////Av//////CP///////wH/////Kf8C////////////////////AbI8SE8AAAoASURBVHja1ZuHe9rIEsBlO8m9lLt35fWyqIFAkpFVQDIYkGkGYwzGGLfYSWyn53Lp9cq//mYlisACCxvE9ybf5wiBdn47Mzu7kmaJwHhCpWOr9lE0HA61JRyOtr+NpakxGyTG024pj66EFpeXg8ghweXlxdBK1IagpgNgNxwNLfVp7pfgUihs/XR10gBUOg1/VxZHKO9CLK5YF1ATBKA8a3cyeHMF4cX2gcB6aBmNJcuhqDcEwkvvo9477zRD2AvCRQAQTdEldElZwghXAoDur1+m9z0rRO0AuiQAXBq6gnoLIXSBEUYAUKtXsH6fH6jVywDARSE0ERlpBGK4+SfR/a4RVscFoAIrQTQxCa4EqLEAKCqwiCYqi4HDVe8AQLuEJixL1qDyBkBN0P19gRDzBgD6g2gKEgy72YDwTf8QAuK8/vCU9LsT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'};
var rows=[].slice.call(list.querySelectorAll('.brand')),full=root.getAttribute('data-motion')==='full';
rows.forEach(function(b){
  var nm=b.querySelector('.nm'),bt=b.querySelector('.bt'),btn=b.querySelector('button');if(!nm||!bt||!btn)return;
  var th=d.createElement('span');th.className='thumb';th.setAttribute('data-slot','brand-thumb');th.setAttribute('aria-hidden','true');
  th.textContent=(nm.textContent||'?').trim().charAt(0).toUpperCase();
  var lg=LOGOS[(nm.textContent||'').trim()];
  if(lg){var im=d.createElement('img');im.src=lg;im.alt='';im.width=76;im.height=76;im.decoding='async';im.loading='lazy';th.textContent='';th.classList.add('has-img');th.appendChild(im)}
  btn.insertBefore(th,bt);
  var figs=[].filter.call(b.querySelectorAll('.fig'),function(f){return !f.querySelector('.cur')}).slice(0,3);
  if(figs.length){var c=d.createElement('span');c.className='chips';
    figs.forEach(function(f){var v=f.querySelector('b'),l=f.querySelector('span');if(!v||!l)return;
      var ch=d.createElement('span');ch.className='chip';var vb=d.createElement('b');vb.textContent=v.textContent;
      ch.appendChild(vb);ch.appendChild(l.cloneNode(true));c.appendChild(ch)});
    bt.appendChild(c)}
});
var bidx=d.getElementById('bidx'),bn=bidx?bidx.querySelector('b'):null,bs=bidx?bidx.querySelector('span'):null,be=bidx?bidx.querySelector('em'):null;
var cs=[],vh=innerHeight,tick=0,lastBest=-1;
function pad(x){return x<10?'0'+x:''+x}
function meas(){vh=innerHeight;var y=window.pageYOffset||0;cs=rows.map(function(b){var r=b.getBoundingClientRect();return r.top+y+r.height/2});upd()}
function upd(){tick=0;var y=window.pageYOffset||0,best=0,bd=1e9;
  for(var i=0;i<rows.length;i++){var ad=Math.abs(cs[i]-y-vh/2);if(ad<bd){bd=ad;best=i}
    if(full&&ad<vh*1.2){var k=1-Math.min(ad/(vh*.62),1);rows[i].style.opacity=(0.55+0.45*k).toFixed(3);rows[i].style.scale=(0.965+0.035*k).toFixed(4)}}
  if(bidx&&best!==lastBest){lastBest=best;bn.textContent=pad(best+1);bs.textContent='/ '+pad(rows.length);var nm=rows[best].querySelector('.nm');be.textContent=nm?nm.textContent:''}}
addEventListener('scroll',function(){if(!tick){tick=1;requestAnimationFrame(upd)}},{passive:true});
addEventListener('resize',meas);addEventListener('load',meas);
d.addEventListener('click',function(){setTimeout(meas,700)});
if(d.fonts&&d.fonts.ready)d.fonts.ready.then(meas);
if('ResizeObserver' in window){new ResizeObserver(function(){meas()}).observe(list)}
meas();
})();
