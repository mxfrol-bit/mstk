// Rigid image motion: the frame and page layout never move.
export function artworkMotionSpec(kind) {
  if(kind==='iris')return {
    duration:11000,
    poses:[
      {offset:0,x:-.6,y:.4,angle:-.45,tilt:0,scale:1.065},
      {offset:.5,x:.8,y:-.7,angle:.6,tilt:0,scale:1.135},
      {offset:1,x:-.6,y:.4,angle:-.45,tilt:0,scale:1.065}
    ]
  };
  return {
    duration:9000,
    poses:[
      {offset:0,x:-1,y:.6,angle:-.85,tilt:-2,scale:1.095},
      {offset:.25,x:.4,y:-1.1,angle:.2,tilt:1,scale:1.12},
      {offset:.5,x:1,y:-.3,angle:.85,tilt:2,scale:1.10},
      {offset:.75,x:-.2,y:.9,angle:-.1,tilt:-1,scale:1.085},
      {offset:1,x:-1,y:.6,angle:-.85,tilt:-2,scale:1.095}
    ]
  };
}
export function artworkKeyframes(kind) {
  return artworkMotionSpec(kind).poses.map(p=>({offset:p.offset,transform:`perspective(3000px) translate3d(${p.x}%,${p.y}%,0) rotateZ(${p.angle}deg) rotateY(${p.tilt}deg) scale(${p.scale})`}));
}
