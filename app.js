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
  b.querySelectorAll('[data-to]').forEach(function(e){
    var t=parseFloat(e.dataset.to),dec=+(e.dataset.d||0),s=e.dataset.s||'',final=e.textContent,t0=performance.now();
    (function k(n){var p=Math.min(Math.max((n-t0)/700,0),1),v=t*(1-Math.pow(1-p,3));
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
var f=d.getElementById('leadform');if(!f)return;
var stat=d.getElementById('fstat'),btn=f.querySelector('.sendb'),els=f.elements;
var ENDPOINT='https://kavo-leads.adhmstarrrr.workers.dev';
var T={sending:{en:'Sending...',ar:'بنبعت...'},ok:{en:'Got it, your brief reached us. We reply on WhatsApp shortly.',ar:'وصلنا، تفاصيلك عندنا. هنرد عليك على واتساب قريب.'},err:{en:'Could not send. Please try again, or message us directly below.',ar:'حصلت مشكلة في الإرسال. جرب تاني، أو كلمنا مباشرة من تحت.'},req:{en:'Please fill your name, brand and WhatsApp number.',ar:'من فضلك املأ الاسم والبراند ورقم الواتساب.'}};
function L(){return d.documentElement.lang==='ar'?'ar':'en'}
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
