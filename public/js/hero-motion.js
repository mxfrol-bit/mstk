import * as THREE from './vendor/three.module.min.js';
import {artworkMotion,irisMotion,coverScale,artworkVertexShader,artworkFragmentShader,irisFragmentShader} from './artwork-motion.js';

function initializeArtwork(host) {
  const hero=host.closest('.home-hero')||host;
  const isIris=host.dataset.artworkMotion==='iris';
  const source=host.querySelector('img');
  let button=hero.querySelector('.motion-toggle');
  if(!button){button=document.createElement('button');button.type='button';button.className='motion-toggle picture-motion-toggle';button.hidden=true;host.append(button);}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let renderer,texture,material,geometry,resizeObserver,intersection;
  let ready=false,disposed=false,contextLost=false,paused=false,visible=true;
  let frame=0,last=0,elapsed=0,bounds=null;
  const pointer={x:0,y:0,targetX:0,targetY:0};

  function stop(){cancelAnimationFrame(frame);frame=0;last=0;}
  function mayAnimate(){return ready&&!disposed&&!contextLost&&!paused&&!reduced.matches&&visible&&!document.hidden;}
  function syncButton(){
    button.hidden=!ready||contextLost||reduced.matches;
    button.textContent=paused?'▶ Продолжить':'Ⅱ Пауза';
    button.setAttribute('aria-label',paused?'Продолжить анимацию изображения':'Приостановить анимацию изображения');
    button.setAttribute('aria-pressed',String(!paused));
  }
  function showOriginal(){host.classList.remove('is-ready');source.removeAttribute('aria-hidden');}
  function showAnimation(){host.classList.add('is-ready');source.setAttribute('aria-hidden','true');}

  try {
    renderer=new THREE.WebGLRenderer({antialias:false,alpha:false,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    const canvas=renderer.domElement;
    canvas.setAttribute('role','img');
    canvas.setAttribute('aria-label',source.alt);
    host.append(canvas);
    const scene=new THREE.Scene();
    const camera=new THREE.OrthographicCamera(-1,1,1,-1,.1,10);
    camera.position.z=1;
    const uniforms={uArtwork:{value:null},uCover:{value:new THREE.Vector2(1,1)},uMotion:{value:new THREE.Vector2()},uTilt:{value:0},uZoom:{value:1.04},uLight:{value:0},uBreath:{value:0}};
    material=new THREE.ShaderMaterial({uniforms,vertexShader:artworkVertexShader,fragmentShader:isIris?irisFragmentShader:artworkFragmentShader,depthTest:false,depthWrite:false,toneMapped:false});
    geometry=new THREE.PlaneGeometry(2,2);
    scene.add(new THREE.Mesh(geometry,material));

    function render(){
      if(!ready||contextLost||disposed)return;
      const m=(isIris?irisMotion:artworkMotion)(elapsed,pointer.x,pointer.y);
      uniforms.uMotion.value.set(m.x,m.y);
      uniforms.uTilt.value=m.tilt||0;uniforms.uZoom.value=m.zoom;uniforms.uLight.value=m.light;uniforms.uBreath.value=m.breath||0;
      renderer.render(scene,camera);
    }
    function resize(){
      const w=host.clientWidth,h=host.clientHeight;
      bounds=hero.getBoundingClientRect();
      if(!w||!h)return;
      renderer.setSize(w,h,false);
      const [x,y]=coverScale(w,h,source.naturalWidth||1536,source.naturalHeight||1024);
      uniforms.uCover.value.set(x,y);render();
    }
    function animate(now){
      frame=0;if(!mayAnimate())return;
      const dt=last?Math.min((now-last)/1000,.05):0;last=now;elapsed+=dt;
      const smoothing=1-Math.exp(-dt*4.5);
      pointer.x+=(pointer.targetX-pointer.x)*smoothing;
      pointer.y+=(pointer.targetY-pointer.y)*smoothing;
      render();frame=requestAnimationFrame(animate);
    }
    function start(){if(!frame&&mayAnimate()){last=0;frame=requestAnimationFrame(animate);}}
    function applyMotionPreference(){
      stop();syncButton();
      if(reduced.matches){showOriginal();return;}
      if(ready){render();showAnimation();start();}
    }

    button.addEventListener('click',()=>{paused=!paused;syncButton();paused?stop():start();});
    hero.addEventListener('pointerenter',()=>{bounds=hero.getBoundingClientRect();});
    hero.addEventListener('pointermove',event=>{
      if(!mayAnimate()||event.pointerType==='touch'||!bounds)return;
      pointer.targetX=Math.max(-1,Math.min(1,(event.clientX-bounds.left)/bounds.width*2-1));
      pointer.targetY=Math.max(-1,Math.min(1,(event.clientY-bounds.top)/bounds.height*2-1));
    },{passive:true});
    hero.addEventListener('pointerleave',()=>{pointer.targetX=pointer.targetY=0;});
    resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
    intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visible?start():stop();},{threshold:.05});intersection.observe(hero);
    document.addEventListener('visibilitychange',()=>{document.hidden?stop():start();});
    reduced.addEventListener('change',applyMotionPreference);
    canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();contextLost=true;stop();showOriginal();syncButton();});
    canvas.addEventListener('webglcontextrestored',()=>{contextLost=false;applyMotionPreference();});
    texture=new THREE.TextureLoader().load(source.getAttribute('src'),loaded=>{
      if(disposed){loaded.dispose();return;}
      loaded.colorSpace=THREE.SRGBColorSpace;
      loaded.minFilter=THREE.LinearFilter;loaded.magFilter=THREE.LinearFilter;loaded.generateMipmaps=false;
      uniforms.uArtwork.value=loaded;ready=true;resize();applyMotionPreference();
    },undefined,()=>{ready=false;stop();showOriginal();syncButton();});
    addEventListener('pagehide',event=>{
      stop();if(event.persisted)return;
      disposed=true;resizeObserver.disconnect();intersection.disconnect();texture?.dispose();geometry.dispose();material.dispose();renderer.dispose();
    });
    addEventListener('pageshow',event=>{if(event.persisted){resize();applyMotionPreference();}});
  } catch(error) {
    disposed=true;stop();showOriginal();button.hidden=true;
    resizeObserver?.disconnect();intersection?.disconnect();texture?.dispose();geometry?.dispose();material?.dispose();renderer?.dispose();
    console.warn('Artwork motion unavailable; original image retained.',error);
  }
}

// Initialize only pictures near the viewport; no WebGL work for unseen sections.
const pending=new IntersectionObserver(entries=>{
 for(const entry of entries)if(entry.isIntersecting){pending.unobserve(entry.target);initializeArtwork(entry.target);}
},{rootMargin:'120px'});
document.querySelectorAll('[data-artwork-motion]').forEach(host=>pending.observe(host));
