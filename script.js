// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
});

// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
});
setInterval(() => {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx - 15 + 'px';
  trail.style.top = ty - 15 + 'px';
}, 16);

// ===== CLICK RIPPLE =====
document.addEventListener('click', e => {
  const r = document.createElement('div');
  r.className = 'click-ripple';
  r.style.cssText = `left:${e.clientX}px; top:${e.clientY}px;`;
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 900);
});

// ===== SPARKLE CURSOR TRAIL =====
const sparkleColors = ['#c9a84c','#d4547a','#f0d080','#f0a0b8','#fff'];
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.55) return;
  const sp = document.createElement('div');
  sp.className = 'sparkle';
  const size = 4 + Math.random() * 7;
  sp.style.cssText = `left:${e.clientX - size/2}px;top:${e.clientY - size/2}px;width:${size}px;height:${size}px;background:${sparkleColors[Math.floor(Math.random()*sparkleColors.length)]};box-shadow:0 0 ${size*2}px currentColor;`;
  document.body.appendChild(sp);
  setTimeout(() => sp.remove(), 700);
});

// ===== PARTICLES =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initConst(); });

const particles = [];
const colors = ['rgba(201,168,76,','rgba(212,84,122,','rgba(240,208,128,','rgba(255,255,255,'];
for (let i = 0; i < 80; i++) {
  particles.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*1.5+0.3, dx:(Math.random()-0.5)*0.3, dy:(Math.random()-0.5)*0.3, color:colors[Math.floor(Math.random()*colors.length)], alpha:Math.random()*0.5+0.1, pulse:Math.random()*Math.PI*2 });
}
function animParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x+=p.dx; p.y+=p.dy; p.pulse+=0.02;
    if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
    if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
    const a = p.alpha*(0.6+0.4*Math.sin(p.pulse));
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color+a+')'; ctx.fill();
  });
  requestAnimationFrame(animParticles);
}
animParticles();

// ===== CONSTELLATION CANVAS =====
const cCanvas = document.getElementById('constellation-canvas');
const cCtx = cCanvas.getContext('2d');
cCanvas.width = window.innerWidth; cCanvas.height = window.innerHeight;
const cStars = [];
for(let i=0;i<120;i++) cStars.push({ x:Math.random()*cCanvas.width, y:Math.random()*cCanvas.height, r:Math.random()*1.2+0.3, alpha:Math.random(), pulse:Math.random()*Math.PI*2, pSpeed:0.005+Math.random()*0.01 });
function initConst() { cCanvas.width=window.innerWidth; cCanvas.height=window.innerHeight; }
function animConst() {
  cCtx.clearRect(0,0,cCanvas.width,cCanvas.height);
  // draw lines between nearby stars
  for(let i=0;i<cStars.length;i++) {
    for(let j=i+1;j<cStars.length;j++) {
      const dx=cStars[i].x-cStars[j].x, dy=cStars[i].y-cStars[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120) {
        cCtx.beginPath();
        cCtx.moveTo(cStars[i].x,cStars[i].y);
        cCtx.lineTo(cStars[j].x,cStars[j].y);
        cCtx.strokeStyle=`rgba(201,168,76,${(1-dist/120)*0.08})`;
        cCtx.stroke();
      }
    }
    const s=cStars[i]; s.pulse+=s.pSpeed;
    const a=s.alpha*(0.4+0.6*Math.sin(s.pulse));
    cCtx.beginPath(); cCtx.arc(s.x,s.y,s.r,0,Math.PI*2);
    cCtx.fillStyle=`rgba(240,220,140,${a})`; cCtx.fill();
  }
  requestAnimationFrame(animConst);
}
animConst();

