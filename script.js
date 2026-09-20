const body=document.body;
const transition=document.createElement('div');transition.className='page-transition';body.prepend(transition);
const progress=document.createElement('div');progress.id='scrollProgress';body.appendChild(progress);
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateProgress(){const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?scrollY/h*100:0)+'%'}
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
let cursor=document.querySelector('.cursor');let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
if(cursor&&!reduced){addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY},{passive:true});(function loop(){cx+=(mx-cx)*.16;cy+=(my-cy)*.16;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(loop)})();}
function bindHover(){document.querySelectorAll('a,.btn,button,.service,.project,.client-logo,.founder-badge').forEach(el=>{el.addEventListener('mouseenter',()=>cursor?.classList.add('hover'));el.addEventListener('mouseleave',()=>cursor?.classList.remove('hover'))})}bindHover();
document.querySelectorAll('.btn').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();btn.style.setProperty('--mx',(e.clientX-r.left)+'px');btn.style.setProperty('--my',(e.clientY-r.top)+'px')});btn.addEventListener('mouseleave',()=>{btn.style.removeProperty('--mx');btn.style.removeProperty('--my')})});
if(!reduced)addEventListener('click',e=>{const r=document.createElement('i');r.className='ripple';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';body.appendChild(r);setTimeout(()=>r.remove(),850)});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}}),{threshold:.1});document.querySelectorAll('.fade,.reveal-left,.reveal-right').forEach(el=>observer.observe(el));
if(innerWidth>900&&!reduced){document.querySelectorAll('.service,.country,.review,.project,.stat,.founder-badge').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const rx=((e.clientY-r.top)/r.height-.5)*-5;const ry=((e.clientX-r.left)/r.width-.5)*5;card.style.transform=`translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`});card.addEventListener('mouseleave',()=>card.style.transform='')})}
const menu=document.querySelector('.menu'),nav=document.querySelector('.navlinks');if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
document.querySelectorAll('.contact-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();alert('Thanks! Your request has been received. Connect this form to your email/WhatsApp backend when ready.')}));
addEventListener('pageshow',()=>{transition.style.animation='pageOut .9s cubic-bezier(.77,0,.18,1) forwards'});document.querySelectorAll('a[href]').forEach(link=>{const href=link.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto:')||href.startsWith('tel:')||link.target==='_blank')return;link.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();transition.style.animation='pageIn .55s cubic-bezier(.77,0,.18,1) forwards';setTimeout(()=>location.href=href,350)})});
const extra=document.createElement('style');extra.textContent='@keyframes pageIn{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1);transform-origin:bottom}}@keyframes pageOut{from{transform:scaleY(1);transform-origin:top}to{transform:scaleY(0);transform-origin:top}}';document.head.appendChild(extra);
if(innerWidth>900&&!reduced){const hero=document.querySelector('.hero');if(hero){hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect();const x=e.clientX/r.width-.5,y=e.clientY/r.height-.5;document.querySelectorAll('.hero-art,.motion-orb').forEach((el,i)=>{const d=i?12:6;el.style.transform=`translate3d(${x*d}px,${y*d}px,0)`})});hero.addEventListener('mouseleave',()=>document.querySelectorAll('.hero-art,.motion-orb').forEach(el=>el.style.transform=''))}}


/* V14 responsive hardening */
(function(){
  const setViewport = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  setViewport();
  window.addEventListener('resize', setViewport, {passive:true});

  // Close mobile navigation after selecting a page.
  document.querySelectorAll('.navlinks a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.navlinks')?.classList.remove('open');
      document.querySelector('.menu')?.classList.remove('active');
    });
  });

  // Keep animation smooth after orientation changes.
  window.addEventListener('orientationchange', () => {
    setTimeout(() => window.dispatchEvent(new Event('resize')), 180);
  }, {passive:true});
})();
