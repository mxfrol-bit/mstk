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
