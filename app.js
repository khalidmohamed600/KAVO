(function(){
var d=document,root=d.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* intro: remove from the page once it has faded */
var intro=d.getElementById('intro');
if(intro){setTimeout(function(){intro.remove()},reduce?0:1750)}
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
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(e,i){e.style.transitionDelay=(Math.min(i%4,3)*60)+'ms';io.observe(e)});
  setTimeout(function(){els.forEach(function(e){if(e.getBoundingClientRect().top<innerHeight)e.classList.add('in')})},900);
}else els.forEach(function(e){e.classList.add('in')});
/* brand panels */
function count(b){
  if(reduce)return;
  b.querySelectorAll('[data-to]').forEach(function(e,idx){
    var t=parseFloat(e.dataset.to),dec=+(e.dataset.d||0),s=e.dataset.s||'',final=e.textContent,t0=performance.now()+idx*140;
    (function k(n){var p=Math.min(Math.max((n-t0)/1100,0),1),v=t*(1-Math.pow(1-p,3));
      e.textContent=p<1?v.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec})+s:final;
      if(p<1)requestAnimationFrame(k)})(t0);
  });
}
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
  addEventListener('load',function(){setTimeout(hide,Math.max(0,1500-(Date.now()-t0)))});
  setTimeout(hide,2800)})();
/* stagger inside each group, not across the page */
d.querySelectorAll('main').forEach(function(m){m.querySelectorAll('.r').forEach(function(e){
  var sib=[].filter.call(e.parentNode.children,function(c){return c.classList.contains('r')});
  e.style.transitionDelay=(Math.min(sib.indexOf(e),5)*90)+'ms';
})});
d.addEventListener('transitionend',function(e){if(e.propertyName==='opacity'&&e.target.classList&&e.target.classList.contains('r'))e.target.style.transitionDelay='0ms'});
if(reduce)return;
var bar=d.createElement('div');bar.className='prog';d.body.appendChild(bar);
var glow=d.querySelector('.glow'),heroIn=d.querySelector('.hero-in'),tick=false;
function upd(){tick=false;var h=d.documentElement.scrollHeight-innerHeight,y=scrollY;
  bar.style.transform='scaleX('+(h>0?Math.min(y/h,1):0)+')';
  if(glow)glow.style.setProperty('--py',(y*.16)+'px');
  if(heroIn){var p=Math.min(y/(innerHeight*.85),1);heroIn.style.transform='translate3d(0,'+(y*.16)+'px,0)';heroIn.style.opacity=1-p*.62}}
addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd();
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
  b.setAttribute('data-mode',mode);
  b.setAttribute('aria-label',r.lang==='ar'?'المظهر: '+(mode==='auto'?'تلقائي':mode==='light'?'فاتح':'داكن'):'Theme: '+mode);
  var c=d.querySelector('meta[name=theme-color]');if(c)c.content=t==='dark'?'#121211':'#F7F3EA'}
