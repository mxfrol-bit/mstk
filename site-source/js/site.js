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

// Fade and light reveal preserve each product image position and shape.
const imageMotionAllowed=matchMedia('(prefers-reduced-motion: no-preference)');
const imageAnimations=new Set();
const imageReveal=new IntersectionObserver(entries=>{
 for(const entry of entries){
  if(!entry.isIntersecting)continue;
  const img=entry.target;imageReveal.unobserve(img);
  if(!imageMotionAllowed.matches)return;
  const isDetail=!!img.closest('.product-photo');
  const animation=img.animate(isDetail?
   [{opacity:.3,clipPath:'inset(0 8% 0 8% round 14px)'},{opacity:1,clipPath:'inset(0 0 0 0 round 14px)'}]:
   [{opacity:.3},{opacity:1}],
   {duration:isDetail?1200:950,easing:'cubic-bezier(.16,1,.3,1)'});
  imageAnimations.add(animation);animation.finished.then(()=>imageAnimations.delete(animation),()=>imageAnimations.delete(animation));
  const surface=img.closest('.catalog-image,.product-photo');
  if(surface)surface.classList.add('image-glint','image-glint-enter');
 }
},{threshold:.18});
document.querySelectorAll('[data-image-motion]').forEach(img=>imageReveal.observe(img));
imageMotionAllowed.addEventListener('change',()=>{if(!imageMotionAllowed.matches)for(const animation of imageAnimations)animation.cancel();});
