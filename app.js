(function(){
var d=document,root=d.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* intro: remove from the page once it has faded */
var intro=d.getElementById('intro');
if(intro){setTimeout(function(){intro.remove()},reduce?0:1700)}
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
  setTimeout(function(){els.forEach(function(e){if(e.getBoundingClientRect().top<innerHeight)e.classList.add('in')})},1100);
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