b.addEventListener('click',function(){
  /* auto -> the other look -> the first look -> back to auto */
  if(mode==='auto')mode=auto()==='light'?'dark':'light';
  else if(mode===auto())mode='auto';
  else mode=auto();
  try{if(mode==='auto')localStorage.removeItem('kavo-theme');else localStorage.setItem('kavo-theme',mode)}catch(e){}
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
var T={sending:{en:'Sending...',ar:'بنبعت...'},ok:{en:'Got it, your brief reached us. We reply on WhatsApp shortly.',ar:'وصلنا، تفاصيلك عندنا. هنرد عليك على واتساب قريب.'},err:{en:'Could not send. Please try again, or message us directly below.',ar:'حصلت مشكلة في الإرسال. جرب تاني، أو كلمنا مباشرة من تحت.'},req:{en:'Please fill your name, brand and WhatsApp number.',ar:'من فضلك املأ الاسم والبراند ورقم الواتساب.'}};
function L(){return document.documentElement.lang==='ar'?'ar':'en'}
f.addEventListener('submit',function(e){
  e.preventDefault();
  if(els['company2'].value)return;
  var token='';try{token=(f.querySelector('[name=cf-turnstile-response]')||{}).value||''}catch(e){}
  var data={name:els['name'].value.trim(),brand:els['brand'].value.trim(),whatsapp:els['whatsapp'].value.trim(),product:els['product'].value.trim(),budget:els['budget'].value,goal:els['goal'].value.trim(),turnstile:token};
  if(!data.name||!data.brand||!data.whatsapp){stat.className='fstat err';stat.textContent=T.req[L()];return}
  btn.disabled=true;stat.className='fstat';stat.textContent=T.sending[L()];
  function done(){btn.disabled=false}
  fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
  .then(function(r){if(!r.ok)throw 0;stat.className='fstat ok';stat.textContent=T.ok[L()];f.reset();done()})
  .catch(function(){stat.className='fstat err';stat.textContent=T.err[L()];done()});
});
})();
/* cinematic scroll scenes: hero slides + assembly, driven by scroll position */
(function(){
var d=document;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var cine=d.querySelector('.cine'),cine2=d.querySelector('.cine2');
if(!cine||!cine2)return;
var stage=d.getElementById('stage');
var s1=d.getElementById('s1'),s2=d.getElementById('s2'),s3=d.getElementById('s3');
var v1=d.getElementById('v1'),v2=d.getElementById('v2'),v3=d.getElementById('v3');
var c21=d.getElementById('c21'),c22=d.getElementById('c22'),c31=d.getElementById('c31');
var dots=d.getElementById('dots2'),hint=d.getElementById('hint2'),top=d.querySelector('.top');
var blabel=d.getElementById('blabel');
var pc1=d.getElementById('pc1'),pc2=d.getElementById('pc2'),pc3=d.getElementById('pc3'),result=d.getElementById('result2');
var dotEls=dots.querySelectorAll('i');
var cream=[242,236,223],char=[19,19,17],gold=[201,162,39];
function mix(a,b,t){return [0,1,2].map(function(i){return Math.round(a[i]+(b[i]-a[i])*t)})}
function rgb(c){return 'rgb('+c[0]+','+c[1]+','+c[2]+')'}
function clamp(v,a,b){return Math.min(b,Math.max(a,v))}
function ease(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
function seg(p,a,b){return ease(clamp((p-a)/(b-a),0,1))}
function slideIO(el,vis,pa,a0,a1,b0,b1,float){
  var inn=seg(pa,a0,a1),out=1-seg(pa,b0,b1),io=inn*out;
  el.style.opacity=io;
  el.style.transform='translateY('+((1-inn)*60-(1-out)*60)+'px)';
  if(vis){
    var par=(pa-0.5)*-40*float;
    var vIn=inn,vOut=out;
    vis.style.opacity=vIn*vOut;
    vis.style.transform='translateY(calc(var(--vbase, -50%) + '+((1-vIn)*90-(1-vOut)*90+par)+'px)) rotate('+((1-vIn)*6)+'deg)';
  }
  return io;
}
function piece(el,pb,x0,y0,r0,t0,t1,yEnd){
  var t=seg(pb,t0,t1);
  var x=(1-t)*x0,y=(1-t)*y0+t*yEnd,r=(1-t)*r0;
  var merge=seg(pb,0.56,0.72);
  var sc=(0.9+0.1*t)*(1-merge*0.35);
  el.style.opacity=t*(1-merge);
  el.style.transform='translate(-50%,-50%) translate('+x+'px,'+y+'px) rotate('+r+'deg) scale('+sc+')';
}
function prog(el){
  var r=el.getBoundingClientRect();
  var total=el.offsetHeight-innerHeight;
  return total>0?clamp(-r.top/total,0,1):0;
}
var ticking=false;
function render(){
  ticking=false;
  var pa=prog(cine),pb=prog(cine2);
  /* hero scene */
  var t12=seg(pa,0.20,0.33),t23=seg(pa,0.56,0.68);
  var bg=mix(mix(cream,char,t12),gold,t23);
  stage.style.background=rgb(bg);
  slideIO(s1,v1,pa,-1,-0.5,0.22,0.35,0.6);
  slideIO(s2,v2,pa,0.25,0.37,0.58,0.70,1.0);
  slideIO(s3,v3,pa,0.61,0.73,1.2,1.4,0.8);
  var a2=pa*2.2;
  c21.style.left=(30+22*Math.cos(a2))+'%';c21.style.top=(6+5*Math.sin(a2))+'%';
  c22.style.left=(26+20*Math.cos(a2+2.4))+'%';c22.style.top=(86+4*Math.sin(a2+2.4))+'%';
  c21.style.opacity=c22.style.opacity=v2.style.opacity;
  c31.style.left='-4%';c31.style.top='5%';c31.style.opacity=v3.style.opacity;
  var active=pa<0.25?0:(pa<0.6?1:2);
  for(var i=0;i<3;i++)dotEls[i].className=(i===active&&pa<1)?'on':'';
  var ui=(t12>0.5&&t23<0.5)?'#F2ECDF':'#141412';
  dots.style.color=ui;hint.style.color=ui;
  dots.style.opacity=pa<1?1:0;
  hint.style.opacity=pa<0.04?1:0;
  /* assembly scene */
  blabel.style.opacity=seg(pb,0,0.10)*(1-seg(pb,0.70,0.86));
  blabel.style.transform='translateY('+((1-seg(pb,0,0.10))*30)+'px)';
  piece(pc1,pb,-240,-220,-22,0.03,0.28,-86);
  piece(pc2,pb,250,-110,18,0.13,0.38,0);
  piece(pc3,pb,-230,240,14,0.23,0.48,86);
  var rin=seg(pb,0.60,0.80);
  result.style.opacity=rin;
  result.style.transform='translate(-50%,-50%) scale('+(0.6+0.4*rin)+') rotate('+((1-rin)*-4)+'deg)';
  /* header over scenes */
  var r1=cine.getBoundingClientRect(),r2=cine2.getBoundingClientRect();
  var over=(r1.top<70&&r1.bottom>0)||(r2.top<70&&r2.bottom>0);
  top.classList.toggle('over-cine',over);
  top.classList.toggle('inv',(over&&t12>0.5&&t23<0.5)||(r2.top<70&&r2.bottom>0));
}
function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(render)}}
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',onScroll);
new MutationObserver(onScroll).observe(d.documentElement,{attributes:true,attributeFilter:['lang']});
render();
})();