// ===== HERO STARS CANVAS =====
const hCanvas = document.getElementById('hero-stars');
const hCtx = hCanvas.getContext('2d');
function resizeHero() { hCanvas.width=hCanvas.offsetWidth; hCanvas.height=hCanvas.offsetHeight; }
resizeHero(); window.addEventListener('resize',resizeHero);
const hStars=[];
for(let i=0;i<60;i++) hStars.push({ x:Math.random(), y:Math.random(), r:Math.random()*1.5+0.5, pulse:Math.random()*Math.PI*2, speed:0.008+Math.random()*0.015 });
function animHeroStars() {
  hCtx.clearRect(0,0,hCanvas.width,hCanvas.height);
  hStars.forEach(s=>{
    s.pulse+=s.speed;
    const a=0.3+0.7*Math.sin(s.pulse);
    const grd=hCtx.createRadialGradient(s.x*hCanvas.width,s.y*hCanvas.height,0,s.x*hCanvas.width,s.y*hCanvas.height,s.r*3);
    grd.addColorStop(0,`rgba(240,208,128,${a})`);
    grd.addColorStop(1,'transparent');
    hCtx.beginPath(); hCtx.arc(s.x*hCanvas.width,s.y*hCanvas.height,s.r*3,0,Math.PI*2);
    hCtx.fillStyle=grd; hCtx.fill();
  });
  requestAnimationFrame(animHeroStars);
}
animHeroStars();

// ===== FIREFLIES =====
for(let i=0;i<18;i++){
  const f=document.createElement('div'); f.className='firefly';
  const size=2+Math.random()*3;
  f.style.cssText=`width:${size}px;height:${size}px;left:${Math.random()*100}vw;top:${Math.random()*100}vh;--fx:${(Math.random()-0.5)*100}px;--fy:${(Math.random()-0.5)*80}px;animation-duration:${3+Math.random()*5}s;animation-delay:-${Math.random()*5}s;`;
  document.body.appendChild(f);
}

// ===== HERO TYPEWRITER =====
const heroTypeEl = document.getElementById('heroSubType');
const typePhrases = ['She arrived and the world grew warmer...','Every moment with her is a gift...','The universe made her just right...','She carries starlight wherever she goes...'];
let tpIdx=0, tChar=0, tTyping=true;
function doType() {
  if(!heroTypeEl) return;
  const phrase=typePhrases[tpIdx];
  const cursor='<span class="type-cursor"></span>';
  if(tTyping) {
    tChar++;
    heroTypeEl.innerHTML=phrase.slice(0,tChar)+cursor;
    if(tChar>=phrase.length){ tTyping=false; setTimeout(doType,2200); return; }
    setTimeout(doType,55+Math.random()*35);
  } else {
    tChar--;
    heroTypeEl.innerHTML=phrase.slice(0,tChar)+cursor;
    if(tChar<=0){ tTyping=true; tpIdx=(tpIdx+1)%typePhrases.length; setTimeout(doType,400); return; }
    setTimeout(doType,28);
  }
}
setTimeout(doType,2800);

// ===== PETALS =====
const petalColors=['#d4547a','#c9a84c','#f0a0b8','#f0d080','#ff8fab'];
const petalContainer=document.getElementById('petals-container');
function createPetal() {
  const petal=document.createElement('div'); petal.className='petal';
  const size=10+Math.random()*18, x=Math.random()*100, delay=Math.random()*8, dur=8+Math.random()*10;
  const color=petalColors[Math.floor(Math.random()*petalColors.length)];
  petal.style.cssText=`left:${x}vw;top:-40px;animation-delay:${delay}s;animation-duration:${dur}s;`;
  petal.innerHTML=`<svg width="${size}" height="${size}" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="6" ry="10" fill="${color}" opacity="0.6" transform="rotate(${Math.random()*360} 10 10)"/></svg>`;
  petalContainer.appendChild(petal);
  setTimeout(()=>petal.remove(),(dur+delay)*1000+1000);
}
setInterval(createPetal,600);
for(let i=0;i<12;i++) createPetal();

