import{E as p,U as dt,T as fe,g as Ge,h as Be,M as S,J as z,z as ke,a3 as w,n as U,G as ze,Y as ie,w as Z,a2 as Ae,k as ht,ar as D,d as C,v as M,D as H,as as pe,a9 as ee,at as k,K as V,au as ft,ag as De,av as me,a0 as L,aw as pt,ax as ae,a5 as te,ay as O,B as xe,a as I,f as oe,af as re,L as Oe,W as Ie,am as Ee,ap as Ve,Q as mt,R as xt,an as gt,ao as _t,aq as yt,m as Tt,az as bt,aA as ne,aB as vt,l as ge,j as b,aC as Ct}from"./index-C1GJxVGo.js";import{F as wt,S as W,c as K,a as St,b as Pt,B as Le}from"./colorToUniform-BIV7WIIh.js";import{N as Mt,M as We}from"./NineSliceGeometry-DYGzPtcx.js";class Ye{static init(e){Object.defineProperty(this,"resizeTo",{configurable:!0,set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,r;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,r=globalThis.innerHeight;else{const{clientWidth:n,clientHeight:s}=this._resizeTo;t=n,r=s}this.renderer.resize(t,r),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}Ye.extension=p.Application;class He{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{configurable:!0,set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,dt.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?fe.shared:new fe,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}He.extension=p.Application;var Rt=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,Ft=`in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
void main() {
    finalColor = texture(uTexture, vTextureCoord);
}
`,_e=`struct GlobalFilterUniforms {
  uInputSize: vec4<f32>,
  uInputPixel: vec4<f32>,
  uInputClamp: vec4<f32>,
  uOutputFrame: vec4<f32>,
  uGlobalFrame: vec4<f32>,
  uOutputTexture: vec4<f32>,
};

@group(0) @binding(0) var <uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;

struct VSOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>
};

fn filterVertexPosition(aPosition: vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord(aPosition: vec2<f32>) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition: vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {
    return textureSample(uTexture, uSampler, uv);
}
`;class Ut extends wt{constructor(){const e=Ge.from({vertex:{source:_e,entryPoint:"mainVertex"},fragment:{source:_e,entryPoint:"mainFragment"},name:"passthrough-filter"}),t=Be.from({vertex:Rt,fragment:Ft,name:"passthrough-filter"});super({gpuProgram:e,glProgram:t})}}class Ke{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}Ke.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"filter"};const ye=new S;function Gt(o,e){e.clear();const t=e.matrix;for(let r=0;r<o.length;r++){const n=o[r];if(n.globalDisplayStatus<7)continue;const s=n.renderGroup??n.parentRenderGroup;s!=null&&s.isCachedAsTexture?e.matrix=ye.copyFrom(s.textureOffsetInverseTransform).append(n.worldTransform):s!=null&&s._parentCacheAsTextureRenderGroup?e.matrix=ye.copyFrom(s._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(n.groupTransform):e.matrix=n.worldTransform,e.addBounds(n.bounds)}return e.matrix=t,e}const Bt=new ze({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class kt{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new Ae,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0},this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}}class Xe{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new z({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new ke({}),this.renderer=e}get activeBackTexture(){var e;return(e=this._activeFilterData)==null?void 0:e.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,n=this._pushFilterData();n.skip=!1,n.filters=r,n.container=e.container,n.outputRenderSurface=t.renderTarget.renderSurface;const s=t.renderTarget.renderTarget.colorTexture.source,i=s.resolution,a=s.antialias;if(r.every(f=>!f.enabled)){n.skip=!0;return}const l=n.bounds;if(this._calculateFilterArea(e,l),this._calculateFilterBounds(n,t.renderTarget.rootViewPort,a,i,1),n.skip)return;const u=this._getPreviousFilterData(),d=this._findFilterResolution(i);let c=0,h=0;u&&(c=u.bounds.minX,h=u.bounds.minY),this._calculateGlobalFrame(n,c,h,d,s.width,s.height),this._setupFilterTextures(n,l,t,u)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const n=e.source,s=n.resolution,i=n.antialias;if(t.every(f=>!f.enabled))return r.skip=!0,e;const a=r.bounds;if(a.addRect(e.frame),this._calculateFilterBounds(r,a.rectangle,i,s,0),r.skip)return e;const l=s;this._calculateGlobalFrame(r,0,0,l,n.width,n.height),r.outputRenderSurface=w.getOptimalTexture(a.width,a.height,r.resolution,r.antialias),r.backTexture=U.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const h=r.outputRenderSurface;return h.source.alphaMode="premultiplied-alpha",h}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&w.returnTexture(t.backTexture),w.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const n=e.colorTexture.source._resolution,s=w.getOptimalTexture(t.width,t.height,n,!1);let i=t.minX,a=t.minY;r&&(i-=r.minX,a-=r.minY),i=Math.floor(i*n),a=Math.floor(a*n);const l=Math.ceil(t.width*n),u=Math.ceil(t.height*n);return this.renderer.renderTarget.copyToTexture(e,s,{x:i,y:a},{width:l,height:u},{x:0,y:0}),s}applyFilter(e,t,r,n){const s=this.renderer,i=this._activeFilterData,l=i.outputRenderSurface===r,u=s.renderTarget.rootRenderTarget.colorTexture.source._resolution,d=this._findFilterResolution(u);let c=0,h=0;if(l){const m=this._findPreviousFilterOffset();c=m.x,h=m.y}this._updateFilterUniforms(t,r,i,c,h,d,l,n);const f=e.enabled?e:this._getPassthroughFilter();this._setupBindGroupsAndRender(f,t,s)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,n=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),s=t.worldTransform.copyTo(S.shared),i=t.renderGroup||t.parentRenderGroup;return i&&i.cacheToLocalTransform&&s.prepend(i.cacheToLocalTransform),s.invert(),n.prepend(s),n.scale(1/t.texture.orig.width,1/t.texture.orig.height),n.translate(t.anchor.x,t.anchor.y),n}destroy(){var e;(e=this._passthroughFilter)==null||e.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){return this._passthroughFilter??(this._passthroughFilter=new Ut),this._passthroughFilter}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const n=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(n,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:Bt,shader:e,state:e._state,topology:"triangle-list"}),r.type===ie.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,n){if(e.backTexture=U.EMPTY,e.inputTexture=w.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),e.blendRequired){r.renderTarget.finishRenderPass();const s=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(s,t,n==null?void 0:n.bounds)}r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,n,s,i){const a=e.globalFrame;a.x=t*n,a.y=r*n,a.width=s*n,a.height=i*n}_updateFilterUniforms(e,t,r,n,s,i,a,l){const u=this._filterGlobalUniforms.uniforms,d=u.uOutputFrame,c=u.uInputSize,h=u.uInputPixel,f=u.uInputClamp,m=u.uGlobalFrame,_=u.uOutputTexture;a?(d[0]=r.bounds.minX-n,d[1]=r.bounds.minY-s):(d[0]=0,d[1]=0),d[2]=e.frame.width,d[3]=e.frame.height,c[0]=e.source.width,c[1]=e.source.height,c[2]=1/c[0],c[3]=1/c[1],h[0]=e.source.pixelWidth,h[1]=e.source.pixelHeight,h[2]=1/h[0],h[3]=1/h[1],f[0]=.5*h[2],f[1]=.5*h[3],f[2]=e.frame.width*c[2]-.5*h[2],f[3]=e.frame.height*c[3]-.5*h[3];const x=this.renderer.renderTarget.rootRenderTarget.colorTexture;m[0]=n*i,m[1]=s*i,m[2]=x.source.width*i,m[3]=x.source.height*i,t instanceof U&&(t.source.resource=null);const g=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!l),t instanceof U?(_[0]=t.frame.width,_[1]=t.frame.height):(_[0]=g.width,_[1]=g.height),_[2]=g.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const n=this._filterStack[r];if(!n.skip){e=n.bounds.minX,t=n.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?Gt(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const n=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;n&&t.applyMatrix(n)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,n=e.bounds,s=e.filters,i=e.firstEnabledIndex,a=e.lastEnabledIndex;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),i===a)s[i].apply(this,r,e.outputRenderSurface,t);else{let l=e.inputTexture;const u=w.getOptimalTexture(n.width,n.height,l.source._resolution,!1);let d=u;for(let c=i;c<a;c++){const h=s[c];if(!h.enabled)continue;h.apply(this,l,d,!0);const f=l;l=d,d=f}s[a].apply(this,l,e.outputRenderSurface,t),w.returnTexture(u)}}_calculateFilterBounds(e,t,r,n,s){var g;const i=this.renderer,a=e.bounds,l=e.filters;let u=1/0,d=0,c=!0,h=!1,f=!1,m=!0,_=-1,x=-1;for(let v=0;v<l.length;v++){const y=l[v];if(!y.enabled)continue;if(_===-1&&(_=v),x=v,u=Math.min(u,y.resolution==="inherit"?n:y.resolution),d+=y.padding,y.antialias==="off"?c=!1:y.antialias==="inherit"&&c&&(c=r),y.clipToViewport||(m=!1),!!!(y.compatibleRenderers&i.type)){f=!1;break}if(y.blendRequired&&!(((g=i.backBuffer)==null?void 0:g.useBackBuffer)??!0)){Z("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),f=!1;break}f=!0,h||(h=y.blendRequired)}if(!f){e.skip=!0;return}if(m&&a.fitBounds(0,t.width/n,0,t.height/n),a.scale(u).ceil().scale(1/u).pad((d|0)*s),!a.isPositive){e.skip=!0;return}e.antialias=c,e.resolution=u,e.blendRequired=h,e.firstEnabledIndex=_,e.lastEnabledIndex=x}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new kt),this._filterStackIndex++,e}}Xe.extension={type:[p.WebGLSystem,p.WebGPUSystem],name:"filter"};class Y extends ht{constructor(e){e instanceof D&&(e={context:e});const{context:t,roundPixels:r,...n}=e||{};super({label:"Graphics",...n}),this.renderPipeId="graphics",t?this._context=t:this._context=this._ownedContext=new D,this._context.on("update",this.onViewUpdate,this),this.didViewUpdate=!0,this.allowChildren=!1,this.roundPixels=r??!1}set context(e){e!==this._context&&(this._context.off("update",this.onViewUpdate,this),this._context=e,this._context.on("update",this.onViewUpdate,this),this.onViewUpdate())}get context(){return this._context}get bounds(){return this._context.bounds}updateBounds(){}containsPoint(e){return this._context.containsPoint(e)}destroy(e){this._ownedContext&&!e?this._ownedContext.destroy(e):(e===!0||(e==null?void 0:e.context)===!0)&&this._context.destroy(e),this._ownedContext=null,this._context=null,super.destroy(e)}_callContextMethod(e,t){return this.context[e](...t),this}setFillStyle(...e){return this._callContextMethod("setFillStyle",e)}setStrokeStyle(...e){return this._callContextMethod("setStrokeStyle",e)}fill(...e){return this._callContextMethod("fill",e)}stroke(...e){return this._callContextMethod("stroke",e)}texture(...e){return this._callContextMethod("texture",e)}beginPath(){return this._callContextMethod("beginPath",[])}cut(){return this._callContextMethod("cut",[])}arc(...e){return this._callContextMethod("arc",e)}arcTo(...e){return this._callContextMethod("arcTo",e)}arcToSvg(...e){return this._callContextMethod("arcToSvg",e)}bezierCurveTo(...e){return this._callContextMethod("bezierCurveTo",e)}closePath(){return this._callContextMethod("closePath",[])}ellipse(...e){return this._callContextMethod("ellipse",e)}circle(...e){return this._callContextMethod("circle",e)}path(...e){return this._callContextMethod("path",e)}lineTo(...e){return this._callContextMethod("lineTo",e)}moveTo(...e){return this._callContextMethod("moveTo",e)}quadraticCurveTo(...e){return this._callContextMethod("quadraticCurveTo",e)}rect(...e){return this._callContextMethod("rect",e)}roundRect(...e){return this._callContextMethod("roundRect",e)}poly(...e){return this._callContextMethod("poly",e)}regularPoly(...e){return this._callContextMethod("regularPoly",e)}roundPoly(...e){return this._callContextMethod("roundPoly",e)}roundShape(...e){return this._callContextMethod("roundShape",e)}filletRect(...e){return this._callContextMethod("filletRect",e)}chamferRect(...e){return this._callContextMethod("chamferRect",e)}star(...e){return this._callContextMethod("star",e)}svg(...e){return this._callContextMethod("svg",e)}restore(...e){return this._callContextMethod("restore",e)}save(){return this._callContextMethod("save",[])}getTransform(){return this.context.getTransform()}resetTransform(){return this._callContextMethod("resetTransform",[])}rotateTransform(...e){return this._callContextMethod("rotate",e)}scaleTransform(...e){return this._callContextMethod("scale",e)}setTransform(...e){return this._callContextMethod("setTransform",e)}transform(...e){return this._callContextMethod("transform",e)}translateTransform(...e){return this._callContextMethod("translate",e)}clear(){return this._callContextMethod("clear",[])}get fillStyle(){return this._context.fillStyle}set fillStyle(e){this._context.fillStyle=e}get strokeStyle(){return this._context.strokeStyle}set strokeStyle(e){this._context.strokeStyle=e}clone(e=!1){return e?new Y(this._context.clone()):(this._ownedContext=null,new Y(this._context))}lineStyle(e,t,r){C(M,"Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");const n={};return e&&(n.width=e),t&&(n.color=t),r&&(n.alpha=r),this.context.strokeStyle=n,this}beginFill(e,t){C(M,"Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");const r={};return e!==void 0&&(r.color=e),t!==void 0&&(r.alpha=t),this.context.fillStyle=r,this}endFill(){C(M,"Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.context.fill();const e=this.context.strokeStyle;return(e.width!==D.defaultStrokeStyle.width||e.color!==D.defaultStrokeStyle.color||e.alpha!==D.defaultStrokeStyle.alpha)&&this.context.stroke(),this}drawCircle(...e){return C(M,"Graphics#drawCircle has been renamed to Graphics#circle"),this._callContextMethod("circle",e)}drawEllipse(...e){return C(M,"Graphics#drawEllipse has been renamed to Graphics#ellipse"),this._callContextMethod("ellipse",e)}drawPolygon(...e){return C(M,"Graphics#drawPolygon has been renamed to Graphics#poly"),this._callContextMethod("poly",e)}drawRect(...e){return C(M,"Graphics#drawRect has been renamed to Graphics#rect"),this._callContextMethod("rect",e)}drawRoundedRect(...e){return C(M,"Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),this._callContextMethod("roundRect",e)}drawStar(...e){return C(M,"Graphics#drawStar has been renamed to Graphics#star"),this._callContextMethod("star",e)}}let G=null,R=null;function zt(o,e){G||(G=H.get().createCanvas(256,128),R=G.getContext("2d",{willReadFrequently:!0}),R.globalCompositeOperation="copy",R.globalAlpha=1),(G.width<o||G.height<e)&&(G.width=pe(o),G.height=pe(e))}function Te(o,e,t){for(let r=0,n=4*t*e;r<e;++r,n+=4)if(o[n+3]!==0)return!1;return!0}function be(o,e,t,r,n){const s=4*e;for(let i=r,a=r*s+4*t;i<=n;++i,a+=s)if(o[a+3]!==0)return!1;return!0}function At(...o){let e=o[0];e.canvas||(e={canvas:o[0],resolution:o[1]});const{canvas:t}=e,r=Math.min(e.resolution??1,1),n=e.width??t.width,s=e.height??t.height;let i=e.output;if(zt(n,s),!R)throw new TypeError("Failed to get canvas 2D context");R.drawImage(t,0,0,n,s,0,0,n*r,s*r);const l=R.getImageData(0,0,n,s).data;let u=0,d=0,c=n-1,h=s-1;for(;d<s&&Te(l,n,d);)++d;if(d===s)return ee.EMPTY;for(;Te(l,n,h);)--h;for(;be(l,n,u,d,h);)++u;for(;be(l,n,c,d,h);)--c;return++c,++h,R.globalCompositeOperation="source-over",R.strokeRect(u,d,c-u,h-d),R.globalCompositeOperation="copy",i??(i=new ee),i.set(u/r,d/r,(c-u)/r,(h-d)/r),i}const ve=new ee;class Dt{getCanvasAndContext(e){const{text:t,style:r,resolution:n=1}=e,s=r._getFinalPadding(),i=k.measureText(t||" ",r),a=Math.ceil(Math.ceil(Math.max(1,i.width)+s*2)*n),l=Math.ceil(Math.ceil(Math.max(1,i.height)+s*2)*n),u=V.getOptimalCanvasAndContext(a,l);this._renderTextToCanvas(t,r,s,n,u);const d=r.trim?At({canvas:u.canvas,width:a,height:l,resolution:1,output:ve}):ve.set(0,0,a,l);return{canvasAndContext:u,frame:d}}returnCanvasAndContext(e){V.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,r,n,s){var y,A,P,B;const{canvas:i,context:a}=s,l=ft(t),u=k.measureText(e||" ",t),d=u.lines,c=u.lineHeight,h=u.lineWidths,f=u.maxLineWidth,m=u.fontProperties,_=i.height;if(a.resetTransform(),a.scale(n,n),a.textBaseline=t.textBaseline,(y=t._stroke)!=null&&y.width){const F=t._stroke;a.lineWidth=F.width,a.miterLimit=F.miterLimit,a.lineJoin=F.join,a.lineCap=F.cap}a.font=l;let x,g;const v=t.dropShadow?2:1;for(let F=0;F<v;++F){const le=t.dropShadow&&F===0,X=le?Math.ceil(Math.max(1,_)+r*2):0,ot=X*n;if(le){a.fillStyle="black",a.strokeStyle="black";const T=t.dropShadow,ut=T.color,lt=T.alpha;a.shadowColor=De.shared.setValue(ut).setAlpha(lt).toRgbaString();const ct=T.blur*n,he=T.distance*n;a.shadowBlur=ct,a.shadowOffsetX=Math.cos(T.angle)*he,a.shadowOffsetY=Math.sin(T.angle)*he+ot}else{if(a.fillStyle=t._fill?me(t._fill,a,u,r*2):null,(A=t._stroke)!=null&&A.width){const T=t._stroke.width*.5+r*2;a.strokeStyle=me(t._stroke,a,u,T)}a.shadowColor="black"}let ce=(c-m.fontSize)/2;c-m.fontSize<0&&(ce=0);const de=((P=t._stroke)==null?void 0:P.width)??0;for(let T=0;T<d.length;T++)x=de/2,g=de/2+T*c+m.ascent+ce,t.align==="right"?x+=f-h[T]:t.align==="center"&&(x+=(f-h[T])/2),(B=t._stroke)!=null&&B.width&&this._drawLetterSpacing(d[T],t,s,x+r,g+r-X,!0),t._fill!==void 0&&this._drawLetterSpacing(d[T],t,s,x+r,g+r-X)}}_drawLetterSpacing(e,t,r,n,s,i=!1){const{context:a}=r,l=t.letterSpacing;let u=!1;if(k.experimentalLetterSpacingSupported&&(k.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,u=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||u){i?a.strokeText(e,n,s):a.fillText(e,n,s);return}let d=n;const c=k.graphemeSegmenter(e);let h=a.measureText(e).width,f=0;for(let m=0;m<c.length;++m){const _=c[m];i?a.strokeText(_,d,s):a.fillText(_,d,s);let x="";for(let g=m+1;g<c.length;++g)x+=c[g];f=a.measureText(x).width,d+=h-f+l,h=f}}}const $=new Dt,Ce="http://www.w3.org/2000/svg",we="http://www.w3.org/1999/xhtml";class $e{constructor(){this.svgRoot=document.createElementNS(Ce,"svg"),this.foreignObject=document.createElementNS(Ce,"foreignObject"),this.domElement=document.createElementNS(we,"div"),this.styleElement=document.createElementNS(we,"style");const{foreignObject:e,svgRoot:t,styleElement:r,domElement:n}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(r),e.appendChild(n),this.image=H.get().createImage()}destroy(){this.svgRoot.remove(),this.foreignObject.remove(),this.styleElement.remove(),this.domElement.remove(),this.image.src="",this.image.remove(),this.svgRoot=null,this.foreignObject=null,this.styleElement=null,this.domElement=null,this.image=null,this.canvasAndContext=null}}let Se;function Ot(o,e,t,r){r||(r=Se||(Se=new $e));const{domElement:n,styleElement:s,svgRoot:i}=r;n.innerHTML=`<style>${e.cssStyle};</style><div style='padding:0'>${o}</div>`,n.setAttribute("style","transform-origin: top left; display: inline-block"),t&&(s.textContent=t),document.body.appendChild(i);const a=n.getBoundingClientRect();i.remove();const l=e.padding*2;return{width:a.width-l,height:a.height-l}}class It{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{L.return(e)}),this.batches.length=0}}class je{constructor(e,t){this.state=W.for2d(),this.renderer=e,this._adaptor=t,this.renderer.runners.contextChange.add(this)}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){const t=e.context,r=!!e._gpuData,n=this.renderer.graphicsContext.updateGpuContext(t);return!!(n.isBatchable||r!==n.isBatchable)}addRenderable(e,t){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){const r=this._getGpuDataForRenderable(e).batches;for(let n=0;n<r.length;n++){const s=r[n];s._batcher.updateElement(s)}}execute(e){if(!e.isRenderable)return;const t=this.renderer,r=e.context;if(!t.graphicsContext.getGpuContext(r).batches.length)return;const s=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const i=s.resources.localUniforms.uniforms;i.uTransformMatrix=e.groupTransform,i.uRound=t._roundPixels|e._roundPixels,K(e.groupColorAlpha,i.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=this._getGpuDataForRenderable(e),r=this.renderer.graphicsContext.updateGpuContext(e.context);t.destroy(),r.isBatchable&&this._updateBatchesForRenderable(e,t)}_addToBatcher(e,t){const r=this.renderer.renderPipes.batch,n=this._getGpuDataForRenderable(e).batches;for(let s=0;s<n.length;s++){const i=n[s];r.addToBatch(i,t)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){const t=new It;return e._gpuData[this.renderer.uid]=t,t}_updateBatchesForRenderable(e,t){const r=e.context,n=this.renderer.graphicsContext.getGpuContext(r),s=this.renderer._roundPixels|e._roundPixels;t.batches=n.batches.map(i=>{const a=L.get(pt);return i.copyTo(a),a.renderable=e,a.roundPixels=s,a})}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}}je.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"graphics"};class ue{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),r=t.data;let n=r;const s=this.texture.textureMatrix;return s.isSimple||(n=this._transformedUvs,(this._textureMatrixUpdateId!==s._updateID||this._uvUpdateId!==t._updateID)&&((!n||n.length<r.length)&&(n=this._transformedUvs=new Float32Array(r.length)),this._textureMatrixUpdateId=s._updateID,this._uvUpdateId=t._updateID,s.multiplyUvs(r,n))),n}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class Pe{destroy(){}}class qe{constructor(e,t){this.localUniforms=new z({uTransformMatrix:{value:new S,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new ke({0:this.localUniforms}),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getMeshData(e),r=t.batched,n=e.batched;if(t.batched=n,r!==n)return!0;if(n){const s=e._geometry;if(s.indices.length!==t.indexSize||s.positions.length!==t.vertexSize)return t.indexSize=s.indices.length,t.vertexSize=s.positions.length,!0;const i=this._getBatchableMesh(e);return i.texture.uid!==e._texture.uid&&(i._textureMatrixUpdateId=-1),!i._batcher.checkAndUpdateTexture(i,e._texture)}return!1}addRenderable(e,t){var s,i;const r=this.renderer.renderPipes.batch,n=this._getMeshData(e);if(e.didViewUpdate&&(n.indexSize=(s=e._geometry.indices)==null?void 0:s.length,n.vertexSize=(i=e._geometry.positions)==null?void 0:i.length),n.batched){const a=this._getBatchableMesh(e);a.setTexture(e._texture),a.geometry=e._geometry,r.addToBatch(a,t)}else r.break(t),t.add(e)}updateRenderable(e){if(e.batched){const t=this._getBatchableMesh(e);t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=ae(e.groupBlendMode,e.texture._source);const t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),K(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new Pe),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:0,vertexSize:0},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new Pe),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=new ue;return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=t,t}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}qe.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"mesh"};class Et{execute(e,t){const r=e.state,n=e.renderer,s=t.shader||e.defaultShader;s.resources.uTexture=t.texture._source,s.resources.uniforms=e.localUniforms;const i=n.gl,a=e.getBuffers(t);n.shader.bind(s),n.state.set(r),n.geometry.bind(a.geometry,s.glProgram);const u=a.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?i.UNSIGNED_SHORT:i.UNSIGNED_INT;i.drawElements(i.TRIANGLES,t.particleChildren.length*6,u,0)}}class Vt{execute(e,t){const r=e.renderer,n=t.shader||e.defaultShader;n.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),n.groups[1]=r.texture.getTextureBindGroup(t.texture);const s=e.state,i=e.getBuffers(t);r.encoder.draw({geometry:i.geometry,shader:t.shader||e.defaultShader,state:s,size:t.particleChildren.length*6})}}function Me(o,e=null){const t=o*6;if(t>65535?e||(e=new Uint32Array(t)):e||(e=new Uint16Array(t)),e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,n=0;r<t;r+=6,n+=4)e[r+0]=n+0,e[r+1]=n+1,e[r+2]=n+2,e[r+3]=n+0,e[r+4]=n+2,e[r+5]=n+3;return e}function Lt(o){return{dynamicUpdate:Re(o,!0),staticUpdate:Re(o,!1)}}function Re(o,e){const t=[];t.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const s in o){const i=o[s];if(e!==i.dynamic)continue;t.push(`offset = index + ${r}`),t.push(i.code);const a=te(i.format);r+=a.stride/4}t.push(`
            index += stride * 4;
        }
    `),t.unshift(`
        var stride = ${r};
    `);const n=t.join(`
`);return new Function("ps","f32v","u32v",n)}class Wt{constructor(e){this._size=0,this._generateParticleUpdateCache={};const t=this._size=e.size??1e3,r=e.properties;let n=0,s=0;for(const d in r){const c=r[d],h=te(c.format);c.dynamic?s+=h.stride:n+=h.stride}this._dynamicStride=s/4,this._staticStride=n/4,this.staticAttributeBuffer=new O(t*4*n),this.dynamicAttributeBuffer=new O(t*4*s),this.indexBuffer=Me(t);const i=new ze;let a=0,l=0;this._staticBuffer=new xe({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:I.VERTEX|I.COPY_DST}),this._dynamicBuffer=new xe({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:I.VERTEX|I.COPY_DST});for(const d in r){const c=r[d],h=te(c.format);c.dynamic?(i.addAttribute(c.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:a*4,format:c.format}),a+=h.size):(i.addAttribute(c.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:l*4,format:c.format}),l+=h.size)}i.addIndex(this.indexBuffer);const u=this.getParticleUpdate(r);this._dynamicUpload=u.dynamicUpdate,this._staticUpload=u.staticUpdate,this.geometry=i}getParticleUpdate(e){const t=Yt(e);return this._generateParticleUpdateCache[t]?this._generateParticleUpdateCache[t]:(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[t])}generateParticleUpdate(e){return Lt(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new O(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new O(this._size*this._dynamicStride*4*4),this.indexBuffer=Me(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){const n=this.staticAttributeBuffer;this._staticUpload(e,n.float32View,n.uint32View),this._staticBuffer.setDataWithSize(n.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}function Yt(o){const e=[];for(const t in o){const r=o[t];e.push(t,r.code,r.dynamic?"d":"s")}return e.join("_")}var Ht=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,Kt=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,Fe=`
struct ParticleUniforms {
  uTranslationMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uRound:f32,
  uResolution:vec2<f32>,
};

fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
{
  return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   var position = vec4((uniforms.uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

   if(uniforms.uRound == 1.0) {
       position = vec4(roundPixels(position.xy, uniforms.uResolution), position.zw);
   }

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;class Xt extends oe{constructor(){const e=Be.from({vertex:Kt,fragment:Ht}),t=Ge.from({fragment:{source:Fe,entryPoint:"mainFragment"},vertex:{source:Fe,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:t,resources:{uTexture:U.WHITE.source,uSampler:new re({}),uniforms:{uTranslationMatrix:{value:new S,type:"mat3x3<f32>"},uColor:{value:new De(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}class Ne{constructor(e,t){this.state=W.for2d(),this.localUniforms=new z({uTranslationMatrix:{value:new S,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=t,this.defaultShader=new Xt,this.state=W.for2d()}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new Wt({size:e.particleChildren.length,properties:e._properties}),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){const t=e.particleChildren;if(t.length===0)return;const r=this.renderer,n=this.getBuffers(e);e.texture||(e.texture=t[0].texture);const s=this.state;n.update(t,e._childrenDirty),e._childrenDirty=!1,s.blendMode=ae(e.blendMode,e.texture._source);const i=this.localUniforms.uniforms,a=i.uTranslationMatrix;e.worldTransform.copyTo(a),a.prepend(r.globalUniforms.globalUniformData.projectionMatrix),i.uResolution=r.globalUniforms.globalUniformData.resolution,i.uRound=r._roundPixels|e._roundPixels,K(e.groupColorAlpha,i.uColor,0),this.adaptor.execute(this,e)}destroy(){this.renderer=null,this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}class Qe extends Ne{constructor(e){super(e,new Et)}}Qe.extension={type:[p.WebGLPipes],name:"particle"};class Je extends Ne{constructor(e){super(e,new Vt)}}Je.extension={type:[p.WebGPUPipes],name:"particle"};class $t extends ue{constructor(){super(),this.geometry=new Mt}destroy(){this.geometry.destroy()}}class Ze{constructor(e){this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.geometry.update(e),t.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=e._gpuData[this._renderer.uid]=new $t,r=t;return r.renderable=e,r.transform=e.groupTransform,r.texture=e._texture,r.roundPixels=this._renderer._roundPixels|e._roundPixels,e.didViewUpdate||this._updateBatchableSprite(e,r),t}destroy(){this._renderer=null}}Ze.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"nineSliceSprite"};const jt={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},qt={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let j,q;class Nt extends oe{constructor(){j??(j=Oe({name:"tiling-sprite-shader",bits:[St,jt,Ie]})),q??(q=Ee({name:"tiling-sprite-shader",bits:[Pt,qt,Ve]}));const e=new z({uMapCoord:{value:new S,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new S,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:q,gpuProgram:j,resources:{localUniforms:new z({uTransformMatrix:{value:new S,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:U.EMPTY.source,uSampler:U.EMPTY.source.style}})}updateUniforms(e,t,r,n,s,i){const a=this.resources.tilingUniforms,l=i.width,u=i.height,d=i.textureMatrix,c=a.uniforms.uTextureTransform;c.set(r.a*l/e,r.b*l/t,r.c*u/e,r.d*u/t,r.tx/e,r.ty/t),c.invert(),a.uniforms.uMapCoord=d.mapCoord,a.uniforms.uClampFrame=d.uClampFrame,a.uniforms.uClampOffset=d.uClampOffset,a.uniforms.uTextureTransform=c,a.uniforms.uSizeAnchor[0]=e,a.uniforms.uSizeAnchor[1]=t,a.uniforms.uSizeAnchor[2]=n,a.uniforms.uSizeAnchor[3]=s,i&&(this.resources.uTexture=i.source,this.resources.uSampler=i.source.style)}}class Qt extends We{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function Jt(o,e){const t=o.anchor.x,r=o.anchor.y;e[0]=-t*o.width,e[1]=-r*o.height,e[2]=(1-t)*o.width,e[3]=-r*o.height,e[4]=(1-t)*o.width,e[5]=(1-r)*o.height,e[6]=-t*o.width,e[7]=(1-r)*o.height}function Zt(o,e,t,r){let n=0;const s=o.length/e,i=r.a,a=r.b,l=r.c,u=r.d,d=r.tx,c=r.ty;for(t*=e;n<s;){const h=o[t],f=o[t+1];o[t]=i*h+l*f+d,o[t+1]=a*h+u*f+c,t+=e,n++}}function er(o,e){const t=o.texture,r=t.frame.width,n=t.frame.height;let s=0,i=0;o.applyAnchorToTexture&&(s=o.anchor.x,i=o.anchor.y),e[0]=e[6]=-s,e[2]=e[4]=1-s,e[1]=e[3]=-i,e[5]=e[7]=1-i;const a=S.shared;a.copyFrom(o._tileTransform.matrix),a.tx/=o.width,a.ty/=o.height,a.invert(),a.scale(o.width/r,o.height/n),Zt(e,2,0,a)}const E=new Qt;class tr{constructor(){this.canBatch=!0,this.geometry=new We({indices:E.indices.slice(),positions:E.positions.slice(),uvs:E.uvs.slice()})}destroy(){var e;this.geometry.destroy(),(e=this.shader)==null||e.destroy()}}class et{constructor(e){this._state=W.default2d,this._renderer=e}validateRenderable(e){const t=this._getTilingSpriteData(e),r=t.canBatch;this._updateCanBatch(e);const n=t.canBatch;if(n&&n===r){const{batchableMesh:s}=t;return!s._batcher.checkAndUpdateTexture(s,e.texture)}return r!==n}addRenderable(e,t){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const n=this._getTilingSpriteData(e),{geometry:s,canBatch:i}=n;if(i){n.batchableMesh||(n.batchableMesh=new ue);const a=n.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),a.geometry=s,a.renderable=e,a.transform=e.groupTransform,a.setTexture(e._texture)),a.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(a,t)}else r.break(t),n.shader||(n.shader=new Nt),this.updateRenderable(e),t.add(e)}execute(e){const{shader:t}=this._getTilingSpriteData(e);t.groups[0]=this._renderer.globalUniforms.bindGroup;const r=t.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,K(e.groupColorAlpha,r.uColor,0),this._state.blendMode=ae(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:E,shader:t,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:r}=t;if(r){const{batchableMesh:n}=t;e.didViewUpdate&&this._updateBatchableMesh(e),n._batcher.updateElement(n)}else if(e.didViewUpdate){const{shader:n}=t;n.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new tr;return t.renderable=e,e._gpuData[this._renderer.uid]=t,t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:r}=t,n=e.texture.source.style;n.addressMode!=="repeat"&&(n.addressMode="repeat",n.update()),er(e,r.uvs),Jt(e,r.positions)}destroy(){this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),r=e.texture;let n=!0;return this._renderer.type===ie.WEBGL&&(n=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=r.textureMatrix.isSimple&&(n||r.source.isPowerOfTwo),t.canBatch}}et.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"tilingSprite"};const rr={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},nr={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},sr={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},ir={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}};let N,Q;class ar extends oe{constructor(e){const t=new z({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new S,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}});N??(N=Oe({name:"sdf-shader",bits:[mt,xt(e),rr,sr,Ie]})),Q??(Q=Ee({name:"sdf-shader",bits:[gt,_t(e),nr,ir,Ve]})),super({glProgram:Q,gpuProgram:N,resources:{localUniforms:t,batchSamplers:yt(e)}})}}class or extends Y{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}}class tt{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuBitmapText(e);return this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const r=this._getGpuBitmapText(e);Ue(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,t),r.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){const t=this._getGpuBitmapText(e);Ue(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const{context:r}=t,n=Tt.getFont(e.text,e._style);r.clear(),n.distanceField.type!=="none"&&(r.customShader||(r.customShader=new ar(this._renderer.limits.maxBatchableTextures)));const s=k.graphemeSegmenter(e.text),i=e._style;let a=n.baseLineOffset;const l=bt(s,i,n,!0),u=i.padding,d=l.scale;let c=l.width,h=l.height+l.offsetY;i._stroke&&(c+=i._stroke.width/d,h+=i._stroke.width/d),r.translate(-e._anchor._x*c-u,-e._anchor._y*h-u).scale(d,d);const f=n.applyFillAsTint?i._fill.color:16777215;let m=n.fontMetrics.fontSize,_=n.lineHeight;i.lineHeight&&(m=i.fontSize/d,_=i.lineHeight/d);let x=(_-m)/2;x-n.baseLineOffset<0&&(x=0);for(let g=0;g<l.lines.length;g++){const v=l.lines[g];for(let y=0;y<v.charPositions.length;y++){const A=v.chars[y],P=n.chars[A];if(P!=null&&P.texture){const B=P.texture;r.texture(B,f||"black",Math.round(v.charPositions[y]+P.xOffset),Math.round(a+P.yOffset+x),B.orig.width,B.orig.height)}}a+=_}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new or;return e._gpuData[this._renderer.uid]=t,this._updateContext(e,t),t}_updateDistanceField(e){const t=this._getGpuBitmapText(e).context,r=e._style.fontFamily,n=ne.get(`${r}-bitmap`),{a:s,b:i,c:a,d:l}=e.groupTransform,u=Math.sqrt(s*s+i*i),d=Math.sqrt(a*a+l*l),c=(Math.abs(u)+Math.abs(d))/2,h=n.baseRenderedFontSize/e._style.fontSize,f=c*n.distanceField.range*(1/h);t.customShader.resources.localUniforms.uniforms.uDistance=f}destroy(){this._renderer=null}}tt.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"bitmapText"};function Ue(o,e){e.groupTransform=o.groupTransform,e.groupColorAlpha=o.groupColorAlpha,e.groupColor=o.groupColor,e.groupBlendMode=o.groupBlendMode,e.globalDisplayStatus=o.globalDisplayStatus,e.groupTransform=o.groupTransform,e.localDisplayStatus=o.localDisplayStatus,e.groupAlpha=o.groupAlpha,e._roundPixels=o._roundPixels}class ur extends Le{constructor(e){super(),this.generatingTexture=!1,this.currentKey="--",this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{htmlText:e}=this._renderer;e.getReferenceCount(this.currentKey)===null?e.returnTexturePromise(this.texturePromise):e.decreaseReferenceCount(this.currentKey),this._renderer.runners.resolutionChange.remove(this),this.texturePromise=null,this._renderer=null}}function se(o,e){const{texture:t,bounds:r}=o,n=e._style._getFinalPadding();vt(r,e._anchor,t);const s=e._anchor._x*n*2,i=e._anchor._y*n*2;r.minX-=n-s,r.minY-=n-i,r.maxX-=n-s,r.maxY-=n-i}class rt{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const n=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==n)&&this._updateGpuText(e).catch(s=>{console.error(s)}),e._didTextUpdate=!1,se(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}async _updateGpuText(e){e._didTextUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;const r=t.texturePromise;t.texturePromise=null,t.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let n=this._renderer.htmlText.getTexturePromise(e);r&&(n=n.finally(()=>{this._renderer.htmlText.decreaseReferenceCount(t.currentKey),this._renderer.htmlText.returnTexturePromise(r)})),t.texturePromise=n,t.currentKey=e.styleKey,t.texture=await n;const s=e.renderGroup||e.parentRenderGroup;s&&(s.structureDidChange=!0),t.generatingTexture=!1,se(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new ur(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.texture=U.EMPTY,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}rt.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"htmlText"};function lr(){const{userAgent:o}=H.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(o)}const cr=new Ae;function nt(o,e,t,r){const n=cr;n.minX=0,n.minY=0,n.maxX=o.width/r|0,n.maxY=o.height/r|0;const s=w.getOptimalTexture(n.width,n.height,r,!1);return s.source.uploadMethodId="image",s.source.resource=o,s.source.alphaMode="premultiply-alpha-on-upload",s.frame.width=e/r,s.frame.height=t/r,s.source.emit("update",s.source),s.updateUvs(),s}function dr(o,e){const t=e.fontFamily,r=[],n={},s=/font-family:([^;"\s]+)/g,i=o.match(s);function a(l){n[l]||(r.push(l),n[l]=!0)}if(Array.isArray(t))for(let l=0;l<t.length;l++)a(t[l]);else a(t);i&&i.forEach(l=>{const u=l.split(":")[1].trim();a(u)});for(const l in e.tagStyles){const u=e.tagStyles[l].fontFamily;a(u)}return r}async function hr(o){const t=await(await H.get().fetch(o)).blob(),r=new FileReader;return await new Promise((s,i)=>{r.onloadend=()=>s(r.result),r.onerror=i,r.readAsDataURL(t)})}async function fr(o,e){const t=await hr(e);return`@font-face {
        font-family: "${o.fontFamily}";
        font-weight: ${o.fontWeight};
        font-style: ${o.fontStyle};
        src: url('${t}');
    }`}const J=new Map;async function pr(o){const e=o.filter(t=>ne.has(`${t}-and-url`)).map(t=>{if(!J.has(t)){const{entries:r}=ne.get(`${t}-and-url`),n=[];r.forEach(s=>{const i=s.url,l=s.faces.map(u=>({weight:u.weight,style:u.style}));n.push(...l.map(u=>fr({fontWeight:u.weight,fontStyle:u.style,fontFamily:t},i)))}),J.set(t,Promise.all(n).then(s=>s.join(`
`)))}return J.get(t)});return(await Promise.all(e)).join(`
`)}function mr(o,e,t,r,n){const{domElement:s,styleElement:i,svgRoot:a}=n;s.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${o}</div>`,s.setAttribute("style",`transform: scale(${t});transform-origin: top left; display: inline-block`),i.textContent=r;const{width:l,height:u}=n.image;return a.setAttribute("width",l.toString()),a.setAttribute("height",u.toString()),new XMLSerializer().serializeToString(a)}function xr(o,e){const t=V.getOptimalCanvasAndContext(o.width,o.height,e),{context:r}=t;return r.clearRect(0,0,o.width,o.height),r.drawImage(o,0,0),t}function gr(o,e,t){return new Promise(async r=>{t&&await new Promise(n=>setTimeout(n,100)),o.onload=()=>{r()},o.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,o.crossOrigin="anonymous"})}class st{constructor(e){this._activeTextures={},this._renderer=e,this._createCanvas=e.type===ie.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getManagedTexture(e){const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].promise;const r=this._buildTexturePromise(e).then(n=>(this._activeTextures[t].texture=n,n));return this._activeTextures[t]={texture:null,promise:r,usageCount:1},r}getReferenceCount(e){var t;return((t=this._activeTextures[e])==null?void 0:t.usageCount)??null}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(t.texture?this._cleanUp(t.texture):t.promise.then(r=>{t.texture=r,this._cleanUp(t.texture)}).catch(()=>{Z("HTMLTextSystem: Failed to clean texture")}),this._activeTextures[e]=null))}getTexturePromise(e){return this._buildTexturePromise(e)}async _buildTexturePromise(e){const{text:t,style:r,resolution:n,textureStyle:s}=e,i=L.get($e),a=dr(t,r),l=await pr(a),u=Ot(t,r,l,i),d=Math.ceil(Math.ceil(Math.max(1,u.width)+r.padding*2)*n),c=Math.ceil(Math.ceil(Math.max(1,u.height)+r.padding*2)*n),h=i.image,f=2;h.width=(d|0)+f,h.height=(c|0)+f;const m=mr(t,r,n,l,i);await gr(h,m,lr()&&a.length>0);const _=h;let x;this._createCanvas&&(x=xr(h,n));const g=nt(x?x.canvas:_,h.width-f,h.height-f,n);return s&&(g.source.style=s),this._createCanvas&&(this._renderer.texture.initSource(g.source),V.returnCanvasAndContext(x)),L.return(i),g}returnTexturePromise(e){e.then(t=>{this._cleanUp(t)}).catch(()=>{Z("HTMLTextSystem: Failed to clean texture")})}_cleanUp(e){w.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId="unknown"}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexturePromise(this._activeTextures[e].promise);this._activeTextures=null}}st.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"htmlText"};class _r extends Le{constructor(e){super(),this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{canvasText:e}=this._renderer;e.getReferenceCount(this.currentKey)>0?e.decreaseReferenceCount(this.currentKey):this.texture&&e.returnTexture(this.texture),this._renderer.runners.resolutionChange.remove(this),this._renderer=null}}class it{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r?!0:e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const n=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==n)&&this._updateGpuText(e),e._didTextUpdate=!1,se(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new _r(this._renderer);return t.currentKey="--",t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}it.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"text"};class at{constructor(e){this._activeTextures={},this._renderer=e}getTexture(e,t,r,n){typeof e=="string"&&(C("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:r,resolution:t}),e.style instanceof ge||(e.style=new ge(e.style)),e.textureStyle instanceof re||(e.textureStyle=new re(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:s,style:i,textureStyle:a}=e,l=e.resolution??this._renderer.resolution,{frame:u,canvasAndContext:d}=$.getCanvasAndContext({text:s,style:i,resolution:l}),c=nt(d.canvas,u.width,u.height,l);if(a&&(c.source.style=a),i.trim&&(u.pad(i.padding),c.frame.copyFrom(u),c.frame.scale(1/l),c.updateUvs()),i.filters){const h=this._applyFilters(c,i.filters);return this.returnTexture(c),$.returnCanvasAndContext(d),h}return this._renderer.texture.initSource(c._source),$.returnCanvasAndContext(d),c}returnTexture(e){const t=e.source;t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",w.returnTexture(e,!0)}renderTextToCanvas(){C("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const r=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:r,usageCount:1},r}decreaseReferenceCount(e){const t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null)}getReferenceCount(e){var t;return((t=this._activeTextures[e])==null?void 0:t.usageCount)??0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){const r=this._renderer.renderTarget.renderTarget,n=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(r,!1),n}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}}at.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"canvasText"};b.add(Ye);b.add(He);b.add(je);b.add(Ct);b.add(qe);b.add(Qe);b.add(Je);b.add(at);b.add(it);b.add(tt);b.add(st);b.add(rt);b.add(et);b.add(Ze);b.add(Xe);b.add(Ke);
