// Only lighting moves. Texture coordinates stay fixed so image geometry is stable.
export function artworkMotion(time,pointerX=0,pointerY=0) {
  return {x:pointerX*.08,y:-pointerY*.06,tilt:0,zoom:1,light:time*.3};
}
export function irisMotion(time,pointerX=0,pointerY=0) {
  return {x:pointerX*.06,y:-pointerY*.05,zoom:1,breath:0,light:time*.22};
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
uniform float uLight;
varying vec2 vUv;
void main(){
  vec2 uv=(vUv-.5)*uCover+.5;
  vec4 color=texture2D(uArtwork,uv);
  vec2 q=(uv-vec2(.632,.54))*vec2(1.5,1.0);
  vec2 ellipse=mat2(.94,.342,-.342,.94)*q;
  float lens=1.0-smoothstep(.88,1.24,length(ellipse/vec2(.34,.44)));
  vec2 direction=vec2(cos(uLight),sin(uLight));
  float light=exp(-pow((dot(q-uMotion,direction)-.11)/.13,2.0));
  float highlight=smoothstep(.45,.95,dot(color.rgb,vec3(.2126,.7152,.0722)));
  color.rgb*=1.0+highlight*lens*light*.065;
  gl_FragColor=color;
  #include <colorspace_fragment>
}
`;
export const irisFragmentShader=`
uniform sampler2D uArtwork;
uniform vec2 uCover;
uniform vec2 uMotion;
uniform float uLight;
varying vec2 vUv;
void main(){
  vec2 uv=(vUv-.5)*uCover+.5;
  vec4 color=texture2D(uArtwork,uv);
  vec2 q=(uv-vec2(.502,.506))*vec2(1.5,1.0);
  float radius=length(q);
  vec2 direction=normalize(vec2(cos(uLight),sin(uLight))+uMotion*2.0);
  float light=pow(max(0.0,dot(normalize(q+vec2(.0001)),direction)),5.0);
  float iris=smoothstep(.19,.29,radius)*(1.0-smoothstep(.62,.85,radius));
  color.rgb*=1.0+light*iris*.065;
  gl_FragColor=color;
  #include <colorspace_fragment>
}
`;