// ===== SHOOTING STARS =====
function spawnShootingStar() {
  const star=document.createElement('div'); star.className='shooting-star';
  const startX=Math.random()*window.innerWidth, startY=Math.random()*window.innerHeight*0.5;
  const angle=30+Math.random()*20, dist=300+Math.random()*400;
  const rad=angle*Math.PI/180;
  star.style.cssText=`left:${startX}px;top:${startY}px;--angle:${angle}deg;--dx:${Math.cos(rad)*dist}px;--dy:${Math.sin(rad)*dist}px;animation-duration:${0.6+Math.random()*0.8}s;`;
  document.body.appendChild(star);
  setTimeout(()=>star.remove(),1500);
}
setInterval(spawnShootingStar,3000);

// ===== FLOATING BALLOONS =====
const balloonEmojis=['🎈','🎀','🎊','🎁','🎂','✨','🌸','💛'];
function spawnBalloon() {
  const b=document.createElement('div'); b.className='balloon';
  const sway=(Math.random()-0.5)*120, tilt=(Math.random()-0.5)*20;
  b.style.cssText=`left:${Math.random()*95}vw;font-size:${1.8+Math.random()*1.4}rem;--sway:${sway}px;--tilt:${tilt}deg;animation-duration:${8+Math.random()*8}s;animation-delay:${Math.random()*3}s;`;
  b.textContent=balloonEmojis[Math.floor(Math.random()*balloonEmojis.length)];
  document.body.appendChild(b);
  setTimeout(()=>b.remove(),22000);
}
setInterval(spawnBalloon,4500);
for(let i=0;i<4;i++) setTimeout(()=>spawnBalloon(),i*1200);

// ===== TYPEWRITER LETTER =====
const letterEl=document.getElementById('letterBody');
const letterSign=document.getElementById('letterSign');
const letterText=`Today, the stars aligned and gifted the world something extraordinary — you.\n\nYou bring warmth to every room, light to every life, and joy to every heart that knows you. Your laughter is the kind that lingers long after you've left, and your kindness? It's the rarest thing in this world.\n\nMay this birthday be the beginning of your most beautiful chapter yet — one filled with adventures that set your soul on fire, moments that steal your breath, and people who love you exactly as you are.\n\nYou deserve every good thing the universe has to offer. And a little more.`;
let lDone=false;
const letterObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting && !lDone){ lDone=true; typeLetterCh(0); }
},{ threshold:0.3 });
const letterSection=document.getElementById('letter-section');
if(letterSection) letterObserver.observe(letterSection);
function typeLetterCh(i){
  if(!letterEl) return;
  const char=letterText[i];
  const cur='<span class="letter-cursor"></span>';
  const txt=letterText.slice(0,i+1).replace(/\n/g,'<br>');
  letterEl.innerHTML=txt+cur;
  if(i<letterText.length-1){ setTimeout(()=>typeLetterCh(i+1),18+Math.random()*20); }
  else { if(letterSign) letterSign.classList.add('show'); }
}


// ===== LIGHTBOX =====
const lightbox=document.getElementById('lightbox');
const lbImg=document.getElementById('lb-img');
const lbClose=document.getElementById('lightbox-close');
const lbPrev=document.getElementById('lb-prev');
const lbNext=document.getElementById('lb-next');
const lbCounter=document.getElementById('lb-counter');
const galleryImgs=[...document.querySelectorAll('.gallery-item img')];
let lbIdx=0;
function openLB(idx){
  lbIdx=idx; lbImg.src=galleryImgs[idx].src;
  if(lbCounter) lbCounter.textContent=`${idx+1} / ${galleryImgs.length}`;
  lightbox.classList.add('open');
}
galleryImgs.forEach((img,i)=> img.parentElement.addEventListener('click',()=>openLB(i)));
if(lbClose) lbClose.addEventListener('click',()=>lightbox.classList.remove('open'));
lightbox.addEventListener('click',e=>{ if(e.target===lightbox) lightbox.classList.remove('open'); });
if(lbPrev) lbPrev.addEventListener('click',e=>{ e.stopPropagation(); lbIdx=(lbIdx-1+galleryImgs.length)%galleryImgs.length; openLB(lbIdx); });
if(lbNext) lbNext.addEventListener('click',e=>{ e.stopPropagation(); lbIdx=(lbIdx+1)%galleryImgs.length; openLB(lbIdx); });
document.addEventListener('keydown',e=>{ if(!lightbox.classList.contains('open')) return; if(e.key==='Escape') lightbox.classList.remove('open'); if(e.key==='ArrowLeft') { lbIdx=(lbIdx-1+galleryImgs.length)%galleryImgs.length; openLB(lbIdx); } if(e.key==='ArrowRight') { lbIdx=(lbIdx+1)%galleryImgs.length; openLB(lbIdx); } });

