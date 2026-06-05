/**
 * NoJS Elements v1.13.3 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/ErickXavier/nojs-elements
 */
var ot=Object.defineProperty;var Qn=Object.getOwnPropertyDescriptor;var Jn=Object.getOwnPropertyNames;var eo=Object.prototype.hasOwnProperty;var to=(t,e)=>{for(var r in e)ot(t,r,{get:e[r],enumerable:!0})},ro=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Jn(e))!eo.call(t,n)&&n!==r&&ot(t,n,{get:()=>e[n],enumerable:!(o=Qn(e,n))||o.enumerable});return t};var no=t=>ro(ot({},"__esModule",{value:!0}),t);var Ai={};to(Ai,{default:()=>Ei});module.exports=no(Ai);var E={dragging:null,selected:new Map,placeholder:null},ze=new Map;function jt(){E.dragging=null,E.selected.clear(),E.placeholder&&(E.placeholder.remove(),E.placeholder=null),ze.clear()}function Pe(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function K(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function Me(t,e){let r=K(t,"removeCoreDirective");typeof r=="function"?r(e):(K(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function ae(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Re(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=Re(r):e++}return e}function $e(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let s=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let c=s.left+s.width/2;if(e<c)return i}else if(o==="grid"){let c=s.left+s.width/2,d=s.top+s.height/2;if(r<d&&e<c||r<s.top+s.height&&e<c)return i}else{let c=s.top+s.height/2;if(r<c)return i}}return n.length}function kt(t,e,r,o){re();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",E.dragging&&E.dragging.sourceEl){let s=(E.dragging.sourceEl.firstElementChild||E.dragging.sourceEl).getBoundingClientRect();s.height>0&&(n.style.height=s.height+"px"),s.width>0&&(n.style.width=s.width+"px")}}else{let a=document.getElementById(r.startsWith("#")?r.slice(1):r);a&&a.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(a.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(a=>!a.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),E.placeholder=n}function re(){E.placeholder&&(E.placeholder.remove(),E.placeholder=null)}function pe(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function oo(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,a=n.height,s=getComputedStyle(o),c=Math.min(e,3);for(let m=c-1;m>=0;m--){let l=document.createElement("div"),g=m*4;if(l.style.cssText="position:absolute;top:"+g+"px;left:"+g+"px;width:"+i+"px;height:"+a+"px;border-radius:"+s.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",m===0){let u=o.cloneNode(!0);for(;u.firstChild;)l.appendChild(u.firstChild);l.style.background=s.backgroundColor||"#fff",l.style.border=s.border,l.style.padding=s.padding,l.style.fontSize=s.fontSize,l.style.color=s.color,l.style.fontFamily=s.fontFamily}else l.style.background=s.backgroundColor||"#fff",l.style.border=s.border||"1px solid #ddd";r.appendChild(l)}let d=document.createElement("div");return d.textContent=e,d.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(d),r.style.width=i+(c-1)*4+"px",r.style.height=a+(c-1)*4+"px",r}function Ct(t){Me(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){Pe();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",a=e.getAttribute("drag-effect")||"move",s=e.getAttribute("drag-handle"),c=e.getAttribute("drag-image"),d=e.getAttribute("drag-image-offset")||"0,0",m=e.getAttribute("drag-disabled"),l=e.getAttribute("drag-class")||"nojs-dragging",g=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-grabbed","false"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let u=!0;if(s){let p=b=>{u=!!b.target.closest(s)};e.addEventListener("mousedown",p),ae(e,()=>e.removeEventListener("mousedown",p))}let f=p=>{if(s&&!u){p.preventDefault();return}if(m&&t.evaluate(m,n)){p.preventDefault();return}let b=t.evaluate(o,n),w=e.getAttribute("drag-group"),v=b;if(w&&E.selected.has(w)){let x=E.selected.get(w);x.size>0&&[...x].some(L=>L.el===e)&&(v=[...x].map(L=>L.item))}if(E.dragging={item:v,type:i,effect:a,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},p.dataTransfer){if(p.dataTransfer.effectAllowed=a,p.dataTransfer.setData("text/plain",""),Array.isArray(v)&&v.length>1&&p.dataTransfer.setDragImage){let x=oo(e,v.length);document.body.appendChild(x);let _=e.getBoundingClientRect();p.dataTransfer.setDragImage(x,_.width/2,_.height/2),requestAnimationFrame(()=>x.remove())}else if(c&&p.dataTransfer.setDragImage)if(c==="none"){let x=document.createElement("div");x.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(x);let[_,L]=d.split(",").map(Number);p.dataTransfer.setDragImage(x,_||0,L||0),requestAnimationFrame(()=>x.remove())}else{let x=e.querySelector(c);if(x){let[_,L]=d.split(",").map(Number);g&&x.classList.add(g),p.dataTransfer.setDragImage(x,_||0,L||0)}}}if(l.split(/\s+/).filter(Boolean).forEach(x=>e.classList.add(x)),Array.isArray(v)&&w&&E.selected.has(w))for(let x of E.selected.get(w))x.el!==e&&l.split(/\s+/).filter(Boolean).forEach(_=>x.el.classList.add(_));e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:v,index:E.dragging.sourceIndex,el:e}}))},h=()=>{l.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b));let p=e.getAttribute("drag-group");if(p&&E.selected.has(p))for(let b of E.selected.get(p))l.split(/\s+/).filter(Boolean).forEach(w=>b.el.classList.remove(w));if(e.setAttribute("aria-grabbed","false"),g&&c&&c!=="none"){let b=e.querySelector(c);b&&b.classList.remove(g)}e.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,detail:{item:E.dragging?.item,index:E.dragging?.sourceIndex,dropped:E.dragging===null}})),E.dragging=null,re()};if(e.addEventListener("dragstart",f),e.addEventListener("dragend",h),ae(e,()=>{e.removeEventListener("dragstart",f),e.removeEventListener("dragend",h)}),m){let p=function(){let w=!!t.evaluate(m,n);e.draggable=!w,w?e.removeAttribute("aria-grabbed"):e.setAttribute("aria-grabbed","false")},b=n.$watch(p);ae(e,b)}let y=p=>{if(E.dragging&&!E.dragging.sourceEl.isConnected&&(E.dragging=null),p.key===" "&&!E.dragging){p.preventDefault();let b=t.evaluate(o,n);E.dragging={item:b,type:i,effect:a,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},l.split(/\s+/).filter(Boolean).forEach(w=>e.classList.add(w)),e.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:b,index:null,el:e}}))}else p.key==="Escape"&&E.dragging&&E.dragging.sourceEl===e&&(p.preventDefault(),l.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b)),e.setAttribute("aria-grabbed","false"),E.dragging=null,re())};e.addEventListener("keydown",y),ae(e,()=>e.removeEventListener("keydown",y))}})}function St(t){Me(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){Pe();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",a=e.getAttribute("drop-effect")||"move",s=e.getAttribute("drop-class")||"nojs-drag-over",c=e.getAttribute("drop-reject-class")||"nojs-drop-reject",d=e.getAttribute("drop-disabled"),m=e.getAttribute("drop-max"),l=e.getAttribute("drop-sort"),g=e.getAttribute("drop-placeholder"),u=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",a);let f=0,h=v=>{if(!E.dragging||d&&t.evaluate(d,n))return;let x=pe(E.dragging.type,i),_=!0;if(m){let L=t.evaluate(m,n),k=Re(e);typeof L=="number"&&k>=L&&(_=!1)}if(!x||!_){c.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),re();return}if(c.split(/\s+/).filter(Boolean).forEach(L=>e.classList.remove(L)),v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect=a),l){let L=$e(e,v.clientX,v.clientY,l);g&&kt(e,L,g,u),e.dispatchEvent(new CustomEvent("drag-over",{bubbles:!1,detail:{item:E.dragging.item,index:L}}))}},y=v=>{if(E.dragging&&!(d&&t.evaluate(d,n))&&(f++,f===1)){let x=pe(E.dragging.type,i),_=!0;if(m){let L=t.evaluate(m,n),k=Re(e);typeof L=="number"&&k>=L&&(_=!1)}x&&_?(s.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):c.split(/\s+/).filter(Boolean).forEach(L=>e.classList.add(L))}},p=v=>{E.dragging&&(f--,f<=0&&(f=0,s.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),c.split(/\s+/).filter(Boolean).forEach(x=>e.classList.remove(x)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging.item}}))))},b=v=>{if(v.preventDefault(),v.stopPropagation(),f=0,!E.dragging||d&&t.evaluate(d,n)||!pe(E.dragging.type,i))return;if(m){let A=t.evaluate(m,n),B=Re(e);if(typeof A=="number"&&B>=A)return}let x=E.dragging.item,_=E.dragging.type,L=E.dragging.effect,k=0;l&&(k=$e(e,v.clientX,v.clientY,l)),s.split(/\s+/).filter(Boolean).forEach(A=>e.classList.remove(A)),c.split(/\s+/).filter(Boolean).forEach(A=>e.classList.remove(A)),re();let j={$drag:x,$dragType:_,$dragEffect:L,$dropIndex:k,$source:{list:E.dragging.sourceList,index:E.dragging.sourceIndex,el:E.dragging.sourceEl},$target:{list:null,index:k,el:e},$el:e},S=K(t,"execStatement");typeof S=="function"?S(o,n,j):(K(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),E.dragging=null,e.dispatchEvent(new CustomEvent("drop",{bubbles:!1,detail:{item:x,index:k,source:j.$source,target:j.$target,effect:L}}))},w=v=>{E.dragging&&(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),b(v))};e.addEventListener("dragover",h),e.addEventListener("dragenter",y),e.addEventListener("dragleave",p),e.addEventListener("drop",b),e.addEventListener("keydown",w),ae(e,()=>{e.removeEventListener("dragover",h),e.removeEventListener("dragenter",y),e.removeEventListener("dragleave",p),e.removeEventListener("drop",b),e.removeEventListener("keydown",w)})}})}function Tt(t){Me(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){Pe();let n=t.findContext(e),i=e.getAttribute("template"),a=e.getAttribute("drag-list-key"),s=e.getAttribute("drag-list-item")||"item",c=e.getAttribute("drop-sort")||"vertical",d=e.getAttribute("drag-type")||"__draglist_"+o,m=e.getAttribute("drop-accept")||d,l=e.hasAttribute("drag-list-copy"),g=e.hasAttribute("drag-list-remove"),u=e.getAttribute("drag-disabled"),f=e.getAttribute("drop-disabled"),h=e.getAttribute("drop-max"),y=e.getAttribute("drop-placeholder"),p=e.getAttribute("drop-placeholder-class"),b=e.getAttribute("drag-class")||"nojs-dragging",w=e.getAttribute("drop-class")||"nojs-drag-over",v=e.getAttribute("drop-reject-class")||"nojs-drop-reject",x=e.getAttribute("drop-settle-class")||"nojs-drop-settle",_=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",l?"copy":"move");let L={listPath:o,ctx:n,el:e};ze.set(e,L),ae(e,()=>ze.delete(e));let k=0,j=null;function S(){let T=t.resolve(o,n);if(!Array.isArray(T))return;if(T===j&&T.length>0&&e.children.length>0){for(let O of e.children)O.__ctx&&O.__ctx.$notify&&O.__ctx.$notify();return}j=T;let F=i?document.getElementById(i):null;if(!F)return;let P=K(t,"disposeChildren");typeof P=="function"&&P(e),e.innerHTML="";let H=T.length;T.forEach((O,$)=>{let ee={[s]:O,$index:$,$count:H,$first:$===0,$last:$===H-1,$even:$%2===0,$odd:$%2!==0},U=t.createContext(ee,n),Q=F.content.cloneNode(!0),q=document.createElement("div");q.style.display="contents",q.__ctx=U,q.appendChild(Q),e.appendChild(q);let G=q.firstElementChild||q;G.draggable=!0,G.setAttribute("role","option"),G.setAttribute("aria-grabbed","false"),G.getAttribute("tabindex")||G.setAttribute("tabindex","0");let qe=V=>{if(u&&t.evaluate(u,n)){V.preventDefault();return}E.dragging={item:O,type:d,effect:l?"copy":"move",sourceEl:q,sourceCtx:U,sourceList:T,sourceIndex:$,listDirective:{el:e,listPath:o,ctx:n,keyProp:a,copyMode:l,removeMode:g}},V.dataTransfer&&(V.dataTransfer.effectAllowed=l?"copy":"move",V.dataTransfer.setData("text/plain","")),b.split(/\s+/).filter(Boolean).forEach(J=>G.classList.add(J)),G.setAttribute("aria-grabbed","true"),e.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,detail:{item:O,index:$,el:G}}))},_t=()=>{b.split(/\s+/).filter(Boolean).forEach(V=>G.classList.remove(V)),G.setAttribute("aria-grabbed","false"),E.dragging&&E.dragging.sourceEl===q&&(E.dragging=null),re()};q.addEventListener("dragstart",qe),q.addEventListener("dragend",_t);let Lt=V=>{if(V.key===" "&&!E.dragging)V.preventDefault(),V.stopPropagation(),E.dragging={item:O,type:d,effect:l?"copy":"move",sourceEl:q,sourceCtx:U,sourceList:T,sourceIndex:$,listDirective:{el:e,listPath:o,ctx:n,keyProp:a,copyMode:l,removeMode:g}},b.split(/\s+/).filter(Boolean).forEach(J=>G.classList.add(J)),G.setAttribute("aria-grabbed","true");else if(V.key==="Escape"&&E.dragging){V.preventDefault(),V.stopPropagation();let J=e.querySelector('[aria-grabbed="true"]')||G;b.split(/\s+/).filter(Boolean).forEach(nt=>J.classList.remove(nt)),J.setAttribute("aria-grabbed","false"),E.dragging=null,re()}else if((V.key==="ArrowDown"||V.key==="ArrowRight")&&E.dragging&&E.dragging.sourceEl===q){V.preventDefault();let J=q.nextElementSibling;J&&(J.firstElementChild||J).focus()}else if((V.key==="ArrowUp"||V.key==="ArrowLeft")&&E.dragging&&E.dragging.sourceEl===q){V.preventDefault();let J=q.previousElementSibling;J&&(J.firstElementChild||J).focus()}};q.addEventListener("keydown",Lt),q.__disposers=q.__disposers||[],q.__disposers.push(()=>q.removeEventListener("dragstart",qe),()=>q.removeEventListener("dragend",_t),()=>q.removeEventListener("keydown",Lt)),t.processTree(q)});let z=T.length===0;_.split(/\s+/).filter(Boolean).forEach(O=>e.classList.toggle(O,z))}let A=T=>{if(!E.dragging||f&&t.evaluate(f,n))return;let F=pe(E.dragging.type,m),P=!0;if(h){let z=t.evaluate(h,n),O=t.resolve(o,n);typeof z=="number"&&Array.isArray(O)&&O.length>=z&&(P=!1)}if(!F||!P){v.split(/\s+/).filter(Boolean).forEach(z=>e.classList.add(z)),w.split(/\s+/).filter(Boolean).forEach(z=>e.classList.remove(z)),re();return}v.split(/\s+/).filter(Boolean).forEach(z=>e.classList.remove(z)),T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect=l?"copy":"move");let H=$e(e,T.clientX,T.clientY,c);y&&kt(e,H,y,p)},B=T=>{if(E.dragging&&!(f&&t.evaluate(f,n))&&(k++,k===1)){let F=pe(E.dragging.type,m),P=!0;if(h){let H=t.evaluate(h,n),z=t.resolve(o,n);typeof H=="number"&&Array.isArray(z)&&z.length>=H&&(P=!1)}F&&P?(w.split(/\s+/).filter(Boolean).forEach(H=>e.classList.add(H)),e.dispatchEvent(new CustomEvent("drag-enter",{bubbles:!1,detail:{item:E.dragging.item,type:E.dragging.type}}))):v.split(/\s+/).filter(Boolean).forEach(H=>e.classList.add(H))}},M=()=>{E.dragging&&(k--,k<=0&&(k=0,w.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),v.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),re(),e.dispatchEvent(new CustomEvent("drag-leave",{bubbles:!1,detail:{item:E.dragging?.item}}))))},X=T=>{if(T.preventDefault(),T.stopPropagation(),k=0,!E.dragging||f&&t.evaluate(f,n)||!pe(E.dragging.type,m))return;if(h){let U=t.evaluate(h,n),Q=t.resolve(o,n);if(typeof U=="number"&&Array.isArray(Q)&&Q.length>=U)return}let F=E.dragging.item,P=E.dragging.listDirective,H=E.dragging.sourceIndex,z=$e(e,T.clientX,T.clientY,c);w.split(/\s+/).filter(Boolean).forEach(U=>e.classList.remove(U)),v.split(/\s+/).filter(Boolean).forEach(U=>e.classList.remove(U)),re();let O=t.resolve(o,n);if(!Array.isArray(O))return;let $=P&&P.el===e;if($&&H===z){E.dragging=null;return}if($&&H+1===z){E.dragging=null;return}let ee=[...O];if($){let[U]=ee.splice(H,1),Q=H<z?z-1:z;ee.splice(Q,0,U),n.$set(o,ee),e.dispatchEvent(new CustomEvent("reorder",{bubbles:!0,detail:{list:ee,item:F,from:H,to:Q}}))}else{let U=l&&typeof F=="object"?{...F}:F;if(ee.splice(z,0,U),n.$set(o,ee),P&&!P.copyMode&&(g||P.removeMode)){let Q=t.resolve(P.listPath,P.ctx);if(Array.isArray(Q)&&H!=null){let q=Q.filter((G,qe)=>qe!==H);P.ctx.$set(P.listPath,q),P.el.dispatchEvent(new CustomEvent("remove",{bubbles:!0,detail:{list:q,item:F,index:H}}))}}e.dispatchEvent(new CustomEvent("receive",{bubbles:!0,detail:{list:ee,item:F,from:H,fromList:P?t.resolve(P.listPath,P.ctx):null}}))}requestAnimationFrame(()=>{let Q=[...e.children][$&&H<z?z-1:z];if(Q){let q=Q.firstElementChild||Q;x.split(/\s+/).filter(Boolean).forEach(G=>q.classList.add(G)),q.addEventListener("animationend",()=>{x.split(/\s+/).filter(Boolean).forEach(G=>q.classList.remove(G))},{once:!0})}}),E.dragging=null},R=T=>{if(E.dragging&&pe(E.dragging.type,m)&&(T.key==="Enter"||T.key===" ")){T.preventDefault();let F=e.querySelector(":focus");if(F){let H=(F.style?.display==="contents"&&F.firstElementChild||F).getBoundingClientRect(),z={preventDefault(){},stopPropagation(){},clientX:H.left+H.width/2,clientY:H.top+H.height+1,dataTransfer:null};X(z)}}};e.addEventListener("dragover",A),e.addEventListener("dragenter",B),e.addEventListener("dragleave",M),e.addEventListener("drop",X),e.addEventListener("keydown",R),ae(e,()=>{e.removeEventListener("dragover",A),e.removeEventListener("dragenter",B),e.removeEventListener("dragleave",M),e.removeEventListener("drop",X),e.removeEventListener("keydown",R)});let se=n.$watch(S);ae(e,se),S()}})}function Dt(t){Me(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(K(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}E.selected.has(n)||E.selected.set(n,new Set);let a=E.selected.get(n),s=d=>{let m=e.getAttribute("drag"),g={item:m?t.evaluate(m,o):null,el:e,ctx:o};if(d.ctrlKey||d.metaKey){let u=[...a].find(f=>f.el===e);u?(a.delete(u),i.split(/\s+/).filter(Boolean).forEach(f=>e.classList.remove(f))):(a.add(g),i.split(/\s+/).filter(Boolean).forEach(f=>e.classList.add(f)))}else{for(let u of a)i.split(/\s+/).filter(Boolean).forEach(f=>u.el.classList.remove(f));a.clear(),a.add(g),i.split(/\s+/).filter(Boolean).forEach(u=>e.classList.add(u))}};e.addEventListener("click",s),ae(e,()=>{e.removeEventListener("click",s);let d=[...a].find(m=>m.el===e);d&&a.delete(d)});let c=d=>{if(d.key==="Escape"){for(let m of a)i.split(/\s+/).filter(Boolean).forEach(l=>m.el.classList.remove(l));a.clear()}};window.addEventListener("keydown",c),ae(e,()=>window.removeEventListener("keydown",c))}})}function It(t,e={}){Ct(t),St(t),Tt(t),Dt(t)}function Bt(){jt()}var Ht=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],it=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function ne(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var fe,Rt,Ve,st,at,Ft,Oe,ct,qt;function io(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function so(t){return(t.getAttribute("type")||"text").toLowerCase()}function ao(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let a=n.split("|").map(s=>s.trim());for(let s of a){let[c,...d]=s.split(":"),m=fe[c];if(m){let l=m(t.value,...d,e);l!==!0&&l&&(r.push({rule:c,message:l}),o.add(c))}else{let l=t.value,g=null;switch(c){case"required":(l==null||String(l).trim()==="")&&(g="Required");break;case"email":l&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)&&(g="Invalid email");break;case"url":try{new URL(l)}catch{g="Invalid URL"}break;case"min":Number(l)<Number(d[0])&&(g=`Minimum value is ${d[0]}`);break;case"max":Number(l)>Number(d[0])&&(g=`Maximum value is ${d[0]}`);break;case"custom":if(d[0]&&fe[d[0]]){let u=fe[d[0]](l,e);u!==!0&&u&&(g=u)}break}g&&(r.push({rule:c,message:g}),o.add(c))}}}let i=t.validity;if(i&&!i.valid){for(let[a,s]of Ht)if(i[a]){let c=s||so(t);o.has(c)||(r.push({rule:c,message:t.validationMessage}),o.add(c))}}return r}function co(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function lo(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let a=it.indexOf(n.rule),s=it.indexOf(i.rule);return(a===-1?999:a)-(s===-1?999:s)})[0];return{rule:o.rule,message:co(e,o.rule,o.message)}}function $t(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function uo(t,e,r,o,n){let i=$t(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;ct(i),i.remove()}let a=document.querySelector(t);if(!a)return;let s=a.content.cloneNode(!0),c=document.createElement("div");c.style.display="contents",c.__errorTemplateFor=o;let d=Ve({$error:e,$rule:r},n);c.__ctx=d,c.appendChild(s),a.parentNode.insertBefore(c,a.nextSibling),io(c),at(c)}function zt(t){let e=$t(t);e&&(ct(e),e.remove())}function po(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!Rt(r,e)}catch{return!0}}function Pt(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function fo(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...a]=n.split(":"),s=fe[i];if(s){let c=s(t,...a,r);if(c!==!0&&c)return c}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(a[0]))return`Minimum value is ${a[0]}`;break;case"max":if(Number(t)>Number(a[0]))return`Maximum value is ${a[0]}`;break;case"custom":if(a[0]&&fe[a[0]]){let c=fe[a[0]](t,r);if(c!==!0&&c)return c}break}}return null}function mo(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return st(t);let e=Ve({},null);return t.__ctx=e,e}function Mt(t){fe=K(t,"validators")||{},Rt=t.evaluate,Ve=t.createContext,st=t.findContext,at=t.processTree,Ft=K(t,"cloneTemplate")||(()=>null),Oe=K(t,"disposeChildren")||(()=>{}),ct=K(t,"disposeTree")||Oe,qt=K(t,"warn")||console.warn;let e=K(t,"removeCoreDirective");typeof e=="function"?e("validate"):qt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let g=function(){a&&typeof a.$notify=="function"&&a.$notify();let v=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;v.nextNode();){let _=v.currentNode.__ctx;_&&_!==a&&typeof _.$notify=="function"&&_.$notify()}},u=function(){return r.querySelectorAll("input, textarea, select")},f=function(){let v={},x={},_={},L=!0,k=null,j=0,S=!1;for(let A of u())A.name&&(A.type==="checkbox"?x[A.name]=A.checked:A.type==="radio"?A.checked?x[A.name]=A.value:A.name in x||(x[A.name]=""):x[A.name]=A.value);for(let A of u()){if(!A.name)continue;let B=c.has(A.name),M=d.has(A.name);if(!po(A,a)){_[A.name]={valid:!0,dirty:M,touched:B,error:null,value:x[A.name]};continue}let X=ao(A,x),R=lo(X,A),se=!R,T=Pt(A,r),F=T.includes("input"),P=T.includes("blur")||T.includes("focusout")||T.includes("submit"),H;!A.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?H=B||M:H=F&&M||P&&B,se||(L=!1),!se&&H&&(v[A.name]=R.message,j++,k||(k=R.message)),_[A.name]={valid:se,dirty:M,touched:B,error:R?R.message:null,value:x[A.name]};let z=A.getAttribute("error-class")||s;if(z){let $=z.split(/\s+/);!se&&H?A.classList.add(...$):A.classList.remove(...$)}if(R&&H){let $=A.getAttribute(`error-${R.rule}`),ee=A.getAttribute("error"),U=($&&$.startsWith("#")?$:null)||(ee&&ee.startsWith("#")?ee:null);U?uo(U,R.message,R.rule,A,a):zt(A)}else zt(A);let O=A.getAttribute("as");O&&a.$set(O,_[A.name])}m.size>0&&(S=!0),l.valid=L,l.errors=v,l.values=x,l.fields=_,l.firstError=k,l.errorCount=j,l.pending=S,a.$set("$form",{...l}),g(),h(r)},h=function(v){let x=l.valid&&!l.pending&&!l.submitting,_=v.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let L of _){if(L.hasAttribute("disabled")&&L.getAttribute("disabled")!==""){let k=L.getAttribute("disabled");if(k!=="disabled"&&k!=="true"&&k!=="false")continue}L.disabled=!x,L.__autoDisabled=!0}},y=function(v){if(!v.name)return;let x=Pt(v,r),_=()=>{d.add(v.name),l.dirty=!0,f()},L=()=>{c.add(v.name),l.touched=!0,f()};if(x.includes("input"))v.addEventListener("input",_),ne(r,()=>v.removeEventListener("input",_));else{let k=()=>{d.add(v.name),l.dirty=!0,f()};v.addEventListener("input",k),ne(r,()=>v.removeEventListener("input",k))}if(x.includes("blur")||x.includes("focusout")){let k=()=>{L(),x.includes("blur")&&_()};v.addEventListener("focusout",k),ne(r,()=>v.removeEventListener("focusout",k))}else v.addEventListener("focusout",L),ne(r,()=>v.removeEventListener("focusout",L));x.includes("submit")&&(v.addEventListener("focusout",L),ne(r,()=>v.removeEventListener("focusout",L)))},a=mo(r);r.setAttribute("novalidate","");let s=r.getAttribute("error-class"),c=new Set,d=new Set,m=new Map,l={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{l.dirty=!1,l.touched=!1,l.pending=!1,l.submitting=!1,c.clear(),d.clear(),r.reset(),f()},endSubmit:()=>{l.submitting=!1,f()}};a.$set("$form",l);let p=r.hasAttribute("validate-on"),b=[...u()].some(v=>v.hasAttribute("validate-on"));if(!p&&!b){let v=_=>{let L=_.target;L&&L.name&&d.add(L.name),l.dirty=!0,f()};r.addEventListener("input",v),ne(r,()=>r.removeEventListener("input",v)),r.addEventListener("change",v),ne(r,()=>r.removeEventListener("change",v));let x=_=>{_.target&&_.target.name&&c.add(_.target.name),l.touched=!0,f()};r.addEventListener("focusout",x),ne(r,()=>r.removeEventListener("focusout",x))}else for(let v of u())y(v);let w=v=>{for(let x of u())x.name&&c.add(x.name);if(l.touched=!0,f(),!l.valid||l.pending){v.preventDefault(),v.stopImmediatePropagation();return}l.submitting=!0,h(r),a.$set("$form",{...l}),g()};r.addEventListener("submit",w,!0),ne(r,()=>r.removeEventListener("submit",w,!0)),r.__nojsResetSubmitting=()=>{l.submitting=!1,f()},ne(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(f);return}let i=st(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let a=r.getAttribute("error"),s=()=>{let c=fo(r.value,n,{});if(c&&a){let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d||(d=document.createElement("div"),d.__validationError=!0,d.style.display="contents",r.parentNode.insertBefore(d,r.nextSibling));let m=Ft(a);if(m){let l=Ve({err:{message:c}},i);Oe(d),d.innerHTML="",d.__ctx=l,d.appendChild(m),at(d)}}else{let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d&&(Oe(d),d.innerHTML="")}};r.addEventListener("input",s),ne(r,()=>r.removeEventListener("input",s))}}})}function Ot(t,e={}){Mt(t)}function Vt(){}var ye=new Map,te=new Map;function Nt(){let t=Array.from(ye.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of te.values())clearTimeout(e);te.clear();for(let e of ye.values())e.remove();ye.clear()}function Wt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function go(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Ne=8;function Gt(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,a=window.innerHeight,s,c;switch(r){case"bottom":s=o.bottom+Ne,c=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,c=o.left-n.width-Ne;break;case"right":s=o.top+(o.height-n.height)/2,c=o.right+Ne;break;default:s=o.top-n.height-Ne,c=o.left+(o.width-n.width)/2;break}c<4&&(c=4),c+n.width>i-4&&(c=i-n.width-4),s<4&&(s=4),s+n.height>a-4&&(s=a-n.height-4),t.style.top=`${s}px`,t.style.left=`${c}px`}var bo=0;function ho(t,e,r){document.body.appendChild(e),Gt(e,t,r),e.setAttribute("aria-hidden","false")}function Ut(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function vo(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function Yt(t){t.directive("tooltip",{priority:20,init(e,r,o){Wt();let n=o;if(!n){vo(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",a=parseInt(e.getAttribute("tooltip-delay"),10),s=Number.isNaN(a)?300:a,c=e.getAttribute("tooltip-disabled"),d=c?t.findContext(e):null,m=()=>{if(!c||!d)return!1;try{return!!t.evaluate(c,d)}catch{return!1}},l=`nojs-tooltip-${++bo}`,g=document.createElement("div");g.className="nojs-tooltip",g.setAttribute("role","tooltip"),g.setAttribute("id",l),g.setAttribute("aria-hidden","true"),g.textContent=n,e.setAttribute("aria-describedby",l),ye.set(e,g);let u=!1,f=0,h=()=>{!u||!e.isConnected||f||(f=requestAnimationFrame(()=>{f=0,!(!u||!e.isConnected)&&Gt(g,e,i)}))},y=()=>{window.addEventListener("scroll",h,!0),window.addEventListener("resize",h)},p=()=>{window.removeEventListener("scroll",h,!0),window.removeEventListener("resize",h),f&&(cancelAnimationFrame(f),f=0)},b=()=>{u||(ho(e,g,i),u=!0,y())},w=()=>{if(!u){Ut(e,g);return}p(),Ut(e,g),u=!1},v=()=>{if(m())return;te.has(e)&&clearTimeout(te.get(e));let B=setTimeout(()=>{te.delete(e),!m()&&e.isConnected&&b()},s);te.set(e,B)},x=()=>{te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),w()},_=()=>v(),L=()=>x(),k=()=>v(),j=()=>x(),S=B=>{B.key==="Escape"&&g.getAttribute("aria-hidden")==="false"&&x()};e.addEventListener("mouseenter",_),e.addEventListener("mouseleave",L),e.addEventListener("focusin",k),e.addEventListener("focusout",j),e.addEventListener("keydown",S);let A=null;if(c&&d&&typeof d.$watch=="function"){let B=()=>{u&&m()&&w()};A=d.$watch(B)}go(e,()=>{e.removeEventListener("mouseenter",_),e.removeEventListener("mouseleave",L),e.removeEventListener("focusin",k),e.removeEventListener("focusout",j),e.removeEventListener("keydown",S),A&&(A(),A=null),p(),te.has(e)&&(clearTimeout(te.get(e)),te.delete(e)),u=!1,g.remove(),ye.delete(e)})}})}function Kt(t,e={}){Yt(t)}function Xt(){Nt()}var Y=new Map;function Zt(){Y.clear()}function We(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function dt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function xe(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}var ce=8;function Ue(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,a=window.innerHeight,s,c;switch(r){case"top":s=o.top-n.height-ce,c=o.left+(o.width-n.width)/2;break;case"left":s=o.top+(o.height-n.height)/2,c=o.left-n.width-ce;break;case"right":s=o.top+(o.height-n.height)/2,c=o.right+ce;break;default:s=o.bottom+ce,c=o.left+(o.width-n.width)/2;break}r==="bottom"&&s+n.height>a&&(s=o.top-n.height-ce),r==="top"&&s<0&&(s=o.bottom+ce),r==="right"&&c+n.width>i&&(c=o.left-n.width-ce),r==="left"&&c<0&&(c=o.right+ce),c<4&&(c=4),c+n.width>i-4&&(c=i-n.width-4),s<4&&(s=4),s+n.height>a-4&&(s=a-n.height-4),t.style.top=`${s}px`,t.style.left=`${c}px`}function lt(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let a=t.popoverEl;if(!a||!a.isConnected){i();return}if(typeof a.matches=="function"&&!a.matches(":popover-open")){i();return}Ue(a,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function me(t){t&&t._untrack&&t._untrack()}function Qt(t){t.directive("popover",{priority:20,init(r,o,n){We();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let a=r.getAttribute("popover-position")||"bottom";if(!Y.has(i))Y.set(i,{popoverEl:r,triggerEls:new Set,position:a,open:!1,_untrack:null});else{let c=Y.get(i);c.popoverEl=r,c.position=a}let s=c=>{let d=Y.get(i);if(!d)return;let m=c.newState==="open";d.open=m;for(let l of d.triggerEls)l.setAttribute("aria-expanded",String(m));m||me(d)};r.addEventListener("toggle",s),dt(r,()=>{r.removeEventListener("toggle",s);let c=Y.get(i);c&&(me(c),c.popoverEl===r&&(c.popoverEl=null,c.open=!1),!c.popoverEl&&c.triggerEls.size===0&&Y.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){We();let i=n;if(!i){let c=r.closest("[use]")||r.parentElement,d=c?.querySelector("[data-popover-id]")||c?.querySelector("[popover]");if(d&&(i=d.getAttribute("data-popover-id")||d.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),Y.has(i)||Y.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),Y.get(i).triggerEls.add(r);let a=c=>{let d=Y.get(i);if(!d||!d.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}xe(d.popoverEl)&&(d.popoverEl.togglePopover(),requestAnimationFrame(()=>{d.popoverEl.matches(":popover-open")?(Ue(d.popoverEl,r,d.position),lt(d,r)):me(d)}))};r.addEventListener("click",a);let s=c=>{let d=Y.get(i);c.key==="Escape"&&d?.open&&(xe(d.popoverEl,"hidePopover")&&d.popoverEl.hidePopover(),me(d),r.focus())};document.addEventListener("keydown",s),dt(r,()=>{r.removeEventListener("click",a),document.removeEventListener("keydown",s);let c=Y.get(i);c&&(c.triggerEls.delete(r),!c.popoverEl&&c.triggerEls.size===0&&(me(c),Y.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){We();let o=()=>{let n=r.closest(".nojs-popover");!n||!xe(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),dt(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!xe(n.popoverEl,"showPopover"))return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>{Ue(n.popoverEl,i,n.position),lt(n,i)}),!0},e.close=r=>{let o=Y.get(r);if(!o||!o.popoverEl||!xe(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return me(o),!0},e.toggle=(r,o)=>{let n=Y.get(r);if(!n||!n.popoverEl||!xe(n.popoverEl))return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{Ue(n.popoverEl,i,n.position),lt(n,i)}):me(n),!0},t.popover=e}function Jt(t,e={}){Qt(t)}function er(){Zt()}var N=[],oe=new Map,yo=1e4;function tr(){return yo+N.length}function rr(){N.length=0,oe.clear()}function Ee(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function xo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var or='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',ut=new WeakMap;function Eo(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(or)].filter(a=>a.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),ut.set(t,e)}function nr(t){let e=ut.get(t);e&&(t.removeEventListener("keydown",e),ut.delete(t))}var Te=new WeakMap;function ir(t){t.directive("modal",{priority:10,init(r,o,n){Ee();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let a=r.querySelector("h1, h2, h3, h4, h5, h6");a&&(a.id||(a.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",a.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let c=r.getAttribute("modal-class"),d=r.getAttribute("modal-escape"),m=g=>{g.target===r&&s!=="false"&&d!=="false"&&Ae(r,i)};r.addEventListener("click",m),oe.set(i,r);let l=g=>{if(g.newState==="open"){if(r.style.zIndex=String(tr()),c&&c.split(/\s+/).filter(Boolean).forEach(u=>r.classList.add(u)),requestAnimationFrame(()=>{if(!r.isConnected||!N.some(f=>f.el===r))return;let u=r.querySelector(or);u?u.focus():r.focus()}),Eo(r),d!=="false"){let u=f=>{f.key==="Escape"&&(f.stopPropagation(),Ae(r,i))};r.addEventListener("keydown",u),Te.set(r,u)}}else if(g.newState==="closed"){c&&c.split(/\s+/).filter(Boolean).forEach(h=>r.classList.remove(h)),nr(r);let u=Te.get(r);u&&(r.removeEventListener("keydown",u),Te.delete(r));let f=N.findIndex(h=>h.el===r);if(f===-1&&(f=N.findIndex(h=>h.id===i)),f!==-1){let h=N[f];N.splice(f,1),h.triggerEl&&requestAnimationFrame(()=>{h.triggerEl.focus()})}}};r.addEventListener("toggle",l),xo(r,()=>{r.removeEventListener("click",m),r.removeEventListener("toggle",l),nr(r);let g=Te.get(r);g&&(r.removeEventListener("keydown",g),Te.delete(r)),oe.delete(i);let u=N.findIndex(f=>f.el===r);u===-1&&(u=N.findIndex(f=>f.id===i)),u!==-1&&N.splice(u,1)})}});let e=r=>e.open(r);e.open=r=>{let o=oe.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return N.some(n=>n.id===r)||N.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=oe.get(r);return o?(Ae(o,r),!0):!1},e.closeAll=()=>{for(let r=N.length-1;r>=0;r--)Ae(N[r].el,N[r].id)},t.modal=e}function Ae(t,e){try{t.hidePopover()}catch{}}function sr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Ao(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function ar(t){t.directive("modal-open",{priority:10,init(e,r,o){Ee();let n=o;if(!n){let l=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(l&&(n=l.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let m=oe.get(n)||Ao(n);if(!m){console.warn(`[modal-open] modal "${n}" not found`);return}let l=N.some(g=>g.id===n);m.id&&e.setAttribute("aria-controls",m.id);try{m.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}l||N.push({id:n,el:m,triggerEl:e}),e.setAttribute("aria-expanded","true")},a=()=>{e.setAttribute("aria-expanded","false")},s=null,c=null,d=()=>{let m=oe.get(n);return m?(c=m,s=l=>{l.newState==="closed"&&e.setAttribute("aria-expanded","false")},m.addEventListener("toggle",s),!0):!1};if(!d()){let m=requestAnimationFrame(d);sr(e,()=>cancelAnimationFrame(m))}e.addEventListener("click",i),sr(e,()=>{e.removeEventListener("click",i),c&&s&&c.removeEventListener("toggle",s)})}})}function wo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function cr(t){t.directive("modal-close",{priority:10,init(e,r,o){Ee();let n=()=>{let i,a;if(o){if(a=o,i=oe.get(a),!i){console.warn(`[modal-close] modal "${a}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}a=i.getAttribute("modal")}Ae(i,a)};e.addEventListener("click",n),wo(e,()=>{e.removeEventListener("click",n)})}})}function dr(t,e={}){ir(t),ar(t),cr(t)}function lr(){rr()}var de={openMenus:new Map};function ur(){de.openMenus.clear()}function we(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var _o=0;function Lo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function pr(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),s=window.innerHeight,c=window.innerWidth,d,m;switch(o){case"top":d=i.top-a.height,m=i.left;break;case"left":d=i.top,m=i.left-a.width;break;case"right":d=i.top,m=i.right;break;default:d=i.bottom,m=i.left}o==="bottom"||o==="top"?n==="end"&&(m=i.right-a.width):n==="end"&&(d=i.bottom-a.height),o==="bottom"&&d+a.height>s&&i.top-a.height>0?d=i.top-a.height:o==="top"&&d<0&&i.bottom+a.height<=s&&(d=i.bottom),m<4&&(m=4),m+a.width>c-4&&(m=c-a.width-4),t.style.top=`${d}px`,t.style.left=`${m}px`}function ft(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function pt(t){let e=ft(t);e.length&&e[0].focus()}function fr(t){let e=ft(t);e.length&&e[e.length-1].focus()}function mr(t){t.directive("dropdown",{priority:15,init(r){we()}}),t.directive("dropdown-toggle",{priority:15,init(r){we();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${_o++}`),r.setAttribute("aria-controls",n.id);let i=!1,a=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function s(){if(n.setAttribute("data-open",""),a&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),pr(n,r,o),de.openMenus.set(n,{toggle:r,wrapper:o})}function c(){if(a&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),de.openMenus.delete(n)}function d(){return r.getAttribute("aria-expanded")==="true"}let m=p=>{p.newState==="closed"&&d()&&c()};n.addEventListener("toggle",m);let l=p=>{p.preventDefault(),p.stopPropagation(),d()?c():s()};r.addEventListener("click",l);let g=p=>{d()&&!o.contains(p.target)&&c()};document.addEventListener("click",g,!0);let u=p=>{p.key==="Escape"&&d()&&(c(),r.focus())};document.addEventListener("keydown",u);let f=p=>{switch(p.key){case"Enter":case" ":p.preventDefault(),s(),pt(n);break;case"ArrowDown":p.preventDefault(),s(),pt(n);break;case"ArrowUp":p.preventDefault(),s(),fr(n);break}};r.addEventListener("keydown",f);let h=p=>{if(!(!d()||ft(n).find(v=>v===document.activeElement)))switch(p.key){case"ArrowDown":p.preventDefault(),pt(n);break;case"ArrowUp":p.preventDefault(),fr(n);break}};n.addEventListener("keydown",h);let y=()=>{d()&&pr(n,r,o)};window.addEventListener("scroll",y,!0),window.addEventListener("resize",y),Lo(r,()=>{r.removeEventListener("click",l),r.removeEventListener("keydown",f),n.removeEventListener("keydown",h),n.removeEventListener("toggle",m),document.removeEventListener("click",g,!0),document.removeEventListener("keydown",u),window.removeEventListener("scroll",y,!0),window.removeEventListener("resize",y),de.openMenus.delete(n)})}}),t.directive("dropdown-menu",{priority:15,init(r){we(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function gr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function jo(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function mt(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),de.openMenus.has(t)&&de.openMenus.delete(t)}function br(t){t.directive("dropdown-item",{priority:15,init(e){we();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=a=>{if(!r)return;let s=jo(r),c=s.indexOf(e);switch(a.key){case"ArrowDown":{a.preventDefault(),(c+1<s.length?s[c+1]:s[0]).focus();break}case"ArrowUp":{a.preventDefault(),(c-1>=0?s[c-1]:s[s.length-1]).focus();break}case"Home":{a.preventDefault(),s.length&&s[0].focus();break}case"End":{a.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{a.preventDefault(),e.click();break}case"Escape":{if(a.preventDefault(),mt(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}break}case"Tab":{mt(r,o);break}}};e.addEventListener("keydown",n),gr(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(mt(r,o),o){let a=o.querySelector("[dropdown-toggle]");a&&a.focus()}};e.addEventListener("click",i),gr(e,()=>e.removeEventListener("click",i))}})}function hr(t,e={}){mr(t),br(t)}function vr(){ur()}var ie=new Map,_e=new Set,yr=0;function xr(){return++yr}function Er(){for(let t of _e)clearTimeout(t);_e.clear();for(let t of ie.values())t.remove();ie.clear(),yr=0}function Ar(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function gt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ko=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function bt(){return ie.size>0?ie.values().next().value:Co("top-right")}function Co(t){if(ie.has(t))return ie.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),ie.set(t,e),e}function So(t){return t.startsWith("top")}function ht(t,e,r,o,n){let i=xr(),a=t.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let c=document.createElement("span");if(c.textContent=e,s.appendChild(c),n){let d=document.createElement("button");d.type="button",d.classList.add("nojs-toast-dismiss"),d.setAttribute("aria-label","Dismiss"),d.textContent="\xD7",d.addEventListener("click",()=>Ge(s)),s.appendChild(d)}if(So(a)&&t.firstChild?t.insertBefore(s,t.firstChild):t.appendChild(s),o>0){let d=setTimeout(()=>{_e.delete(d),s.isConnected&&Ge(s)},o);_e.add(d),s._toastTimerId=d}return s}function Ge(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),_e.delete(t._toastTimerId)),t.remove())}function wr(t){Ar(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&ko.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),ie.set(i,r),gt(r,()=>{ie.get(i)===r&&ie.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",a=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(a)?3e3:a,c=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let f=()=>{let h=bt();ht(h,n,i,s,c)};r.addEventListener("click",f),gt(r,()=>r.removeEventListener("click",f));return}let m=t.findContext(r);if(!m||typeof m.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let l;function g(){let f=t.evaluate(n,m);if(f&&f!==l){let h=typeof f=="string"?f:String(f),y=bt();ht(y,h,i,s,c),l=f}else l=f}let u=m.$watch(g);gt(r,u)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,a=bt();return ht(a,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&Ge(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>Ge(r))},t.toast=e}function _r(t,e={}){wr(t)}function Lr(){Er()}var ge={containers:new Map};function jr(){ge.containers.clear()}function kr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function To(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Do=0;function Cr(t){return`${t}-${++Do}`}function De(t,e,r=!1){let o=ge.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let a=0;a<n.length;a++)n[a].setAttribute("aria-selected","false"),n[a].setAttribute("tabindex","-1"),i[a].setAttribute("aria-hidden","true"),i[a].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Ie(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function Sr(t){t.directive("tabs",{priority:10,init(e,r,o){kr();let n=[],i=[];for(let p of Array.from(e.children))p.hasAttribute("tab")?n.push(p):p.hasAttribute("panel")&&i.push(p);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let a=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",a),e.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let c=Math.min(n.length,i.length);for(let p=0;p<c;p++){let b=n[p],w=i[p],v=b.id||Cr("nojs-tab"),x=w.id||Cr("nojs-panel");b.id=v,w.id=x,b.setAttribute("role","tab"),b.setAttribute("aria-selected","false"),b.setAttribute("aria-controls",x),b.setAttribute("tabindex","-1"),b.classList.add("nojs-tab"),w.setAttribute("role","tabpanel"),w.setAttribute("aria-labelledby",v),w.setAttribute("tabindex","0"),w.setAttribute("aria-hidden","true"),w.inert=!0,w.classList.add("nojs-panel"),s.appendChild(b)}for(let p=c;p<i.length;p++){let b=i[p];b.setAttribute("role","tabpanel"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel")}let d=i[0];d?e.insertBefore(s,d):e.appendChild(s),ge.containers.set(e,{tabs:n.slice(0,c),panels:i.slice(0,c),activeIndex:-1});let m=t.findContext(e),l=[],g=(p,b)=>{let w=!1;try{w=!!t.evaluate(b,m)}catch{w=!1}w?p.setAttribute("aria-disabled","true"):p.removeAttribute("aria-disabled")};for(let p=0;p<c;p++){let b=n[p],w=b.getAttribute("tab-disabled");if(w&&(g(b,w),m&&typeof m.$watch=="function")){let v=m.$watch(()=>g(b,w));l.push(v)}}let u=0;if(o&&o.trim()!==""){let p=parseInt(o,10);!isNaN(p)&&p>=0&&p<c&&(u=p)}let f=n.slice(0,c);if(n[u]?.getAttribute("aria-disabled")==="true"){let p=Ie(f,u,1);p!==-1?(u=p,De(e,u)):De(e,u,!0)}else De(e,u);let h=p=>{let b=ge.containers.get(e);if(!b)return;let w=p.target;if(w.getAttribute("role")!=="tab")return;let{tabs:v}=b,x=v.indexOf(w);if(x===-1)return;let _=-1;switch(p.key){case"ArrowRight":case"ArrowDown":_=Ie(v,x,1);break;case"ArrowLeft":case"ArrowUp":_=Ie(v,x,-1);break;case"Home":_=Ie(v,v.length-1,1);break;case"End":_=Ie(v,0,-1);break;case"Tab":return;default:return}_!==-1&&_!==x&&(p.preventDefault(),De(e,_),v[_].focus())};s.addEventListener("keydown",h);let y=p=>{let b=p.target.closest("[role='tab']");if(!b)return;let w=ge.containers.get(e);if(!w)return;let v=w.tabs.indexOf(b);v!==-1&&b.getAttribute("aria-disabled")!=="true"&&(De(e,v),b.focus())};s.addEventListener("click",y),To(e,()=>{s.removeEventListener("keydown",h),s.removeEventListener("click",y);for(let p of l)p&&p();l.length=0,ge.containers.delete(e)})}})}function Tr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function Dr(t){t.directive("panel",{priority:11,init(){}})}function Ir(t,e={}){Sr(t),Tr(t),Dr(t)}function Br(){jr()}var I={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function Hr(){I.branches.clear(),I.selectedItem=null,I.typeahead="",I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null)}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function je(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Fr(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function qr(t){return t.closest('[role="tree"]')}function Io(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function Bo(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function vt(t){let e=I.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),I.selectedItem=t}function zr(t){let e=I.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function Ho(t){let e=I.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function Fo(t){let e=I.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Pr(t,e){let r=qr(e);if(!r)return;let o=Fr(r),n=o.indexOf(e);if(n<0)return;let i=I.branches.get(e),a=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),a&&!i.expanded)Ho(e);else if(a&&i.expanded){let s=i.subtreeEl.querySelector('[role="treeitem"]');s&&be(s,o)}break;case"ArrowLeft":if(t.preventDefault(),a&&i.expanded)Fo(e);else{let s=Io(e);s&&be(s,Fr(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&be(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&be(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),vt(e),a&&zr(e);break;case"Home":t.preventDefault(),o.length>0&&be(o[0],o);break;case"End":t.preventDefault(),o.length>0&&be(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),I.typeahead+=t.key.toLowerCase(),I.typeaheadTimer&&clearTimeout(I.typeaheadTimer),I.typeaheadTimer=setTimeout(()=>{I.typeahead="",I.typeaheadTimer=null},500);let s=n+1;for(let c=0;c<o.length;c++){let d=(s+c)%o.length;if(Bo(o[d]).startsWith(I.typeahead)){be(o[d],o);break}}}break}}function Rr(t){t.directive("tree",{priority:15,init(e){Le(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function $r(t){t.directive("branch",{priority:16,init(e,r,o){Le();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=qr(e);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",d?"-1":"0")}else e.setAttribute("tabindex","0");let a=!1;queueMicrotask(()=>{if(a)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?(I.branches.set(e,{expanded:n,subtreeEl:d}),d.setAttribute("aria-hidden",String(!n))):I.branches.set(e,{expanded:n,subtreeEl:null})});let s=d=>{d.target.closest?.('[role="treeitem"]')===e&&(d.stopPropagation(),vt(e),zr(e))};e.addEventListener("click",s),je(e,()=>e.removeEventListener("click",s));let c=d=>{Pr(d,e)};e.addEventListener("keydown",c),je(e,()=>e.removeEventListener("keydown",c)),je(e,()=>{a=!0,I.branches.delete(e),I.selectedItem===e&&(I.selectedItem=null),I.typeaheadTimer&&(clearTimeout(I.typeaheadTimer),I.typeaheadTimer=null,I.typeahead="")})}})}function be(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Mr(t){t.directive("subtree",{priority:16,init(e){Le(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=a=>{a.stopPropagation(),vt(o)};o.addEventListener("click",n),je(o,()=>o.removeEventListener("click",n));let i=a=>{Pr(a,o)};o.addEventListener("keydown",i),je(o,()=>o.removeEventListener("keydown",i)),je(o,()=>{I.selectedItem===o&&(I.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=I.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function Or(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function yt(t){return t.closest('[role="treeitem"]')}function qo(t){return t.closest('[role="tree"]')}function zo(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function Po(t){return zo(t).indexOf(t)}function Ro(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function Vr(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function ke(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function Be(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function $o(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function Mo(t,e){ke();let r=$o(),o=t.getBoundingClientRect(),n=qo(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function Nr(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(Le(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=g=>{let u=yt(g.target);if(u&&e.contains(u)){if(u.hasAttribute("tree-drag-disabled")){g.preventDefault();return}D.dragging={el:u,treeRoot:e},g.dataTransfer&&(g.dataTransfer.effectAllowed="move",g.dataTransfer.setData("text/plain","")),u.classList.add("nojs-dragging"),u.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:u}}))}},a=g=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let u=yt(g.target);if(!u||!e.contains(u)||u===D.dragging.el||Vr(u,D.dragging.el))return;g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect="move");let f=Ro(u,g.clientY,o);(D.currentTarget!==u||D.currentPosition!==f)&&(Be(e),ke(),D.currentTarget=u,D.currentPosition=f,f==="on"?u.classList.add("nojs-tree-drag-over"):Mo(u,f))},s=g=>{D.dragging&&D.dragging.treeRoot===e&&n++},c=g=>{D.dragging&&(n--,n<=0&&(n=0,Be(e),ke(),D.currentTarget=null,D.currentPosition=null))},d=g=>{if(g.preventDefault(),g.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let u=D.dragging.el,f=D.currentTarget,h=D.currentPosition;if(Be(e),ke(),!f||!h){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(f===u||Vr(f,u)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(h==="on"){let y=f.querySelector(':scope > [role="group"]');y||(y=f.nextElementSibling?.matches?.('[role="group"]')?f.nextElementSibling:null),y?y.setAttribute("aria-hidden","false"):(y=document.createElement("ul"),y.setAttribute("role","group"),y.setAttribute("subtree",""),y.classList.add("nojs-subtree","nojs-tree"),y.setAttribute("aria-hidden","false"),f.appendChild(y));let p=I.branches.get(f);p&&(p.expanded=!0,p.subtreeEl=y,f.setAttribute("aria-expanded","true")),y.appendChild(u),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:u,newParent:f}}))}else{let y=f.parentElement;if(!y){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(h==="before")y.insertBefore(u,f);else{let b=f.nextElementSibling,w=b?.matches?.('[role="group"]')?b.nextElementSibling:b;w?y.insertBefore(u,w):y.appendChild(u)}let p=Po(u);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:u,newIndex:p}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},m=g=>{let u=yt(g.target);u&&u.classList.remove("nojs-dragging"),Be(e),ke(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",a),e.addEventListener("dragenter",s),e.addEventListener("dragleave",c),e.addEventListener("drop",d),e.addEventListener("dragend",m),Or(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",a),e.removeEventListener("dragenter",s),e.removeEventListener("dragleave",c),e.removeEventListener("drop",d),e.removeEventListener("dragend",m),Be(e),ke()}),Oo(e);let l=new MutationObserver(g=>{for(let u of g)for(let f of u.addedNodes){if(f.nodeType!==1)continue;f.getAttribute("role")==="treeitem"&&xt(f);let h=f.querySelectorAll?.('[role="treeitem"]');if(h)for(let y of h)xt(y)}});l.observe(e,{childList:!0,subtree:!0}),Or(e,()=>l.disconnect())}})}function xt(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function Oo(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)xt(r)}function Wr(t,e={}){Rr(t),$r(t),Mr(t),Nr(t)}function Ur(){Hr()}var Ye=new Map;function Gr(){Ye.clear()}function Ke(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function Yr(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function Kr(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function Xr(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function He(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Zr(t){t.directive("stepper",{priority:14,init(e,r,o){Ke();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let a=o&&parseInt(o,10)||0,s=e.getAttribute("stepper-mode")||"linear",c=e.getAttribute("stepper-indicator")!=="false",d=e.getAttribute("stepper-nav")!=="false",m=e.getAttribute("aria-label")||"Stepper",l=Math.max(0,Math.min(a,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",m),e.classList.add("nojs-stepper");let g=null,u=[];if(c){g=document.createElement("div"),g.className="nojs-stepper-indicator",g.setAttribute("role","tablist"),g.setAttribute("aria-label","Progress"),i.forEach((j,S)=>{if(S>0){let R=document.createElement("div");R.className="nojs-stepper-separator",R.setAttribute("aria-hidden","true"),g.appendChild(R)}let A=document.createElement("button");A.type="button",A.className="nojs-stepper-indicator-item",A.setAttribute("role","tab"),A.setAttribute("aria-selected",S===l?"true":"false");let B=j.getAttribute("step-label")||`Step ${S+1}`,M=document.createElement("span");M.textContent=B,A.appendChild(M),A.setAttribute("aria-label",B);let X=`nojs-stepper-tab-${Vo++}`;if(A.id=X,s==="free"){A.setAttribute("data-clickable","");let R=()=>x(S);A.addEventListener("click",R),He(e,()=>A.removeEventListener("click",R))}else A.setAttribute("tabindex","-1");g.appendChild(A),u.push(A)});let k=j=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(j.key))return;j.preventDefault();let S=l;j.key==="ArrowRight"?S=Math.min(l+1,i.length-1):j.key==="ArrowLeft"?S=Math.max(l-1,0):j.key==="Home"?S=0:j.key==="End"&&(S=i.length-1),s==="free"?(x(S),u[S]?.focus()):u[l]?.focus()};g.addEventListener("keydown",k),He(e,()=>g.removeEventListener("keydown",k)),e.insertBefore(g,e.firstChild)}let f=null,h=null,y=null;if(d){f=document.createElement("div"),f.className="nojs-stepper-nav",f.setAttribute("aria-hidden","true"),h=document.createElement("button"),h.type="button",h.className="nojs-stepper-prev",h.textContent="Previous";let k=()=>v();h.addEventListener("click",k),He(e,()=>h.removeEventListener("click",k)),y=document.createElement("button"),y.type="button",y.className="nojs-stepper-next",y.textContent="Next";let j=()=>w();y.addEventListener("click",j),He(e,()=>y.removeEventListener("click",j)),f.appendChild(h),f.appendChild(y),e.appendChild(f)}function p(k){let j=i[k];if(!j)return!0;if(!Yr(j,t.findContext)){let B=j.querySelector("form[validate]");return B&&(Kr(B),u[k]&&u[k].classList.add("nojs-step-invalid"),Xr(e,j,B)),!1}u[k]&&u[k].classList.remove("nojs-step-invalid");let S=j.querySelectorAll("[required]");for(let B of S)if(typeof B.checkValidity=="function"&&!B.checkValidity())return B.reportValidity(),!1;let A=j.getAttribute("step-validate");if(A)try{if(!t.evaluate(A,n))return!1}catch(B){return console.warn(`[stepper] step-validate error: ${B.message}`),!1}return!0}function b(k){i.forEach((j,S)=>{let A=S===l;j.setAttribute("aria-hidden",A?"false":"true"),A?(j.removeAttribute("inert"),j.setAttribute("aria-current","step")):(j.setAttribute("inert",""),j.removeAttribute("aria-current"))}),u.length&&u.forEach((j,S)=>{j.setAttribute("aria-selected",S===l?"true":"false"),S<l?j.setAttribute("data-completed",""):j.removeAttribute("data-completed"),j.setAttribute("tabindex",S===l?"0":"-1");let A=i[S];A.id&&(j.setAttribute("aria-controls",A.id),A.setAttribute("aria-labelledby",j.id))}),h&&(h.disabled=l===0),y&&(y.textContent=l===i.length-1?"Finish":"Next"),e.dispatchEvent(new CustomEvent("step-change",{bubbles:!k,detail:{current:l,total:i.length}}))}function w(){return l>=i.length-1?(s==="linear"&&!p(l)||e.dispatchEvent(new CustomEvent("step-complete",{bubbles:!0,detail:{current:l,total:i.length}})),!1):s==="linear"&&!p(l)?!1:(l++,b(),L(),!0)}function v(){return l<=0?!1:(l--,b(),L(),!0)}function x(k){if(k<0||k>=i.length||k===l)return!1;if(s==="linear"&&k>l){for(let j=l;j<k;j++)if(l=j,b(),!p(j))return L(),!1}return l=k,b(),L(),!0}let _={get current(){return l},get total(){return i.length},next:w,prev:v,goTo:x,get isFirst(){return l===0},get isLast(){return l===i.length-1}};function L(){n.$stepper=_}L(),Ye.set(e,{get current(){return l},steps:i,mode:s,indicatorEl:g,navEl:f}),b(!0),He(e,()=>{Ye.delete(e),g&&g.parentNode&&g.remove(),f&&f.parentNode&&f.remove(),delete n.$stepper})}})}var Vo=0;var No=0;function Qr(t){t.directive("step",{priority:13,init(e,r,o){Ke(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${No++}`),e.setAttribute("tabindex","0")}})}function Jr(t,e={}){Qr(t),Zr(t)}function en(){Gr()}function tn(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function rn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function nn(t){t.directive("skeleton",{priority:10,init(e,r,o){tn();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",a=e.getAttribute("skeleton-lines"),s=e.getAttribute("skeleton-size"),c=[];function d(p){m();for(let b=0;b<p;b++){let w=document.createElement("div");w.className="nojs-skeleton-line",e.appendChild(w),c.push(w)}}function m(){for(let p of c)p.parentNode===e&&e.removeChild(p);c=[]}function l(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let p=s+(String(s).match(/\d$/)?"px":"");e.style.width=p,e.style.height=p}if(a){let p=parseInt(a,10);p>0&&d(p)}e.setAttribute("aria-busy","true")}let g=null;function u(){g&&g(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),m(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let p=!1,b=null,w=()=>{p||(p=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",w),b!==null&&clearTimeout(b),g=null)};e.addEventListener("transitionend",w),b=setTimeout(w,0),g=()=>{e.removeEventListener("transitionend",w),b!==null&&clearTimeout(b),p=!0,g=null}}let f=!1;function h(){let p=!!t.evaluate(o,n);p&&!f?(f=!0,l()):!p&&f&&(f=!1,u())}h();let y=n.$watch(h);rn(e,y),rn(e,()=>{g&&g(),f&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),m(),s&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function on(t,e={}){nn(t)}var he=new Map,W=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function sn(){he.clear(),W.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function Xe(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function Wo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function an(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function cn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function Uo(t,e){let o=(he.get(t)?.gutters||[]).reduce((n,i)=>n+Z(i,e),0);return Z(t,e)-o}function Go(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function Fe(t,e){let r=W.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function Ze(t,e,r,o){let n=Z(e,o),i=Z(r,o),a=W.get(e),s=W.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",a?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(s?.min||0)))}function Et(t){let e=t.getAttribute("split-persist");if(!e)return;let r=he.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function Yo(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=he.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,a)=>{i&&(n.panes[a].style.flexBasis=i,n.panes[a].style.flexGrow="0")}),!0)}catch{return!1}}function Ko(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let a=u=>{if(u.button!==0)return;u.preventDefault();let f=Uo(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=u[an(e)],C.startPrevSize=Z(r,e),C.startNextSize=Z(o,e),C.containerSize=f,C.sign=cn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(u.pointerId)},s=u=>{if(!C.active||C.gutterEl!==i)return;let f=(u[an(C.direction)]-C.startPos)*(C.sign||1),h=Fe(C.startPrevSize+f,C.prevPane),y=Fe(C.startNextSize-f,C.nextPane),p=C.startPrevSize+C.startNextSize;h+y!==p&&(h!==C.startPrevSize+f?y=p-h:h=p-y),C.prevPane.style.flexBasis=`${h}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${y}px`,C.nextPane.style.flexGrow="0",Ze(i,C.prevPane,C.nextPane,C.direction)},c=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",Et(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",a),i.addEventListener("pointermove",s),i.addEventListener("pointerup",c),i.addEventListener("pointercancel",c);let d=10,m=u=>{let f=e==="horizontal",h=cn(t,e),y=0;if(f&&u.key==="ArrowRight"||!f&&u.key==="ArrowDown")y=d*h;else if(f&&u.key==="ArrowLeft"||!f&&u.key==="ArrowUp")y=-d*h;else if(u.key==="Home")y=(W.get(r)?.min||0)-Z(r,e);else if(u.key==="End"){let _=W.get(o);y=Z(r,e)+Z(o,e)-(_?.min||0)-Z(r,e)}else return;u.preventDefault();let p=Z(r,e),b=Z(o,e),w=p+b,v=Fe(p+y,r),x=Fe(w-v,o);v=w-x,v=Fe(v,r),x=w-v,r.style.flexBasis=`${v}px`,r.style.flexGrow="0",o.style.flexBasis=`${x}px`,o.style.flexGrow="0",Ze(i,r,o,e),Et(t)};i.addEventListener("keydown",m);let l=()=>{let u=W.get(r),f=W.get(o),h=u?.collapsible?r:f?.collapsible?o:null;if(!h)return;let y=W.get(h);if(!y)return;let p=h===r?o:r,b=Z(r,e)+Z(o,e);if(y.collapsed){y.collapsed=!1,h.removeAttribute("data-collapsed");let w=y.preCollapseSize||`${Math.round(b/2)}px`,v=Go(w,b)??b/2,x=Math.min(v,b);h.style.flexBasis=`${x}px`,h.style.flexGrow="0",p.style.flexBasis=`${b-x}px`,p.style.flexGrow="0"}else y.preCollapseSize=h.style.flexBasis||`${Z(h,e)}px`,y.collapsed=!0,h.setAttribute("data-collapsed","true"),h.style.flexBasis="0px",h.style.flexGrow="0",p.style.flexBasis=`${b}px`,p.style.flexGrow="0";Ze(i,r,o,e),Et(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:h,collapsed:y.collapsed}}))};return i.addEventListener("dblclick",l),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",a),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",c),i.removeEventListener("pointercancel",c),i.removeEventListener("keydown",m),i.removeEventListener("dblclick",l)}}}function dn(t){t.directive("split",{priority:14,init(e,r,o){Xe();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let a=Array.from(e.children).filter(m=>m.hasAttribute("pane"));if(a.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${a.length}.`);return}a.forEach(m=>{W.get(m)||W.set(m,{size:m.getAttribute("pane")||null,min:parseInt(m.getAttribute("pane-min"),10)||0,max:parseInt(m.getAttribute("pane-max"),10)||1/0,collapsible:m.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],c=[];for(let m=0;m<a.length-1;m++){let{gutter:l,cleanup:g}=Ko(e,n,a[m],a[m+1],i);a[m].after(l),s.push(l),c.push(g)}he.set(e,{direction:n,gutterSize:i,panes:a,gutters:s}),Yo(e)||a.forEach(m=>{let g=W.get(m)?.size;g?(m.style.flexBasis=g,m.style.flexGrow="0"):(m.style.flexGrow="1",m.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((m,l)=>{Ze(m,a[l],a[l+1],n)})}),Wo(e,()=>{c.forEach(m=>m()),s.forEach(m=>m.remove()),he.delete(e),a.forEach(m=>W.delete(m)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function Xo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ln(t){t.directive("pane",{priority:15,init(e,r,o){Xe(),e.classList.add("nojs-pane"),W.has(e)||W.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=W.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),Xo(e,()=>{e.classList.remove("nojs-pane"),W.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function un(t,e={}){dn(t),ln(t)}function pn(){sn()}var le={sorts:new Map};function fn(){le.sorts.clear()}function ve(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function Zo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Qo(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?o=r:o=r.querySelector("[each]")||r.querySelector("[foreach]"),!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function Jo(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function mn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function gn(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function hn(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return gn(Number(t),Number(e));case"date":return gn(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function ei(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function vn(t){t.directive("sortable",{priority:10,init(e){ve(),e.classList.add("nojs-sortable")}})}function yn(t){t.directive("sort",{priority:11,init(e,r,o){ve();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",a=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let s=e.closest("table");if(!s)return;le.sorts.has(s)||le.sorts.set(s,{column:null,direction:null}),(a==="asc"||a==="desc")&&(le.sorts.get(s).column||bn(e,s,n,i,a,t));let c=()=>{let d=le.sorts.get(s),m;d.column!==n?m="asc":d.direction==="asc"?m="desc":d.direction==="desc"?m=null:m="asc",bn(e,s,n,i,m,t)};e.addEventListener("click",c),Zo(e,()=>{e.removeEventListener("click",c),s&&!s.isConnected&&(le.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function bn(t,e,r,o,n,i){let a=le.sorts.get(e);ei(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),a.column=r,a.direction=n):(a.column=null,a.direction=null);let s=Qo(e,i);if(s){let c=i.findContext(e),d=c?Jo(c,s.arrayPath):null;if(Array.isArray(d)){if(!n){let l=e._nojsOriginalOrder;if(l){let g=new Set(d),u=l.filter(f=>g.has(f));for(let f of d)l.includes(f)||u.push(f);mn(c,s.arrayPath,u)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...d]);let m=[...d].sort((l,g)=>{let u=l!=null?l[r]:null,f=g!=null?g[r]:null,h=hn(u,f,o);return n==="desc"?-h:h});mn(c,s.arrayPath,m);return}}ti(e,t,r,o,n)}function ti(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let c=[...e.closest("tr").children].indexOf(e);if(c<0)return;let d=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...d]),!n){let g=document.createDocumentFragment();for(let u of t._nojsOriginalRows)g.appendChild(u);i.appendChild(g);return}let m=g=>{let u=g.replace(/[^0-9.\-]/g,"");return u===""||u==="-"?NaN:parseFloat(u)};d.sort((g,u)=>{let f=g.children[c]?.textContent?.trim()||"",h=u.children[c]?.textContent?.trim()||"",y=hn(o==="number"?m(f):f,o==="number"?m(h):h,o);return n==="desc"?-y:y});let l=document.createDocumentFragment();for(let g of d)l.appendChild(g);i.appendChild(l)}function xn(t){t.directive("fixed-header",{priority:10,init(e){ve(),e.classList.add("nojs-fixed-header")}})}function En(t){t.directive("fixed-col",{priority:10,init(e){ve(),e.classList.add("nojs-fixed-col")}})}function At(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function An(t){let e=t.querySelector("tbody");if(!e)return null;let r=null;if(e.hasAttribute("each")||e.hasAttribute("foreach")?r=e:r=e.querySelector("[each]")||e.querySelector("[foreach]"),!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function wn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function _n(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function Ln(t){t.directive("table-reorder",{priority:15,init(e){if(ve(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",a=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",s=null,c=null,d=null;function m(){let y=r.querySelectorAll(":scope > tr");for(let p=0;p<y.length;p++){let b=y[p];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-grabbed","false");let w=!0;if(n){let j=S=>{w=!!S.target.closest(n)};b.addEventListener("mousedown",j),At(b,()=>b.removeEventListener("mousedown",j))}let v=j=>{if(n&&!w){j.preventDefault();return}s=[...r.querySelectorAll(":scope > tr")].indexOf(b),c=b,j.dataTransfer&&(j.dataTransfer.effectAllowed="move",j.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(A=>b.classList.add(A)),b.setAttribute("aria-grabbed","true")},x=j=>{if(c==null)return;j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move");let S=b.getBoundingClientRect(),A=S.top+S.height/2,M=[...r.querySelectorAll(":scope > tr")].indexOf(b);l(),M!==s&&(j.clientY<A?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),d=b)},_=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),d===b&&(d=null)},L=j=>{if(j.preventDefault(),j.stopPropagation(),c==null||s==null)return;let S=[...r.querySelectorAll(":scope > tr")],A=b.getBoundingClientRect(),B=A.top+A.height/2,M=S.indexOf(b);j.clientY>=B&&M++;let X=s;if(X===M||X+1===M){g();return}let R=X<M?M-1:M,se=An(e);if(se&&o){let T=wn(o,se.arrayPath);if(Array.isArray(T)){let F=[...T],[P]=F.splice(X,1);F.splice(R,0,P),_n(o,se.arrayPath,F),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...F]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:R,item:P}}))}}else{let T=c,F=S[R];T&&F&&(X<R?r.insertBefore(T,F.nextSibling):r.insertBefore(T,F),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:X,to:R,item:null}})))}g()},k=()=>{g()};b.addEventListener("dragstart",v),b.addEventListener("dragover",x),b.addEventListener("dragleave",_),b.addEventListener("drop",L),b.addEventListener("dragend",k),At(b,()=>{b.removeEventListener("dragstart",v),b.removeEventListener("dragover",x),b.removeEventListener("dragleave",_),b.removeEventListener("drop",L),b.removeEventListener("dragend",k),b._nojsReorderSetup=!1})}}function l(){d&&(d.classList.remove("nojs-reorder-insert-before"),d.classList.remove("nojs-reorder-insert-after"),d=null)}function g(){c&&(i.split(/\s+/).filter(Boolean).forEach(p=>c.classList.remove(p)),c.setAttribute("aria-grabbed","false")),l(),s=null,c=null;let y=r.querySelectorAll(":scope > tr");for(let p of y)p.classList.remove("nojs-reorder-insert-before"),p.classList.remove("nojs-reorder-insert-after"),a.split(/\s+/).filter(Boolean).forEach(b=>p.classList.remove(b))}let u=y=>{c!=null&&(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"))},f=y=>{if(c==null||y.target!==r)return;y.preventDefault(),y.stopPropagation();let p=s,w=[...r.querySelectorAll(":scope > tr")].length-1;if(p===w){g();return}let v=An(e);if(v&&o){let x=wn(o,v.arrayPath);if(Array.isArray(x)){let _=[...x],[L]=_.splice(p,1);_.push(L),_n(o,v.arrayPath,_),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[..._]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:p,to:_.length-1,item:L}}))}}g()};r.addEventListener("dragover",u),r.addEventListener("drop",f);let h=new MutationObserver(()=>{m()});h.observe(r,{childList:!0}),m(),At(e,()=>{h.disconnect(),r.removeEventListener("dragover",u),r.removeEventListener("drop",f),g()})}})}function jn(t,e={}){vn(t),yn(t),xn(t),En(t),Ln(t)}function kn(){fn()}var ue={containers:new Map};function Cn(){for(let[,t]of ue.containers)typeof t.unsub=="function"&&t.unsub();ue.containers.clear()}function Sn(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
.nojs-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--nojs-breadcrumb-gap, 0.5em);
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
}
.nojs-breadcrumb li {
  display: flex;
  align-items: center;
  gap: var(--nojs-breadcrumb-gap, 0.5em);
}
.nojs-breadcrumb li + li::before {
  content: var(--nojs-breadcrumb-separator, " / ");
  color: #94A3B8;
  pointer-events: none;
  user-select: none;
}
.nojs-breadcrumb a {
  color: #0EA5E9;
  text-decoration: none;
  transition: color 0.15s;
}
.nojs-breadcrumb a:hover {
  color: #0284C7;
  text-decoration: underline;
}
.nojs-breadcrumb [aria-current="page"] {
  color: var(--nojs-breadcrumb-active-color, inherit);
  font-weight: 500;
  pointer-events: none;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function Tn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ri(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function ni(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function Dn(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let a=e[i],s=document.createElement("li");if(i===e.length-1){let d=document.createElement("span");d.setAttribute("aria-current","page"),d.textContent=a.label,s.appendChild(d)}else{let d=document.createElement("a");d.href=a.href,d.textContent=a.label,s.appendChild(d)}o.appendChild(s)}t.appendChild(o);let n=ue.containers.get(t);n&&(n.crumbs=e)}function oi(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=ri(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function ii(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let a=ni(r[i].replace(/[-_]/g," "));o.push({label:a,href:n})}return o}function In(t){t.directive("breadcrumb",{priority:15,init(e,r,o){Sn(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(s=>!(s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb"))),i=t.router,a=!n&&i;if(ue.containers.set(e,{unsub:null,crumbs:[]}),a){let s=()=>{let c=i.current,d=c?c.path:"/",m=ii(d);Dn(e,m)};if(s(),typeof i.on=="function"){let c=i.on(s),d=ue.containers.get(e);d&&(d.unsub=c),Tn(e,()=>{typeof c=="function"&&c();let m=ue.containers.get(e);m&&(m.unsub=null)})}}else{let s=oi(e);for(let c of Array.from(e.children))c.tagName==="OL"&&c.classList.contains("nojs-breadcrumb")||(c.style.display="none");Dn(e,s)}Tn(e,()=>{ue.containers.delete(e)})}})}function Bn(t,e={}){In(t)}function Hn(){Cn()}var Qe={containers:new Map};function Fn(){Qe.containers.clear()}function qn(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
[accordion] {
  display: flex;
  flex-direction: column;
  gap: var(--nojs-accordion-gap, 0);
}

/* \u2500\u2500\u2500 CSS-native animation (modern browsers) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@supports (interpolate-size: allow-keywords) {
  [accordion] {
    interpolate-size: allow-keywords;
  }
  [accordion] > details > ::details-content {
    transition:
      block-size var(--nojs-accordion-duration, 0.3s) var(--nojs-accordion-easing, ease),
      content-visibility var(--nojs-accordion-duration, 0.3s) var(--nojs-accordion-easing, ease) allow-discrete;
    block-size: 0;
    overflow: clip;
  }
  [accordion] > details[open] > ::details-content {
    block-size: auto;
  }
}

/* \u2500\u2500\u2500 Fallback animation (older browsers) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@supports not (interpolate-size: allow-keywords) {
  [accordion] > details .nojs-accordion-content {
    overflow: hidden;
    transition: height var(--nojs-accordion-duration, 0.3s) var(--nojs-accordion-easing, ease);
  }
}

/* \u2500\u2500\u2500 Summary reset \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
[accordion] > details > summary {
  cursor: pointer;
  list-style: none;
}
[accordion] > details > summary::-webkit-details-marker {
  display: none;
}
[accordion] > details > summary::marker {
  content: none;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function si(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Je=null;function ai(){return Je!==null||(Je=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),Je}function zn(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let o=Array.from(t.children),n=!1;for(let i of o){if(i===e){n=!0;continue}n&&r.appendChild(i)}return t.appendChild(r),r}function ci(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let o=()=>{e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function Rn(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let o=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function Pn(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");Rn(t,r)}else t.open=!1}function et(t,e,r,o){let n=new CustomEvent("accordion-change",{bubbles:!0,detail:{element:e,open:r,index:o}});t.dispatchEvent(n)}function Ce(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function $n(t){t.directive("accordion",{priority:10,init(e,r,o){qn();let n=(o||"").trim().toLowerCase()==="multi"?"multi":"single",i=!ai();e.setAttribute("role","group");let a=Ce(e);if(a.length===0)return;if(i)for(let l of a)zn(l);let s=[],c=new MutationObserver(l=>{for(let g of l)for(let u of g.addedNodes)u.nodeType!==1||u.tagName!=="DETAILS"||u.parentElement===e&&d(u)});c.observe(e,{childList:!0});let d=l=>{i&&zn(l);let g=f=>{let h=Ce(e),y=h.indexOf(l);if(l.open){if(n==="single")for(let p of h)p!==l&&p.open&&Pn(p,i);et(e,l,!0,y)}else et(e,l,!1,y)},u=null;if(i){let f=l.querySelector(":scope > summary");f&&(u=h=>{h.preventDefault();let y=l.querySelector(":scope > .nojs-accordion-content");if(l.open)Rn(l,y),et(e,l,!1,Ce(e).indexOf(l));else{if(n==="single"){let p=Ce(e);for(let b of p)b!==l&&b.open&&Pn(b,!0)}ci(l,y),et(e,l,!0,Ce(e).indexOf(l))}},f.addEventListener("click",u))}l.addEventListener("toggle",g),s.push({details:l,toggleHandler:g,clickHandler:u})};for(let l of a)d(l);let m=l=>{let g=l.target;if(g.tagName!=="SUMMARY")return;let u=g.parentElement;if(!u||u.parentElement!==e)return;let h=Ce(e).map(b=>b.querySelector(":scope > summary")).filter(Boolean),y=h.indexOf(g);if(y===-1)return;let p=-1;switch(l.key){case"ArrowDown":case"ArrowRight":p=(y+1)%h.length;break;case"ArrowUp":case"ArrowLeft":p=(y-1+h.length)%h.length;break;case"Home":p=0;break;case"End":p=h.length-1;break;default:return}p!==-1&&p!==y&&(l.preventDefault(),h[p].focus())};e.addEventListener("keydown",m),Qe.containers.set(e,{mode:n,listeners:s,observer:c}),si(e,()=>{e.removeEventListener("keydown",m),c.disconnect();for(let l of s)if(l.details.removeEventListener("toggle",l.toggleHandler),l.clickHandler){let g=l.details.querySelector(":scope > summary");g&&g.removeEventListener("click",l.clickHandler)}s.length=0,Qe.containers.delete(e)})}})}function Mn(t,e={}){$n(t)}function On(){Fn()}var Se=new Map;function Vn(){let t=Array.from(Se.keys());for(let e of t){let r=Se.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[o,n]of r.renderedNodes){if(n.__disposers){for(let i of n.__disposers)try{i()}catch{}n.__disposers=null}n.parentNode&&n.remove()}r.renderedNodes.clear()}r.disposed=!0}}Se.clear()}function Nn(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function di(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function li(t){for(let e of["each","foreach","for"])if(t.hasAttribute(e)){let r=Wn(t.getAttribute(e));if(r)return{eachEl:t,...r}}for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let o=Wn(e.getAttribute(r));if(o)return{eachEl:e,...o}}return null}function Wn(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function ui(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Un(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let o=document.createElement("td"),n=e==="table"?t:t.closest("table"),i=n?n.querySelector("tr:not(.nojs-virtual-spacer)"):null,a=i?i.children.length:1;o.setAttribute("colspan",String(a)),o.style.padding="0",o.style.border="none",r.appendChild(o)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function tt(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function pi(t,e){return t*e}function Gn(t){let e=0,r=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++)e+=t.heights[o]||r;return e}function rt(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;let r=0,o=t.estimatedHeight||50;for(let n=0;n<e;n++)r+=t.heights[n]||o;return r}function fi(t,e){let r=0,o=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++){let i=t.heights[n]||o;if(r+i>e)return n;r+=i}return Math.max(0,t.totalItems-1)}function mi(t,e,r){let o=e+r,n=0,i=t.estimatedHeight||50;for(let a=0;a<t.totalItems;a++)if(n+=t.heights[a]||i,n>=o)return a;return t.totalItems-1}function gi(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let o,n;return t.itemHeight!=="auto"?(o=Math.floor(e/t.itemHeight),n=Math.ceil((e+r)/t.itemHeight)-1):(o=fi(t,e),n=mi(t,e,r)),o=Math.max(0,o-t.buffer),n=Math.min(t.totalItems-1,n+t.buffer),{start:o,end:n}}function wt(t,e){if(t.disposed)return;let r=t.container,o=r,n=o.scrollTop,i=o.clientHeight,{start:a,end:s}=gi(t,n,i);if(a===t.startIndex&&s===t.endIndex&&!t.dirty)return;t.startIndex=a,t.endIndex=s,t.dirty=!1;let c=rt(t,a),d=t.itemHeight!=="auto"?pi(t.totalItems,t.itemHeight):Gn(t),m=s>=0?rt(t,s+1):0,l=Math.max(0,d-m);tt(t.spacerTop,c),tt(t.spacerBottom,l);let g=new Set;for(let f=a;f<=s;f++)g.add(f);for(let[f,h]of t.renderedNodes)g.has(f)||(h.remove(),t.renderedNodes.delete(f));let u=[];for(let f=a;f<=s;f++){if(t.renderedNodes.has(f))continue;let h=t.dataArray[f];if(h===void 0)continue;let y=t.template.cloneNode(!0),p={};p[t.iteratorVar]=h,p.$index=f,p.$count=t.totalItems,p.$first=f===0,p.$last=f===t.totalItems-1,p.$even=f%2===0,p.$odd=f%2!==0,y.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(p)),y.__declared=!1,u.push({index:f,node:y}),t.renderedNodes.set(f,y)}if(u.length>0){u.sort((f,h)=>f.index-h.index);for(let{index:f,node:h}of u){let y=null;for(let[p,b]of t.renderedNodes)p>f&&b.parentNode===r&&(!y||p<bi(y,t))&&(y=b);y||(y=t.spacerBottom),r.insertBefore(h,y);try{e.processTree&&e.processTree(h)}catch{}}}if(t.itemHeight==="auto"){let f=!1;for(let[h,y]of t.renderedNodes){let p=y.offsetHeight||y.getBoundingClientRect().height;p>0&&t.heights[h]!==p&&(t.heights[h]=p,f=!0)}if(f){let h=Gn(t),y=rt(t,a),p=s>=0?rt(t,s+1):0,b=Math.max(0,h-p);tt(t.spacerTop,y),tt(t.spacerBottom,b)}}}function bi(t,e){for(let[r,o]of e.renderedNodes)if(o===t)return r;return 1/0}function hi(t,e,r){if(t.disposed)return;let o=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems);for(let[n,i]of t.renderedNodes){if(i.__disposers){for(let a of i.__disposers)try{a()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=o,wt(t,r)}function Yn(t){t.directive("virtual",{priority:10,init(e,r,o){Nn(),e.setAttribute("data-nojs-virtual","");let n=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",a=n==="auto"?"auto":parseInt(n,10),s=parseInt(i,10)||5;if(a!=="auto"&&(isNaN(a)||a<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let c=li(e),d=null;if(c)if(c.eachEl===e){for(let v of e.children)if(!v.classList.contains("nojs-virtual-spacer")){d=v;break}}else d=c.eachEl;else for(let v of e.children)if(!v.classList.contains("nojs-virtual-spacer")){d=v;break}if(!d){console.warn("[virtual] No child template found.");return}let m=d.cloneNode(!0);for(m.removeAttribute("each"),m.removeAttribute("foreach"),m.removeAttribute("for"),m.__declared=!1,m.__disposers=null,m.__ctx=null,c&&(c.eachEl.removeAttribute("each"),c.eachEl.removeAttribute("foreach"),c.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let l=Un(e),g=Un(e);e.appendChild(l),e.appendChild(g);let u={container:e,itemHeight:a,buffer:s,totalItems:0,heights:[],estimatedHeight:a==="auto"?50:a,startIndex:-1,endIndex:-1,scrollTop:0,template:m,spacerTop:l,spacerBottom:g,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:c?c.iteratorVar:"item",arrayPath:c?c.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};Se.set(e,u);let f=null,h=()=>{f||(f=requestAnimationFrame(()=>{f=null,wt(u,t)}))};if(u.scrollHandler=h,e.addEventListener("scroll",h,{passive:!0}),typeof ResizeObserver<"u"){let v=new ResizeObserver(()=>{u.dirty=!0,wt(u,t)});v.observe(e),u.resizeObserver=v}let y=null,p=-1,b=null,w=()=>{if(!u.disposed){if(u.arrayPath){let v=t.findContext?t.findContext(e):null;if(v){let x=ui(v,u.arrayPath);Array.isArray(x)&&(x!==y||x.length!==p)&&(y=x,p=x.length,hi(u,x,t))}}b=requestAnimationFrame(w)}};b=requestAnimationFrame(w),di(e,()=>{u.disposed=!0,f&&(cancelAnimationFrame(f),f=null),b&&(cancelAnimationFrame(b),b=null),e.removeEventListener("scroll",h),u.resizeObserver&&(u.resizeObserver.disconnect(),u.resizeObserver=null);for(let[v,x]of u.renderedNodes){if(x.__disposers){for(let _ of x.__disposers)try{_()}catch{}x.__disposers=null}x.remove()}u.renderedNodes.clear(),u.spacerTop&&u.spacerTop.parentNode&&u.spacerTop.remove(),u.spacerBottom&&u.spacerBottom.parentNode&&u.spacerBottom.remove(),Se.delete(e)})}})}function Kn(t,e={}){Yn(t)}function Xn(){Vn()}var vi="[validate],[drag],[drop],[drag-list],[drag-multiple]";function Zn(t){if(typeof document>"u")return;let e=document.querySelectorAll(vi);for(let r of e){if(!r.__declared)continue;let o=K(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var yi=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer"],xi={name:"nojs-elements",install(t,e={}){It(t,e),Ot(t,e),Kt(t,e),Jt(t,e),dr(t,e),hr(t,e),_r(t,e),Ir(t,e),Wr(t,e),Jr(t,e),on(t,e),un(t,e),jn(t,e),Bn(t,e),Mn(t,e),Kn(t,e),Zn(t)},init(t){if(Zn(t),typeof document>"u"||!document.body)return;let e=yi.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){Bt(),Vt(),Xt(),er(),lr(),vr(),Lr(),Br(),Ur(),en(),pn(),kn(),Hn(),On(),Xn()}},Ei=xi;
//# sourceMappingURL=nojs-elements.js.map
