import {artworkMotionSpec,artworkKeyframes} from './artwork-motion.js?v=7';

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const scenes=[];
for(const host of document.querySelectorAll('[data-artwork-motion]')) {
  const image=host.querySelector('img');
  const kind=host.dataset.artworkMotion;
  const hero=host.closest('.home-hero')||host;
  let button=hero.querySelector('.motion-toggle');
  if(!button){button=document.createElement('button');button.type='button';button.className='motion-toggle picture-motion-toggle';host.append(button);}
  const light=document.createElement('span');light.className='artwork-light';light.setAttribute('aria-hidden','true');host.append(light);
  const scene={host,image,button,light,visible:false,paused:false,userEnabled:false,motion:null,shine:null,initialized:false};
  scenes.push(scene);
  function initialize(){
    if(scene.initialized||!image.complete||!image.naturalWidth)return;
    scene.initialized=true;host.classList.add('has-native-motion');
    scene.motion=image.animate(artworkKeyframes(kind),{duration:artworkMotionSpec(kind).duration,iterations:Infinity,easing:'cubic-bezier(.45,0,.55,1)',fill:'both'});
    scene.shine=light.animate([
      {transform:'translate3d(-28%,10%,0) rotate(-12deg)',opacity:.06},
      {transform:'translate3d(24%,-8%,0) rotate(12deg)',opacity:.24},
      {transform:'translate3d(-28%,10%,0) rotate(-12deg)',opacity:.06}
    ],{duration:kind==='iris'?8500:6500,iterations:Infinity,easing:'cubic-bezier(.45,0,.55,1)',fill:'both'});
    scene.motion.pause();scene.shine.pause();sync();
  }
  function sync(){
    button.hidden=!scene.initialized;
    const allowed=!reduced.matches||scene.userEnabled;
    host.classList.toggle('motion-user-enabled',scene.userEnabled);
    button.textContent=!allowed?'▶ Анимация':scene.paused?'▶ Продолжить':'Ⅱ Пауза';
    button.setAttribute('aria-label',!allowed?'Включить анимацию изображения':scene.paused?'Продолжить анимацию изображения':'Приостановить анимацию изображения');
    button.setAttribute('aria-pressed',String(allowed&&!scene.paused));
    if(!scene.initialized)return;
    const running=scene.visible&&!scene.paused&&!document.hidden&&allowed;
    host.classList.toggle('is-playing',running);
    for(const animation of [scene.motion,scene.shine]){
      if(!allowed){animation.pause();animation.currentTime=0;}
      else running?animation.play():animation.pause();
    }
  }
  scene.sync=sync;
  button.addEventListener('click',()=>{if(reduced.matches&&!scene.userEnabled){scene.userEnabled=true;scene.paused=false;}else scene.paused=!scene.paused;sync();});
  image.addEventListener('load',initialize,{once:true});
  if(image.complete)initialize();
  const observer=new IntersectionObserver(entries=>{scene.visible=entries[0].isIntersecting;initialize();sync();},{threshold:.05});observer.observe(host);
  scene.observer=observer;
}
function syncAll(){for(const scene of scenes)scene.sync();}
document.addEventListener('visibilitychange',syncAll);
reduced.addEventListener('change',()=>{for(const scene of scenes)scene.userEnabled=false;syncAll();});
addEventListener('pagehide',event=>{
  for(const scene of scenes){scene.motion?.pause();scene.shine?.pause();if(!event.persisted){scene.observer.disconnect();scene.motion?.cancel();scene.shine?.cancel();}}
});
addEventListener('pageshow',event=>{if(event.persisted)syncAll();});
