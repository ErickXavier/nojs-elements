/**
 * NoJS Elements v1.11.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
var It=Object.defineProperty;var br=Object.getOwnPropertyDescriptor;var hr=Object.getOwnPropertyNames;var vr=Object.prototype.hasOwnProperty;var yr=(e,t)=>{for(var r in t)It(e,r,{get:t[r],enumerable:!0})},xr=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of hr(t))!vr.call(e,n)&&n!==r&&It(e,n,{get:()=>t[n],enumerable:!(i=br(t,n))||i.enumerable});return e};var Er=e=>xr(It({},"__esModule",{value:!0}),e);var Kr={};yr(Kr,{default:()=>Vr});module.exports=Er(Kr);var m={dragging:null,selected:new Map,placeholder:null},Et=new Map;function Rt(){m.dragging=null,m.selected.clear(),m.placeholder=null,Et.clear()}function it(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let e=`
.nojs-dragging {
  opacity: 0.5;
  cursor: grabbing !important;
}
.nojs-drag-over {
  outline: 2px dashed #3b82f6;
  outline-offset: -2px;
}
.nojs-drop-placeholder {
  border: 2px dashed #3b82f6;
  border-radius: 6px;
  background: color-mix(in srgb, #3b82f6 6%, transparent);
  box-sizing: border-box;
  min-height: 2.5rem;
  transition: all 0.15s ease;
  pointer-events: none;
}
.nojs-drop-reject {
  outline: 2px dashed #ef4444;
  outline-offset: -2px;
  background: color-mix(in srgb, #ef4444 4%, transparent);
}
.nojs-selected {
  outline: 2px solid #3b82f6;
  outline-offset: 1px;
}
[drag-axis="x"] { touch-action: pan-y; }
[drag-axis="y"] { touch-action: pan-x; }
@keyframes nojs-drop-settle {
  from { transform: scale(1.05); opacity: 0.8; }
  to   { transform: scale(1);    opacity: 1; }
}
.nojs-drop-settle {
  animation: nojs-drop-settle 0.2s ease-out;
}
.nojs-drag-list-empty {
  min-height: 3rem;
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-dnd",""),t.textContent=e,document.head.appendChild(t)}function ft(e){let t=0;for(let r of e.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?t+=ft(r):t++}return t}function st(e,t,r,i){let n=[...e.children].filter(o=>!o.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let o=0;o<n.length;o++){let s=(n[o].style&&n[o].style.display==="contents"&&n[o].firstElementChild||n[o]).getBoundingClientRect();if(i==="horizontal"){let c=s.left+s.width/2;if(t<c)return o}else if(i==="grid"){let c=s.left+s.width/2,f=s.top+s.height/2;if(r<f&&t<c||r<s.top+s.height&&t<c)return o}else{let c=s.top+s.height/2;if(r<c)return o}}return n.length}function At(e,t,r,i){O();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=i||"nojs-drop-placeholder",m.dragging&&m.dragging.sourceEl){let s=(m.dragging.sourceEl.firstElementChild||m.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let d=document.getElementById(r.startsWith("#")?r.slice(1):r);d&&d.content?(n=document.createElement("div"),n.style.display="contents",n.className=i||"nojs-drop-placeholder",n.appendChild(d.content.cloneNode(!0))):(n=document.createElement("div"),n.className=i||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let o=[...e.children].filter(d=>!d.classList.contains("nojs-drop-placeholder"));t>=o.length?e.appendChild(n):e.insertBefore(n,o[t]),m.placeholder=n}function O(){m.placeholder&&(m.placeholder.remove(),m.placeholder=null)}function N(e,t){return!t||t==="*"?!0:t.split(",").map(i=>i.trim()).includes(e)}function Ot(e,t){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let i=e.style&&e.style.display==="contents"&&e.firstElementChild||e,n=i.getBoundingClientRect(),o=n.width,d=n.height,s=getComputedStyle(i),c=Math.min(t,3);for(let l=c-1;l>=0;l--){let u=document.createElement("div"),h=l*4;u.style.cssText="position:absolute;top:"+h+"px;left:"+h+"px;width:"+o+"px;height:"+d+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",l===0?(u.innerHTML=i.innerHTML,u.style.background=s.backgroundColor||"#fff",u.style.border=s.border,u.style.padding=s.padding,u.style.fontSize=s.fontSize,u.style.color=s.color,u.style.fontFamily=s.fontFamily):(u.style.background=s.backgroundColor||"#fff",u.style.border=s.border||"1px solid #ddd"),r.appendChild(u)}let f=document.createElement("div");return f.textContent=t,f.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(f),r.style.width=o+(c-1)*4+"px",r.style.height=d+(c-1)*4+"px",r}function Gt(e){e.directive("drag",{priority:15,init(t,r,i){it();let n=e.findContext(t),o=t.getAttribute("drag-type")||"default",d=t.getAttribute("drag-effect")||"move",s=t.getAttribute("drag-handle"),c=t.getAttribute("drag-image"),f=t.getAttribute("drag-image-offset")||"0,0",l=t.getAttribute("drag-disabled"),u=t.getAttribute("drag-class")||"nojs-dragging",h=t.getAttribute("drag-ghost-class");t.draggable=!0,t.setAttribute("aria-grabbed","false"),t.getAttribute("tabindex")||t.setAttribute("tabindex","0");let p=!0;if(s){let v=y=>{p=!!y.target.closest(s)};t.addEventListener("mousedown",v),e._onDispose(()=>t.removeEventListener("mousedown",v))}let a=v=>{if(s&&!p){v.preventDefault();return}if(l&&e.evaluate(l,n)){v.preventDefault();return}let y=e.evaluate(i,n),x=t.getAttribute("drag-group"),j=y;if(x&&m.selected.has(x)){let E=m.selected.get(x);E.size>0&&[...E].some(_=>_.el===t)&&(j=[...E].map(_=>_.item))}if(m.dragging={item:j,type:o,effect:d,sourceEl:t,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},v.dataTransfer){if(v.dataTransfer.effectAllowed=d,v.dataTransfer.setData("text/plain",""),Array.isArray(j)&&j.length>1&&v.dataTransfer.setDragImage){let E=Ot(t,j.length);document.body.appendChild(E);let B=t.getBoundingClientRect();v.dataTransfer.setDragImage(E,B.width/2,B.height/2),requestAnimationFrame(()=>E.remove())}else if(c&&v.dataTransfer.setDragImage)if(c==="none"){let E=document.createElement("div");E.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(E);let[B,_]=f.split(",").map(Number);v.dataTransfer.setDragImage(E,B||0,_||0),requestAnimationFrame(()=>E.remove())}else{let E=t.querySelector(c);if(E){let[B,_]=f.split(",").map(Number);h&&E.classList.add(h),v.dataTransfer.setDragImage(E,B||0,_||0)}}}if(u.split(/\s+/).filter(Boolean).forEach(E=>t.classList.add(E)),Array.isArray(j)&&x&&m.selected.has(x))for(let E of m.selected.get(x))E.el!==t&&u.split(/\s+/).filter(Boolean).forEach(B=>E.el.classList.add(B));t.setAttribute("aria-grabbed","true"),t.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:j,index:m.dragging.sourceIndex,el:t}}))},g=()=>{u.split(/\s+/).filter(Boolean).forEach(y=>t.classList.remove(y));let v=t.getAttribute("drag-group");if(v&&m.selected.has(v))for(let y of m.selected.get(v))u.split(/\s+/).filter(Boolean).forEach(x=>y.el.classList.remove(x));if(t.setAttribute("aria-grabbed","false"),h&&c&&c!=="none"){let y=t.querySelector(c);y&&y.classList.remove(h)}t.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,detail:{item:m.dragging?.item,index:m.dragging?.sourceIndex,dropped:m.dragging===null}})),m.dragging=null,O()};if(t.addEventListener("dragstart",a),t.addEventListener("dragend",g),e._onDispose(()=>{t.removeEventListener("dragstart",a),t.removeEventListener("dragend",g)}),l){let v=function(){let x=!!e.evaluate(l,n);t.draggable=!x,x?t.removeAttribute("aria-grabbed"):t.setAttribute("aria-grabbed","false")},y=n.$watch(v);e._onDispose(y)}let b=v=>{if(m.dragging&&!m.dragging.sourceEl.isConnected&&(m.dragging=null),v.key===" "&&!m.dragging){v.preventDefault();let y=e.evaluate(i,n);m.dragging={item:y,type:o,effect:d,sourceEl:t,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},u.split(/\s+/).filter(Boolean).forEach(x=>t.classList.add(x)),t.setAttribute("aria-grabbed","true"),t.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:y,index:null,el:t}}))}else v.key==="Escape"&&m.dragging&&m.dragging.sourceEl===t&&(v.preventDefault(),u.split(/\s+/).filter(Boolean).forEach(y=>t.classList.remove(y)),t.setAttribute("aria-grabbed","false"),m.dragging=null,O())};t.addEventListener("keydown",b),e._onDispose(()=>t.removeEventListener("keydown",b))}})}function Wt(e){e.directive("drop",{priority:15,init(t,r,i){it();let n=e.findContext(t),o=t.getAttribute("drop-accept")||"default",d=t.getAttribute("drop-effect")||"move",s=t.getAttribute("drop-class")||"nojs-drag-over",c=t.getAttribute("drop-reject-class")||"nojs-drop-reject",f=t.getAttribute("drop-disabled"),l=t.getAttribute("drop-max"),u=t.getAttribute("drop-sort"),h=t.getAttribute("drop-placeholder"),p=t.getAttribute("drop-placeholder-class");t.setAttribute("aria-dropeffect",d);let a=0,g=j=>{if(!m.dragging||f&&e.evaluate(f,n))return;let E=N(m.dragging.type,o),B=!0;if(l){let _=e.evaluate(l,n),A=ft(t);typeof _=="number"&&A>=_&&(B=!1)}if(!E||!B){c.split(/\s+/).filter(Boolean).forEach(_=>t.classList.add(_)),s.split(/\s+/).filter(Boolean).forEach(_=>t.classList.remove(_)),O();return}if(c.split(/\s+/).filter(Boolean).forEach(_=>t.classList.remove(_)),j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect=d),u){let _=st(t,j.clientX,j.clientY,u);h&&At(t,_,h,p),t.dispatchEvent(new CustomEvent("drag-over",{bubbles:!1,detail:{item:m.dragging.item,index:_}}))}},b=j=>{if(m.dragging&&!(f&&e.evaluate(f,n))&&(a++,a===1)){let E=N(m.dragging.type,o),B=!0;if(l){let _=e.evaluate(l,n),A=ft(t);typeof _=="number"&&A>=_&&(B=!1)}E&&B?(s.split(/\s+/).filter(Boolean).forEach(_=>t.classList.add(_)),t.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:m.dragging.item,type:m.dragging.type}}))):c.split(/\s+/).filter(Boolean).forEach(_=>t.classList.add(_))}},v=j=>{m.dragging&&(a--,a<=0&&(a=0,s.split(/\s+/).filter(Boolean).forEach(E=>t.classList.remove(E)),c.split(/\s+/).filter(Boolean).forEach(E=>t.classList.remove(E)),O(),t.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:m.dragging.item}}))))},y=j=>{if(j.preventDefault(),j.stopPropagation(),a=0,!m.dragging||f&&e.evaluate(f,n)||!N(m.dragging.type,o))return;if(l){let D=e.evaluate(l,n),Q=ft(t);if(typeof D=="number"&&Q>=D)return}let E=m.dragging.item,B=m.dragging.type,_=m.dragging.effect,A=0;u&&(A=st(t,j.clientX,j.clientY,u)),s.split(/\s+/).filter(Boolean).forEach(D=>t.classList.remove(D)),c.split(/\s+/).filter(Boolean).forEach(D=>t.classList.remove(D)),O();let C={$drag:E,$dragType:B,$dragEffect:_,$dropIndex:A,$source:{list:m.dragging.sourceList,index:m.dragging.sourceIndex,el:m.dragging.sourceEl},$target:{list:null,index:A,el:t},$el:t};e._execStatement(i,n,C),m.dragging=null,t.dispatchEvent(new CustomEvent("drop",{bubbles:!1,detail:{item:E,index:A,source:C.$source,target:C.$target,effect:_}}))},x=j=>{m.dragging&&(j.key==="Enter"||j.key===" ")&&(j.preventDefault(),y(j))};t.addEventListener("dragover",g),t.addEventListener("dragenter",b),t.addEventListener("dragleave",v),t.addEventListener("drop",y),t.addEventListener("keydown",x),e._onDispose(()=>{t.removeEventListener("dragover",g),t.removeEventListener("dragenter",b),t.removeEventListener("dragleave",v),t.removeEventListener("drop",y),t.removeEventListener("keydown",x)})}})}function Vt(e){e.directive("drag-list",{priority:10,init(t,r,i){it();let n=e.findContext(t),o=t.getAttribute("template"),d=t.getAttribute("drag-list-key"),s=t.getAttribute("drag-list-item")||"item",c=t.getAttribute("drop-sort")||"vertical",f=t.getAttribute("drag-type")||"__draglist_"+i,l=t.getAttribute("drop-accept")||f,u=t.hasAttribute("drag-list-copy"),h=t.hasAttribute("drag-list-remove"),p=t.getAttribute("drag-disabled"),a=t.getAttribute("drop-disabled"),g=t.getAttribute("drop-max"),b=t.getAttribute("drop-placeholder"),v=t.getAttribute("drop-placeholder-class"),y=t.getAttribute("drag-class")||"nojs-dragging",x=t.getAttribute("drop-class")||"nojs-drag-over",j=t.getAttribute("drop-reject-class")||"nojs-drop-reject",E=t.getAttribute("drop-settle-class")||"nojs-drop-settle",B=t.getAttribute("drop-empty-class")||"nojs-drag-list-empty";t.setAttribute("role","listbox"),t.setAttribute("aria-dropeffect",u?"copy":"move");let _={listPath:i,ctx:n,el:t};Et.set(t,_),e._onDispose(()=>Et.delete(t));let A=0,C=null;function D(){let T=e.resolve(i,n);if(!Array.isArray(T))return;if(T===C&&T.length>0&&t.children.length>0){for(let L of t.children)L.__ctx&&L.__ctx.$notify&&L.__ctx.$notify();return}C=T;let F=o?document.getElementById(o):null;if(!F)return;e._disposeChildren(t),t.innerHTML="";let z=T.length;T.forEach((L,R)=>{let ot={[s]:L,$index:R,$count:z,$first:R===0,$last:R===z-1,$even:R%2===0,$odd:R%2!==0},U=e.createContext(ot,n),W=F.content.cloneNode(!0),k=document.createElement("div");k.style.display="contents",k.__ctx=U,k.setAttribute("role","option"),k.appendChild(W),t.appendChild(k);let M=k.firstElementChild||k;M.draggable=!0,M.setAttribute("aria-grabbed","false"),M.getAttribute("tabindex")||M.setAttribute("tabindex","0");let tt=H=>{if(p&&e.evaluate(p,n)){H.preventDefault();return}m.dragging={item:L,type:f,effect:u?"copy":"move",sourceEl:k,sourceCtx:U,sourceList:T,sourceIndex:R,listDirective:{el:t,listPath:i,ctx:n,keyProp:d,copyMode:u,removeMode:h}},H.dataTransfer&&(H.dataTransfer.effectAllowed=u?"copy":"move",H.dataTransfer.setData("text/plain","")),y.split(/\s+/).filter(Boolean).forEach(V=>M.classList.add(V)),M.setAttribute("aria-grabbed","true"),t.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:L,index:R,el:M}}))},xt=()=>{y.split(/\s+/).filter(Boolean).forEach(H=>M.classList.remove(H)),M.setAttribute("aria-grabbed","false"),m.dragging&&m.dragging.sourceEl===k&&(m.dragging=null),O()};k.addEventListener("dragstart",tt),k.addEventListener("dragend",xt);let qt=H=>{if(H.key===" "&&!m.dragging)H.preventDefault(),m.dragging={item:L,type:f,effect:u?"copy":"move",sourceEl:k,sourceCtx:U,sourceList:T,sourceIndex:R,listDirective:{el:t,listPath:i,ctx:n,keyProp:d,copyMode:u,removeMode:h}},y.split(/\s+/).filter(Boolean).forEach(V=>M.classList.add(V)),M.setAttribute("aria-grabbed","true");else if(H.key==="Escape"&&m.dragging&&m.dragging.sourceEl===k)H.preventDefault(),y.split(/\s+/).filter(Boolean).forEach(V=>M.classList.remove(V)),M.setAttribute("aria-grabbed","false"),m.dragging=null,O();else if((H.key==="ArrowDown"||H.key==="ArrowRight")&&m.dragging&&m.dragging.sourceEl===k){H.preventDefault();let V=k.nextElementSibling;V&&(V.firstElementChild||V).focus()}else if((H.key==="ArrowUp"||H.key==="ArrowLeft")&&m.dragging&&m.dragging.sourceEl===k){H.preventDefault();let V=k.previousElementSibling;V&&(V.firstElementChild||V).focus()}};k.addEventListener("keydown",qt),k.__disposers=k.__disposers||[],k.__disposers.push(()=>k.removeEventListener("dragstart",tt),()=>k.removeEventListener("dragend",xt),()=>k.removeEventListener("keydown",qt)),e.processTree(k)});let S=T.length===0;B.split(/\s+/).filter(Boolean).forEach(L=>t.classList.toggle(L,S))}let Q=T=>{if(!m.dragging||a&&e.evaluate(a,n))return;let F=N(m.dragging.type,l),z=!0;if(g){let L=e.evaluate(g,n),R=e.resolve(i,n);typeof L=="number"&&Array.isArray(R)&&R.length>=L&&(z=!1)}if(!F||!z){j.split(/\s+/).filter(Boolean).forEach(L=>t.classList.add(L)),x.split(/\s+/).filter(Boolean).forEach(L=>t.classList.remove(L)),O();return}j.split(/\s+/).filter(Boolean).forEach(L=>t.classList.remove(L)),T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect=m.dragging.effect||(u?"copy":"move"));let S=st(t,T.clientX,T.clientY,c);b&&At(t,S,b,v)},Y=T=>{if(m.dragging&&!(a&&e.evaluate(a,n))&&(A++,A===1)){let F=N(m.dragging.type,l),z=!0;if(g){let S=e.evaluate(g,n),L=e.resolve(i,n);typeof S=="number"&&Array.isArray(L)&&L.length>=S&&(z=!1)}F&&z?(x.split(/\s+/).filter(Boolean).forEach(S=>t.classList.add(S)),t.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:m.dragging.item,type:m.dragging.type}}))):j.split(/\s+/).filter(Boolean).forEach(S=>t.classList.add(S))}},yt=()=>{m.dragging&&(A--,A<=0&&(A=0,x.split(/\s+/).filter(Boolean).forEach(T=>t.classList.remove(T)),j.split(/\s+/).filter(Boolean).forEach(T=>t.classList.remove(T)),O(),t.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:m.dragging?.item}}))))},J=T=>{if(T.preventDefault(),T.stopPropagation(),A=0,!m.dragging||a&&e.evaluate(a,n)||!N(m.dragging.type,l))return;if(g){let W=e.evaluate(g,n),k=e.resolve(i,n);if(typeof W=="number"&&Array.isArray(k)&&k.length>=W)return}let F=m.dragging.item,z=m.dragging.listDirective,S=m.dragging.sourceIndex,L=st(t,T.clientX,T.clientY,c);x.split(/\s+/).filter(Boolean).forEach(W=>t.classList.remove(W)),j.split(/\s+/).filter(Boolean).forEach(W=>t.classList.remove(W)),O();let R=e.resolve(i,n);if(!Array.isArray(R))return;let ot=z&&z.el===t;if(ot&&S===L){m.dragging=null;return}if(ot&&S+1===L){m.dragging=null;return}let U=[...R];if(ot){let[W]=U.splice(S,1),k=S<L?L-1:L;U.splice(k,0,W),n.$set(i,U),t.dispatchEvent(new CustomEvent("reorder",{bubbles:!0,detail:{list:U,item:F,from:S,to:k}}))}else{let W=u&&typeof F=="object"?{...F}:F;if(U.splice(L,0,W),n.$set(i,U),z&&!z.copyMode&&(h||z.removeMode)){let k=e.resolve(z.listPath,z.ctx);if(Array.isArray(k)&&S!=null){let M=k.filter((tt,xt)=>xt!==S);z.ctx.$set(z.listPath,M),z.el.dispatchEvent(new CustomEvent("remove",{bubbles:!0,detail:{list:M,item:F,index:S}}))}}t.dispatchEvent(new CustomEvent("receive",{bubbles:!0,detail:{list:U,item:F,from:S,fromList:z?e.resolve(z.listPath,z.ctx):null}}))}requestAnimationFrame(()=>{let k=[...t.children][ot&&S<L?L-1:L];if(k){let M=k.firstElementChild||k;E.split(/\s+/).filter(Boolean).forEach(tt=>M.classList.add(tt)),M.addEventListener("animationend",()=>{E.split(/\s+/).filter(Boolean).forEach(tt=>M.classList.remove(tt))},{once:!0})}}),m.dragging=null},Pt=T=>{if(m.dragging&&N(m.dragging.type,l)&&(T.key==="Enter"||T.key===" ")){T.preventDefault();let F=t.querySelector(":focus");if(F){let S=(F.style?.display==="contents"&&F.firstElementChild||F).getBoundingClientRect(),L={preventDefault(){},stopPropagation(){},clientX:S.left+S.width/2,clientY:S.top+S.height+1,dataTransfer:null};J(L)}}};t.addEventListener("dragover",Q),t.addEventListener("dragenter",Y),t.addEventListener("dragleave",yt),t.addEventListener("drop",J),t.addEventListener("keydown",Pt),e._onDispose(()=>{t.removeEventListener("dragover",Q),t.removeEventListener("dragenter",Y),t.removeEventListener("dragleave",yt),t.removeEventListener("drop",J),t.removeEventListener("keydown",Pt)});let gr=n.$watch(D);e._onDispose(gr),D()}})}function Kt(e){e.directive("drag-multiple",{priority:16,init(t,r){let i=e.findContext(t),n=t.getAttribute("drag-group"),o=t.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){e._warn("drag-multiple requires drag-group attribute");return}m.selected.has(n)||m.selected.set(n,new Set);let d=m.selected.get(n),s=f=>{let l=t.getAttribute("drag"),h={item:l?e.evaluate(l,i):null,el:t,ctx:i};if(f.ctrlKey||f.metaKey){let p=[...d].find(a=>a.el===t);p?(d.delete(p),o.split(/\s+/).filter(Boolean).forEach(a=>t.classList.remove(a))):(d.add(h),o.split(/\s+/).filter(Boolean).forEach(a=>t.classList.add(a)))}else{for(let p of d)o.split(/\s+/).filter(Boolean).forEach(a=>p.el.classList.remove(a));d.clear(),d.add(h),o.split(/\s+/).filter(Boolean).forEach(p=>t.classList.add(p))}};t.addEventListener("click",s),e._onDispose(()=>{t.removeEventListener("click",s);let f=[...d].find(l=>l.el===t);f&&d.delete(f)});let c=f=>{if(f.key==="Escape"){for(let l of d)o.split(/\s+/).filter(Boolean).forEach(u=>l.el.classList.remove(u));d.clear()}};window.addEventListener("keydown",c),e._onDispose(()=>window.removeEventListener("keydown",c))}})}function Yt(e,t={}){Gt(e),Wt(e),Vt(e),Kt(e)}function Ut(){Rt()}var gt=new Map,K=new Map;function Xt(){for(let e of K.values())clearTimeout(e);K.clear();for(let e of gt.values())e.remove();gt.clear()}function Zt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let e=`
.nojs-tooltip {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.15s ease;
  max-width: 18rem;
  padding: 0.45rem 0.75rem;
  background: #1E293B;
  color: #F1F5F9;
  font-size: 0.8rem;
  line-height: 1.4;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(2px);
}
.nojs-tooltip[aria-hidden="false"] {
  opacity: 1;
  transform: translateY(0);
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tooltip",""),t.textContent=e,document.head.appendChild(t)}var wt=8;function Ar(e,t,r){let i=t.getBoundingClientRect(),n=e.getBoundingClientRect(),o=window.innerWidth,d=window.innerHeight,s,c;switch(r){case"bottom":s=i.bottom+wt,c=i.left+(i.width-n.width)/2;break;case"left":s=i.top+(i.height-n.height)/2,c=i.left-n.width-wt;break;case"right":s=i.top+(i.height-n.height)/2,c=i.right+wt;break;default:s=i.top-n.height-wt,c=i.left+(i.width-n.width)/2;break}c<4&&(c=4),c+n.width>o-4&&(c=o-n.width-4),s<4&&(s=4),s+n.height>d-4&&(s=d-n.height-4),e.style.top=`${s}px`,e.style.left=`${c}px`}var wr=0;function jr(e,t,r){document.body.appendChild(t),Ar(t,e,r),t.setAttribute("aria-hidden","false")}function kr(e,t){t.setAttribute("aria-hidden","true"),t.remove()}function Qt(e){e.directive("tooltip",{priority:20,init(t,r,i){Zt();let n=i;if(!n){e._warn("[tooltip] attribute value (tooltip text) is required.");return}let o=t.getAttribute("tooltip-position")||"top",d=parseInt(t.getAttribute("tooltip-delay"),10)||300,s=t.getAttribute("tooltip-disabled"),c=s?e.findContext(t):null,f=`nojs-tooltip-${++wr}`,l=document.createElement("div");l.className="nojs-tooltip",l.setAttribute("role","tooltip"),l.setAttribute("id",f),l.setAttribute("aria-hidden","true"),l.textContent=n,t.setAttribute("aria-describedby",f),gt.set(t,l);let u=()=>{if(s&&c&&e.evaluate(s,c))return;K.has(t)&&clearTimeout(K.get(t));let y=setTimeout(()=>{K.delete(t),!(s&&c&&e.evaluate(s,c))&&jr(t,l,o)},d);K.set(t,y)},h=()=>{K.has(t)&&(clearTimeout(K.get(t)),K.delete(t)),kr(t,l)},p=()=>u(),a=()=>h(),g=()=>u(),b=()=>h(),v=y=>{y.key==="Escape"&&l.getAttribute("aria-hidden")==="false"&&h()};t.addEventListener("mouseenter",p),t.addEventListener("mouseleave",a),t.addEventListener("focusin",g),t.addEventListener("focusout",b),t.addEventListener("keydown",v),e._onDispose(()=>{t.removeEventListener("mouseenter",p),t.removeEventListener("mouseleave",a),t.removeEventListener("focusin",g),t.removeEventListener("focusout",b),t.removeEventListener("keydown",v),K.has(t)&&(clearTimeout(K.get(t)),K.delete(t)),l.remove(),gt.delete(t)})}})}function Nt(e,t={}){Qt(e)}function Jt(){Xt()}var P=new Map;function te(){P.clear()}function jt(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let e=`
.nojs-popover {
  position: fixed;
  z-index: 9998;
  margin: 0;
  border: 1px solid #E2E8F0;
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06);
  max-width: 20rem;
}
.nojs-popover:popover-open {
  display: block;
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-popover",""),t.textContent=e,document.head.appendChild(t)}var at=8;function Bt(e,t,r){let i=t.getBoundingClientRect(),n=e.getBoundingClientRect(),o=window.innerWidth,d=window.innerHeight,s,c;switch(r){case"top":s=i.top-n.height-at,c=i.left+(i.width-n.width)/2;break;case"left":s=i.top+(i.height-n.height)/2,c=i.left-n.width-at;break;case"right":s=i.top+(i.height-n.height)/2,c=i.right+at;break;default:s=i.bottom+at,c=i.left+(i.width-n.width)/2;break}r==="bottom"&&s+n.height>d&&(s=i.top-n.height-at),r==="top"&&s<0&&(s=i.bottom+at),c<4&&(c=4),c+n.width>o-4&&(c=o-n.width-4),s<4&&(s=4),s+n.height>d-4&&(s=d-n.height-4),e.style.top=`${s}px`,e.style.left=`${c}px`}function ee(e){e.directive("popover",{priority:20,init(r,i,n){jt();let o=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",o),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let d=r.getAttribute("popover-position")||"bottom";if(!P.has(o))P.set(o,{popoverEl:r,triggerEls:new Set,position:d,open:!1});else{let c=P.get(o);c.popoverEl=r,c.position=d}let s=c=>{let f=P.get(o);if(!f)return;let l=c.newState==="open";f.open=l;for(let u of f.triggerEls)u.setAttribute("aria-expanded",String(l))};r.addEventListener("toggle",s),e._onDispose(()=>{r.removeEventListener("toggle",s),P.delete(o)})}}),e.directive("popover-trigger",{priority:20,init(r,i,n){jt();let o=n;if(!o){let f=(r.closest("[use]")||r.parentElement)?.querySelector("[data-popover-id]");if(f&&(o=f.getAttribute("data-popover-id")),!o){e._warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",o),P.has(o)||P.set(o,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1}),P.get(o).triggerEls.add(r);let d=c=>{let f=P.get(o);if(!f||!f.popoverEl){e._warn(`[popover-trigger] no popover found with id "${o}".`);return}f.popoverEl.togglePopover(),requestAnimationFrame(()=>{f.popoverEl.matches(":popover-open")&&Bt(f.popoverEl,r,f.position)})};r.addEventListener("click",d);let s=c=>{let f=P.get(o);c.key==="Escape"&&f?.open&&(f.popoverEl.hidePopover(),r.focus())};document.addEventListener("keydown",s),e._onDispose(()=>{r.removeEventListener("click",d),document.removeEventListener("keydown",s);let c=P.get(o);c&&c.triggerEls.delete(r)})}}),e.directive("popover-dismiss",{priority:20,init(r){jt();let i=()=>{let n=r.closest(".nojs-popover");n&&n.hidePopover()};r.addEventListener("click",i),e._onDispose(()=>r.removeEventListener("click",i))}});let t=(r,i)=>t.open(r,i);t.open=(r,i)=>{let n=P.get(r);if(!n||!n.popoverEl)return!1;try{n.popoverEl.showPopover()}catch{return!1}let o=i||[...n.triggerEls][0];return o&&requestAnimationFrame(()=>Bt(n.popoverEl,o,n.position)),!0},t.close=r=>{let i=P.get(r);if(!i||!i.popoverEl)return!1;try{i.popoverEl.hidePopover()}catch{}return!0},t.toggle=(r,i)=>{let n=P.get(r);if(!n||!n.popoverEl)return!1;n.popoverEl.togglePopover();let o=i||[...n.triggerEls][0];return o&&n.popoverEl.matches(":popover-open")&&requestAnimationFrame(()=>Bt(n.popoverEl,o,n.position)),!0},e.popover=t}function re(e,t={}){ee(e)}function ne(){te()}var G=[],X=new Map,_r=1e4;function oe(){return _r+G.length}function ie(){G.length=0,X.clear()}function dt(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let e=`
.nojs-modal {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  margin: 0;
  border: none;
  padding: 0;
  max-width: 100dvw;
  max-height: 100dvh;
  background: transparent;
}
.nojs-modal:popover-open {
  display: flex !important;
  inset: 0 !important;
  margin: 0 !important;
  width: 100dvw !important;
  height: 100dvh !important;
}
.nojs-modal::backdrop {
  background: rgb(0 0 0 / 0.5);
}
.nojs-modal[data-nojs-no-backdrop]::backdrop {
  background: transparent;
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-modal",""),t.textContent=e,document.head.appendChild(t)}var ae='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',zt=new WeakMap;function Lr(e){let t=r=>{if(r.key!=="Tab")return;let i=[...e.querySelectorAll(ae)].filter(d=>d.offsetParent!==null);if(i.length===0){r.preventDefault();return}let n=i[0],o=i[i.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),o.focus()):document.activeElement===o&&(r.preventDefault(),n.focus())};e.addEventListener("keydown",t),zt.set(e,t)}function se(e){let t=zt.get(e);t&&(e.removeEventListener("keydown",t),zt.delete(e))}var mt=new WeakMap;function de(e){e.directive("modal",{priority:10,init(r,i,n){dt();let o=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${o}`,r.setAttribute("data-modal-id",o),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let d=r.querySelector("h1, h2, h3, h4, h5, h6");d&&(d.id||(d.id=`nojs-modal-heading-${o}`),r.setAttribute("aria-labelledby",d.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let c=r.getAttribute("modal-class"),f=r.getAttribute("modal-escape"),l=h=>{h.target===r&&s!=="false"&&f!=="false"&&ct(r,o)};r.addEventListener("click",l),X.set(o,r);let u=h=>{if(h.newState==="open"){if(r.style.zIndex=String(oe()),c&&c.split(/\s+/).filter(Boolean).forEach(p=>r.classList.add(p)),requestAnimationFrame(()=>{let p=r.querySelector(ae);p?p.focus():r.focus()}),Lr(r),f!=="false"){let p=a=>{a.key==="Escape"&&(a.stopPropagation(),ct(r,o))};r.addEventListener("keydown",p),mt.set(r,p)}}else if(h.newState==="closed"){c&&c.split(/\s+/).filter(Boolean).forEach(g=>r.classList.remove(g)),se(r);let p=mt.get(r);p&&(r.removeEventListener("keydown",p),mt.delete(r));let a=G.findIndex(g=>g.id===o);if(a!==-1){let g=G[a];G.splice(a,1),g.triggerEl&&requestAnimationFrame(()=>{g.triggerEl.focus()})}}};r.addEventListener("toggle",u),e._onDispose(()=>{r.removeEventListener("click",l),r.removeEventListener("toggle",u),se(r);let h=mt.get(r);h&&(r.removeEventListener("keydown",h),mt.delete(r)),X.delete(o);let p=G.findIndex(a=>a.id===o);p!==-1&&G.splice(p,1)})}});let t=r=>t.open(r);t.open=r=>{let i=X.get(r);if(!i)return!1;G.push({id:r,el:i,triggerEl:null});try{i.showPopover()}catch{return!1}return!0},t.close=r=>{let i=X.get(r);return i?(ct(i,r),!0):!1},t.closeAll=()=>{for(let r=G.length-1;r>=0;r--)ct(G[r].el,G[r].id)},e.modal=t}function ct(e,t){try{e.hidePopover()}catch{}}function ce(e){e.directive("modal-open",{priority:10,init(t,r,i){dt();let n=i;if(!n){let u=(t.closest("[use]")||t.parentElement)?.querySelector("[data-modal-id]");if(u&&(n=u.getAttribute("data-modal-id")),!n){e._warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded","false");let o=()=>{let l=X.get(n)||document.querySelector(`[data-modal-id="${n}"]`);if(!l){e._warn(`[modal-open] modal "${n}" not found`);return}G.push({id:n,el:l,triggerEl:t}),t.setAttribute("aria-expanded","true"),l.id&&t.setAttribute("aria-controls",l.id);try{l.showPopover()}catch{e._warn(`[modal-open] failed to open modal "${n}"`)}},d=()=>{t.setAttribute("aria-expanded","false")},s=null,c=null;requestAnimationFrame(()=>{let l=X.get(n);l&&(c=l,s=u=>{u.newState==="closed"&&t.setAttribute("aria-expanded","false")},l.addEventListener("toggle",s))}),t.addEventListener("click",o),e._onDispose(()=>{t.removeEventListener("click",o),c&&s&&c.removeEventListener("toggle",s)})}})}function le(e){e.directive("modal-close",{priority:10,init(t,r,i){dt();let n=()=>{let o,d;if(i){if(d=i,o=X.get(d),!o){e._warn(`[modal-close] modal "${d}" not found`);return}}else{if(o=t.closest("[modal]"),!o){e._warn("[modal-close] no parent modal found");return}d=o.getAttribute("modal")}ct(o,d)};t.addEventListener("click",n),e._onDispose(()=>{t.removeEventListener("click",n)})}})}function pe(e,t={}){de(e),ce(e),le(e)}function ue(){ie()}var bt={openMenus:new Map};function fe(){bt.openMenus.clear()}function lt(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let e=`
.nojs-dropdown-menu {
  position: fixed;
  z-index: 9999;
  margin: 0;
  min-width: max-content;
  list-style: none;
  padding: 0.3rem 0;
  background: #fff;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06);
  display: none;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
}
.nojs-dropdown-menu[data-open] {
  display: block;
}
.nojs-dropdown-item {
  display: block;
  width: 100%;
  padding: 0.45rem 0.875rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.875rem;
  color: #334155;
  text-decoration: none;
  transition: background 0.1s;
}
.nojs-dropdown-item:hover,
.nojs-dropdown-item:focus {
  background: #F1F5F9;
  outline: none;
}
.nojs-dropdown-item[aria-disabled="true"] {
  pointer-events: none;
  opacity: 0.4;
}
.nojs-dropdown-item:focus-visible {
  outline: 2px solid #0EA5E9;
  outline-offset: -2px;
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-dropdown",""),t.textContent=e,document.head.appendChild(t)}function ge(e,t,r){let i=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";e.style.top="",e.style.left="";let o=t.getBoundingClientRect(),d=e.getBoundingClientRect(),s=window.innerHeight,c=window.innerWidth,f,l;switch(i){case"top":f=o.top-d.height,l=o.left;break;case"left":f=o.top,l=o.left-d.width;break;case"right":f=o.top,l=o.right;break;default:f=o.bottom,l=o.left}i==="bottom"||i==="top"?n==="end"&&(l=o.right-d.width):n==="end"&&(f=o.bottom-d.height),i==="bottom"&&f+d.height>s&&o.top-d.height>0?f=o.top-d.height:i==="top"&&f<0&&o.bottom+d.height<=s&&(f=o.bottom),l<4&&(l=4),l+d.width>c-4&&(l=c-d.width-4),e.style.top=`${f}px`,e.style.left=`${l}px`}function be(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function me(e){let t=be(e);t.length&&t[0].focus()}function Cr(e){let t=be(e);t.length&&t[t.length-1].focus()}function he(e){e.directive("dropdown",{priority:15,init(r){lt()}}),e.directive("dropdown-toggle",{priority:15,init(r){lt();let i=r.closest("[dropdown]");if(!i)return;let n=i.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${Math.random().toString(36).slice(2,7)}`),r.setAttribute("aria-controls",n.id);function o(){n.setAttribute("data-open",""),n.showPopover&&n.showPopover(),r.setAttribute("aria-expanded","true"),ge(n,r,i),bt.openMenus.set(n,{toggle:r,wrapper:i})}function d(){n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),bt.openMenus.delete(n)}function s(){return r.getAttribute("aria-expanded")==="true"}let c=a=>{a.newState==="closed"&&s()&&d()};n.addEventListener("toggle",c);let f=a=>{a.preventDefault(),a.stopPropagation(),s()?d():o()};r.addEventListener("click",f);let l=a=>{s()&&!i.contains(a.target)&&d()};document.addEventListener("click",l,!0);let u=a=>{a.key==="Escape"&&s()&&(d(),r.focus())};document.addEventListener("keydown",u);let h=a=>{switch(a.key){case"Enter":case" ":a.preventDefault(),o(),me(n);break;case"ArrowDown":a.preventDefault(),o(),me(n);break;case"ArrowUp":a.preventDefault(),o(),Cr(n);break}};r.addEventListener("keydown",h);let p=()=>{s()&&ge(n,r,i)};window.addEventListener("scroll",p,!0),window.addEventListener("resize",p),e._onDispose(()=>{r.removeEventListener("click",f),r.removeEventListener("keydown",h),n.removeEventListener("toggle",c),document.removeEventListener("click",l,!0),document.removeEventListener("keydown",u),window.removeEventListener("scroll",p,!0),window.removeEventListener("resize",p),bt.openMenus.delete(n)})}}),e.directive("dropdown-menu",{priority:15,init(r){lt(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let t=r=>t.open(r);t.open=r=>{let i=document.getElementById(r);if(!i)return!1;let o=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!o||o.getAttribute("aria-expanded")==="true"?!1:(o.click(),!0)},t.close=r=>{let i=document.getElementById(r);if(!i)return!1;let o=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!o||o.getAttribute("aria-expanded")!=="true"?!1:(o.click(),!0)},e.dropdown=t}function Dr(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function ve(e){e.directive("dropdown-item",{priority:15,init(t){lt();let r=t.closest("[dropdown-menu]"),i=t.closest("[dropdown]");t.setAttribute("role","menuitem"),t.setAttribute("tabindex","-1"),t.classList.add("nojs-dropdown-item"),t.hasAttribute("disabled")&&t.setAttribute("aria-disabled","true");let n=d=>{if(!r)return;let s=Dr(r),c=s.indexOf(t);switch(d.key){case"ArrowDown":{d.preventDefault(),(c+1<s.length?s[c+1]:s[0]).focus();break}case"ArrowUp":{d.preventDefault(),(c-1>=0?s[c-1]:s[s.length-1]).focus();break}case"Home":{d.preventDefault(),s.length&&s[0].focus();break}case"End":{d.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{d.preventDefault(),t.click();break}case"Escape":{if(d.preventDefault(),r)try{r.hidePopover()}catch{}if(i){let f=i.querySelector("[dropdown-toggle]");f&&f.focus()}break}case"Tab":{if(r)try{r.hidePopover()}catch{}break}}};t.addEventListener("keydown",n),e._onDispose(()=>t.removeEventListener("keydown",n));let o=()=>{if(r)try{r.hidePopover()}catch{}if(i){let d=i.querySelector("[dropdown-toggle]");d&&d.focus()}};t.addEventListener("click",o),e._onDispose(()=>t.removeEventListener("click",o))}})}function ye(e,t={}){he(e),ve(e)}function xe(){fe()}var Z=new Map,pt=new Set,Ee=0;function Ae(){return++Ee}function we(){for(let e of pt)clearTimeout(e);pt.clear();for(let e of Z.values())e.remove();Z.clear(),Ee=0}function je(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let e=`
.nojs-toast-container {
  position: fixed;
  z-index: 10001;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  pointer-events: none;
  max-width: min(24rem, calc(100vw - 2rem));
}
.nojs-toast-container[data-position="top-right"] { top: 0; right: 0; }
.nojs-toast-container[data-position="top-left"] { top: 0; left: 0; }
.nojs-toast-container[data-position="bottom-right"] { bottom: 0; right: 0; }
.nojs-toast-container[data-position="bottom-left"] { bottom: 0; left: 0; }
.nojs-toast-container[data-position="top-center"] { top: 0; left: 50%; transform: translateX(-50%); }
.nojs-toast-container[data-position="bottom-center"] { bottom: 0; left: 50%; transform: translateX(-50%); }
.nojs-toast {
  pointer-events: auto;
  margin: 0;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  min-width: 16rem;
  background: #1E293B;
  color: #F8FAFC;
  font-size: 0.9rem;
  line-height: 1.4;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  opacity: 0;
  animation: nojs-toast-in 0.25s ease forwards;
}
.nojs-toast[data-type="success"] { background: #16A34A; }
.nojs-toast[data-type="error"]   { background: #DC2626; }
.nojs-toast[data-type="warning"] { background: #D97706; color: #0F172A; }
.nojs-toast[data-type="info"]    { background: #0284C7; }
.nojs-toast-dismiss {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 0.25rem;
  opacity: 0.7;
  line-height: 1;
}
.nojs-toast-dismiss:hover { opacity: 1; }
@keyframes nojs-toast-in {
  from { opacity: 0; transform: translateY(-0.5rem); }
  to   { opacity: 1; transform: translateY(0); }
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-toast",""),t.textContent=e,document.head.appendChild(t)}var Tr=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function Ft(){return Z.size>0?Z.values().next().value:Sr("top-right")}function Sr(e){if(Z.has(e))return Z.get(e);let t=document.createElement("div");return t.classList.add("nojs-toast-container"),t.setAttribute("data-position",e),t.setAttribute("role","log"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions"),document.body.appendChild(t),Z.set(e,t),t}function Ir(e){return e.startsWith("top")}function Mt(e,t,r,i,n){let o=Ae(),d=e.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",o),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let c=document.createElement("span");if(c.textContent=t,s.appendChild(c),n){let f=document.createElement("button");f.type="button",f.classList.add("nojs-toast-dismiss"),f.setAttribute("aria-label","Dismiss"),f.textContent="\xD7",f.addEventListener("click",()=>kt(s)),s.appendChild(f)}if(Ir(d)&&e.firstChild?e.insertBefore(s,e.firstChild):e.appendChild(s),i>0){let f=setTimeout(()=>{pt.delete(f),kt(s)},i);pt.add(f),s._toastTimerId=f}return s}function kt(e){!e||!e.isConnected||(e._toastTimerId!=null&&(clearTimeout(e._toastTimerId),pt.delete(e._toastTimerId)),e.remove())}function ke(e){je(),e.directive("toast-container",{priority:10,init(r,i,n){let o=n&&Tr.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",o),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),Z.set(o,r),e._onDispose(()=>{Z.get(o)===r&&Z.delete(o)})}}),e.directive("toast",{priority:10,init(r,i,n){if(!n)return;let o=r.getAttribute("toast-type")||"info",d=parseInt(r.getAttribute("toast-duration"),10)||3e3,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let p=()=>{let a=Ft();Mt(a,n,o,d,s)};r.addEventListener("click",p),e._onDispose(()=>r.removeEventListener("click",p));return}let f=e.findContext(r),l;function u(){let p=e.evaluate(n,f);if(p&&p!==l){let a=typeof p=="string"?p:String(p),g=Ft();Mt(g,a,o,d,s)}l=p}let h=f.$watch(u);e._onDispose(h)}});let t=(r,i="info",n=3e3)=>{if(typeof document>"u")return;let o=!0,d=Ft();return Mt(d,String(r),i,n,o)};t.dismiss=r=>{let i=document.querySelector(`[data-toast-id="${r}"]`);i&&kt(i)},t.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>kt(r))},e.toast=t}function _e(e,t={}){ke(e)}function Le(){we()}var et={containers:new Map};function Ce(){et.containers.clear()}function De(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let e=`
.nojs-tabs {
  display: flex;
  flex-direction: column;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}
.nojs-tabs[data-position="left"],
.nojs-tabs[data-position="right"] {
  flex-direction: row;
}
.nojs-tabs[data-position="bottom"] {
  flex-direction: column-reverse;
}
.nojs-tabs[data-position="right"] .nojs-tablist {
  order: 1;
}
.nojs-tablist {
  display: flex;
  gap: 0;
  background: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
  overflow-x: auto;
  scrollbar-width: none;
}
.nojs-tablist::-webkit-scrollbar { display: none; }
.nojs-tabs[data-position="left"] .nojs-tablist,
.nojs-tabs[data-position="right"] .nojs-tablist {
  flex-direction: column;
  border-bottom: none;
  border-right: 1px solid #E2E8F0;
  overflow-x: visible;
}
.nojs-tab {
  padding: 0.6rem 1.1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748B;
  white-space: nowrap;
  transition: color 0.15s, background 0.15s;
  position: relative;
}
.nojs-tab:hover:not([aria-disabled="true"]) {
  color: #334155;
  background: #F1F5F9;
}
.nojs-tab[aria-selected="true"] {
  color: #0EA5E9;
  background: #fff;
}
.nojs-tab[aria-selected="true"]::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #0EA5E9;
}
.nojs-tabs[data-position="left"] .nojs-tab[aria-selected="true"]::after,
.nojs-tabs[data-position="right"] .nojs-tab[aria-selected="true"]::after {
  bottom: auto;
  top: 0;
  left: auto;
  right: 0;
  width: 2px;
  height: 100%;
}
.nojs-tab[aria-disabled="true"] {
  pointer-events: none;
  opacity: 0.4;
  color: #94A3B8;
}
.nojs-panel {
  padding: 1.25rem;
}
.nojs-panel[aria-hidden="true"] {
  display: none;
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tabs",""),t.textContent=e,document.head.appendChild(t)}var Br=0;function Te(e){return`${e}-${++Br}`}function $t(e,t){let r=et.containers.get(e);if(!r)return;let{tabs:i,panels:n}=r;if(!(t<0||t>=i.length)&&i[t].getAttribute("aria-disabled")!=="true"){for(let o=0;o<i.length;o++)i[o].setAttribute("aria-selected","false"),i[o].setAttribute("tabindex","-1"),n[o].setAttribute("aria-hidden","true"),n[o].inert=!0;i[t].setAttribute("aria-selected","true"),i[t].setAttribute("tabindex","0"),n[t].setAttribute("aria-hidden","false"),n[t].inert=!1,r.activeIndex=t}}function ht(e,t,r){let i=e.length,n=t;for(let o=0;o<i;o++)if(n=(n+r+i)%i,e[n].getAttribute("aria-disabled")!=="true")return n;return t}function Se(e){e.directive("tabs",{priority:10,init(t,r,i){De();let n=[],o=[];for(let a of Array.from(t.children))a.hasAttribute("tab")?n.push(a):a.hasAttribute("panel")&&o.push(a);if(n.length===0){e._warn("[tabs] No child [tab] elements found.");return}n.length!==o.length&&e._warn("[tabs] Mismatch: "+n.length+" tabs but "+o.length+" panels.");let d=t.getAttribute("tab-position")||"top";t.setAttribute("data-position",d),t.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let c=Math.min(n.length,o.length);for(let a=0;a<c;a++){let g=n[a],b=o[a],v=g.id||Te("nojs-tab"),y=b.id||Te("nojs-panel");g.id=v,b.id=y,g.setAttribute("role","tab"),g.setAttribute("aria-selected","false"),g.setAttribute("aria-controls",y),g.setAttribute("tabindex","-1"),g.classList.add("nojs-tab"),b.setAttribute("role","tabpanel"),b.setAttribute("aria-labelledby",v),b.setAttribute("tabindex","0"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel"),s.appendChild(g)}let f=o[0];f?t.insertBefore(s,f):t.appendChild(s),et.containers.set(t,{tabs:n.slice(0,c),panels:o.slice(0,c),activeIndex:-1});let l=e.findContext(t);for(let a=0;a<c;a++){let g=n[a].getAttribute("tab-disabled");g&&e.evaluate(g,l)&&n[a].setAttribute("aria-disabled","true")}let u=0;if(i&&i.trim()!==""){let a=parseInt(i,10);!isNaN(a)&&a>=0&&a<c&&(u=a)}n[u]?.getAttribute("aria-disabled")==="true"&&(u=ht(n.slice(0,c),u,1)),$t(t,u);let h=a=>{let g=et.containers.get(t);if(!g)return;let b=a.target;if(b.getAttribute("role")!=="tab")return;let{tabs:v}=g,y=v.indexOf(b);if(y===-1)return;let x=-1;switch(a.key){case"ArrowRight":case"ArrowDown":x=ht(v,y,1);break;case"ArrowLeft":case"ArrowUp":x=ht(v,y,-1);break;case"Home":x=ht(v,v.length-1,1);break;case"End":x=ht(v,0,-1);break;case"Tab":return;default:return}x!==-1&&x!==y&&(a.preventDefault(),$t(t,x),v[x].focus())};s.addEventListener("keydown",h);let p=a=>{let g=a.target.closest("[role='tab']");if(!g)return;let b=et.containers.get(t);if(!b)return;let v=b.tabs.indexOf(g);v!==-1&&($t(t,v),g.focus())};s.addEventListener("click",p),e._onDispose(()=>{s.removeEventListener("keydown",h),s.removeEventListener("click",p),et.containers.delete(t)})}})}function Ie(e){e.directive("tab",{priority:11,init(){}}),e.directive("tab-disabled",{priority:11,init(){}}),e.directive("tab-position",{priority:11,init(){}})}function Be(e){e.directive("panel",{priority:11,init(){}})}function ze(e,t={}){Se(e),Ie(e),Be(e)}function Fe(){Ce()}var I={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Me(){I.branches.clear(),I.selectedItem=null,I.typeahead="",I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null)}function _t(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let e=`
.nojs-tree {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.nojs-tree .nojs-tree {
  padding-left: 1.25rem;
}
.nojs-tree li {
  list-style: none;
}
.nojs-branch {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #1E293B;
  font-weight: 500;
  transition: background 0.12s ease;
}
.nojs-branch:hover {
  background: #F1F5F9;
}
.nojs-branch:focus-visible {
  outline: 2px solid #0EA5E9;
  outline-offset: 1px;
}
.nojs-branch[aria-selected="true"],
.nojs-branch-selected {
  background: #F0F9FF;
  color: #0369A1;
}
.nojs-branch::before {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent #94A3B8;
  margin-right: 0.3rem;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}
.nojs-branch[aria-expanded="true"]::before {
  transform: rotate(90deg);
  border-left-color: #0EA5E9;
}
.nojs-tree[data-tree-icon="false"] .nojs-branch::before {
  content: none;
}
.nojs-subtree[aria-hidden="true"] {
  display: none;
}
.nojs-tree-leaf {
  padding: 0.25rem 0.5rem 0.25rem 1.75rem;
  font-size: 0.825rem;
  color: #475569;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.12s ease;
}
.nojs-tree-leaf:hover {
  background: #F1F5F9;
  color: #1E293B;
}
.nojs-tree-leaf:focus-visible {
  outline: 2px solid #0EA5E9;
  outline-offset: 1px;
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tree",""),t.textContent=e,document.head.appendChild(t)}function $e(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),i;for(;i=r.nextNode();)t.push(i);return t}function He(e){return e.closest('[role="tree"]')}function zr(e){let t=e.cloneNode(!0);return t.querySelectorAll('[role="group"]').forEach(i=>i.remove()),(t.textContent||"").trim().toLowerCase()}function Pe(e){e.directive("tree",{priority:15,init(t){_t(),t.classList.add("nojs-tree"),t.setAttribute("role","tree"),t.getAttribute("tree-icon")==="false"&&t.setAttribute("data-tree-icon","false")}})}function qe(e){e.directive("branch",{priority:16,init(t,r,i){_t();let n=i==="expanded";t.classList.add("nojs-branch"),t.setAttribute("role","treeitem"),t.setAttribute("aria-expanded",String(n));let o=He(t);if(o){let p=o.querySelector('[role="treeitem"]');t.setAttribute("tabindex",p===t?"0":"-1")}else t.setAttribute("tabindex","0");let d=!1;queueMicrotask(()=>{if(d)return;let p=t.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(t.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?t.nextElementSibling:null);p?(I.branches.set(t,{expanded:n,subtreeEl:p}),p.setAttribute("aria-hidden",String(!n))):I.branches.set(t,{expanded:n,subtreeEl:null})});function s(p){let a=I.selectedItem;a&&a!==p&&(a.classList.remove("nojs-branch-selected"),a.setAttribute("aria-selected","false")),p.classList.add("nojs-branch-selected"),p.setAttribute("aria-selected","true"),I.selectedItem=p}function c(p){let a=I.branches.get(p);!a||!a.subtreeEl||(a.expanded=!a.expanded,p.setAttribute("aria-expanded",String(a.expanded)),a.subtreeEl.setAttribute("aria-hidden",String(!a.expanded)))}function f(p){let a=I.branches.get(p);!a||!a.subtreeEl||a.expanded||(a.expanded=!0,p.setAttribute("aria-expanded","true"),a.subtreeEl.setAttribute("aria-hidden","false"))}function l(p){let a=I.branches.get(p);!a||!a.subtreeEl||!a.expanded||(a.expanded=!1,p.setAttribute("aria-expanded","false"),a.subtreeEl.setAttribute("aria-hidden","true"))}let u=p=>{p.target!==t&&!t.contains(p.target)||(p.stopPropagation(),s(t),c(t))};t.addEventListener("click",u),e._onDispose(()=>t.removeEventListener("click",u));let h=p=>{let a=He(t);if(!a)return;let g=$e(a),b=g.indexOf(t),v=I.branches.get(t),y=v&&v.subtreeEl;switch(p.key){case"ArrowRight":if(p.preventDefault(),y&&!v.expanded)f(t);else if(y&&v.expanded){let x=v.subtreeEl.querySelector('[role="treeitem"]');x&&rt(x,g)}break;case"ArrowLeft":if(p.preventDefault(),y&&v.expanded)l(t);else{let x=t.parentElement?.closest('[role="treeitem"]');x&&rt(x,$e(a))}break;case"ArrowDown":p.preventDefault(),b<g.length-1&&rt(g[b+1],g);break;case"ArrowUp":p.preventDefault(),b>0&&rt(g[b-1],g);break;case"Enter":case" ":p.preventDefault(),s(t),c(t);break;case"Home":p.preventDefault(),g.length>0&&rt(g[0],g);break;case"End":p.preventDefault(),g.length>0&&rt(g[g.length-1],g);break;default:if(p.key.length===1&&!p.ctrlKey&&!p.altKey&&!p.metaKey){p.preventDefault(),I.typeahead+=p.key.toLowerCase(),I.typeaheadTimer&&clearTimeout(I.typeaheadTimer),I.typeaheadTimer=setTimeout(()=>{I.typeahead="",I.typeaheadTimer=null},500);let x=b+1;for(let j=0;j<g.length;j++){let E=(x+j)%g.length;if(zr(g[E]).startsWith(I.typeahead)){rt(g[E],g);break}}}break}};t.addEventListener("keydown",h),e._onDispose(()=>t.removeEventListener("keydown",h)),e._onDispose(()=>{d=!0,I.branches.delete(t),I.selectedItem===t&&(I.selectedItem=null)})}})}function rt(e,t){for(let r of t)r.setAttribute("tabindex",r===e?"0":"-1");e.focus()}function Re(e){e.directive("subtree",{priority:16,init(t){_t(),t.classList.add("nojs-subtree"),t.classList.add("nojs-tree"),t.setAttribute("role","group");for(let i of t.children)i.tagName==="LI"&&!i.querySelector("[branch], .nojs-branch")&&(i.setAttribute("role","treeitem"),i.setAttribute("tabindex","-1"),i.classList.add("nojs-tree-leaf"));let r=t.parentElement?.matches?.('[role="treeitem"]')?t.parentElement:t.previousElementSibling?.matches?.('[role="treeitem"]')?t.previousElementSibling:null;if(r){let i=I.branches.get(r);i?(t.setAttribute("aria-hidden",String(!i.expanded)),i.subtreeEl=t):t.setAttribute("aria-hidden","true")}else t.setAttribute("aria-hidden","true")}})}function Oe(e,t={}){Pe(e),qe(e),Re(e)}function Ge(){Me()}var Lt=new Map;function We(){Lt.clear()}function Ct(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let e=`
.nojs-stepper-indicator {
  display: flex;
  align-items: center;
  gap: 0;
  counter-reset: step;
}
.nojs-stepper-indicator-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  counter-increment: step;
  cursor: default;
  white-space: nowrap;
}
.nojs-stepper-indicator-item[data-clickable] {
  cursor: pointer;
}
.nojs-stepper-indicator-item::before {
  content: counter(step);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid currentColor;
  font-size: 0.875rem;
  flex-shrink: 0;
}
.nojs-stepper-indicator-item[aria-selected="true"] {
  color: #0EA5E9;
  font-weight: 600;
}
.nojs-stepper-indicator-item[aria-selected="true"]::before {
  background: #0EA5E9;
  color: #fff;
  border-color: #0EA5E9;
  font-weight: bold;
  box-shadow: 0 0 0 3px rgba(14,165,233,0.2);
}
.nojs-stepper-indicator-item[data-completed] {
  color: #16A34A;
}
.nojs-stepper-indicator-item[data-completed]::before {
  content: "\\2713";
  background: #16A34A;
  color: #fff;
  border-color: #16A34A;
}
.nojs-stepper-separator {
  flex: 1;
  height: 2px;
  background: currentColor;
  opacity: 0.3;
  margin: 0 0.5rem;
  min-width: 1rem;
}
.nojs-step[aria-hidden="true"] {
  display: none;
}
.nojs-stepper-nav {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-stepper",""),t.textContent=e,document.head.appendChild(t)}function Ve(e){e.directive("stepper",{priority:14,init(t,r,i){Ct();let n=e.findContext(t),o=Array.from(t.querySelectorAll("[step]"));if(!o.length){e._warn("[stepper] No [step] children found.");return}let d=i&&parseInt(i,10)||0,s=t.getAttribute("stepper-mode")||"linear",c=t.getAttribute("stepper-indicator")!=="false",f=t.getAttribute("stepper-nav")!=="false",l=t.getAttribute("aria-label")||"Stepper",u=Math.max(0,Math.min(d,o.length-1));t.setAttribute("role","group"),t.setAttribute("aria-label",l),t.classList.add("nojs-stepper");let h=null,p=[];c&&(h=document.createElement("div"),h.className="nojs-stepper-indicator",h.setAttribute("role","tablist"),h.setAttribute("aria-label","Progress"),o.forEach((A,C)=>{if(C>0){let J=document.createElement("div");J.className="nojs-stepper-separator",J.setAttribute("aria-hidden","true"),h.appendChild(J)}let D=document.createElement("button");D.type="button",D.className="nojs-stepper-indicator-item",D.setAttribute("role","tab"),D.setAttribute("aria-selected",C===u?"true":"false");let Q=A.getAttribute("step-label")||`Step ${C+1}`,Y=document.createElement("span");Y.textContent=Q,D.appendChild(Y),D.setAttribute("aria-label",Q);let yt=`nojs-stepper-tab-${Fr++}`;D.id=yt,s==="free"?(D.setAttribute("data-clickable",""),D.addEventListener("click",()=>E(C))):D.setAttribute("tabindex","-1"),h.appendChild(D),p.push(D)}),h.addEventListener("keydown",A=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(A.key))return;A.preventDefault();let C=u;A.key==="ArrowRight"?C=Math.min(u+1,o.length-1):A.key==="ArrowLeft"?C=Math.max(u-1,0):A.key==="Home"?C=0:A.key==="End"&&(C=o.length-1),s==="free"&&E(C),p[C]?.focus()}),t.insertBefore(h,t.firstChild));let a=null,g=null,b=null;f&&(a=document.createElement("div"),a.className="nojs-stepper-nav",a.setAttribute("aria-hidden","true"),g=document.createElement("button"),g.type="button",g.className="nojs-stepper-prev",g.textContent="Previous",g.addEventListener("click",()=>j()),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-next",b.textContent="Next",b.addEventListener("click",()=>x()),a.appendChild(g),a.appendChild(b),t.appendChild(a));function v(A){let C=o[A];if(!C)return!0;let D=C.querySelectorAll("[required]");for(let Y of D)if(typeof Y.checkValidity=="function"&&!Y.checkValidity())return Y.reportValidity(),!1;let Q=C.getAttribute("step-validate");if(Q)try{if(!e.evaluate(Q,n))return!1}catch(Y){return e._warn(`[stepper] step-validate error: ${Y.message}`),!1}return!0}function y(){o.forEach((A,C)=>{let D=C===u;A.setAttribute("aria-hidden",D?"false":"true"),D?A.removeAttribute("inert"):A.setAttribute("inert","")}),p.length&&p.forEach((A,C)=>{A.setAttribute("aria-selected",C===u?"true":"false"),C<u?A.setAttribute("data-completed",""):A.removeAttribute("data-completed"),A.setAttribute("tabindex",C===u?"0":"-1");let D=o[C];D.id&&(A.setAttribute("aria-controls",D.id),D.setAttribute("aria-labelledby",A.id))}),g&&(g.disabled=u===0),b&&(b.textContent=u===o.length-1?"Finish":"Next"),t.dispatchEvent(new CustomEvent("step-change",{bubbles:!0,detail:{current:u,total:o.length}}))}function x(){return u>=o.length-1||s==="linear"&&!v(u)?!1:(u++,y(),_(),!0)}function j(){return u<=0?!1:(u--,y(),_(),!0)}function E(A){if(A<0||A>=o.length||A===u)return!1;if(s==="linear"&&A>u){for(let C=u;C<A;C++)if(!v(C))return!1}return u=A,y(),_(),!0}let B={get current(){return u},get total(){return o.length},next:x,prev:j,goTo:E,get isFirst(){return u===0},get isLast(){return u===o.length-1}};function _(){n.$stepper=B}_(),Lt.set(t,{current:u,steps:o,mode:s,indicatorEl:h,navEl:a}),y(),e._onDispose(()=>{Lt.delete(t),h&&h.parentNode&&h.remove(),a&&a.parentNode&&a.remove(),delete n.$stepper})}})}var Fr=0;var Mr=0;function Ke(e){e.directive("step",{priority:13,init(t,r,i){Ct(),t.classList.add("nojs-step"),t.setAttribute("role","tabpanel"),t.id||(t.id=`nojs-stepper-panel-${Mr++}`),t.setAttribute("tabindex","0")}})}function Ye(e,t={}){Ke(e),Ve(e)}function Ue(){We()}function Xe(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let e=`
.nojs-skeleton {
  position: relative;
  overflow: hidden;
  color: transparent !important;
}
.nojs-skeleton > *:not(.nojs-skeleton-line) {
  opacity: 0 !important;
  pointer-events: none !important;
}
.nojs-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg,
    #E2E8F0 25%,
    #F1F5F9 50%,
    #E2E8F0 75%
  );
  background-size: 200% 100%;
  animation: nojs-shimmer 1.5s ease-in-out infinite;
}
@keyframes nojs-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.nojs-skeleton-circle {
  border-radius: 50%;
}
.nojs-skeleton-circle::after {
  border-radius: 50%;
}
.nojs-skeleton-fade {
  transition: opacity 0.3s ease;
}
.nojs-skeleton-line {
  height: 0.75rem;
  margin-bottom: 0.6rem;
  border-radius: 4px;
  background: #E2E8F0;
}
.nojs-skeleton-line:last-child {
  width: 60%;
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-skeleton",""),t.textContent=e,document.head.appendChild(t)}function Ze(e){e.directive("skeleton",{priority:10,init(t,r,i){Xe();let n=e.findContext(t),o=t.getAttribute("skeleton-type")||"text",d=t.getAttribute("skeleton-lines"),s=t.getAttribute("skeleton-size"),c=[];function f(b){l();for(let v=0;v<b;v++){let y=document.createElement("div");y.className="nojs-skeleton-line",t.appendChild(y),c.push(y)}}function l(){for(let b of c)b.parentNode===t&&t.removeChild(b);c=[]}function u(){if(t.classList.add("nojs-skeleton"),o==="circle"&&t.classList.add("nojs-skeleton-circle"),s&&(o==="circle"||o==="rect")){let b=s+(String(s).match(/\d$/)?"px":"");t.style.width=b,t.style.height=b}if(d){let b=parseInt(d,10);b>0&&f(b)}t.setAttribute("aria-busy","true")}function h(){t.classList.add("nojs-skeleton-fade"),t.classList.remove("nojs-skeleton"),t.classList.remove("nojs-skeleton-circle"),l(),s&&(o==="circle"||o==="rect")&&(t.style.width="",t.style.height=""),t.removeAttribute("aria-busy");let b=()=>{t.classList.remove("nojs-skeleton-fade"),t.removeEventListener("transitionend",b)};t.addEventListener("transitionend",b)}let p=!1;function a(){let b=!!e.evaluate(i,n);b&&!p?(p=!0,u()):!b&&p&&(p=!1,h())}a();let g=n.$watch(a);e._onDispose(g),e._onDispose(()=>{p&&(t.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),t.removeAttribute("aria-busy"),l(),s&&(o==="circle"||o==="rect")&&(t.style.width="",t.style.height=""))})}})}function Qe(e,t={}){Ze(e)}var nt=new Map,$=new Map,w={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Ne(){nt.clear(),$.clear(),w.active=!1,w.splitEl=null,w.gutterEl=null,w.prevPane=null,w.nextPane=null,w.direction=null,w.startPos=0,w.startPrevSize=0,w.startNextSize=0,w.containerSize=0}function Dt(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let e=`
.nojs-split {
  display: flex;
  overflow: hidden;
  height: 100%;
}
.nojs-split[data-direction="vertical"] {
  flex-direction: column;
}
.nojs-pane {
  overflow: auto;
  min-width: 0;
  min-height: 0;
}
.nojs-gutter {
  flex-shrink: 0;
  background: color-mix(in srgb, currentColor 10%, transparent);
  z-index: 1;
}
.nojs-split[data-direction="horizontal"] > .nojs-gutter {
  width: var(--nojs-gutter-size, 6px);
  cursor: col-resize;
}
.nojs-split[data-direction="vertical"] > .nojs-gutter {
  height: var(--nojs-gutter-size, 6px);
  cursor: row-resize;
}
.nojs-gutter:hover,
.nojs-gutter:active {
  background: color-mix(in srgb, currentColor 20%, transparent);
}
.nojs-gutter:focus-visible {
  outline: 2px solid highlight;
  outline-offset: -2px;
}
.nojs-pane[data-collapsed="true"] {
  overflow: hidden;
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-split",""),t.textContent=e,document.head.appendChild(t)}function Je(e){return e==="horizontal"?"clientX":"clientY"}function q(e,t){return t==="horizontal"?e.offsetWidth:e.offsetHeight}function $r(e,t){let i=(nt.get(e)?.gutters||[]).reduce((n,o)=>n+q(o,t),0);return q(e,t)-i}function Tt(e,t){let r=$.get(t);return r?r.min!=null&&e<r.min?r.min:r.max!=null&&e>r.max?r.max:e:e}function St(e,t,r,i){let n=q(t,i),o=q(r,i),d=$.get(t),s=$.get(r);e.setAttribute("aria-valuenow",Math.round(n)),e.setAttribute("aria-valuemin",d?.min||0),e.setAttribute("aria-valuemax",Math.round(n+o-(s?.min||0)))}function Ht(e){let t=e.getAttribute("split-persist");if(!t)return;let r=nt.get(e);if(!r)return;let i=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${t}`,JSON.stringify(i))}catch{}}function Hr(e){let t=e.getAttribute("split-persist");if(!t)return!1;try{let r=localStorage.getItem(`nojs-split:${t}`);if(!r)return!1;let i=JSON.parse(r),n=nt.get(e);return!n||i.length!==n.panes.length?!1:(i.forEach((o,d)=>{o&&(n.panes[d].style.flexBasis=o,n.panes[d].style.flexGrow="0")}),!0)}catch{return!1}}function Pr(e,t,r,i,n){let o=document.createElement("div");o.className="nojs-gutter",o.setAttribute("role","separator"),o.setAttribute("tabindex","0"),o.setAttribute("aria-orientation",t==="horizontal"?"vertical":"horizontal"),o.setAttribute("aria-label","Resize"),n!==6&&o.style.setProperty("--nojs-gutter-size",`${n}px`);let d=p=>{if(p.button!==0)return;p.preventDefault();let a=$r(e,t);w.active=!0,w.splitEl=e,w.gutterEl=o,w.prevPane=r,w.nextPane=i,w.direction=t,w.startPos=p[Je(t)],w.startPrevSize=q(r,t),w.startNextSize=q(i,t),w.containerSize=a,document.body.style.cursor=t==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",o.setPointerCapture(p.pointerId)},s=p=>{if(!w.active||w.gutterEl!==o)return;let a=p[Je(w.direction)]-w.startPos,g=Tt(w.startPrevSize+a,w.prevPane),b=Tt(w.startNextSize-a,w.nextPane),v=w.startPrevSize+w.startNextSize;g+b!==v&&(g!==w.startPrevSize+a?b=v-g:g=v-b),w.prevPane.style.flexBasis=`${g}px`,w.prevPane.style.flexGrow="0",w.nextPane.style.flexBasis=`${b}px`,w.nextPane.style.flexGrow="0",St(o,w.prevPane,w.nextPane,w.direction)},c=()=>{!w.active||w.gutterEl!==o||(w.active=!1,document.body.style.cursor="",document.body.style.userSelect="",Ht(e),e.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:i}})))};o.addEventListener("pointerdown",d),o.addEventListener("pointermove",s),o.addEventListener("pointerup",c),o.addEventListener("pointercancel",c);let f=10,l=p=>{let a=t==="horizontal",g=0;if(a&&p.key==="ArrowRight"||!a&&p.key==="ArrowDown")g=f;else if(a&&p.key==="ArrowLeft"||!a&&p.key==="ArrowUp")g=-f;else if(p.key==="Home")g=($.get(r)?.min||0)-q(r,t);else if(p.key==="End"){let E=$.get(i);g=q(r,t)+q(i,t)-(E?.min||0)-q(r,t)}else return;p.preventDefault();let b=q(r,t),v=q(i,t),y=b+v,x=Tt(b+g,r),j=Tt(y-x,i);x=y-j,r.style.flexBasis=`${x}px`,r.style.flexGrow="0",i.style.flexBasis=`${j}px`,i.style.flexGrow="0",St(o,r,i,t),Ht(e)};o.addEventListener("keydown",l);let u=()=>{let p=$.get(r),a=$.get(i),g=p?.collapsible?r:a?.collapsible?i:null;if(!g)return;let b=$.get(g);if(!b)return;let v=g===r?i:r,y=q(r,t)+q(i,t);if(b.collapsed){b.collapsed=!1,g.removeAttribute("data-collapsed");let x=b.preCollapseSize||`${Math.round(y/2)}px`;g.style.flexBasis=x,g.style.flexGrow="0",v.style.flexBasis=`${y-parseFloat(x)}px`,v.style.flexGrow="0"}else b.preCollapseSize=g.style.flexBasis||`${q(g,t)}px`,b.collapsed=!0,g.setAttribute("data-collapsed","true"),g.style.flexBasis="0px",g.style.flexGrow="0",v.style.flexBasis=`${y}px`,v.style.flexGrow="0";St(o,r,i,t),Ht(e),e.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:g,collapsed:b.collapsed}}))};return o.addEventListener("dblclick",u),{gutter:o,cleanup:()=>{o.removeEventListener("pointerdown",d),o.removeEventListener("pointermove",s),o.removeEventListener("pointerup",c),o.removeEventListener("pointercancel",c),o.removeEventListener("keydown",l),o.removeEventListener("dblclick",u)}}}function tr(e){e.directive("split",{priority:14,init(t,r,i){Dt();let n=(i||"horizontal").trim()==="vertical"?"vertical":"horizontal",o=parseInt(t.getAttribute("split-gutter"),10)||6;t.classList.add("nojs-split"),t.setAttribute("data-direction",n);let d=Array.from(t.children).filter(l=>l.hasAttribute("pane"));if(d.length<2){e._warn(`[split] Container requires at least 2 [pane] children, found ${d.length}.`);return}d.forEach(l=>{$.get(l)||$.set(l,{size:l.getAttribute("pane")||null,min:parseInt(l.getAttribute("pane-min"),10)||0,max:parseInt(l.getAttribute("pane-max"),10)||1/0,collapsible:l.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],c=[];for(let l=0;l<d.length-1;l++){let{gutter:u,cleanup:h}=Pr(t,n,d[l],d[l+1],o);d[l].after(u),s.push(u),c.push(h)}nt.set(t,{direction:n,gutterSize:o,panes:d,gutters:s}),Hr(t)||d.forEach(l=>{let h=$.get(l)?.size;h?(l.style.flexBasis=h,l.style.flexGrow="0"):(l.style.flexGrow="1",l.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((l,u)=>{St(l,d[u],d[u+1],n)})}),e._onDispose(()=>{c.forEach(l=>l()),s.forEach(l=>l.remove()),nt.delete(t),d.forEach(l=>$.delete(l)),t.classList.remove("nojs-split"),t.removeAttribute("data-direction")})}})}function er(e){e.directive("pane",{priority:15,init(t,r,i){Dt(),t.classList.add("nojs-pane"),$.has(t)||$.set(t,{size:i||null,min:parseInt(t.getAttribute("pane-min"),10)||0,max:parseInt(t.getAttribute("pane-max"),10)||1/0,collapsible:t.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=$.get(t),o=t.closest("[data-direction='vertical']")?"height":"width";n.min&&(t.style[`min${o==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(t.style[`max${o==="width"?"Width":"Height"}`]=`${n.max}px`),e._onDispose(()=>{t.classList.remove("nojs-pane"),$.delete(t),t.style.removeProperty("minWidth"),t.style.removeProperty("minHeight"),t.style.removeProperty("maxWidth"),t.style.removeProperty("maxHeight"),t.style.removeProperty("flexBasis"),t.style.removeProperty("flexGrow")})}})}function rr(e,t={}){tr(e),er(e)}function nr(){Ne()}var ut={sorts:new Map};function or(){ut.sorts.clear()}function vt(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let e=`
.nojs-sortable th[data-sortable] {
  cursor: pointer;
  user-select: none;
}
.nojs-sortable th[data-sortable]::after {
  content: " \u21C5";
  opacity: 0.3;
}
.nojs-sortable th[data-sort-dir="asc"]::after {
  content: " \u25B2";
  opacity: 1;
}
.nojs-sortable th[data-sort-dir="desc"]::after {
  content: " \u25BC";
  opacity: 1;
}
.nojs-fixed-header thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #F8FAFC;
}
.nojs-fixed-col {
  position: sticky;
  left: 0;
  z-index: 1;
}
.nojs-fixed-header .nojs-fixed-col {
  z-index: 3;
}
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-table",""),t.textContent=e,document.head.appendChild(t)}function qr(e,t){let r=e.querySelector("tbody");if(!r)return null;let i=r.querySelector("[each]")||r.querySelector("[foreach]");if(!i)return null;let n=i.getAttribute("each")||i.getAttribute("foreach");if(!n)return null;let o=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return o?{iteratorVar:o[1],arrayPath:o[2].trim()}:null}function Rr(e,t){let r=t.split("."),i=e;for(let n of r){if(i==null)return;i=i[n]}return i}function ir(e,t,r){let i=t.split("."),n=e;for(let o=0;o<i.length-1;o++){if(n[i[o]]==null)return;n=n[i[o]]}n[i[i.length-1]]=r}function ar(e,t,r){if(e==null&&t==null)return 0;if(e==null)return-1;if(t==null)return 1;switch(r){case"number":return Number(e)-Number(t);case"date":return new Date(e).getTime()-new Date(t).getTime();default:return String(e).localeCompare(String(t))}}function Or(e){let t=e.querySelectorAll("th[data-sortable]");for(let r of t)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function dr(e){e.directive("sortable",{priority:10,init(t){vt(),t.classList.add("nojs-sortable")}})}function cr(e){e.directive("sort",{priority:11,init(t,r,i){vt();let n=i;if(!n)return;let o=t.getAttribute("sort-type")||"string",d=t.getAttribute("sort-default");t.setAttribute("data-sortable",""),t.setAttribute("aria-sort","none");let s=t.closest("table");if(!s)return;ut.sorts.has(s)||ut.sorts.set(s,{column:null,direction:null}),(d==="asc"||d==="desc")&&sr(t,s,n,o,d,e);let c=()=>{let f=ut.sorts.get(s),l;f.column!==n?l="asc":f.direction==="asc"?l="desc":f.direction==="desc"?l=null:l="asc",sr(t,s,n,o,l,e)};t.addEventListener("click",c),e._onDispose(()=>{t.removeEventListener("click",c),s&&s._nojsOriginalOrder&&delete s._nojsOriginalOrder})}})}function sr(e,t,r,i,n,o){let d=ut.sorts.get(t);Or(t),n?(e.setAttribute("data-sort-dir",n),e.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),d.column=r,d.direction=n):(d.column=null,d.direction=null);let s=qr(t,o);if(s){let c=o.findContext(t),f=c?Rr(c,s.arrayPath):null;if(Array.isArray(f)){if(!n){let u=t._nojsOriginalOrder;if(u){let h=new Set(f),p=u.filter(a=>h.has(a));for(let a of f)u.includes(a)||p.push(a);ir(c,s.arrayPath,p)}return}t._nojsOriginalOrder||(t._nojsOriginalOrder=[...f]);let l=[...f].sort((u,h)=>{let p=u!=null?u[r]:null,a=h!=null?h[r]:null,g=ar(p,a,i);return n==="desc"?-g:g});ir(c,s.arrayPath,l);return}}Gr(t,e,r,i,n)}function Gr(e,t,r,i,n){let o=e.querySelector("tbody");if(!o)return;let c=[...t.closest("tr").children].indexOf(t);if(c<0)return;let f=[...o.querySelectorAll(":scope > tr")];if(e._nojsOriginalRows||(e._nojsOriginalRows=[...f]),!n){let u=document.createDocumentFragment();for(let h of e._nojsOriginalRows)u.appendChild(h);o.appendChild(u);return}f.sort((u,h)=>{let p=u.children[c]?.textContent?.trim()||"",a=h.children[c]?.textContent?.trim()||"",g=ar(i==="number"?parseFloat(p.replace(/[^0-9.\-]/g,""))||0:p,i==="number"?parseFloat(a.replace(/[^0-9.\-]/g,""))||0:a,i);return n==="desc"?-g:g});let l=document.createDocumentFragment();for(let u of f)l.appendChild(u);o.appendChild(l)}function lr(e){e.directive("fixed-header",{priority:10,init(t){vt(),t.classList.add("nojs-fixed-header")}})}function pr(e){e.directive("fixed-col",{priority:10,init(t){vt(),t.classList.add("nojs-fixed-col")}})}function ur(e,t={}){dr(e),cr(e),lr(e),pr(e)}function fr(){or()}var Wr={name:"nojs-elements",install(e,t={}){Yt(e,t),Nt(e,t),re(e,t),pe(e,t),ye(e,t),_e(e,t),ze(e,t),Oe(e,t),Ye(e,t),Qe(e,t),rr(e,t),ur(e,t)},dispose(e){Ut(),Jt(),ne(),ue(),xe(),Le(),Fe(),Ge(),Ue(),nr(),fr()}},Vr=Wr;
//# sourceMappingURL=nojs-elements.js.map
