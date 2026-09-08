const menuToggle=document.querySelector('.menu-toggle'),mobileMenu=document.querySelector('#mobile-nav');
function closeMenu(){mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Открыть меню');}
menuToggle?.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')==='true';mobileMenu.hidden=open;menuToggle.setAttribute('aria-expanded',String(!open));menuToggle.setAttribute('aria-label',open?'Открыть меню':'Закрыть меню');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileMenu.hidden){closeMenu();menuToggle.focus();}});
window.matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const contactForm=document.querySelector('#contact-form');
if(contactForm){
 const category=new URLSearchParams(location.search).get('product');
 if(category&&Array.from(contactForm.elements.product.options).some(o=>o.value===category))contactForm.elements.product.value=category;
 contactForm.addEventListener('submit',event=>{event.preventDefault();if(!contactForm.reportValidity())return;
 const d=new FormData(contactForm),choice=contactForm.elements.product.selectedOptions[0].textContent;
 const body=`Здравствуйте!\n\nИнтересует: ${choice}\n\nИмя: ${d.get('name')}\nДолжность: ${d.get('position')}\nКлиника: ${d.get('company')}\nТелефон: ${d.get('phone')}\nEmail: ${d.get('email')}\n\n${d.get('message')}`;
 const subject=`Запрос в МСТК — ${d.get('company')}`;
 location.href=`mailto:mstknn@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 contactForm.querySelector('.form-status').textContent='Письмо подготовлено. Отправьте его в почтовом приложении. Если оно не открылось, напишите на mstknn@gmail.com или позвоните нам.';
 });
}

// A restrained depth response keeps the compact catalog readable.
const tiltEnabled=matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
document.querySelectorAll('.catalog-card').forEach(card=>{
 let bounds=null,frame=0,x=0,y=0;
 const reset=()=>{cancelAnimationFrame(frame);frame=0;bounds=null;card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');};
 card.addEventListener('pointerenter',()=>{if(tiltEnabled.matches)bounds=card.getBoundingClientRect();});
 card.addEventListener('pointermove',event=>{
  if(!tiltEnabled.matches||!bounds)return;
  x=Math.max(-1,Math.min(1,(event.clientX-bounds.left)/bounds.width*2-1));
  y=Math.max(-1,Math.min(1,(event.clientY-bounds.top)/bounds.height*2-1));
  if(!frame)frame=requestAnimationFrame(()=>{card.style.setProperty('--tilt-x',`${-y*2}deg`);card.style.setProperty('--tilt-y',`${x*2.5}deg`);frame=0;});
 },{passive:true});
 card.addEventListener('pointerleave',reset);
 card.addEventListener('pointercancel',reset);
 tiltEnabled.addEventListener('change',reset);
});

// Each product image appears with a short reveal, then follows deliberate input.
const imageMotionAllowed=matchMedia('(prefers-reduced-motion: no-preference)');
const fineImagePointer=matchMedia('(hover: hover) and (pointer: fine)');
const imageAnimations=new Set();
const imageReveal=new IntersectionObserver(entries=>{
 for(const entry of entries){
  if(!entry.isIntersecting)continue;
  const img=entry.target;imageReveal.unobserve(img);
  if(!imageMotionAllowed.matches)return;
  const isDetail=!!img.closest('.product-photo');
  const animation=img.animate(isDetail?
   [{opacity:.3,clipPath:'inset(0 8% 0 8% round 14px)'},{opacity:1,clipPath:'inset(0 0 0 0 round 14px)'}]:
   [{opacity:.3,scale:'.91',translate:'0 12px'},{opacity:1,scale:'1',translate:'0 0'}],
   {duration:isDetail?1200:950,easing:'cubic-bezier(.16,1,.3,1)'});
  imageAnimations.add(animation);animation.finished.then(()=>imageAnimations.delete(animation),()=>imageAnimations.delete(animation));
  const surface=img.closest('.catalog-image,.product-photo');
  if(surface)surface.classList.add('image-glint','image-glint-enter');
 }
},{threshold:.18});
document.querySelectorAll('[data-image-motion]').forEach(img=>{
 imageReveal.observe(img);
 const surface=img.closest('.catalog-card,.solution-card,.product-photo,.equipment-feature,.service-device,.material-figure')||img;
 let box=null,raf=0,x=0,y=0;
 const reset=()=>{cancelAnimationFrame(raf);raf=0;box=null;img.style.removeProperty('--image-rx');img.style.removeProperty('--image-ry');img.classList.remove('image-engaged');};
 surface.addEventListener('pointerenter',()=>{
  if(!imageMotionAllowed.matches||!fineImagePointer.matches)return;
  box=surface.getBoundingClientRect();img.classList.add('image-engaged');
 });
 surface.addEventListener('pointermove',e=>{
  if(!box||!imageMotionAllowed.matches)return;
  x=Math.max(-1,Math.min(1,(e.clientX-box.left)/box.width*2-1));
  y=Math.max(-1,Math.min(1,(e.clientY-box.top)/box.height*2-1));
  if(!raf)raf=requestAnimationFrame(()=>{img.style.setProperty('--image-rx',`${-y*4}deg`);img.style.setProperty('--image-ry',`${x*5}deg`);raf=0;});
 },{passive:true});
 surface.addEventListener('pointerleave',reset);surface.addEventListener('pointercancel',reset);
 imageMotionAllowed.addEventListener('change',reset);fineImagePointer.addEventListener('change',reset);
});
imageMotionAllowed.addEventListener('change',()=>{if(!imageMotionAllowed.matches)for(const animation of imageAnimations)animation.cancel();});
