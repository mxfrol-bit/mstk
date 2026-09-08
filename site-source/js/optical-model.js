import * as THREE from './vendor/three.module.min.js';

// A brand illustration of optical acrylic, not a specific medical-device model.
export function createOpticalModel() {
  const group = new THREE.Group();
  const glass = new THREE.MeshPhysicalMaterial({color:0xe7f3ff,metalness:0,roughness:0.08,transmission:0.96,thickness:0.32,ior:1.46,clearcoat:1,envMapIntensity:1.5});
  const edge = new THREE.MeshPhysicalMaterial({color:0x3156dc,metalness:0.22,roughness:0.2,clearcoat:1,envMapIntensity:1.3});
  const optic = new THREE.Mesh(new THREE.SphereGeometry(1.12,64,32),glass);
  optic.scale.z=0.135;
  group.add(optic);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.105,0.026,12,128),edge);
  group.add(rim);
  for (const sign of [1,-1]) {
    const points = [[0.92,0.25,0],[1.37,0.37,0],[1.63,0.9,0],[1.49,1.44,0],[1.03,1.64,0],[0.66,1.49,0]]
      .map(([x,y,z])=>new THREE.Vector3(sign*x,sign*y,z));
    const curve = new THREE.CatmullRomCurve3(points);
    const arm = new THREE.Mesh(new THREE.TubeGeometry(curve,64,0.045,10,false),glass);
    group.add(arm);
    const joint = new THREE.Mesh(new THREE.SphereGeometry(0.12,16,12),glass);
    joint.position.set(sign*0.94,sign*0.24,0);joint.scale.set(1.6,0.8,0.42);group.add(joint);
  }
  return group;
}

export function opticalPose(time,pointerX=0,pointerY=0,rotation=0) {
  return {x:-0.23+Math.sin(time*0.43)*0.1+pointerY*0.18,y:0.45+time*0.19+pointerX*0.32+rotation,z:-0.36+Math.sin(time*0.31)*0.07,floatY:Math.sin(time*0.7)*0.07};
}

export function opticalCameraDistance(width,height) {
  // Keep both haptics inside the view at every angle, including narrow phones.
  const halfAngle=Math.atan(Math.tan(34*Math.PI/360)*Math.min(1,width/height));
  return 2.5/Math.sin(halfAngle);
}
