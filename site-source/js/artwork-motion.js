// Motion is applied to the original artwork, without replacing its subject.
export function artworkMotion(time,pointerX=0,pointerY=0) {
  return {
    x:Math.sin(time*.42)*.0045+pointerX*.007,
    y:Math.sin(time*.57)*.0035-pointerY*.006,
    tilt:Math.sin(time*.35)*.004+pointerX*.003,
    zoom:1.04+Math.sin(time*.31)*.006,
    light:Math.sin(time*.64)*.018
  };
}

export function coverScale(width,height,imageWidth,imageHeight) {
  const aspect=width/height,imageAspect=imageWidth/imageHeight;
  return aspect<imageAspect ? [aspect/imageAspect,1] : [1,imageAspect/aspect];
}

export const artworkVertexShader=`
varying vec2 vUv;
void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}
`;

export const artworkFragmentShader=`
uniform sampler2D uArtwork;
uniform vec2 uCover;
uniform vec2 uMotion;
uniform float uTilt;
uniform float uZoom;
uniform float uLight;
varying vec2 vUv;
void main(){
  vec2 uv=(vUv-.5)*uCover/uZoom+.5;
  // A shallow depth field follows the blue lens in the source image.
  vec2 q=(uv-vec2(.632,.54))*vec2(1.5,1.0);
  q=mat2(.94,.342,-.342,.94)*q;
  float ellipse=length(q/vec2(.34,.44));
  float depth=1.0-smoothstep(.88,1.24,ellipse);
  vec2 local=uv-vec2(.632,.54);
  float angle=uTilt*depth;
  local=mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*local;
  uv=local+vec2(.632,.54)+uMotion*(.18+.82*depth);
  vec4 color=texture2D(uArtwork,clamp(uv,vec2(.001),vec2(.999)));
  // Let the existing glass highlights breathe; retain the original palette.
  float highlight=smoothstep(.55,.96,dot(color.rgb,vec3(.2126,.7152,.0722)));
  color.rgb+=color.rgb*highlight*depth*uLight;
  gl_FragColor=color;
  #include <colorspace_fragment>
}
`;

export function irisMotion(time,pointerX=0,pointerY=0) {
  return {
    x:Math.sin(time*.32)*.003+pointerX*.009,
    y:Math.cos(time*.37)*.0025-pointerY*.007,
    zoom:1.045+Math.sin(time*.24)*.008,
    breath:Math.sin(time*.68),
    light:time*.22
  };
}

export const irisFragmentShader=`
uniform sampler2D uArtwork;
uniform vec2 uCover;
uniform vec2 uMotion;
uniform float uZoom;
uniform float uBreath;
uniform float uLight;
varying vec2 vUv;
void main(){
  vec2 uv=(vUv-.5)*uCover/uZoom+.5;
  vec2 q=(uv-vec2(.502,.506))*vec2(1.5,1.0);
  float radius=length(q);
  float depth=1.0-smoothstep(.36,.76,radius);
  // Gently dilate the photographed pupil, preserving the original iris fibers.
  float response=exp(-pow((radius-.24)/.19,2.0));
  q*=1.0-uBreath*.045*response;
  q+=uMotion*vec2(1.5,1.0)*(.2+.8*depth);
  uv=vec2(.502,.506)+q/vec2(1.5,1.0);
  vec4 color=texture2D(uArtwork,clamp(uv,vec2(.001),vec2(.999)));
  // A wide, slow corneal light pass picks out existing detail.
  vec2 lightDirection=vec2(cos(uLight),sin(uLight));
  float light=pow(max(0.0,dot(normalize(q+vec2(.0001)),lightDirection)),5.0);
  float iris=smoothstep(.19,.29,radius)*(1.0-smoothstep(.62,.85,radius));
  color.rgb*=1.0+light*iris*.075;
  gl_FragColor=color;
  #include <colorspace_fragment>
}
`;
