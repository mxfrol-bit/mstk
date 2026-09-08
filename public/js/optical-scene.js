import * as THREE from './vendor/three.module.min.js';
import {createOpticalModel,opticalPose,opticalCameraDistance} from './optical-model.js';

const host=document.querySelector('[data-optical-scene]');
if(host) {
  let renderer;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const button=document.querySelector('.motion-toggle');
  const hero=host.closest('.home-hero');
  let raf=0,visible=true,paused=reduced.matches,elapsed=0,last=0,rotation=0,dragStart=null,contextLost=false;
  const pointer={x:0,y:0,targetX:0,targetY:0};
  try {
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.15;
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    const canvas=renderer.domElement;
    canvas.setAttribute('role','img');
    canvas.setAttribute('aria-label','Объёмная оптическая линза. Для поворота используйте мышь или клавиши со стрелками.');
    canvas.tabIndex=0;
    host.append(canvas);
    const scene=new THREE.Scene();scene.background=new THREE.Color(0xe5ebf7);
    const camera=new THREE.PerspectiveCamera(34,1,0.1,40);camera.position.set(0,0,7.8);
    const model=createOpticalModel();scene.add(model);
    scene.add(new THREE.HemisphereLight(0xffffff,0x8498bc,2.7));
    const key=new THREE.DirectionalLight(0xffffff,4);key.position.set(-3,5,4);scene.add(key);
    const fill=new THREE.DirectionalLight(0x9eb9ff,2);fill.position.set(4,-1,-3);scene.add(fill);
    // Softbox environment provides real changing reflections in the glass.
    const studio=new THREE.Scene();studio.background=new THREE.Color(0xdfe5f0);
    const wall=new THREE.Mesh(new THREE.BoxGeometry(12,12,12),new THREE.MeshBasicMaterial({color:0xbecbdd,side:THREE.BackSide}));studio.add(wall);
    for(const [x,y,z,w,h,color] of [[-3,2,3,2,5,0xffffff],[4,1,-2,2,6,0x91afff],[0,5,0,4,3,0xffffff],[-1,-3,3,3,1,0xffffff]]) {
      const panel=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color,side:THREE.DoubleSide}));
      panel.position.set(x,y,z);panel.lookAt(0,0,0);studio.add(panel);
    }
    const pmrem=new THREE.PMREMGenerator(renderer);
    const environment=pmrem.fromScene(studio,0.04);scene.environment=environment.texture;pmrem.dispose();
    studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});
    const observer=new ResizeObserver(()=>{resize();render();});observer.observe(host);
    function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.z=opticalCameraDistance(w,h);camera.updateProjectionMatrix();}
    function render(){const p=opticalPose(elapsed,pointer.x,pointer.y,rotation);model.rotation.set(p.x,p.y,p.z);model.position.y=p.floatY;renderer.render(scene,camera);}
    function stop(){if(raf)cancelAnimationFrame(raf);raf=0;last=0;}
    function animate(now){raf=0;if(paused||!visible||document.hidden||reduced.matches||contextLost)return;const dt=last?Math.min((now-last)/1000,0.05):0;last=now;elapsed+=dt;pointer.x+=(pointer.targetX-pointer.x)*0.08;pointer.y+=(pointer.targetY-pointer.y)*0.08;render();raf=requestAnimationFrame(animate);}
    function start(){if(!raf&&!paused&&visible&&!document.hidden&&!reduced.matches&&!contextLost){last=0;raf=requestAnimationFrame(animate);}}
    function syncButton(){button.hidden=false;button.textContent=reduced.matches?'↻ Повернуть':paused?'▶ Вращать':'Ⅱ Пауза';button.setAttribute('aria-label',reduced.matches?'Повернуть 3D-линзу на 30 градусов':paused?'Включить вращение 3D-линзы':'Приостановить вращение 3D-линзы');button.setAttribute('aria-pressed',String(!paused));}
    button.addEventListener('click',()=>{paused=!paused;if(reduced.matches){reducedOverride();return;}syncButton();paused?stop():start();});
    // With reduced motion enabled only user-controlled, one-step rotation is used.
    function reducedOverride(){paused=true;rotation+=Math.PI/6;render();syncButton();}
    hero.addEventListener('pointermove',event=>{if(reduced.matches)return;const b=hero.getBoundingClientRect();pointer.targetX=(event.clientX-b.left)/b.width*2-1;pointer.targetY=(event.clientY-b.top)/b.height*2-1;if(dragStart!==null){rotation+=(event.clientX-dragStart)*0.008;dragStart=event.clientX;}if(paused){pointer.x=pointer.targetX;pointer.y=pointer.targetY;render();}},{passive:true});
    hero.addEventListener('pointerleave',()=>{pointer.targetX=0;pointer.targetY=0;});
    canvas.addEventListener('pointerdown',e=>{if(!reduced.matches&&(e.pointerType==='mouse'||e.pointerType==='touch')){dragStart=e.clientX;canvas.setPointerCapture(e.pointerId);canvas.classList.add('is-dragging');}});
    for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,()=>{dragStart=null;canvas.classList.remove('is-dragging');});
    canvas.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();rotation+=(e.key==='ArrowLeft'?-1:1)*0.2;render();}});
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visible?start():stop();},{threshold:0.05});intersection.observe(hero);
    document.addEventListener('visibilitychange',()=>{document.hidden?stop():start();});
    reduced.addEventListener('change',()=>{paused=reduced.matches;stop();pointer.x=pointer.y=pointer.targetX=pointer.targetY=0;syncButton();render();start();});
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;stop();host.classList.remove('is-ready');button.hidden=true;});
    canvas.addEventListener('webglcontextrestored',()=>{contextLost=false;render();host.classList.add('is-ready');syncButton();start();});
    resize();render();host.classList.add('is-ready');syncButton();start();
    addEventListener('pagehide',event=>{stop();if(event.persisted)return;observer.disconnect();intersection.disconnect();environment.dispose();scene.traverse(o=>{o.geometry?.dispose();if(o.material)o.material.dispose();});renderer.dispose();});
    addEventListener('pageshow',event=>{if(event.persisted){resize();render();start();}});
  } catch(error) {
    renderer?.dispose();host.classList.remove('is-ready');if(button)button.hidden=true;
    console.warn('Interactive optical scene unavailable; static artwork retained.',error);
  }
}