// ===== SCROLL REVEAL =====
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const delay=parseInt(entry.target.dataset.delay)||0;
      setTimeout(()=>entry.target.classList.add('visible'),delay);
    }
  });
},{ threshold:0.08 });
document.querySelectorAll('.gallery-item,.big-quote,.quote-name,.wish-card,#finaleTitle,#finaleText,#finaleName').forEach((el,i)=>{
  if(el.classList.contains('gallery-item')) el.dataset.delay=(i%10)*55;
  observer.observe(el);
});

// ===== 3D TILT EFFECT ON GALLERY ITEMS =====
document.querySelectorAll('.gallery-item').forEach(item=>{
  item.addEventListener('mousemove',e=>{
    const rect=item.getBoundingClientRect();
    const dx=(e.clientX-rect.left-rect.width/2)/(rect.width/2);
    const dy=(e.clientY-rect.top-rect.height/2)/(rect.height/2);
    item.style.transform=`translateY(-6px) scale(1.04) rotateY(${dx*8}deg) rotateX(${-dy*8}deg)`;
  });
  item.addEventListener('mouseleave',()=>{ item.style.transform=''; });
});

// ===== WISH CARD SPARKLE BURST =====
document.querySelectorAll('.wish-card').forEach(card=>{
  card.addEventListener('mouseenter',()=>{
    for(let i=0;i<6;i++){
      const sp=document.createElement('div'); sp.className='card-sparkle';
      const angle=Math.random()*360, dist=40+Math.random()*40;
      sp.style.cssText=`top:20%;left:50%;--sx:${Math.cos(angle)*dist}px;--sy:${Math.sin(angle)*dist}px;`;
      sp.textContent=['✦','✧','⋆','★'][Math.floor(Math.random()*4)];
      sp.style.color=sparkleColors[Math.floor(Math.random()*sparkleColors.length)];
      card.appendChild(sp);
      setTimeout(()=>sp.remove(),800);
    }
  });
});

// ===== CONFETTI ON SCROLL TO FINALE =====
let confettiFired=false;
const finaleObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!confettiFired){ confettiFired=true; launchConfetti(); }
},{ threshold:0.3 });
finaleObserver.observe(document.getElementById('finale'));
function launchConfetti(){
  const cc=['#c9a84c','#d4547a','#f0d080','#f0a0b8','#fff','#ff8fab','#ffd700'];
  for(let i=0;i<160;i++){
    setTimeout(()=>{
      const c=document.createElement('div'); c.className='confetti-piece';
      c.style.cssText=`left:${Math.random()*100}vw;top:-10px;background:${cc[Math.floor(Math.random()*cc.length)]};width:${5+Math.random()*8}px;height:${5+Math.random()*8}px;animation-duration:${3+Math.random()*4}s;border-radius:${Math.random()>0.5?'50%':'2px'};`;
      document.body.appendChild(c);
      setTimeout(()=>c.remove(),8000);
    },i*30);
  }
}

// ===== PARALLAX HERO =====
window.addEventListener('scroll',()=>{
  const s=window.scrollY;
  const heroImg=document.querySelector('.hero-portrait img');
  if(heroImg&&s<window.innerHeight) heroImg.style.transform=`translateY(${s*0.3}px)`;
});
