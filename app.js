(function(){
var d=document,root=d.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* intro: remove from the page once it has faded */
var intro=d.getElementById('intro');
if(intro){setTimeout(function(){intro.remove()},reduce?0:1500)}
/* language */
function setLang(l){
  root.lang=l;root.dir=l==='ar'?'rtl':'ltr';
  d.querySelectorAll('[data-en]').forEach(function(e){var v=e.getAttribute('data-'+l);if(v!=null)e.innerHTML=v});
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
var glow=d.querySelector('.glow'),tick=false;
function upd(){tick=false;var h=d.documentElement.scrollHeight-innerHeight,y=scrollY;
  bar.style.transform='scaleX('+(h>0?Math.min(y/h,1):0)+')';
  if(glow)glow.style.setProperty('--py',(y*.16)+'px')}
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
