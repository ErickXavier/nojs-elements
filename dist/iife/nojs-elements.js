/**
 * NoJS Elements v1.13.3 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/ErickXavier/nojs-elements
 */
(()=>{var E={dragging:null,selected:new Map,placeholder:null},Pe=new Map;function Et(){E.dragging=null,E.selected.clear(),E.placeholder&&(E.placeholder.remove(),E.placeholder=null),Pe.clear()}function Fe(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function K(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function ze(t,e){let r=K(t,"removeCoreDirective");typeof r=="function"?r(e):(K(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function ae(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function $e(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=$e(r):e++}return e}function Re(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let a=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let d=a.left+a.width/2;if(e<d)return i}else if(o==="grid"){let d=a.left+a.width/2,c=a.top+a.height/2;if(r<c&&e<d||r<a.top+a.height&&e<d)return i}else{let d=a.top+a.height/2;if(r<d)return i}}return n.length}function wt(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",E.dragging&&E.dragging.sourceEl){let a=(E.dragging.sourceEl.firstElementChild||E.dragging.sourceEl).getBoundingClientRect();a.height>0&&(n.style.height=a.height+"px"),a.width>0&&(n.style.width=a.width+"px")}}else{let s=document.getElementById(r.startsWith("#")?r.slice(1):r);s&&s.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(s.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(s=>!s.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),E.placeholder=n}function re(){E.placeholder&&(E.placeholder.remove(),E.placeholder=null)}function ue(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function In(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,s=n.height,a=getComputedStyle(o),d=Math.min(e,3);for(let g=d-1;g>=0;g--){let p=document.createElement("div"),m=g*4;if(p.style.cssText="position:absolute;top:"+m+"px;left:"+m+"px;width:"+i+"px;height:"+s+"px;border-radius:"+a.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",g===0){let u=o.cloneNode(!0);for(;u.firstChild;)p.appendChild(u.firstChild);p.style.background=a.backgroundColor||"#fff",p.style.border=a.border,p.style.padding=a.padding,p.style.fontSize=a.fontSize,p.style.color=a.color,p.style.fontFamily=a.fontFamily}else p.style.background=a.backgroundColor||"#fff",p.style.border=a.border||"1px solid #ddd";r.appendChild(p)}let c=document.createElement("div");return c.textContent=e,c.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(c),r.style.width=i+(d-1)*4+"px",r.style.height=s+(d-1)*4+"px",r}function _t(t){ze(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){Fe();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",s=e.getAttribute("drag-effect")||"move",a=e.getAttribute("drag-handle"),d=e.getAttribute("drag-image"),c=e.getAttribute("drag-image-offset")||"0,0",g=e.getAttribute("drag-disabled"),p=e.getAttribute("drag-class")||"nojs-dragging",m=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-grabbed","false"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let u=!0;if(a){let f=b=>{u=!!b.target.closest(a)};e.addEventListener("mousedown",f),ae(e,()=>e.removeEventListener("mousedown",f))}let l=f=>{if(a&&!u){f.preventDefault();return}if(g&&t.evaluate(g,n)){f.preventDefault();return}let b=t.evaluate(o,n),_=e.getAttribute("drag-group"),h=b;if(_&&E.selected.has(_)){let x=E.selected.get(_);x.size>0&&[...x].some(L=>L.el===e)&&(h=[...x].map(L=>L.item))}if(E.dragging={item:h,type:i,effect:s,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},f.dataTransfer){if(f.dataTransfer.effectAllowed=s,f.dataTransfer.setData("text/plain",""),Array.isArray(h)&&h.length>1&&f.dataTransfer.setDragImage){let x=In(e,h.length);document.body.appendChild(x);let A=e.getBoundingClientRect();f.dataTransfer.setDragImage(x,A.width/2,A.height/2),requestAnimationFrame(()=>x.remove())}else if(d&&f.dataTransfer.setDragImage)if(d==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[A,L]=c.split(",").map(Number);f.dataTransfer.setDragImage(x,A||0,L||0),requestAnimationFrame(()=>x.remove())}else{let x=e.querySelector(d);if(x){let[A,L]=c.split(",").map(Number);m&&x.classList.add(m),f.dataTransfer.setDragImage(x,A||0,L||0)}}}if(p.split(/\s+/).filter(Boolean).forEach(x=>e.classList.add(x)),Array.isArray(h)&&_&&E.selected.has(_))for(let x of E.selected.get(_))x.el!==e&&p.split(/\s+/).filter(Boolean).forEach(A=>x.el.classList.add(A));e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:h,index:E.dragging.sourceIndex,el:e}}))},v=()=>{p.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b));let f=e.getAttribute("drag-group");if(f&&E.selected.has(f))for(let b of E.selected.get(f))p.split(/\s+/).filter(Boolean).forEach(_=>b.el.classList.remove(_));if(e.setAttribute("aria-grabbed","false"),m&&d&&d!=="none"){let b=e.querySelector(d);b&&b.classList.remove(m)}e.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,detail:{item:E.dragging?.item,index:E.dragging?.sourceIndex,dropped:E.dragging===null}})),E.dragging=null,re()};if(e.addEventListener("dragstart",l),e.addEventListener("dragend",v),ae(e,()=>{e.removeEventListener("dragstart",l),e.removeEventListener("dragend",v)}),g){let f=function(){let _=!!t.evaluate(g,n);e.draggable=!_,_?e.removeAttribute("aria-grabbed"):e.setAttribute("aria-grabbed","false")},b=n.$watch(f);ae(e,b)}let y=f=>{if(E.dragging&&!E.dragging.sourceEl.isConnected&&(E.dragging=null),f.key===" "&&!E.dragging){f.preventDefault();let b=t.evaluate(o,n);E.dragging={item:b,type:i,effect:s,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},p.split(/\s+/).filter(Boolean).forEach(_=>e.classList.add(_)),e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:b,index:null,el:e}}))}else f.key==="Escape"&&E.dragging&&E.dragging.sourceEl===e&&(f.preventDefault(),p.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b)),e.setAttribute("aria-grabbed","false"),E.dragging=null,re())};e.addEventListener("keydown",y),ae(e,()=>e.removeEventListener("keydown",y))}})}function At(t){ze(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){Fe();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",s=e.getAttribute("drop-effect")||"move",a=e.getAttribute("drop-class")||"nojs-drag-over",d=e.getAttribute("drop-reject-class")||"nojs-drop-reject",c=e.getAttribute("drop-disabled"),g=e.getAttribute("drop-max"),p=e.getAttribute("drop-sort"),m=e.getAttribute("drop-placeholder"),u=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",s);let l=0,v=h=>{if(!E.dragging||c&&t.evaluate(c,n))return;let x=ue(E.dragging.type,i),A=!0;if(g){let L=t.evaluate(g,n),k=$e(e);typeof L=="number"&&k>=L&&(A=!1)}if(!x||!A){d.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),re();return}if(d.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect=s),p){let L=Re(e,h.clientX,h.clientY,p);m&&wt(e,L,m,u),e.dispatchEvent(new CustomEvent("drag-over",{bubbles:!1,detail:{item:E.dragging.item,index:L}}))}},y=h=>{if(E.dragging&&!(c&&t.evaluate(c,n))&&(l++,l===1)){let x=ue(E.dragging.type,i),A=!0;if(g){let L=t.evaluate(g,n),k=$e(e);typeof L=="number"&&k>=L&&(A=!1)}x&&A?(a.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):d.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L))}},f=h=>{E.dragging&&(l--,l<=0&&(l=0,a.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),d.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging.item}}))))},b=h=>{if(h.preventDefault(),h.stopPropagation(),l=0,!E.dragging||c&&t.evaluate(c,n)||!ue(E.dragging.type,i))return;if(g){let w=t.evaluate(g,n),B=$e(e);if(typeof w=="number"&&B>=w)return}let x=E.dragging.item,A=E.dragging.type,L=E.dragging.effect,k=0;p&&(k=Re(e,h.clientX,h.clientY,p)),a.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),d.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),re();let j={$drag:x,$dragType:A,$dragEffect:L,$dropIndex:k,$source:{list:E.dragging.sourceList,index:E.dragging.sourceIndex,el:E.dragging.sourceEl},$target:{list:null,index:k,el:e},$el:e},T=K(t,"execStatement");typeof T=="function"?T(o,n,j):(K(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),E.dragging=null,e.dispatchEvent(new CustomEvent("drop",{bubbles:!1,detail:{item:x,index:k,source:j.$source,target:j.$target,effect:L}}))},_=h=>{E.dragging&&(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),b(h))};e.addEventListener("dragover",v),e.addEventListener("dragenter",y),e.addEventListener("dragleave",f),e.addEventListener("drop",b),e.addEventListener("keydown",_),ae(e,()=>{e.removeEventListener("dragover",v),e.removeEventListener("dragenter",y),e.removeEventListener("dragleave",f),e.removeEventListener("drop",b),e.removeEventListener("keydown",_)})}})}function Lt(t){ze(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){Fe();let n=t.findContext(e),i=e.getAttribute("template"),s=e.getAttribute("drag-list-key"),a=e.getAttribute("drag-list-item")||"item",d=e.getAttribute("drop-sort")||"vertical",c=e.getAttribute("drag-type")||"__draglist_"+o,g=e.getAttribute("drop-accept")||c,p=e.hasAttribute("drag-list-copy"),m=e.hasAttribute("drag-list-remove"),u=e.getAttribute("drag-disabled"),l=e.getAttribute("drop-disabled"),v=e.getAttribute("drop-max"),y=e.getAttribute("drop-placeholder"),f=e.getAttribute("drop-placeholder-class"),b=e.getAttribute("drag-class")||"nojs-dragging",_=e.getAttribute("drop-class")||"nojs-drag-over",h=e.getAttribute("drop-reject-class")||"nojs-drop-reject",x=e.getAttribute("drop-settle-class")||"nojs-drop-settle",A=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",p?"copy":"move");let L={listPath:o,ctx:n,el:e};Pe.set(e,L),ae(e,()=>Pe.delete(e));let k=0,j=null;function T(){let S=t.resolve(o,n);if(!Array.isArray(S))return;if(S===j&&S.length>0&&e.children.length>0){for(let O of e.children)O.__ctx&&O.__ctx.$notify&&O.__ctx.$notify();return}j=S;let P=i?document.getElementById(i):null;if(!P)return;let R=K(t,"disposeChildren");typeof R=="function"&&R(e),e.innerHTML="";let H=S.length;S.forEach((O,M)=>{let ee={[a]:O,$index:M,$count:H,$first:M===0,$last:M===H-1,$even:M%2===0,$odd:M%2!==0},G=t.createContext(ee,n),Q=P.content.cloneNode(!0),F=document.createElement("div");F.style.display="contents",F.__ctx=G,F.appendChild(Q),e.appendChild(F);let U=F.firstElementChild||F;U.draggable=!0,U.setAttribute("role","option"),U.setAttribute("aria-grabbed","false"),U.getAttribute("tabindex")||U.setAttribute("tabindex","0");let He=V=>{if(u&&t.evaluate(u,n)){V.preventDefault();return}E.dragging={item:O,type:c,effect:p?"copy":"move",sourceEl:F,sourceCtx:G,sourceList:S,sourceIndex:M,listDirective:{el:e,listPath:o,ctx:n,keyProp:s,copyMode:p,removeMode:m}},V.dataTransfer&&(V.dataTransfer.effectAllowed=p?"copy":"move",V.dataTransfer.setData("text/plain","")),b.split(/\s+/).filter(Boolean).forEach(J=>U.classList.add(J)),U.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:O,index:M,el:U}}))},yt=()=>{b.split(/\s+/).filter(Boolean).forEach(V=>U.classList.remove(V)),U.setAttribute("aria-grabbed","false"),E.dragging&&E.dragging.sourceEl===F&&(E.dragging=null),re()};F.addEventListener("dragstart",He),F.addEventListener("dragend",yt);let xt=V=>{if(V.key===" "&&!E.dragging)V.preventDefault(),V.stopPropagation(),E.dragging={item:O,type:c,effect:p?"copy":"move",sourceEl:F,sourceCtx:G,sourceList:S,sourceIndex:M,listDirective:{el:e,listPath:o,ctx:n,keyProp:s,copyMode:p,removeMode:m}},b.split(/\s+/).filter(Boolean).forEach(J=>U.classList.add(J)),U.setAttribute("aria-grabbed","true");else if(V.key==="Escape"&&E.dragging){V.preventDefault(),V.stopPropagation();let J=e.querySelector('[aria-grabbed="true"]')||U;b.split(/\s+/).filter(Boolean).forEach(Qe=>J.classList.remove(Qe)),J.setAttribute("aria-grabbed","false"),E.dragging=null,re()}else if((V.key==="ArrowDown"||V.key==="ArrowRight")&&E.dragging&&E.dragging.sourceEl===F){V.preventDefault();let J=F.nextElementSibling;J&&(J.firstElementChild||J).focus()}else if((V.key==="ArrowUp"||V.key==="ArrowLeft")&&E.dragging&&E.dragging.sourceEl===F){V.preventDefault();let J=F.previousElementSibling;J&&(J.firstElementChild||J).focus()}};F.addEventListener("keydown",xt),F.__disposers=F.__disposers||[],F.__disposers.push(()=>F.removeEventListener("dragstart",He),()=>F.removeEventListener("dragend",yt),()=>F.removeEventListener("keydown",xt)),t.processTree(F)});let $=S.length===0;A.split(/\s+/).filter(Boolean).forEach(O=>e.classList.toggle(O,$))}let w=S=>{if(!E.dragging||l&&t.evaluate(l,n))return;let P=ue(E.dragging.type,g),R=!0;if(v){let $=t.evaluate(v,n),O=t.resolve(o,n);typeof $=="number"&&Array.isArray(O)&&O.length>=$&&(R=!1)}if(!P||!R){h.split(/\s+/).filter(Boolean).forEach($=>e.classList.add($)),_.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),re();return}h.split(/\s+/).filter(Boolean).forEach($=>e.classList.remove($)),S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect=p?"copy":"move");let H=Re(e,S.clientX,S.clientY,d);y&&wt(e,H,y,f)},B=S=>{if(E.dragging&&!(l&&t.evaluate(l,n))&&(k++,k===1)){let P=ue(E.dragging.type,g),R=!0;if(v){let H=t.evaluate(v,n),$=t.resolve(o,n);typeof H=="number"&&Array.isArray($)&&$.length>=H&&(R=!1)}P&&R?(_.split(/\s+/).filter(Boolean).forEach(H=>e.classList.add(H)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):h.split(/\s+/).filter(Boolean).forEach(H=>e.classList.add(H))}},q=()=>{E.dragging&&(k--,k<=0&&(k=0,_.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),h.split(/\s+/).filter(Boolean).forEach(S=>e.classList.remove(S)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging?.item}}))))},X=S=>{if(S.preventDefault(),S.stopPropagation(),k=0,!E.dragging||l&&t.evaluate(l,n)||!ue(E.dragging.type,g))return;if(v){let G=t.evaluate(v,n),Q=t.resolve(o,n);if(typeof G=="number"&&Array.isArray(Q)&&Q.length>=G)return}let P=E.dragging.item,R=E.dragging.listDirective,H=E.dragging.sourceIndex,$=Re(e,S.clientX,S.clientY,d);_.split(/\s+/).filter(Boolean).forEach(G=>e.classList.remove(G)),h.split(/\s+/).filter(Boolean).forEach(G=>e.classList.remove(G)),re();let O=t.resolve(o,n);if(!Array.isArray(O))return;let M=R&&R.el===e;if(M&&H===$){E.dragging=null;return}if(M&&H+1===$){E.dragging=null;return}let ee=[...O];if(M){let[G]=ee.splice(H,1),Q=H<$?$-1:$;ee.splice(Q,0,G),n.$set(o,ee),e.dispatchEvent(new CustomEvent("reorder",{bubbles:!0,detail:{list:ee,item:P,from:H,to:Q}}))}else{let G=p&&typeof P=="object"?{...P}:P;if(ee.splice($,0,G),n.$set(o,ee),R&&!R.copyMode&&(m||R.removeMode)){let Q=t.resolve(R.listPath,R.ctx);if(Array.isArray(Q)&&H!=null){let F=Q.filter((U,He)=>He!==H);R.ctx.$set(R.listPath,F),R.el.dispatchEvent(new CustomEvent("remove",{bubbles:!0,detail:{list:F,item:P,index:H}}))}}e.dispatchEvent(new CustomEvent("receive",{bubbles:!0,detail:{list:ee,item:P,from:H,fromList:R?t.resolve(R.listPath,R.ctx):null}}))}requestAnimationFrame(()=>{let Q=[...e.children][M&&H<$?$-1:$];if(Q){let F=Q.firstElementChild||Q;x.split(/\s+/).filter(Boolean).forEach(U=>F.classList.add(U)),F.addEventListener("animationend",()=>{x.split(/\s+/).filter(Boolean).forEach(U=>F.classList.remove(U))},{once:!0})}}),E.dragging=null},z=S=>{if(E.dragging&&ue(E.dragging.type,g)&&(S.key==="Enter"||S.key===" ")){S.preventDefault();let P=e.querySelector(":focus");if(P){let H=(P.style?.display==="contents"&&P.firstElementChild||P).getBoundingClientRect(),$={preventDefault(){},stopPropagation(){},clientX:H.left+H.width/2,clientY:H.top+H.height+1,dataTransfer:null};X($)}}};e.addEventListener("dragover",w),e.addEventListener("dragenter",B),e.addEventListener("dragleave",q),e.addEventListener("drop",X),e.addEventListener("keydown",z),ae(e,()=>{e.removeEventListener("dragover",w),e.removeEventListener("dragenter",B),e.removeEventListener("dragleave",q),e.removeEventListener("drop",X),e.removeEventListener("keydown",z)});let se=n.$watch(T);ae(e,se),T()}})}function jt(t){ze(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(K(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}E.selected.has(n)||E.selected.set(n,new Set);let s=E.selected.get(n),a=c=>{let g=e.getAttribute("drag"),m={item:g?t.evaluate(g,o):null,el:e,ctx:o};if(c.ctrlKey||c.metaKey){let u=[...s].find(l=>l.el===e);u?(s.delete(u),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.remove(l))):(s.add(m),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.add(l)))}else{for(let u of s)i.split(/\s+/).filter(Boolean).forEach(l=>u.el.classList.remove(l));s.clear(),s.add(m),i.split(/\s+/).filter(Boolean).forEach(u=>e.classList.add(u))}};e.addEventListener("click",a),ae(e,()=>{e.removeEventListener("click",a);let c=[...s].find(g=>g.el===e);c&&s.delete(c)});let d=c=>{if(c.key==="Escape"){for(let g of s)i.split(/\s+/).filter(Boolean).forEach(p=>g.el.classList.remove(p));s.clear()}};window.addEventListener("keydown",d),ae(e,()=>window.removeEventListener("keydown",d))}})}function kt(t,e={}){_t(t),At(t),Lt(t),jt(t)}function Ct(){Et()}var Tt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],Je=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var pe,Ht,qe,et,tt,St,Me,rt,Dt;function Bn(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function Hn(t){return(t.getAttribute("type")||"text").toLowerCase()}function Pn(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let s=n.split("|").map(a=>a.trim());for(let a of s){let[d,...c]=a.split(":"),g=pe[d];if(g){let p=g(t.value,...c,e);p!==!0&&p&&(r.push({rule:d,message:p}),o.add(d))}else{let p=t.value,m=null;switch(d){case"required":(p==null||String(p).trim()==="")&&(m="Required");break;case"email":p&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p)&&(m="Invalid email");break;case"url":try{new URL(p)}catch{m="Invalid URL"}break;case"min":Number(p)<Number(c[0])&&(m=`Minimum value is ${c[0]}`);break;case"max":Number(p)>Number(c[0])&&(m=`Maximum value is ${c[0]}`);break;case"custom":if(c[0]&&pe[c[0]]){let u=pe[c[0]](p,e);u!==!0&&u&&(m=u)}break}m&&(r.push({rule:d,message:m}),o.add(d))}}}let i=t.validity;if(i&&!i.valid){for(let[s,a]of Tt)if(i[s]){let d=a||Hn(t);o.has(d)||(r.push({rule:d,message:t.validationMessage}),o.add(d))}}return r}function Fn(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function $n(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let s=Je.indexOf(n.rule),a=Je.indexOf(i.rule);return(s===-1?999:s)-(a===-1?999:a)})[0];return{rule:o.rule,message:Fn(e,o.rule,o.message)}}function Pt(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function Rn(t,e,r,o,n){let i=Pt(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;rt(i),i.remove()}let s=document.querySelector(t);if(!s)return;let a=s.content.cloneNode(!0),d=document.createElement("div");d.style.display="contents",d.__errorTemplateFor=o;let c=qe({$error:e,$rule:r},n);d.__ctx=c,d.appendChild(a),s.parentNode.insertBefore(d,s.nextSibling),Bn(d),tt(d)}function It(t){let e=Pt(t);e&&(rt(e),e.remove())}function zn(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!Ht(r,e)}catch{return!0}}function Bt(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function Mn(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...s]=n.split(":"),a=pe[i];if(a){let d=a(t,...s,r);if(d!==!0&&d)return d}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(s[0]))return`Minimum value is ${s[0]}`;break;case"max":if(Number(t)>Number(s[0]))return`Maximum value is ${s[0]}`;break;case"custom":if(s[0]&&pe[s[0]]){let d=pe[s[0]](t,r);if(d!==!0&&d)return d}break}}return null}function qn(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return et(t);let e=qe({},null);return t.__ctx=e,e}function Ft(t){pe=K(t,"validators")||{},Ht=t.evaluate,qe=t.createContext,et=t.findContext,tt=t.processTree,St=K(t,"cloneTemplate")||(()=>null),Me=K(t,"disposeChildren")||(()=>{}),rt=K(t,"disposeTree")||Me,Dt=K(t,"warn")||console.warn;let e=K(t,"removeCoreDirective");typeof e=="function"?e("validate"):Dt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let m=function(){s&&typeof s.$notify=="function"&&s.$notify();let h=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;h.nextNode();){let A=h.currentNode.__ctx;A&&A!==s&&typeof A.$notify=="function"&&A.$notify()}},u=function(){return r.querySelectorAll("input, textarea, select")},l=function(){let h={},x={},A={},L=!0,k=null,j=0,T=!1;for(let w of u())w.name&&(w.type==="checkbox"?x[w.name]=w.checked:w.type==="radio"?w.checked?x[w.name]=w.value:w.name in x||(x[w.name]=""):x[w.name]=w.value);for(let w of u()){if(!w.name)continue;let B=d.has(w.name),q=c.has(w.name);if(!zn(w,s)){A[w.name]={valid:!0,dirty:q,touched:B,error:null,value:x[w.name]};continue}let X=Pn(w,x),z=$n(X,w),se=!z,S=Bt(w,r),P=S.includes("input"),R=S.includes("blur")||S.includes("focusout")||S.includes("submit"),H;!w.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?H=B||q:H=P&&q||R&&B,se||(L=!1),!se&&H&&(h[w.name]=z.message,j++,k||(k=z.message)),A[w.name]={valid:se,dirty:q,touched:B,error:z?z.message:null,value:x[w.name]};let $=w.getAttribute("error-class")||a;if($){let M=$.split(/\s+/);!se&&H?w.classList.add(...M):w.classList.remove(...M)}if(z&&H){let M=w.getAttribute(`error-${z.rule}`),ee=w.getAttribute("error"),G=(M&&M.startsWith("#")?M:null)||(ee&&ee.startsWith("#")?ee:null);G?Rn(G,z.message,z.rule,w,s):It(w)}else It(w);let O=w.getAttribute("as");O&&s.$set(O,A[w.name])}g.size>0&&(T=!0),p.valid=L,p.errors=h,p.values=x,p.fields=A,p.firstError=k,p.errorCount=j,p.pending=T,s.$set("$form",{...p}),m(),v(r)},v=function(h){let x=p.valid&&!p.pending&&!p.submitting,A=h.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let L of A){if(L.hasAttribute("disabled")&&L.getAttribute("disabled")!==""){let k=L.getAttribute("disabled");if(k!=="disabled"&&k!=="true"&&k!=="false")continue}L.disabled=!x,L.__autoDisabled=!0}},y=function(h){if(!h.name)return;let x=Bt(h,r),A=()=>{c.add(h.name),p.dirty=!0,l()},L=()=>{d.add(h.name),p.touched=!0,l()};if(x.includes("input"))h.addEventListener("input",A),ne(r,()=>h.removeEventListener("input",A));else{let k=()=>{c.add(h.name),p.dirty=!0,l()};h.addEventListener("input",k),ne(r,()=>h.removeEventListener("input",k))}if(x.includes("blur")||x.includes("focusout")){let k=()=>{L(),x.includes("blur")&&A()};h.addEventListener("focusout",k),ne(r,()=>h.removeEventListener("focusout",k))}else h.addEventListener("focusout",L),ne(r,()=>h.removeEventListener("focusout",L));x.includes("submit")&&(h.addEventListener("focusout",L),ne(r,()=>h.removeEventListener("focusout",L)))},s=qn(r);r.setAttribute("novalidate","");let a=r.getAttribute("error-class"),d=new Set,c=new Set,g=new Map,p={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{p.dirty=!1,p.touched=!1,p.pending=!1,p.submitting=!1,d.clear(),c.clear(),r.reset(),l()},endSubmit:()=>{p.submitting=!1,l()}};s.$set("$form",p);let f=r.hasAttribute("validate-on"),b=[...u()].some(h=>h.hasAttribute("validate-on"));if(!f&&!b){let h=A=>{let L=A.target;L&&L.name&&c.add(L.name),p.dirty=!0,l()};r.addEventListener("input",h),ne(r,()=>r.removeEventListener("input",h)),r.addEventListener("change",h),ne(r,()=>r.removeEventListener("change",h));let x=A=>{A.target&&A.target.name&&d.add(A.target.name),p.touched=!0,l()};r.addEventListener("focusout",x),ne(r,()=>r.removeEventListener("focusout",x))}else for(let h of u())y(h);let _=h=>{for(let x of u())x.name&&d.add(x.name);if(p.touched=!0,l(),!p.valid||p.pending){h.preventDefault(),h.stopImmediatePropagation();return}p.submitting=!0,v(r),s.$set("$form",{...p}),m()};r.addEventListener("submit",_,!0),ne(r,()=>r.removeEventListener("submit",_,!0)),r.__nojsResetSubmitting=()=>{p.submitting=!1,l()},ne(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(l);return}let i=et(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let s=r.getAttribute("error"),a=()=>{let d=Mn(r.value,n,{});if(d&&s){let c=r.nextElementSibling?.__validationError?r.nextElementSibling:null;c||(c=document.createElement("div"),c.__validationError=!0,c.style.display="contents",r.parentNode.insertBefore(c,r.nextSibling));let g=St(s);if(g){let p=qe({err:{message:d}},i);Me(c),c.innerHTML="",c.__ctx=p,c.appendChild(g),tt(c)}}else{let c=r.nextElementSibling?.__validationError?r.nextElementSibling:null;c&&(Me(c),c.innerHTML="")}};r.addEventListener("input",a),ne(r,()=>r.removeEventListener("input",a))}}})}function $t(t,e={}){Ft(t)}function Rt(){}var ve=new Map,te=new Map;function zt(){let t=Array.from(ve.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of te.values())clearTimeout(e);te.clear();for(let e of ve.values())e.remove();ve.clear()}function Mt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function On(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Oe=8;function Ot(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,s=window.innerHeight,a,d;switch(r){case"bottom":a=o.bottom+Oe,d=o.left+(o.width-n.width)/2;break;case"left":a=o.top+(o.height-n.height)/2,d=o.left-n.width-Oe;break;case"right":a=o.top+(o.height-n.height)/2,d=o.right+Oe;break;default:a=o.top-n.height-Oe,d=o.left+(o.width-n.width)/2;break}d<4&&(d=4),d+n.width>i-4&&(d=i-n.width-4),a<4&&(a=4),a+n.height>s-4&&(a=s-n.height-4),t.style.top=`${a}px`,t.style.left=`${d}px`}var Vn=0;function Wn(t,e,r){document.body.appendChild(e),Ot(e,t,r),e.setAttribute("aria-hidden","false")}function qt(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function Nn(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function Vt(t){t.directive("tooltip",{priority:20,init(e,r,o){Mt();let n=o;if(!n){Nn(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",s=parseInt(e.getAttribute("tooltip-delay"),10),a=Number.isNaN(s)?300:s,d=e.getAttribute("tooltip-disabled"),c=d?t.findContext(e):null,g=()=>{if(!d||!c)return!1;try{return!!t.evaluate(d,c)}catch{return!1}},p=`nojs-tooltip-${++Vn}`,m=document.createElement("div");m.className="nojs-tooltip",m.setAttribute("role","tooltip"),m.setAttribute("id",p),m.setAttribute("aria-hidden","true"),m.textContent=n,e.setAttribute("aria-describedby",p),ve.set(e,m);let u=!1,l=0,v=()=>{!u||!e.isConnected||l||(l=requestAnimationFrame(()=>{l=0,!(!u||!e.isConnected)&&Ot(m,e,i)}))},y=()=>{window.addEventListener("scroll",v,!0),window.addEventListener("resize",v)},f=()=>{window.removeEventListener("scroll",v,!0),window.removeEventListener("resize",v),l&&(cancelAnimationFrame(l),l=0)},b=()=>{u||(Wn(e,m,i),u=!0,y())},_=()=>{if(!u){qt(e,m);return}f(),qt(e,m),u=!1},h=()=>{if(g())return;te.has(e)&&clearTimeout(te.get(e));let B=setTimeout(()=>{te.delete(e),!g()&&e.isConnected&&b()},a);te.set(e,B)},x=()=>{te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),_()},A=()=>h(),L=()=>x(),k=()=>h(),j=()=>x(),T=B=>{B.key==="Escape"&&m.getAttribute("aria-hidden")==="false"&&x()};e.addEventListener("mouseenter",A),e.addEventListener("mouseleave",L),e.addEventListener("focusin",k),e.addEventListener("focusout",j),e.addEventListener("keydown",T);let w=null;if(d&&c&&typeof c.$watch=="function"){let B=()=>{u&&g()&&_()};w=c.$watch(B)}On(e,()=>{e.removeEventListener("mouseenter",A),e.removeEventListener("mouseleave",L),e.removeEventListener("focusin",k),e.removeEventListener("focusout",j),e.removeEventListener("keydown",T),w&&(w(),w=null),f(),te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),u=!1,m.remove(),ve.delete(e)})}})}function Wt(t,e={}){Vt(t)}function Nt(){zt()}var Y=new Map;function Gt(){Y.clear()}function Ve(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
.nojs-popover {
  position: fixed;
  z-index: 9998;
  margin: 0;
  border: 1px solid #E2E8F0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06);
  max-width: 20rem;
}
.nojs-popover:popover-open {
  display: block;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function nt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ye(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}var de=8;function We(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,s=window.innerHeight,a,d;switch(r){case"top":a=o.top-n.height-de,d=o.left+(o.width-n.width)/2;break;case"left":a=o.top+(o.height-n.height)/2,d=o.left-n.width-de;break;case"right":a=o.top+(o.height-n.height)/2,d=o.right+de;break;default:a=o.bottom+de,d=o.left+(o.width-n.width)/2;break}r==="bottom"&&a+n.height>s&&(a=o.top-n.height-de),r==="top"&&a<0&&(a=o.bottom+de),r==="right"&&d+n.width>i&&(d=o.left-n.width-de),r==="left"&&d<0&&(d=o.right+de),d<4&&(d=4),d+n.width>i-4&&(d=i-n.width-4),a<4&&(a=4),a+n.height>s-4&&(a=s-n.height-4),t.style.top=`${a}px`,t.style.left=`${d}px`}function ot(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let s=t.popoverEl;if(!s||!s.isConnected){i();return}if(typeof s.matches=="function"&&!s.matches(":popover-open")){i();return}We(s,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function fe(t){t&&t._untrack&&t._untrack()}function Ut(t){t.directive("popover",{priority:20,init(r,o,n){Ve();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let s=r.getAttribute("popover-position")||"bottom";if(!Y.has(i))Y.set(i,{popoverEl:r,triggerEls:new Set,position:s,open:!1,_untrack:null});else{let d=Y.get(i);d.popoverEl=r,d.position=s}let a=d=>{let c=Y.get(i);if(!c)return;let g=d.newState==="open";c.open=g;for(let p of c.triggerEls)p.setAttribute("aria-expanded",String(g));g||fe(c)};r.addEventListener("toggle",a),nt(r,()=>{r.removeEventListener("toggle",a);let d=Y.get(i);d&&(fe(d),d.popoverEl===r&&(d.popoverEl=null,d.open=!1),!d.popoverEl&&d.triggerEls.size===0&&Y.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){Ve();let i=n;if(!i){let d=r.closest("[use]")||r.parentElement,c=d?.querySelector("[data-popover-id]")||d?.querySelector("[popover]");if(c&&(i=c.getAttribute("data-popover-id")||c.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),Y.has(i)||Y.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),Y.get(i).triggerEls.add(r);let s=d=>{let c=Y.get(i);if(!c||!c.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}ye(c.popoverEl)&&(c.popoverEl.togglePopover(),requestAnimationFrame(()=>{c.popoverEl.matches(":popover-open")?(We(c.popoverEl,r,c.position),ot(c,r)):fe(c)}))};r.addEventListener("click",s);let a=d=>{let c=Y.get(i);d.key==="Escape"&&c?.open&&(ye(c.popoverEl,"hidePopover")&&c.popoverEl.hidePopover(),fe(c),r.focus())};document.addEventListener("keydown",a),nt(r,()=>{r.removeEventListener("click",s),document.removeEventListener("keydown",a);let d=Y.get(i);d&&(d.triggerEls.delete(r),!d.popoverEl&&d.triggerEls.size===0&&(fe(d),Y.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){Ve();let o=()=>{let n=r.closest(".nojs-popover");!n||!ye(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),nt(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!ye(n.popoverEl,"showPopover"))return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>{We(n.popoverEl,i,n.position),ot(n,i)}),!0},e.close=r=>{let o=Y.get(r);if(!o||!o.popoverEl||!ye(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return fe(o),!0},e.toggle=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!ye(n.popoverEl))return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{We(n.popoverEl,i,n.position),ot(n,i)}):fe(n),!0},t.popover=e}function Yt(t,e={}){Ut(t)}function Kt(){Gt()}var W=[],oe=new Map,Gn=1e4;function Xt(){return Gn+W.length}function Zt(){W.length=0,oe.clear()}function xe(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function Un(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Jt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',it=new WeakMap;function Yn(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(Jt)].filter(s=>s.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),it.set(t,e)}function Qt(t){let e=it.get(t);e&&(t.removeEventListener("keydown",e),it.delete(t))}var Ce=new WeakMap;function er(t){t.directive("modal",{priority:10,init(r,o,n){xe();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let s=r.querySelector("h1, h2, h3, h4, h5, h6");s&&(s.id||(s.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",s.id));let a=r.getAttribute("modal-backdrop");a==="false"&&r.setAttribute("data-nojs-no-backdrop","");let d=r.getAttribute("modal-class"),c=r.getAttribute("modal-escape"),g=m=>{m.target===r&&a!=="false"&&c!=="false"&&Ee(r,i)};r.addEventListener("click",g),oe.set(i,r);let p=m=>{if(m.newState==="open"){if(r.style.zIndex=String(Xt()),d&&d.split(/\s+/).filter(Boolean).forEach(u=>r.classList.add(u)),requestAnimationFrame(()=>{if(!r.isConnected||!W.some(l=>l.el===r))return;let u=r.querySelector(Jt);u?u.focus():r.focus()}),Yn(r),c!=="false"){let u=l=>{l.key==="Escape"&&(l.stopPropagation(),Ee(r,i))};r.addEventListener("keydown",u),Ce.set(r,u)}}else if(m.newState==="closed"){d&&d.split(/\s+/).filter(Boolean).forEach(v=>r.classList.remove(v)),Qt(r);let u=Ce.get(r);u&&(r.removeEventListener("keydown",u),Ce.delete(r));let l=W.findIndex(v=>v.el===r);if(l===-1&&(l=W.findIndex(v=>v.id===i)),l!==-1){let v=W[l];W.splice(l,1),v.triggerEl&&requestAnimationFrame(()=>{v.triggerEl.focus()})}}};r.addEventListener("toggle",p),Un(r,()=>{r.removeEventListener("click",g),r.removeEventListener("toggle",p),Qt(r);let m=Ce.get(r);m&&(r.removeEventListener("keydown",m),Ce.delete(r)),oe.delete(i);let u=W.findIndex(l=>l.el===r);u===-1&&(u=W.findIndex(l=>l.id===i)),u!==-1&&W.splice(u,1)})}});let e=r=>e.open(r);e.open=r=>{let o=oe.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return W.some(n=>n.id===r)||W.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=oe.get(r);return o?(Ee(o,r),!0):!1},e.closeAll=()=>{for(let r=W.length-1;r>=0;r--)Ee(W[r].el,W[r].id)},t.modal=e}function Ee(t,e){try{t.hidePopover()}catch{}}function tr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Kn(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function rr(t){t.directive("modal-open",{priority:10,init(e,r,o){xe();let n=o;if(!n){let p=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(p&&(n=p.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let g=oe.get(n)||Kn(n);if(!g){console.warn(`[modal-open] modal "${n}" not found`);return}let p=W.some(m=>m.id===n);g.id&&e.setAttribute("aria-controls",g.id);try{g.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}p||W.push({id:n,el:g,triggerEl:e}),e.setAttribute("aria-expanded","true")},s=()=>{e.setAttribute("aria-expanded","false")},a=null,d=null,c=()=>{let g=oe.get(n);return g?(d=g,a=p=>{p.newState==="closed"&&e.setAttribute("aria-expanded","false")},g.addEventListener("toggle",a),!0):!1};if(!c()){let g=requestAnimationFrame(c);tr(e,()=>cancelAnimationFrame(g))}e.addEventListener("click",i),tr(e,()=>{e.removeEventListener("click",i),d&&a&&d.removeEventListener("toggle",a)})}})}function Xn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function nr(t){t.directive("modal-close",{priority:10,init(e,r,o){xe();let n=()=>{let i,s;if(o){if(s=o,i=oe.get(s),!i){console.warn(`[modal-close] modal "${s}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}s=i.getAttribute("modal")}Ee(i,s)};e.addEventListener("click",n),Xn(e,()=>{e.removeEventListener("click",n)})}})}function or(t,e={}){er(t),rr(t),nr(t)}function ir(){Zt()}var ce={openMenus:new Map};function sr(){ce.openMenus.clear()}function we(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
.nojs-dropdown-menu {
  position: fixed;
  z-index: 9999;
  margin: 0;
  min-width: max-content;
  list-style: none;
  padding: 0;
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var Zn=0;function Qn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ar(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),s=t.getBoundingClientRect(),a=window.innerHeight,d=window.innerWidth,c,g;switch(o){case"top":c=i.top-s.height,g=i.left;break;case"left":c=i.top,g=i.left-s.width;break;case"right":c=i.top,g=i.right;break;default:c=i.bottom,g=i.left}o==="bottom"||o==="top"?n==="end"&&(g=i.right-s.width):n==="end"&&(c=i.bottom-s.height),o==="bottom"&&c+s.height>a&&i.top-s.height>0?c=i.top-s.height:o==="top"&&c<0&&i.bottom+s.height<=a&&(c=i.bottom),g<4&&(g=4),g+s.width>d-4&&(g=d-s.width-4),t.style.top=`${c}px`,t.style.left=`${g}px`}function at(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function st(t){let e=at(t);e.length&&e[0].focus()}function dr(t){let e=at(t);e.length&&e[e.length-1].focus()}function cr(t){t.directive("dropdown",{priority:15,init(r){we()}}),t.directive("dropdown-toggle",{priority:15,init(r){we();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${Zn++}`),r.setAttribute("aria-controls",n.id);let i=!1,s=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function a(){if(n.setAttribute("data-open",""),s&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),ar(n,r,o),ce.openMenus.set(n,{toggle:r,wrapper:o})}function d(){if(s&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),ce.openMenus.delete(n)}function c(){return r.getAttribute("aria-expanded")==="true"}let g=f=>{f.newState==="closed"&&c()&&d()};n.addEventListener("toggle",g);let p=f=>{f.preventDefault(),f.stopPropagation(),c()?d():a()};r.addEventListener("click",p);let m=f=>{c()&&!o.contains(f.target)&&d()};document.addEventListener("click",m,!0);let u=f=>{f.key==="Escape"&&c()&&(d(),r.focus())};document.addEventListener("keydown",u);let l=f=>{switch(f.key){case"Enter":case" ":f.preventDefault(),a(),st(n);break;case"ArrowDown":f.preventDefault(),a(),st(n);break;case"ArrowUp":f.preventDefault(),a(),dr(n);break}};r.addEventListener("keydown",l);let v=f=>{if(!(!c()||at(n).find(h=>h===document.activeElement)))switch(f.key){case"ArrowDown":f.preventDefault(),st(n);break;case"ArrowUp":f.preventDefault(),dr(n);break}};n.addEventListener("keydown",v);let y=()=>{c()&&ar(n,r,o)};window.addEventListener("scroll",y,!0),window.addEventListener("resize",y),Qn(r,()=>{r.removeEventListener("click",p),r.removeEventListener("keydown",l),n.removeEventListener("keydown",v),n.removeEventListener("toggle",g),document.removeEventListener("click",m,!0),document.removeEventListener("keydown",u),window.removeEventListener("scroll",y,!0),window.removeEventListener("resize",y),ce.openMenus.delete(n)})}}),t.directive("dropdown-menu",{priority:15,init(r){we(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function lr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Jn(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function dt(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),ce.openMenus.has(t)&&ce.openMenus.delete(t)}function ur(t){t.directive("dropdown-item",{priority:15,init(e){we();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=s=>{if(!r)return;let a=Jn(r),d=a.indexOf(e);switch(s.key){case"ArrowDown":{s.preventDefault(),(d+1<a.length?a[d+1]:a[0]).focus();break}case"ArrowUp":{s.preventDefault(),(d-1>=0?a[d-1]:a[a.length-1]).focus();break}case"Home":{s.preventDefault(),a.length&&a[0].focus();break}case"End":{s.preventDefault(),a.length&&a[a.length-1].focus();break}case"Enter":{s.preventDefault(),e.click();break}case"Escape":{if(s.preventDefault(),dt(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}break}case"Tab":{dt(r,o);break}}};e.addEventListener("keydown",n),lr(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(dt(r,o),o){let s=o.querySelector("[dropdown-toggle]");s&&s.focus()}};e.addEventListener("click",i),lr(e,()=>e.removeEventListener("click",i))}})}function pr(t,e={}){cr(t),ur(t)}function fr(){sr()}var ie=new Map,_e=new Set,gr=0;function mr(){return++gr}function br(){for(let t of _e)clearTimeout(t);_e.clear();for(let t of ie.values())t.remove();ie.clear(),gr=0}function hr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function ct(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var eo=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function lt(){return ie.size>0?ie.values().next().value:to("top-right")}function to(t){if(ie.has(t))return ie.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),ie.set(t,e),e}function ro(t){return t.startsWith("top")}function ut(t,e,r,o,n){let i=mr(),s=t.getAttribute("data-position")||"top-right",a=document.createElement("div");a.classList.add("nojs-toast"),a.setAttribute("data-toast-id",i),a.setAttribute("data-type",r),r==="error"&&a.setAttribute("aria-live","assertive");let d=document.createElement("span");if(d.textContent=e,a.appendChild(d),n){let c=document.createElement("button");c.type="button",c.classList.add("nojs-toast-dismiss"),c.setAttribute("aria-label","Dismiss"),c.textContent="\xD7",c.addEventListener("click",()=>Ne(a)),a.appendChild(c)}if(ro(s)&&t.firstChild?t.insertBefore(a,t.firstChild):t.appendChild(a),o>0){let c=setTimeout(()=>{_e.delete(c),a.isConnected&&Ne(a)},o);_e.add(c),a._toastTimerId=c}return a}function Ne(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),_e.delete(t._toastTimerId)),t.remove())}function vr(t){hr(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&eo.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),ie.set(i,r),ct(r,()=>{ie.get(i)===r&&ie.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",s=parseInt(r.getAttribute("toast-duration"),10),a=Number.isNaN(s)?3e3:s,d=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let l=()=>{let v=lt();ut(v,n,i,a,d)};r.addEventListener("click",l),ct(r,()=>r.removeEventListener("click",l));return}let g=t.findContext(r);if(!g||typeof g.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let p;function m(){let l=t.evaluate(n,g);if(l&&l!==p){let v=typeof l=="string"?l:String(l),y=lt();ut(y,v,i,a,d),p=l}else p=l}let u=g.$watch(m);ct(r,u)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,s=lt();return ut(s,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&Ne(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>Ne(r))},t.toast=e}function yr(t,e={}){vr(t)}function xr(){br()}var ge={containers:new Map};function Er(){ge.containers.clear()}function wr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function no(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var oo=0;function _r(t){return`${t}-${++oo}`}function Te(t,e,r=!1){let o=ge.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let s=0;s<n.length;s++)n[s].setAttribute("aria-selected","false"),n[s].setAttribute("tabindex","-1"),i[s].setAttribute("aria-hidden","true"),i[s].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Se(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Ar(t){t.directive("tabs",{priority:10,init(e,r,o){wr();let n=[],i=[];for(let f of Array.from(e.children))f.hasAttribute("tab")?n.push(f):f.hasAttribute("panel")&&i.push(f);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let s=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",s),e.classList.add("nojs-tabs");let a=document.createElement("div");a.setAttribute("role","tablist"),a.classList.add("nojs-tablist");let d=Math.min(n.length,i.length);for(let f=0;f<d;f++){let b=n[f],_=i[f],h=b.id||_r("nojs-tab"),x=_.id||_r("nojs-panel");b.id=h,_.id=x,b.setAttribute("role","tab"),b.setAttribute("aria-selected","false"),b.setAttribute("aria-controls",x),b.setAttribute("tabindex","-1"),b.classList.add("nojs-tab"),_.setAttribute("role","tabpanel"),_.setAttribute("aria-labelledby",h),_.setAttribute("tabindex","0"),_.setAttribute("aria-hidden","true"),_.inert=!0,_.classList.add("nojs-panel"),a.appendChild(b)}for(let f=d;f<i.length;f++){let b=i[f];b.setAttribute("role","tabpanel"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel")}let c=i[0];c?e.insertBefore(a,c):e.appendChild(a),ge.containers.set(e,{tabs:n.slice(0,d),panels:i.slice(0,d),activeIndex:-1});let g=t.findContext(e),p=[],m=(f,b)=>{let _=!1;try{_=!!t.evaluate(b,g)}catch{_=!1}_?f.setAttribute("aria-disabled","true"):f.removeAttribute("aria-disabled")};for(let f=0;f<d;f++){let b=n[f],_=b.getAttribute("tab-disabled");if(_&&(m(b,_),g&&typeof g.$watch=="function")){let h=g.$watch(()=>m(b,_));p.push(h)}}let u=0;if(o&&o.trim()!==""){let f=parseInt(o,10);!isNaN(f)&&f>=0&&f<d&&(u=f)}let l=n.slice(0,d);if(n[u]?.getAttribute("aria-disabled")==="true"){let f=Se(l,u,1);f!==-1?(u=f,Te(e,u)):Te(e,u,!0)}else Te(e,u);let v=f=>{let b=ge.containers.get(e);if(!b)return;let _=f.target;if(_.getAttribute("role")!=="tab")return;let{tabs:h}=b,x=h.indexOf(_);if(x===-1)return;let A=-1;switch(f.key){case"ArrowRight":case"ArrowDown":A=Se(h,x,1);break;case"ArrowLeft":case"ArrowUp":A=Se(h,x,-1);break;case"Home":A=Se(h,h.length-1,1);break;case"End":A=Se(h,0,-1);break;case"Tab":return;default:return}A!==-1&&A!==x&&(f.preventDefault(),Te(e,A),h[A].focus())};a.addEventListener("keydown",v);let y=f=>{let b=f.target.closest("[role='tab']");if(!b)return;let _=ge.containers.get(e);if(!_)return;let h=_.tabs.indexOf(b);h!==-1&&b.getAttribute("aria-disabled")!=="true"&&(Te(e,h),b.focus())};a.addEventListener("click",y),no(e,()=>{a.removeEventListener("keydown",v),a.removeEventListener("click",y);for(let f of p)f&&f();p.length=0,ge.containers.delete(e)})}})}function Lr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function jr(t){t.directive("panel",{priority:11,init(){}})}function kr(t,e={}){Ar(t),Lr(t),jr(t)}function Cr(){Er()}var I={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Tr(){I.branches.clear(),I.selectedItem=null,I.typeahead="",I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null)}function Ae(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
/* \u2500\u2500 DnD integration \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.nojs-tree-drag-over {
  background: #EFF6FF;
  outline: 2px dashed #3B82F6;
  outline-offset: -2px;
  border-radius: 6px;
}
.nojs-tree-drag-indicator {
  height: 2px;
  background: #3B82F6;
  border-radius: 1px;
  pointer-events: none;
  z-index: 10;
}
.nojs-tree-drag-indicator::before {
  content: "";
  position: absolute;
  left: -3px;
  top: -3px;
  width: 8px;
  height: 8px;
  background: #3B82F6;
  border-radius: 50%;
}
[role="treeitem"][draggable="true"] {
  cursor: grab;
}
[role="treeitem"].nojs-dragging {
  opacity: 0.4;
  cursor: grabbing !important;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function Le(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Sr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function Dr(t){return t.closest('[role="tree"]')}function io(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function so(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function pt(t){let e=I.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),I.selectedItem=t}function Ir(t){let e=I.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function ao(t){let e=I.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function co(t){let e=I.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Br(t,e){let r=Dr(e);if(!r)return;let o=Sr(r),n=o.indexOf(e);if(n<0)return;let i=I.branches.get(e),s=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),s&&!i.expanded)ao(e);else if(s&&i.expanded){let a=i.subtreeEl.querySelector('[role="treeitem"]');a&&me(a,o)}break;case"ArrowLeft":if(t.preventDefault(),s&&i.expanded)co(e);else{let a=io(e);a&&me(a,Sr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&me(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&me(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),pt(e),s&&Ir(e);break;case"Home":t.preventDefault(),o.length>0&&me(o[0],o);break;case"End":t.preventDefault(),o.length>0&&me(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),I.typeahead+=t.key.toLowerCase(),I.typeaheadTimer&&clearTimeout(I.typeaheadTimer),I.typeaheadTimer=setTimeout(()=>{I.typeahead="",I.typeaheadTimer=null},500);let a=n+1;for(let d=0;d<o.length;d++){let c=(a+d)%o.length;if(so(o[c]).startsWith(I.typeahead)){me(o[c],o);break}}}break}}function Hr(t){t.directive("tree",{priority:15,init(e){Ae(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function Pr(t){t.directive("branch",{priority:16,init(e,r,o){Ae();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=Dr(e);if(i){let c=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",c?"-1":"0")}else e.setAttribute("tabindex","0");let s=!1;queueMicrotask(()=>{if(s)return;let c=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);c?(I.branches.set(e,{expanded:n,subtreeEl:c}),c.setAttribute("aria-hidden",String(!n))):I.branches.set(e,{expanded:n,subtreeEl:null})});let a=c=>{c.target.closest?.('[role="treeitem"]')===e&&(c.stopPropagation(),pt(e),Ir(e))};e.addEventListener("click",a),Le(e,()=>e.removeEventListener("click",a));let d=c=>{Br(c,e)};e.addEventListener("keydown",d),Le(e,()=>e.removeEventListener("keydown",d)),Le(e,()=>{s=!0,I.branches.delete(e),I.selectedItem===e&&(I.selectedItem=null),I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null,I.typeahead="")})}})}function me(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Fr(t){t.directive("subtree",{priority:16,init(e){Ae(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=s=>{s.stopPropagation(),pt(o)};o.addEventListener("click",n),Le(o,()=>o.removeEventListener("click",n));let i=s=>{Br(s,o)};o.addEventListener("keydown",i),Le(o,()=>o.removeEventListener("keydown",i)),Le(o,()=>{I.selectedItem===o&&(I.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=I.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function $r(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ft(t){return t.closest('[role="treeitem"]')}function lo(t){return t.closest('[role="tree"]')}function uo(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function po(t){return uo(t).indexOf(t)}function fo(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function Rr(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function je(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function De(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function go(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function mo(t,e){je();let r=go(),o=t.getBoundingClientRect(),n=lo(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function zr(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(Ae(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=m=>{let u=ft(m.target);if(u&&e.contains(u)){if(u.hasAttribute("tree-drag-disabled")){m.preventDefault();return}D.dragging={el:u,treeRoot:e},m.dataTransfer&&(m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain","")),u.classList.add("nojs-dragging"),u.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:u}}))}},s=m=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let u=ft(m.target);if(!u||!e.contains(u)||u===D.dragging.el||Rr(u,D.dragging.el))return;m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move");let l=fo(u,m.clientY,o);(D.currentTarget!==u||D.currentPosition!==l)&&(De(e),je(),D.currentTarget=u,D.currentPosition=l,l==="on"?u.classList.add("nojs-tree-drag-over"):mo(u,l))},a=m=>{D.dragging&&D.dragging.treeRoot===e&&n++},d=m=>{D.dragging&&(n--,n<=0&&(n=0,De(e),je(),D.currentTarget=null,D.currentPosition=null))},c=m=>{if(m.preventDefault(),m.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let u=D.dragging.el,l=D.currentTarget,v=D.currentPosition;if(De(e),je(),!l||!v){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(l===u||Rr(l,u)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="on"){let y=l.querySelector(':scope > [role="group"]');y||(y=l.nextElementSibling?.matches?.('[role="group"]')?l.nextElementSibling:null),y?y.setAttribute("aria-hidden","false"):(y=document.createElement("ul"),y.setAttribute("role","group"),y.setAttribute("subtree",""),y.classList.add("nojs-subtree","nojs-tree"),y.setAttribute("aria-hidden","false"),l.appendChild(y));let f=I.branches.get(l);f&&(f.expanded=!0,f.subtreeEl=y,l.setAttribute("aria-expanded","true")),y.appendChild(u),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:u,newParent:l}}))}else{let y=l.parentElement;if(!y){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(v==="before")y.insertBefore(u,l);else{let b=l.nextElementSibling,_=b?.matches?.('[role="group"]')?b.nextElementSibling:b;_?y.insertBefore(u,_):y.appendChild(u)}let f=po(u);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:u,newIndex:f}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},g=m=>{let u=ft(m.target);u&&u.classList.remove("nojs-dragging"),De(e),je(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",s),e.addEventListener("dragenter",a),e.addEventListener("dragleave",d),e.addEventListener("drop",c),e.addEventListener("dragend",g),$r(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",s),e.removeEventListener("dragenter",a),e.removeEventListener("dragleave",d),e.removeEventListener("drop",c),e.removeEventListener("dragend",g),De(e),je()}),bo(e);let p=new MutationObserver(m=>{for(let u of m)for(let l of u.addedNodes){if(l.nodeType!==1)continue;l.getAttribute("role")==="treeitem"&&gt(l);let v=l.querySelectorAll?.('[role="treeitem"]');if(v)for(let y of v)gt(y)}});p.observe(e,{childList:!0,subtree:!0}),$r(e,()=>p.disconnect())}})}function gt(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function bo(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)gt(r)}function Mr(t,e={}){Hr(t),Pr(t),Fr(t),zr(t)}function qr(){Tr()}var Ge=new Map;function Or(){Ge.clear()}function Ue(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
.nojs-stepper-indicator-item.nojs-step-invalid {
  color: #DC2626;
}
.nojs-stepper-indicator-item.nojs-step-invalid::before {
  border-color: #DC2626;
  box-shadow: 0 0 0 3px rgba(220,38,38,0.2);
}
.nojs-step[aria-hidden="true"] {
  display: none;
}
.nojs-stepper-nav {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function Vr(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function Wr(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Nr(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Ie(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Gr(t){t.directive("stepper",{priority:14,init(e,r,o){Ue();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let s=o&&parseInt(o,10)||0,a=e.getAttribute("stepper-mode")||"linear",d=e.getAttribute("stepper-indicator")!=="false",c=e.getAttribute("stepper-nav")!=="false",g=e.getAttribute("aria-label")||"Stepper",p=Math.max(0,Math.min(s,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",g),e.classList.add("nojs-stepper");let m=null,u=[];if(d){m=document.createElement("div"),m.className="nojs-stepper-indicator",m.setAttribute("role","tablist"),m.setAttribute("aria-label","Progress"),i.forEach((j,T)=>{if(T>0){let z=document.createElement("div");z.className="nojs-stepper-separator",z.setAttribute("aria-hidden","true"),m.appendChild(z)}let w=document.createElement("button");w.type="button",w.className="nojs-stepper-indicator-item",w.setAttribute("role","tab"),w.setAttribute("aria-selected",T===p?"true":"false");let B=j.getAttribute("step-label")||`Step ${T+1}`,q=document.createElement("span");q.textContent=B,w.appendChild(q),w.setAttribute("aria-label",B);let X=`nojs-stepper-tab-${ho++}`;if(w.id=X,a==="free"){w.setAttribute("data-clickable","");let z=()=>x(T);w.addEventListener("click",z),Ie(e,()=>w.removeEventListener("click",z))}else w.setAttribute("tabindex","-1");m.appendChild(w),u.push(w)});let k=j=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(j.key))return;j.preventDefault();let T=p;j.key==="ArrowRight"?T=Math.min(p+1,i.length-1):j.key==="ArrowLeft"?T=Math.max(p-1,0):j.key==="Home"?T=0:j.key==="End"&&(T=i.length-1),a==="free"?(x(T),u[T]?.focus()):u[p]?.focus()};m.addEventListener("keydown",k),Ie(e,()=>m.removeEventListener("keydown",k)),e.insertBefore(m,e.firstChild)}let l=null,v=null,y=null;if(c){l=document.createElement("div"),l.className="nojs-stepper-nav",l.setAttribute("aria-hidden","true"),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-prev",v.textContent="Previous";let k=()=>h();v.addEventListener("click",k),Ie(e,()=>v.removeEventListener("click",k)),y=document.createElement("button"),y.type="button",y.className="nojs-stepper-next",y.textContent="Next";let j=()=>_();y.addEventListener("click",j),Ie(e,()=>y.removeEventListener("click",j)),l.appendChild(v),l.appendChild(y),e.appendChild(l)}function f(k){let j=i[k];if(!j)return!0;if(!Vr(j,t.findContext)){let B=j.querySelector("form[validate]");return B&&(Wr(B),u[k]&&u[k].classList.add("nojs-step-invalid"),Nr(e,j,B)),!1}u[k]&&u[k].classList.remove("nojs-step-invalid");let T=j.querySelectorAll("[required]");for(let B of T)if(typeof B.checkValidity=="function"&&!B.checkValidity())return B.reportValidity(),!1;let w=j.getAttribute("step-validate");if(w)try{if(!t.evaluate(w,n))return!1}catch(B){return console.warn(`[stepper] step-validate error: ${B.message}`),!1}return!0}function b(k){i.forEach((j,T)=>{let w=T===p;j.setAttribute("aria-hidden",w?"false":"true"),w?(j.removeAttribute("inert"),j.setAttribute("aria-current","step")):(j.setAttribute("inert",""),j.removeAttribute("aria-current"))}),u.length&&u.forEach((j,T)=>{j.setAttribute("aria-selected",T===p?"true":"false"),T<p?j.setAttribute("data-completed",""):j.removeAttribute("data-completed"),j.setAttribute("tabindex",T===p?"0":"-1");let w=i[T];w.id&&(j.setAttribute("aria-controls",w.id),w.setAttribute("aria-labelledby",j.id))}),v&&(v.disabled=p===0),y&&(y.textContent=p===i.length-1?"Finish":"Next"),e.dispatchEvent(new CustomEvent("step-change",{bubbles:!k,detail:{current:p,total:i.length}}))}function _(){return p>=i.length-1?(a==="linear"&&!f(p)||e.dispatchEvent(new CustomEvent("step-complete",{bubbles:!0,detail:{current:p,total:i.length}})),!1):a==="linear"&&!f(p)?!1:(p++,b(),L(),!0)}function h(){return p<=0?!1:(p--,b(),L(),!0)}function x(k){if(k<0||k>=i.length||k===p)return!1;if(a==="linear"&&k>p){for(let j=p;j<k;j++)if(p=j,b(),!f(j))return L(),!1}return p=k,b(),L(),!0}let A={get current(){return p},get total(){return i.length},next:_,prev:h,goTo:x,get isFirst(){return p===0},get isLast(){return p===i.length-1}};function L(){n.$stepper=A}L(),Ge.set(e,{get current(){return p},steps:i,mode:a,indicatorEl:m,navEl:l}),b(!0),Ie(e,()=>{Ge.delete(e),m&&m.parentNode&&m.remove(),l&&l.parentNode&&l.remove(),delete n.$stepper})}})}var ho=0;var vo=0;function Ur(t){t.directive("step",{priority:13,init(e,r,o){Ue(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${vo++}`),e.setAttribute("tabindex","0")}})}function Yr(t,e={}){Ur(t),Gr(t)}function Kr(){Or()}function Xr(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function Zr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Qr(t){t.directive("skeleton",{priority:10,init(e,r,o){Xr();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",s=e.getAttribute("skeleton-lines"),a=e.getAttribute("skeleton-size"),d=[];function c(f){g();for(let b=0;b<f;b++){let _=document.createElement("div");_.className="nojs-skeleton-line",e.appendChild(_),d.push(_)}}function g(){for(let f of d)f.parentNode===e&&e.removeChild(f);d=[]}function p(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),a&&(i==="circle"||i==="rect")){let f=a+(String(a).match(/\d$/)?"px":"");e.style.width=f,e.style.height=f}if(s){let f=parseInt(s,10);f>0&&c(f)}e.setAttribute("aria-busy","true")}let m=null;function u(){m&&m(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),g(),a&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let f=!1,b=null,_=()=>{f||(f=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",_),b!==null&&clearTimeout(b),m=null)};e.addEventListener("transitionend",_),b=setTimeout(_,0),m=()=>{e.removeEventListener("transitionend",_),b!==null&&clearTimeout(b),f=!0,m=null}}let l=!1;function v(){let f=!!t.evaluate(o,n);f&&!l?(l=!0,p()):!f&&l&&(l=!1,u())}v();let y=n.$watch(v);Zr(e,y),Zr(e,()=>{m&&m(),l&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),g(),a&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function Jr(t,e={}){Qr(t)}var be=new Map,N=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function en(){be.clear(),N.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function Ye(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function yo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function tn(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function rn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function xo(t,e){let o=(be.get(t)?.gutters||[]).reduce((n,i)=>n+Z(i,e),0);return Z(t,e)-o}function Eo(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Be(t,e){let r=N.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function Ke(t,e,r,o){let n=Z(e,o),i=Z(r,o),s=N.get(e),a=N.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",s?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(a?.min||0)))}function mt(t){let e=t.getAttribute("split-persist");if(!e)return;let r=be.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function wo(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=be.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,s)=>{i&&(n.panes[s].style.flexBasis=i,n.panes[s].style.flexGrow="0")}),!0)}catch{return!1}}function _o(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let s=u=>{if(u.button!==0)return;u.preventDefault();let l=xo(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=u[tn(e)],C.startPrevSize=Z(r,e),C.startNextSize=Z(o,e),C.containerSize=l,C.sign=rn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(u.pointerId)},a=u=>{if(!C.active||C.gutterEl!==i)return;let l=(u[tn(C.direction)]-C.startPos)*(C.sign||1),v=Be(C.startPrevSize+l,C.prevPane),y=Be(C.startNextSize-l,C.nextPane),f=C.startPrevSize+C.startNextSize;v+y!==f&&(v!==C.startPrevSize+l?y=f-v:v=f-y),C.prevPane.style.flexBasis=`${v}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${y}px`,C.nextPane.style.flexGrow="0",Ke(i,C.prevPane,C.nextPane,C.direction)},d=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",mt(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",s),i.addEventListener("pointermove",a),i.addEventListener("pointerup",d),i.addEventListener("pointercancel",d);let c=10,g=u=>{let l=e==="horizontal",v=rn(t,e),y=0;if(l&&u.key==="ArrowRight"||!l&&u.key==="ArrowDown")y=c*v;else if(l&&u.key==="ArrowLeft"||!l&&u.key==="ArrowUp")y=-c*v;else if(u.key==="Home")y=(N.get(r)?.min||0)-Z(r,e);else if(u.key==="End"){let A=N.get(o);y=Z(r,e)+Z(o,e)-(A?.min||0)-Z(r,e)}else return;u.preventDefault();let f=Z(r,e),b=Z(o,e),_=f+b,h=Be(f+y,r),x=Be(_-h,o);h=_-x,h=Be(h,r),x=_-h,r.style.flexBasis=`${h}px`,r.style.flexGrow="0",o.style.flexBasis=`${x}px`,o.style.flexGrow="0",Ke(i,r,o,e),mt(t)};i.addEventListener("keydown",g);let p=()=>{let u=N.get(r),l=N.get(o),v=u?.collapsible?r:l?.collapsible?o:null;if(!v)return;let y=N.get(v);if(!y)return;let f=v===r?o:r,b=Z(r,e)+Z(o,e);if(y.collapsed){y.collapsed=!1,v.removeAttribute("data-collapsed");let _=y.preCollapseSize||`${Math.round(b/2)}px`,h=Eo(_,b)??b/2,x=Math.min(h,b);v.style.flexBasis=`${x}px`,v.style.flexGrow="0",f.style.flexBasis=`${b-x}px`,f.style.flexGrow="0"}else y.preCollapseSize=v.style.flexBasis||`${Z(v,e)}px`,y.collapsed=!0,v.setAttribute("data-collapsed","true"),v.style.flexBasis="0px",v.style.flexGrow="0",f.style.flexBasis=`${b}px`,f.style.flexGrow="0";Ke(i,r,o,e),mt(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:v,collapsed:y.collapsed}}))};return i.addEventListener("dblclick",p),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",s),i.removeEventListener("pointermove",a),i.removeEventListener("pointerup",d),i.removeEventListener("pointercancel",d),i.removeEventListener("keydown",g),i.removeEventListener("dblclick",p)}}}function nn(t){t.directive("split",{priority:14,init(e,r,o){Ye();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let s=Array.from(e.children).filter(g=>g.hasAttribute("pane"));if(s.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${s.length}.`);return}s.forEach(g=>{N.get(g)||N.set(g,{size:g.getAttribute("pane")||null,min:parseInt(g.getAttribute("pane-min"),10)||0,max:parseInt(g.getAttribute("pane-max"),10)||1/0,collapsible:g.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let a=[],d=[];for(let g=0;g<s.length-1;g++){let{gutter:p,cleanup:m}=_o(e,n,s[g],s[g+1],i);s[g].after(p),a.push(p),d.push(m)}be.set(e,{direction:n,gutterSize:i,panes:s,gutters:a}),wo(e)||s.forEach(g=>{let m=N.get(g)?.size;m?(g.style.flexBasis=m,g.style.flexGrow="0"):(g.style.flexGrow="1",g.style.flexBasis="0")}),requestAnimationFrame(()=>{a.forEach((g,p)=>{Ke(g,s[p],s[p+1],n)})}),yo(e,()=>{d.forEach(g=>g()),a.forEach(g=>g.remove()),be.delete(e),s.forEach(g=>N.delete(g)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Ao(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function on(t){t.directive("pane",{priority:15,init(e,r,o){Ye(),e.classList.add("nojs-pane"),N.has(e)||N.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=N.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),Ao(e,()=>{e.classList.remove("nojs-pane"),N.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function sn(t,e={}){nn(t),on(t)}function an(){en()}var le={sorts:new Map};function dn(){le.sorts.clear()}function he(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
[table-reorder] tbody tr {
  cursor: grab;
}
[table-reorder] tbody tr[aria-grabbed="true"] {
  cursor: grabbing;
}
.nojs-row-dragging {
  opacity: 0.4;
  background: #f1f5f9 !important;
}
.nojs-reorder-insert-before {
  box-shadow: 0 -2px 0 0 #3b82f6;
}
.nojs-reorder-insert-after {
  box-shadow: 0 2px 0 0 #3b82f6;
}
[table-reorder][table-reorder-handle] tbody tr {
  cursor: default;
}
[table-reorder-handle] {
  cursor: grab;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Lo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function jo(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?o=r:o=r.querySelector("[each]")||r.querySelector("[foreach]"),!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function ko(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function cn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function ln(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function pn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return ln(Number(t),Number(e));case"date":return ln(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function Co(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function fn(t){t.directive("sortable",{priority:10,init(e){he(),e.classList.add("nojs-sortable")}})}function gn(t){t.directive("sort",{priority:11,init(e,r,o){he();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",s=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let a=e.closest("table");if(!a)return;le.sorts.has(a)||le.sorts.set(a,{column:null,direction:null}),(s==="asc"||s==="desc")&&(le.sorts.get(a).column||un(e,a,n,i,s,t));let d=()=>{let c=le.sorts.get(a),g;c.column!==n?g="asc":c.direction==="asc"?g="desc":c.direction==="desc"?g=null:g="asc",un(e,a,n,i,g,t)};e.addEventListener("click",d),Lo(e,()=>{e.removeEventListener("click",d),a&&!a.isConnected&&(le.sorts.delete(a),delete a._nojsOriginalOrder,delete a._nojsOriginalRows)})}})}function un(t,e,r,o,n,i){let s=le.sorts.get(e);Co(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),s.column=r,s.direction=n):(s.column=null,s.direction=null);let a=jo(e,i);if(a){let d=i.findContext(e),c=d?ko(d,a.arrayPath):null;if(Array.isArray(c)){if(!n){let p=e._nojsOriginalOrder;if(p){let m=new Set(c),u=p.filter(l=>m.has(l));for(let l of c)p.includes(l)||u.push(l);cn(d,a.arrayPath,u)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...c]);let g=[...c].sort((p,m)=>{let u=p!=null?p[r]:null,l=m!=null?m[r]:null,v=pn(u,l,o);return n==="desc"?-v:v});cn(d,a.arrayPath,g);return}}To(e,t,r,o,n)}function To(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let d=[...e.closest("tr").children].indexOf(e);if(d<0)return;let c=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...c]),!n){let m=document.createDocumentFragment();for(let u of t._nojsOriginalRows)m.appendChild(u);i.appendChild(m);return}let g=m=>{let u=m.replace(/[^0-9.\-]/g,"");return u===""||u==="-"?NaN:parseFloat(u)};c.sort((m,u)=>{let l=m.children[d]?.textContent?.trim()||"",v=u.children[d]?.textContent?.trim()||"",y=pn(o==="number"?g(l):l,o==="number"?g(v):v,o);return n==="desc"?-y:y});let p=document.createDocumentFragment();for(let m of c)p.appendChild(m);i.appendChild(p)}function mn(t){t.directive("fixed-header",{priority:10,init(e){he(),e.classList.add("nojs-fixed-header")}})}function bn(t){t.directive("fixed-col",{priority:10,init(e){he(),e.classList.add("nojs-fixed-col")}})}function bt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function hn(t){let e=t.querySelector("tbody");if(!e)return null;let r=null;if(e.hasAttribute("each")||e.hasAttribute("foreach")?r=e:r=e.querySelector("[each]")||e.querySelector("[foreach]"),!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function vn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function yn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function xn(t){t.directive("table-reorder",{priority:15,init(e){if(he(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",s=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",a=null,d=null,c=null;function g(){let y=r.querySelectorAll(":scope > tr");for(let f=0;f<y.length;f++){let b=y[f];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-grabbed","false");let _=!0;if(n){let j=T=>{_=!!T.target.closest(n)};b.addEventListener("mousedown",j),bt(b,()=>b.removeEventListener("mousedown",j))}let h=j=>{if(n&&!_){j.preventDefault();return}a=[...r.querySelectorAll(":scope > tr")].indexOf(b),d=b,j.dataTransfer&&(j.dataTransfer.effectAllowed="move",j.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(w=>b.classList.add(w)),b.setAttribute("aria-grabbed","true")},x=j=>{if(d==null)return;j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move");let T=b.getBoundingClientRect(),w=T.top+T.height/2,q=[...r.querySelectorAll(":scope > tr")].indexOf(b);p(),q!==a&&(j.clientY<w?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),c=b)},A=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),c===b&&(c=null)},L=j=>{if(j.preventDefault(),j.stopPropagation(),d==null||a==null)return;let T=[...r.querySelectorAll(":scope > tr")],w=b.getBoundingClientRect(),B=w.top+w.height/2,q=T.indexOf(b);j.clientY>=B&&q++;let X=a;if(X===q||X+1===q){m();return}let z=X<q?q-1:q,se=hn(e);if(se&&o){let S=vn(o,se.arrayPath);if(Array.isArray(S)){let P=[...S],[R]=P.splice(X,1);P.splice(z,0,R),yn(o,se.arrayPath,P),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...P]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:z,item:R}}))}}else{let S=d,P=T[z];S&&P&&(X<z?r.insertBefore(S,P.nextSibling):r.insertBefore(S,P),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:z,item:null}})))}m()},k=()=>{m()};b.addEventListener("dragstart",h),b.addEventListener("dragover",x),b.addEventListener("dragleave",A),b.addEventListener("drop",L),b.addEventListener("dragend",k),bt(b,()=>{b.removeEventListener("dragstart",h),b.removeEventListener("dragover",x),b.removeEventListener("dragleave",A),b.removeEventListener("drop",L),b.removeEventListener("dragend",k),b._nojsReorderSetup=!1})}}function p(){c&&(c.classList.remove("nojs-reorder-insert-before"),c.classList.remove("nojs-reorder-insert-after"),c=null)}function m(){d&&(i.split(/\s+/).filter(Boolean).forEach(f=>d.classList.remove(f)),d.setAttribute("aria-grabbed","false")),p(),a=null,d=null;let y=r.querySelectorAll(":scope > tr");for(let f of y)f.classList.remove("nojs-reorder-insert-before"),f.classList.remove("nojs-reorder-insert-after"),s.split(/\s+/).filter(Boolean).forEach(b=>f.classList.remove(b))}let u=y=>{d!=null&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"))},l=y=>{if(d==null||y.target!==r)return;y.preventDefault(),y.stopPropagation();let f=a,_=[...r.querySelectorAll(":scope > tr")].length-1;if(f===_){m();return}let h=hn(e);if(h&&o){let x=vn(o,h.arrayPath);if(Array.isArray(x)){let A=[...x],[L]=A.splice(f,1);A.push(L),yn(o,h.arrayPath,A),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...A]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:f,to:A.length-1,item:L}}))}}m()};r.addEventListener("dragover",u),r.addEventListener("drop",l);let v=new MutationObserver(()=>{g()});v.observe(r,{childList:!0}),g(),bt(e,()=>{v.disconnect(),r.removeEventListener("dragover",u),r.removeEventListener("drop",l),m()})}})}function En(t,e={}){fn(t),gn(t),mn(t),bn(t),xn(t)}function wn(){dn()}var ke=new Map;function _n(){let t=Array.from(ke.keys());for(let e of t){let r=ke.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[o,n]of r.renderedNodes){if(n.__disposers){for(let i of n.__disposers)try{i()}catch{}n.__disposers=null}n.parentNode&&n.remove()}r.renderedNodes.clear()}r.disposed=!0}}ke.clear()}function An(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
[data-nojs-virtual] {
  overflow-y: auto;
  position: relative;
  --nojs-virtual-list-height: auto;
}
.nojs-virtual-spacer {
  display: block;
  width: 100%;
  pointer-events: none;
  visibility: hidden;
  margin: 0;
  padding: 0;
  border: none;
  flex-shrink: 0;
}
/* Table-specific spacer: spacer inside tbody must be a <tr> with a <td> */
table[data-nojs-virtual] .nojs-virtual-spacer,
[data-nojs-virtual] tr.nojs-virtual-spacer {
  display: table-row;
}
table[data-nojs-virtual] .nojs-virtual-spacer td,
[data-nojs-virtual] tr.nojs-virtual-spacer td {
  padding: 0;
  border: none;
}
/* DL spacer */
dl[data-nojs-virtual] .nojs-virtual-spacer {
  display: list-item;
  list-style: none;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function So(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Do(t){for(let e of["each","foreach","for"])if(t.hasAttribute(e)){let r=Ln(t.getAttribute(e));if(r)return{eachEl:t,...r}}for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let o=Ln(e.getAttribute(r));if(o)return{eachEl:e,...o}}return null}function Ln(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function Io(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function jn(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let o=document.createElement("td"),n=e==="table"?t:t.closest("table"),i=n?n.querySelector("tr:not(.nojs-virtual-spacer)"):null,s=i?i.children.length:1;o.setAttribute("colspan",String(s)),o.style.padding="0",o.style.border="none",r.appendChild(o)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function Xe(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function Bo(t,e){return t*e}function kn(t){let e=0,r=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++)e+=t.heights[o]||r;return e}function Ze(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;let r=0,o=t.estimatedHeight||50;for(let n=0;n<e;n++)r+=t.heights[n]||o;return r}function Ho(t,e){let r=0,o=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++){let i=t.heights[n]||o;if(r+i>e)return n;r+=i}return Math.max(0,t.totalItems-1)}function Po(t,e,r){let o=e+r,n=0,i=t.estimatedHeight||50;for(let s=0;s<t.totalItems;s++)if(n+=t.heights[s]||i,n>=o)return s;return t.totalItems-1}function Fo(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let o,n;return t.itemHeight!=="auto"?(o=Math.floor(e/t.itemHeight),n=Math.ceil((e+r)/t.itemHeight)-1):(o=Ho(t,e),n=Po(t,e,r)),o=Math.max(0,o-t.buffer),n=Math.min(t.totalItems-1,n+t.buffer),{start:o,end:n}}function ht(t,e){if(t.disposed)return;let r=t.container,o=r,n=o.scrollTop,i=o.clientHeight,{start:s,end:a}=Fo(t,n,i);if(s===t.startIndex&&a===t.endIndex&&!t.dirty)return;t.startIndex=s,t.endIndex=a,t.dirty=!1;let d=Ze(t,s),c=t.itemHeight!=="auto"?Bo(t.totalItems,t.itemHeight):kn(t),g=a>=0?Ze(t,a+1):0,p=Math.max(0,c-g);Xe(t.spacerTop,d),Xe(t.spacerBottom,p);let m=new Set;for(let l=s;l<=a;l++)m.add(l);for(let[l,v]of t.renderedNodes)m.has(l)||(v.remove(),t.renderedNodes.delete(l));let u=[];for(let l=s;l<=a;l++){if(t.renderedNodes.has(l))continue;let v=t.dataArray[l];if(v===void 0)continue;let y=t.template.cloneNode(!0),f={};f[t.iteratorVar]=v,f.$index=l,f.$count=t.totalItems,f.$first=l===0,f.$last=l===t.totalItems-1,f.$even=l%2===0,f.$odd=l%2!==0,y.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(f)),y.__declared=!1,u.push({index:l,node:y}),t.renderedNodes.set(l,y)}if(u.length>0){u.sort((l,v)=>l.index-v.index);for(let{index:l,node:v}of u){let y=null;for(let[f,b]of t.renderedNodes)f>l&&b.parentNode===r&&(!y||f<$o(y,t))&&(y=b);y||(y=t.spacerBottom),r.insertBefore(v,y);try{e.processTree&&e.processTree(v)}catch{}}}if(t.itemHeight==="auto"){let l=!1;for(let[v,y]of t.renderedNodes){let f=y.offsetHeight||y.getBoundingClientRect().height;f>0&&t.heights[v]!==f&&(t.heights[v]=f,l=!0)}if(l){let v=kn(t),y=Ze(t,s),f=a>=0?Ze(t,a+1):0,b=Math.max(0,v-f);Xe(t.spacerTop,y),Xe(t.spacerBottom,b)}}}function $o(t,e){for(let[r,o]of e.renderedNodes)if(o===t)return r;return 1/0}function Ro(t,e,r){if(t.disposed)return;let o=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems);for(let[n,i]of t.renderedNodes){if(i.__disposers){for(let s of i.__disposers)try{s()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=o,ht(t,r)}function Cn(t){t.directive("virtual",{priority:10,init(e,r,o){An(),e.setAttribute("data-nojs-virtual","");let n=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",s=n==="auto"?"auto":parseInt(n,10),a=parseInt(i,10)||5;if(s!=="auto"&&(isNaN(s)||s<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let d=Do(e),c=null;if(d)if(d.eachEl===e){for(let h of e.children)if(!h.classList.contains("nojs-virtual-spacer")){c=h;break}}else c=d.eachEl;else for(let h of e.children)if(!h.classList.contains("nojs-virtual-spacer")){c=h;break}if(!c){console.warn("[virtual] No child template found.");return}let g=c.cloneNode(!0);for(g.removeAttribute("each"),g.removeAttribute("foreach"),g.removeAttribute("for"),g.__declared=!1,g.__disposers=null,g.__ctx=null,d&&(d.eachEl.removeAttribute("each"),d.eachEl.removeAttribute("foreach"),d.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let p=jn(e),m=jn(e);e.appendChild(p),e.appendChild(m);let u={container:e,itemHeight:s,buffer:a,totalItems:0,heights:[],estimatedHeight:s==="auto"?50:s,startIndex:-1,endIndex:-1,scrollTop:0,template:g,spacerTop:p,spacerBottom:m,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:d?d.iteratorVar:"item",arrayPath:d?d.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};ke.set(e,u);let l=null,v=()=>{l||(l=requestAnimationFrame(()=>{l=null,ht(u,t)}))};if(u.scrollHandler=v,e.addEventListener("scroll",v,{passive:!0}),typeof ResizeObserver<"u"){let h=new ResizeObserver(()=>{u.dirty=!0,ht(u,t)});h.observe(e),u.resizeObserver=h}let y=null,f=-1,b=null,_=()=>{if(!u.disposed){if(u.arrayPath){let h=t.findContext?t.findContext(e):null;if(h){let x=Io(h,u.arrayPath);Array.isArray(x)&&(x!==y||x.length!==f)&&(y=x,f=x.length,Ro(u,x,t))}}b=requestAnimationFrame(_)}};b=requestAnimationFrame(_),So(e,()=>{u.disposed=!0,l&&(cancelAnimationFrame(l),l=null),b&&(cancelAnimationFrame(b),b=null),e.removeEventListener("scroll",v),u.resizeObserver&&(u.resizeObserver.disconnect(),u.resizeObserver=null);for(let[h,x]of u.renderedNodes){if(x.__disposers){for(let A of x.__disposers)try{A()}catch{}x.__disposers=null}x.remove()}u.renderedNodes.clear(),u.spacerTop&&u.spacerTop.parentNode&&u.spacerTop.remove(),u.spacerBottom&&u.spacerBottom.parentNode&&u.spacerBottom.remove(),ke.delete(e)})}})}function Tn(t,e={}){Cn(t)}function Sn(){_n()}var zo="[validate],[drag],[drop],[drag-list],[drag-multiple]";function Dn(t){if(typeof document>"u")return;let e=document.querySelectorAll(zo);for(let r of e){if(!r.__declared)continue;let o=K(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var Mo=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","virtual","virtual-height","virtual-buffer"],qo={name:"nojs-elements",install(t,e={}){kt(t,e),$t(t,e),Wt(t,e),Yt(t,e),or(t,e),pr(t,e),yr(t,e),kr(t,e),Mr(t,e),Yr(t,e),Jr(t,e),sn(t,e),En(t,e),Tn(t,e),Dn(t)},init(t){if(Dn(t),typeof document>"u"||!document.body)return;let e=Mo.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){Ct(),Rt(),Nt(),Kt(),ir(),fr(),xr(),Cr(),qr(),Kr(),an(),wn(),Sn()}},vt=qo;if(typeof window<"u"){let e=function(){return t?!0:window.NoJS&&typeof window.NoJS.use=="function"?(window.NoJS.use(vt),t=!0,!0):!1};window.NoJSElements=vt;let t=!1;if(!e()){let r=0,o=100,n=setInterval(()=>{(e()||++r>=o)&&clearInterval(n)},50);typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{e()&&clearInterval(n)},{once:!0})}}})();
//# sourceMappingURL=nojs-elements.js.map
