/**
 * NoJS Elements v1.14.1 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/ErickXavier/nojs-elements
 */
var x={dragging:null,selected:new Map,placeholder:null},Ve=new Map;function Bt(){x.dragging=null,x.selected.clear(),x.placeholder&&(x.placeholder.remove(),x.placeholder=null),Ve.clear()}function Ne(){if(typeof document>"u"||document.querySelector("style[data-nojs-dnd]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dnd",""),e.textContent=t,document.head.appendChild(e)}function Y(t,e){let r=t&&t.internals;return r&&typeof r[e]<"u"?r[e]:void 0}function Ue(t,e){let r=Y(t,"removeCoreDirective");typeof r=="function"?r(e):(Y(t,"warn")||console.warn)(`[nojs-elements] core too old (<1.13.0): cannot remove "${e}" stub; update NoJS core to 1.13.0+.`)}function se(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function We(t){let e=0;for(let r of t.children){if(r.classList.contains("nojs-drop-placeholder"))continue;(r.style||{}).display==="contents"?e+=We(r):e++}return e}function Ge(t,e,r,o){let n=[...t.children].filter(i=>!i.classList.contains("nojs-drop-placeholder"));if(n.length===0)return 0;for(let i=0;i<n.length;i++){let a=(n[i].style&&n[i].style.display==="contents"&&n[i].firstElementChild||n[i]).getBoundingClientRect();if(o==="horizontal"){let s=a.left+a.width/2;if(e<s)return i}else if(o==="grid"){let s=a.left+a.width/2,d=a.top+a.height/2;if(r<d&&e<s||r<a.top+a.height&&e<s)return i}else{let s=a.top+a.height/2;if(r<s)return i}}return n.length}function Ht(t,e,r,o){te();let n;if(r==="auto"){if(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder",x.dragging&&x.dragging.sourceEl){let a=(x.dragging.sourceEl.firstElementChild||x.dragging.sourceEl).getBoundingClientRect();a.height>0&&(n.style.height=a.height+"px"),a.width>0&&(n.style.width=a.width+"px")}}else{let c=document.getElementById(r.startsWith("#")?r.slice(1):r);c&&c.content?(n=document.createElement("div"),n.style.display="contents",n.className=o||"nojs-drop-placeholder",n.appendChild(c.content.cloneNode(!0))):(n=document.createElement("div"),n.className=o||"nojs-drop-placeholder")}n.classList.add("nojs-drop-placeholder");let i=[...t.children].filter(c=>!c.classList.contains("nojs-drop-placeholder"));e>=i.length?t.appendChild(n):t.insertBefore(n,i[e]),x.placeholder=n}function te(){x.placeholder&&(x.placeholder.remove(),x.placeholder=null)}function he(t,e){return!e||e==="*"?!0:e.split(",").map(o=>o.trim()).includes(t)}function fo(t,e){let r=document.createElement("div");r.style.cssText="position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";let o=t.style&&t.style.display==="contents"&&t.firstElementChild||t,n=o.getBoundingClientRect(),i=n.width,c=n.height,a=getComputedStyle(o),s=Math.min(e,3);for(let g=s-1;g>=0;g--){let u=document.createElement("div"),f=g*4;if(u.style.cssText="position:absolute;top:"+f+"px;left:"+f+"px;width:"+i+"px;height:"+c+"px;border-radius:"+a.borderRadius+";box-shadow:0 1px 4px rgba(0,0,0,0.12);overflow:hidden;box-sizing:border-box;",g===0){let l=o.cloneNode(!0);for(;l.firstChild;)u.appendChild(l.firstChild);u.style.background=a.backgroundColor||"#fff",u.style.border=a.border,u.style.padding=a.padding,u.style.fontSize=a.fontSize,u.style.color=a.color,u.style.fontFamily=a.fontFamily}else u.style.background=a.backgroundColor||"#fff",u.style.border=a.border||"1px solid #ddd";r.appendChild(u)}let d=document.createElement("div");return d.textContent=e,d.style.cssText="position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;padding:0 5px;background:#3b82f6;color:#fff;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);",r.appendChild(d),r.style.width=i+(s-1)*4+"px",r.style.height=c+(s-1)*4+"px",r}var ee=null;function mo(){return ee&&ee.isConnected?ee:typeof document>"u"||!document.body?null:(ee=document.createElement("div"),ee.setAttribute("aria-live","assertive"),ee.setAttribute("aria-atomic","true"),ee.setAttribute("role","status"),ee.className="nojs-dnd-live-region",ee.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;",document.body.appendChild(ee),ee)}function ce(t){let e=mo();e&&(e.textContent="",typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>{e.textContent=t}):e.textContent=t)}function $t(t){Ue(t,"drag"),t.directive("drag",{priority:15,init(e,r,o){Ne();let n=t.findContext(e),i=e.getAttribute("drag-type")||"default",c=e.getAttribute("drag-effect")||"move",a=e.getAttribute("drag-handle"),s=e.getAttribute("drag-image"),d=e.getAttribute("drag-image-offset")||"0,0",g=e.getAttribute("drag-disabled"),u=e.getAttribute("drag-class")||"nojs-dragging",f=e.getAttribute("drag-ghost-class");e.draggable=!0,e.setAttribute("aria-roledescription","draggable item"),e.getAttribute("role")||e.setAttribute("role","button"),e.getAttribute("tabindex")||e.setAttribute("tabindex","0");let l=!0;if(a){let m=b=>{l=!!b.target.closest(a)};e.addEventListener("mousedown",m),se(e,()=>e.removeEventListener("mousedown",m))}let p=m=>{if(a&&!l){m.preventDefault();return}if(g&&t.evaluate(g,n)){m.preventDefault();return}let b=t.evaluate(o,n),E=e.getAttribute("drag-group"),h=b;if(E&&x.selected.has(E)){let A=x.selected.get(E);A.size>0&&[...A].some(k=>k.el===e)&&(h=[...A].map(k=>k.item))}if(x.dragging={item:h,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},m.dataTransfer){if(m.dataTransfer.effectAllowed=c,m.dataTransfer.setData("text/plain",""),Array.isArray(h)&&h.length>1&&m.dataTransfer.setDragImage){let A=fo(e,h.length);document.body.appendChild(A);let j=e.getBoundingClientRect();m.dataTransfer.setDragImage(A,j.width/2,j.height/2),requestAnimationFrame(()=>A.remove())}else if(s&&m.dataTransfer.setDragImage)if(s==="none"){let A=document.createElement("div");A.style.cssText="width:1px;height:1px;opacity:0;position:fixed;top:-999px",document.body.appendChild(A);let[j,k]=d.split(",").map(Number);m.dataTransfer.setDragImage(A,j||0,k||0),requestAnimationFrame(()=>A.remove())}else{let A=e.querySelector(s);if(A){let[j,k]=d.split(",").map(Number);f&&A.classList.add(f),m.dataTransfer.setDragImage(A,j||0,k||0)}}}if(u.split(/\s+/).filter(Boolean).forEach(A=>e.classList.add(A)),Array.isArray(h)&&E&&x.selected.has(E))for(let A of x.selected.get(E))A.el!==e&&u.split(/\s+/).filter(Boolean).forEach(j=>A.el.classList.add(j));let _=e.getAttribute("aria-label")||e.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${_}. Use arrow keys to move.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:h,index:x.dragging.sourceIndex,el:e}}))},y=()=>{u.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b));let m=e.getAttribute("drag-group");if(m&&x.selected.has(m))for(let b of x.selected.get(m))u.split(/\s+/).filter(Boolean).forEach(E=>b.el.classList.remove(E));if(f&&s&&s!=="none"){let b=e.querySelector(s);b&&b.classList.remove(f)}e.dispatchEvent(new CustomEvent("nojs:dnd-end",{bubbles:!0,detail:{item:x.dragging?.item,index:x.dragging?.sourceIndex,dropped:x.dragging===null}})),x.dragging=null,te()};if(e.addEventListener("dragstart",p),e.addEventListener("dragend",y),se(e,()=>{e.removeEventListener("dragstart",p),e.removeEventListener("dragend",y)}),g){let m=function(){let E=!!t.evaluate(g,n);e.draggable=!E,E?e.removeAttribute("aria-roledescription"):e.setAttribute("aria-roledescription","draggable item")},b=n.$watch(m);se(e,b)}let v=m=>{if(x.dragging&&!x.dragging.sourceEl.isConnected&&(x.dragging=null),m.key===" "&&!x.dragging){m.preventDefault();let b=t.evaluate(o,n);x.dragging={item:b,type:i,effect:c,sourceEl:e,sourceCtx:n,sourceList:null,sourceIndex:null,listDirective:null},u.split(/\s+/).filter(Boolean).forEach(h=>e.classList.add(h));let E=e.getAttribute("aria-label")||e.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${E}. Use arrow keys to move.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:b,index:null,el:e}}))}else m.key==="Escape"&&x.dragging&&x.dragging.sourceEl===e&&(m.preventDefault(),u.split(/\s+/).filter(Boolean).forEach(b=>e.classList.remove(b)),ce("Drag cancelled."),x.dragging=null,te())};e.addEventListener("keydown",v),se(e,()=>e.removeEventListener("keydown",v))}})}function qt(t){Ue(t,"drop"),t.directive("drop",{priority:15,init(e,r,o){Ne();let n=t.findContext(e),i=e.getAttribute("drop-accept")||"default",c=e.getAttribute("drop-effect")||"move",a=e.getAttribute("drop-class")||"nojs-drag-over",s=e.getAttribute("drop-reject-class")||"nojs-drop-reject",d=e.getAttribute("drop-disabled"),g=e.getAttribute("drop-max"),u=e.getAttribute("drop-sort"),f=e.getAttribute("drop-placeholder"),l=e.getAttribute("drop-placeholder-class");e.setAttribute("aria-dropeffect",c);let p=0,y=h=>{if(!x.dragging||d&&t.evaluate(d,n))return;let _=he(x.dragging.type,i),A=!0;if(g){let j=t.evaluate(g,n),k=We(e);typeof j=="number"&&k>=j&&(A=!1)}if(!_||!A){s.split(/\s+/).filter(Boolean).forEach(j=>e.classList.add(j)),a.split(/\s+/).filter(Boolean).forEach(j=>e.classList.remove(j)),te();return}if(s.split(/\s+/).filter(Boolean).forEach(j=>e.classList.remove(j)),h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect=c),u){let j=Ge(e,h.clientX,h.clientY,u);f&&Ht(e,j,f,l),e.dispatchEvent(new CustomEvent("nojs:dnd-over",{bubbles:!1,detail:{item:x.dragging.item,index:j}}))}},v=h=>{if(x.dragging&&!(d&&t.evaluate(d,n))&&(p++,p===1)){let _=he(x.dragging.type,i),A=!0;if(g){let j=t.evaluate(g,n),k=We(e);typeof j=="number"&&k>=j&&(A=!1)}_&&A?(a.split(/\s+/).filter(Boolean).forEach(j=>e.classList.add(j)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:x.dragging.item,type:x.dragging.type}}))):s.split(/\s+/).filter(Boolean).forEach(j=>e.classList.add(j))}},m=h=>{x.dragging&&(p--,p<=0&&(p=0,a.split(/\s+/).filter(Boolean).forEach(_=>e.classList.remove(_)),s.split(/\s+/).filter(Boolean).forEach(_=>e.classList.remove(_)),te(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:x.dragging.item}}))))},b=h=>{if(h.preventDefault(),h.stopPropagation(),p=0,!x.dragging||d&&t.evaluate(d,n)||!he(x.dragging.type,i))return;if(g){let w=t.evaluate(g,n),$=We(e);if(typeof w=="number"&&$>=w)return}let _=x.dragging.item,A=x.dragging.type,j=x.dragging.effect,k=0;u&&(k=Ge(e,h.clientX,h.clientY,u)),a.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),s.split(/\s+/).filter(Boolean).forEach(w=>e.classList.remove(w)),te();let L={$drag:_,$dragType:A,$dragEffect:j,$dropIndex:k,$source:{list:x.dragging.sourceList,index:x.dragging.sourceIndex,el:x.dragging.sourceEl},$target:{list:null,index:k,el:e},$el:e},S=Y(t,"execStatement");typeof S=="function"?S(o,n,L):(Y(t,"warn")||console.warn)("[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped."),x.dragging=null,e.dispatchEvent(new CustomEvent("nojs:dnd-drop",{bubbles:!1,detail:{item:_,index:k,source:L.$source,target:L.$target,effect:j}}))},E=h=>{x.dragging&&(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),b(h))};e.addEventListener("dragover",y),e.addEventListener("dragenter",v),e.addEventListener("dragleave",m),e.addEventListener("drop",b),e.addEventListener("keydown",E),se(e,()=>{e.removeEventListener("dragover",y),e.removeEventListener("dragenter",v),e.removeEventListener("dragleave",m),e.removeEventListener("drop",b),e.removeEventListener("keydown",E)})}})}function Rt(t){Ue(t,"drag-list"),t.directive("drag-list",{priority:10,init(e,r,o){Ne();let n=t.findContext(e),i=e.getAttribute("template"),c=e.getAttribute("drag-list-key"),a=e.getAttribute("drag-list-item")||"item",s=e.getAttribute("drop-sort")||"vertical",d=e.getAttribute("drag-type")||"__draglist_"+o,g=e.getAttribute("drop-accept")||d,u=e.hasAttribute("drag-list-copy"),f=e.hasAttribute("drag-list-remove"),l=e.getAttribute("drag-disabled"),p=e.getAttribute("drop-disabled"),y=e.getAttribute("drop-max"),v=e.getAttribute("drop-placeholder"),m=e.getAttribute("drop-placeholder-class"),b=e.getAttribute("drag-class")||"nojs-dragging",E=e.getAttribute("drop-class")||"nojs-drag-over",h=e.getAttribute("drop-reject-class")||"nojs-drop-reject",_=e.getAttribute("drop-settle-class")||"nojs-drop-settle",A=e.getAttribute("drop-empty-class")||"nojs-drag-list-empty";e.setAttribute("role","listbox"),e.setAttribute("aria-dropeffect",u?"copy":"move");let j={listPath:o,ctx:n,el:e};Ve.set(e,j),se(e,()=>Ve.delete(e));let k=0,L=null;function S(){let T=t.resolve(o,n);if(!Array.isArray(T))return;if(T===L&&T.length>0&&e.children.length>0){for(let V of e.children)V.__ctx&&V.__ctx.$notify&&V.__ctx.$notify();return}L=T;let R=i?document.getElementById(i):null;if(!R)return;let F=Y(t,"disposeChildren");typeof F=="function"&&F(e),e.innerHTML="";let B=T.length;T.forEach((V,z)=>{let Q={[a]:V,$index:z,$count:B,$first:z===0,$last:z===B-1,$even:z%2===0,$odd:z%2!==0},de=t.createContext(Q,n),lt=R.content.cloneNode(!0),I=document.createElement("div");I.style.display="contents",I.__ctx=de,I.appendChild(lt),e.appendChild(I);let M=I.firstElementChild||I;M.draggable=!0,M.setAttribute("role","option"),M.setAttribute("aria-roledescription","draggable item"),M.getAttribute("tabindex")||M.setAttribute("tabindex","0");let ae=N=>{if(l&&t.evaluate(l,n)){N.preventDefault();return}x.dragging={item:V,type:d,effect:u?"copy":"move",sourceEl:I,sourceCtx:de,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:u,removeMode:f}},N.dataTransfer&&(N.dataTransfer.effectAllowed=u?"copy":"move",N.dataTransfer.setData("text/plain","")),b.split(/\s+/).filter(Boolean).forEach(be=>M.classList.add(be));let X=M.getAttribute("aria-label")||M.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${X}. Use arrow keys to reorder.`),e.dispatchEvent(new CustomEvent("nojs:dnd-start",{bubbles:!0,detail:{item:V,index:z,el:M}}))},ge=()=>{b.split(/\s+/).filter(Boolean).forEach(N=>M.classList.remove(N)),x.dragging&&x.dragging.sourceEl===I&&(x.dragging=null),te()};I.addEventListener("dragstart",ae),I.addEventListener("dragend",ge);let Oe=N=>{if(N.key===" "&&!x.dragging){N.preventDefault(),N.stopPropagation(),x.dragging={item:V,type:d,effect:u?"copy":"move",sourceEl:I,sourceCtx:de,sourceList:T,sourceIndex:z,listDirective:{el:e,listPath:o,ctx:n,keyProp:c,copyMode:u,removeMode:f}},b.split(/\s+/).filter(Boolean).forEach(be=>M.classList.add(be));let X=M.getAttribute("aria-label")||M.textContent?.trim()?.slice(0,50)||"Item";ce(`Grabbed ${X}. Use arrow keys to reorder.`)}else if(N.key==="Escape"&&x.dragging){N.preventDefault(),N.stopPropagation();let X=e.querySelector(`.${b.split(/\s+/)[0]}`)||M;b.split(/\s+/).filter(Boolean).forEach(be=>X.classList.remove(be)),ce("Reorder cancelled."),x.dragging=null,te()}else if((N.key==="ArrowDown"||N.key==="ArrowRight")&&x.dragging&&x.dragging.sourceEl===I){N.preventDefault();let X=I.nextElementSibling;if(X){(X.firstElementChild||X).focus();let $e=[...e.children].filter(pt=>!pt.classList.contains("nojs-drop-placeholder")),ut=$e.indexOf(X)+1;ce(`Moved to position ${ut} of ${$e.length}.`)}}else if((N.key==="ArrowUp"||N.key==="ArrowLeft")&&x.dragging&&x.dragging.sourceEl===I){N.preventDefault();let X=I.previousElementSibling;if(X){(X.firstElementChild||X).focus();let $e=[...e.children].filter(pt=>!pt.classList.contains("nojs-drop-placeholder")),ut=$e.indexOf(X)+1;ce(`Moved to position ${ut} of ${$e.length}.`)}}};I.addEventListener("keydown",Oe),I.__disposers=I.__disposers||[],I.__disposers.push(()=>I.removeEventListener("dragstart",ae),()=>I.removeEventListener("dragend",ge),()=>I.removeEventListener("keydown",Oe)),t.processTree(I)});let q=T.length===0;A.split(/\s+/).filter(Boolean).forEach(V=>e.classList.toggle(V,q))}let w=T=>{if(!x.dragging||p&&t.evaluate(p,n))return;let R=he(x.dragging.type,g),F=!0;if(y){let q=t.evaluate(y,n),V=t.resolve(o,n);typeof q=="number"&&Array.isArray(V)&&V.length>=q&&(F=!1)}if(!R||!F){h.split(/\s+/).filter(Boolean).forEach(q=>e.classList.add(q)),E.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),te();return}h.split(/\s+/).filter(Boolean).forEach(q=>e.classList.remove(q)),T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect=u?"copy":"move");let B=Ge(e,T.clientX,T.clientY,s);v&&Ht(e,B,v,m)},$=T=>{if(x.dragging&&!(p&&t.evaluate(p,n))&&(k++,k===1)){let R=he(x.dragging.type,g),F=!0;if(y){let B=t.evaluate(y,n),q=t.resolve(o,n);typeof B=="number"&&Array.isArray(q)&&q.length>=B&&(F=!1)}R&&F?(E.split(/\s+/).filter(Boolean).forEach(B=>e.classList.add(B)),e.dispatchEvent(new CustomEvent("nojs:dnd-enter",{bubbles:!1,detail:{item:x.dragging.item,type:x.dragging.type}}))):h.split(/\s+/).filter(Boolean).forEach(B=>e.classList.add(B))}},O=()=>{x.dragging&&(k--,k<=0&&(k=0,E.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),h.split(/\s+/).filter(Boolean).forEach(T=>e.classList.remove(T)),te(),e.dispatchEvent(new CustomEvent("nojs:dnd-leave",{bubbles:!1,detail:{item:x.dragging?.item}}))))},K=T=>{if(T.preventDefault(),T.stopPropagation(),k=0,!x.dragging||p&&t.evaluate(p,n)||!he(x.dragging.type,g))return;if(y){let I=t.evaluate(y,n),M=t.resolve(o,n);if(typeof I=="number"&&Array.isArray(M)&&M.length>=I)return}let R=x.dragging.item,F=x.dragging.listDirective,B=x.dragging.sourceIndex,q=Ge(e,T.clientX,T.clientY,s);E.split(/\s+/).filter(Boolean).forEach(I=>e.classList.remove(I)),h.split(/\s+/).filter(Boolean).forEach(I=>e.classList.remove(I)),te();let V=t.resolve(o,n);if(!Array.isArray(V))return;let z=F&&F.el===e;if(z&&B===q){x.dragging=null;return}if(z&&B+1===q){x.dragging=null;return}let Q=[...V];if(z){let[I]=Q.splice(B,1),M=B<q?q-1:q;Q.splice(M,0,I),n.$set(o,Q),e.dispatchEvent(new CustomEvent("nojs:dnd-reorder",{bubbles:!0,detail:{list:Q,item:R,from:B,to:M}}))}else{let I=u&&typeof R=="object"?{...R}:R;if(Q.splice(q,0,I),n.$set(o,Q),F&&!F.copyMode&&(f||F.removeMode)){let M=t.resolve(F.listPath,F.ctx);if(Array.isArray(M)&&B!=null){let ae=M.filter((ge,Oe)=>Oe!==B);F.ctx.$set(F.listPath,ae),F.el.dispatchEvent(new CustomEvent("nojs:dnd-remove",{bubbles:!0,detail:{list:ae,item:R,index:B}}))}}e.dispatchEvent(new CustomEvent("nojs:dnd-receive",{bubbles:!0,detail:{list:Q,item:R,from:B,fromList:F?t.resolve(F.listPath,F.ctx):null}}))}let de=x.dragging?.sourceEl?.firstElementChild?.getAttribute("aria-label")||x.dragging?.sourceEl?.firstElementChild?.textContent?.trim()?.slice(0,50)||"Item",lt=z&&B<q?q:q+1;ce(`Dropped ${de} at position ${lt}.`),requestAnimationFrame(()=>{let M=[...e.children][z&&B<q?q-1:q];if(M){let ae=M.firstElementChild||M;_.split(/\s+/).filter(Boolean).forEach(ge=>ae.classList.add(ge)),ae.addEventListener("animationend",()=>{_.split(/\s+/).filter(Boolean).forEach(ge=>ae.classList.remove(ge))},{once:!0})}}),x.dragging=null},P=T=>{if(x.dragging&&he(x.dragging.type,g)&&(T.key==="Enter"||T.key===" ")){T.preventDefault();let R=e.querySelector(":focus");if(R){let B=(R.style?.display==="contents"&&R.firstElementChild||R).getBoundingClientRect(),q={preventDefault(){},stopPropagation(){},clientX:B.left+B.width/2,clientY:B.top+B.height+1,dataTransfer:null};K(q)}}};e.addEventListener("dragover",w),e.addEventListener("dragenter",$),e.addEventListener("dragleave",O),e.addEventListener("drop",K),e.addEventListener("keydown",P),se(e,()=>{e.removeEventListener("dragover",w),e.removeEventListener("dragenter",$),e.removeEventListener("dragleave",O),e.removeEventListener("drop",K),e.removeEventListener("keydown",P)});let ie=n.$watch(S);se(e,ie),S()}})}function Ft(t){Ue(t,"drag-multiple"),t.directive("drag-multiple",{priority:16,init(e,r){let o=t.findContext(e),n=e.getAttribute("drag-group"),i=e.getAttribute("drag-multiple-class")||"nojs-selected";if(!n){(Y(t,"warn")||console.warn)("drag-multiple requires drag-group attribute");return}x.selected.has(n)||x.selected.set(n,new Set);let c=x.selected.get(n),a=d=>{let g=e.getAttribute("drag"),f={item:g?t.evaluate(g,o):null,el:e,ctx:o};if(d.ctrlKey||d.metaKey){let l=[...c].find(p=>p.el===e);l?(c.delete(l),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.remove(p))):(c.add(f),i.split(/\s+/).filter(Boolean).forEach(p=>e.classList.add(p)))}else{for(let l of c)i.split(/\s+/).filter(Boolean).forEach(p=>l.el.classList.remove(p));c.clear(),c.add(f),i.split(/\s+/).filter(Boolean).forEach(l=>e.classList.add(l))}};e.addEventListener("click",a),se(e,()=>{e.removeEventListener("click",a);let d=[...c].find(g=>g.el===e);d&&c.delete(d)});let s=d=>{if(d.key==="Escape"){for(let g of c)i.split(/\s+/).filter(Boolean).forEach(u=>g.el.classList.remove(u));c.clear()}};window.addEventListener("keydown",s),se(e,()=>window.removeEventListener("keydown",s))}})}function Mt(t,e={}){$t(t),qt(t),Rt(t),Ft(t)}function Pt(){Bt()}var zt=[["valueMissing","required"],["typeMismatch",null],["tooShort","minlength"],["tooLong","maxlength"],["patternMismatch","pattern"],["rangeUnderflow","min"],["rangeOverflow","max"],["stepMismatch","step"]],ft=["required","email","url","number","date","time","datetime-local","month","week","tel","minlength","maxlength","pattern","min","max","step"];function re(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ve,Gt,Ke,mt,gt,Ot,Ye,bt,Vt;function go(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);for(;e.nextNode();)e.currentNode.__declared=!1}function bo(t){return(t.getAttribute("type")||"text").toLowerCase()}function ho(t,e){let r=[],o=new Set,n=t.getAttribute("validate");if(n){let c=n.split("|").map(a=>a.trim());for(let a of c){let[s,...d]=a.split(":"),g=ve[s];if(g){let u=g(t.value,...d,e);u!==!0&&u&&(r.push({rule:s,message:u}),o.add(s))}else{let u=t.value,f=null;switch(s){case"required":(u==null||String(u).trim()==="")&&(f="Required");break;case"email":u&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u)&&(f="Invalid email");break;case"url":try{new URL(u)}catch{f="Invalid URL"}break;case"min":Number(u)<Number(d[0])&&(f=`Minimum value is ${d[0]}`);break;case"max":Number(u)>Number(d[0])&&(f=`Maximum value is ${d[0]}`);break;case"custom":if(d[0]&&ve[d[0]]){let l=ve[d[0]](u,e);l!==!0&&l&&(f=l)}break}f&&(r.push({rule:s,message:f}),o.add(s))}}}let i=t.validity;if(i&&!i.valid){for(let[c,a]of zt)if(i[c]){let s=a||bo(t);o.has(s)||(r.push({rule:s,message:t.validationMessage}),o.add(s))}}return r}function vo(t,e,r){let o=t.getAttribute(`error-${e}`);if(o)return o;let n=t.getAttribute("error");return n&&!n.startsWith("#")?n:r}function yo(t,e){if(!t.length)return null;let o=[...t].sort((n,i)=>{let c=ft.indexOf(n.rule),a=ft.indexOf(i.rule);return(c===-1?999:c)-(a===-1?999:a)})[0];return{rule:o.rule,message:vo(e,o.rule,o.message)}}function Ut(t){let e=t.closest("form");if(e){for(let r of e.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r}for(let r of document.querySelectorAll('div[style="display: contents;"]'))if(r.__errorTemplateFor===t)return r;return null}function xo(t,e,r,o,n){let i=Ut(o);if(i){if(i.__ctx?.$error===e&&i.__ctx?.$rule===r)return;bt(i),i.remove()}let c=document.querySelector(t);if(!c)return;let a=c.content.cloneNode(!0),s=document.createElement("div");s.style.display="contents",s.__errorTemplateFor=o;let d=Ke({$error:e,$rule:r},n);s.__ctx=d,s.appendChild(a),c.parentNode.insertBefore(s,c.nextSibling),go(s),gt(s)}function Nt(t){let e=Ut(t);e&&(bt(e),e.remove())}function Eo(t,e){let r=t.getAttribute("validate-if");if(!r)return!0;try{return!!Gt(r,e)}catch{return!0}}function Wt(t,e){let r=t.getAttribute("validate-on");if(r)return r.split(/\s+/);let o=e?e.getAttribute("validate-on"):null;return o?o.split(/\s+/):["input","focusout"]}function _o(t,e,r){let o=e.split("|").map(n=>n.trim());for(let n of o){let[i,...c]=n.split(":"),a=ve[i];if(a){let s=a(t,...c,r);if(s!==!0&&s)return s}else switch(i){case"required":if(t==null||String(t).trim()==="")return"Required";break;case"email":if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return"Invalid email";break;case"url":try{new URL(t)}catch{return"Invalid URL"}break;case"min":if(Number(t)<Number(c[0]))return`Minimum value is ${c[0]}`;break;case"max":if(Number(t)>Number(c[0]))return`Maximum value is ${c[0]}`;break;case"custom":if(c[0]&&ve[c[0]]){let s=ve[c[0]](t,r);if(s!==!0&&s)return s}break}}return null}function wo(t){if(t.__ctx)return t.__ctx;for(let r=t.parentElement;r;r=r.parentElement)if(r.__ctx)return mt(t);let e=Ke({},null);return t.__ctx=e,e}function Yt(t){ve=Y(t,"validators")||{},Gt=t.evaluate,Ke=t.createContext,mt=t.findContext,gt=t.processTree,Ot=Y(t,"cloneTemplate")||(()=>null),Ye=Y(t,"disposeChildren")||(()=>{}),bt=Y(t,"disposeTree")||Ye,Vt=Y(t,"warn")||console.warn;let e=Y(t,"removeCoreDirective");typeof e=="function"?e("validate"):Vt('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.'),t.directive("validate",{priority:30,init(r,o,n){if(r.tagName==="FORM"){let f=function(){c&&typeof c.$notify=="function"&&c.$notify();let h=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT);for(;h.nextNode();){let A=h.currentNode.__ctx;A&&A!==c&&typeof A.$notify=="function"&&A.$notify()}},l=function(){return r.querySelectorAll("input, textarea, select")},p=function(){let h={},_={},A={},j=!0,k=null,L=0,S=!1;for(let w of l())w.name&&(w.type==="checkbox"?_[w.name]=w.checked:w.type==="radio"?w.checked?_[w.name]=w.value:w.name in _||(_[w.name]=""):_[w.name]=w.value);for(let w of l()){if(!w.name)continue;let $=s.has(w.name),O=d.has(w.name);if(!Eo(w,c)){A[w.name]={valid:!0,dirty:O,touched:$,error:null,value:_[w.name]};continue}let K=ho(w,_),P=yo(K,w),ie=!P,T=Wt(w,r),R=T.includes("input"),F=T.includes("blur")||T.includes("focusout")||T.includes("submit"),B;!w.hasAttribute("validate-on")&&!r.hasAttribute("validate-on")?B=$||O:B=R&&O||F&&$,ie||(j=!1),!ie&&B&&(h[w.name]=P.message,L++,k||(k=P.message)),A[w.name]={valid:ie,dirty:O,touched:$,error:P?P.message:null,value:_[w.name]};let q=w.getAttribute("error-class")||a;if(q){let z=q.split(/\s+/);!ie&&B?w.classList.add(...z):w.classList.remove(...z)}if(P&&B){let z=w.getAttribute(`error-${P.rule}`),Q=w.getAttribute("error"),de=(z&&z.startsWith("#")?z:null)||(Q&&Q.startsWith("#")?Q:null);de?xo(de,P.message,P.rule,w,c):Nt(w)}else Nt(w);let V=w.getAttribute("as");V&&c.$set(V,A[w.name])}g.size>0&&(S=!0),u.valid=j,u.errors=h,u.values=_,u.fields=A,u.firstError=k,u.errorCount=L,u.pending=S,c.$set("$form",{...u}),f(),y(r)},y=function(h){let _=u.valid&&!u.pending&&!u.submitting,A=h.querySelectorAll('button:not([type="button"]), input[type="submit"]');for(let j of A){if(j.hasAttribute("disabled")&&j.getAttribute("disabled")!==""){let k=j.getAttribute("disabled");if(k!=="disabled"&&k!=="true"&&k!=="false")continue}j.disabled=!_,j.__autoDisabled=!0}},v=function(h){if(!h.name)return;let _=Wt(h,r),A=()=>{d.add(h.name),u.dirty=!0,p()},j=()=>{s.add(h.name),u.touched=!0,p()};if(_.includes("input"))h.addEventListener("input",A),re(r,()=>h.removeEventListener("input",A));else{let k=()=>{d.add(h.name),u.dirty=!0,p()};h.addEventListener("input",k),re(r,()=>h.removeEventListener("input",k))}if(_.includes("blur")||_.includes("focusout")){let k=()=>{j(),_.includes("blur")&&A()};h.addEventListener("focusout",k),re(r,()=>h.removeEventListener("focusout",k))}else h.addEventListener("focusout",j),re(r,()=>h.removeEventListener("focusout",j));_.includes("submit")&&(h.addEventListener("focusout",j),re(r,()=>h.removeEventListener("focusout",j)))},c=wo(r);r.setAttribute("novalidate","");let a=r.getAttribute("error-class"),s=new Set,d=new Set,g=new Map,u={valid:!1,dirty:!1,touched:!1,submitting:!1,pending:!1,errors:{},values:{},firstError:null,errorCount:0,fields:{},reset:()=>{u.dirty=!1,u.touched=!1,u.pending=!1,u.submitting=!1,s.clear(),d.clear(),r.reset(),p()},endSubmit:()=>{u.submitting=!1,p()}};c.$set("$form",u);let m=r.hasAttribute("validate-on"),b=[...l()].some(h=>h.hasAttribute("validate-on"));if(!m&&!b){let h=A=>{let j=A.target;j&&j.name&&d.add(j.name),u.dirty=!0,p()};r.addEventListener("input",h),re(r,()=>r.removeEventListener("input",h)),r.addEventListener("change",h),re(r,()=>r.removeEventListener("change",h));let _=A=>{A.target&&A.target.name&&s.add(A.target.name),u.touched=!0,p()};r.addEventListener("focusout",_),re(r,()=>r.removeEventListener("focusout",_))}else for(let h of l())v(h);let E=h=>{for(let _ of l())_.name&&s.add(_.name);if(u.touched=!0,p(),!u.valid||u.pending){h.preventDefault(),h.stopImmediatePropagation();return}u.submitting=!0,y(r),c.$set("$form",{...u}),f()};r.addEventListener("submit",E,!0),re(r,()=>r.removeEventListener("submit",E,!0)),r.__nojsResetSubmitting=()=>{u.submitting=!1,p()},re(r,()=>{delete r.__nojsResetSubmitting}),requestAnimationFrame(p);return}let i=mt(r);if(n&&(r.tagName==="INPUT"||r.tagName==="TEXTAREA"||r.tagName==="SELECT")){let c=r.getAttribute("error"),a=()=>{let s=_o(r.value,n,{});if(s&&c){let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d||(d=document.createElement("div"),d.__validationError=!0,d.style.display="contents",r.parentNode.insertBefore(d,r.nextSibling));let g=Ot(c);if(g){let u=Ke({err:{message:s}},i);Ye(d),d.innerHTML="",d.__ctx=u,d.appendChild(g),gt(d)}}else{let d=r.nextElementSibling?.__validationError?r.nextElementSibling:null;d&&(Ye(d),d.innerHTML="")}};r.addEventListener("input",a),re(r,()=>r.removeEventListener("input",a))}}})}function Kt(t,e={}){Yt(t)}function Xt(){}var Ae=new Map,J=new Map;function Zt(){let t=Array.from(Ae.keys());for(let e of t){let r=e&&e.__disposers;if(r){for(let o of r)try{o()}catch{}e.__disposers=[]}}for(let e of J.values())clearTimeout(e);J.clear();for(let e of Ae.values())e.remove();Ae.clear()}function Qt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tooltip",""),e.textContent=t,document.head.appendChild(e)}function Ao(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Xe=8;function er(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,a,s;switch(r){case"bottom":a=o.bottom+Xe,s=o.left+(o.width-n.width)/2;break;case"left":a=o.top+(o.height-n.height)/2,s=o.left-n.width-Xe;break;case"right":a=o.top+(o.height-n.height)/2,s=o.right+Xe;break;default:a=o.top-n.height-Xe,s=o.left+(o.width-n.width)/2;break}s<4&&(s=4),s+n.width>i-4&&(s=i-n.width-4),a<4&&(a=4),a+n.height>c-4&&(a=c-n.height-4),t.style.top=`${a}px`,t.style.left=`${s}px`}var jo=0;function Lo(t,e,r){document.body.appendChild(e),er(e,t,r),e.setAttribute("aria-hidden","false")}function Jt(t,e){e.setAttribute("aria-hidden","true"),e.remove()}function ko(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function tr(t){t.directive("tooltip",{priority:20,init(e,r,o){Qt();let n=o;if(!n){ko(t,"[tooltip] attribute value (tooltip text) is required.");return}let i=e.getAttribute("tooltip-position")||"top",c=parseInt(e.getAttribute("tooltip-delay"),10),a=Number.isNaN(c)?300:c,s=e.getAttribute("tooltip-disabled"),d=s?t.findContext(e):null,g=()=>{if(!s||!d)return!1;try{return!!t.evaluate(s,d)}catch{return!1}},u=`nojs-tooltip-${++jo}`,f=document.createElement("div");f.className="nojs-tooltip",f.setAttribute("role","tooltip"),f.setAttribute("id",u),f.setAttribute("aria-hidden","true"),f.textContent=n,e.setAttribute("aria-describedby",u),Ae.set(e,f);let l=!1,p=0,y=()=>{!l||!e.isConnected||p||(p=requestAnimationFrame(()=>{p=0,!(!l||!e.isConnected)&&er(f,e,i)}))},v=()=>{window.addEventListener("scroll",y,!0),window.addEventListener("resize",y)},m=()=>{window.removeEventListener("scroll",y,!0),window.removeEventListener("resize",y),p&&(cancelAnimationFrame(p),p=0)},b=()=>{l||(Lo(e,f,i),l=!0,v())},E=()=>{if(!l){Jt(e,f);return}m(),Jt(e,f),l=!1},h=()=>{if(g())return;J.has(e)&&clearTimeout(J.get(e));let $=setTimeout(()=>{J.delete(e),!g()&&e.isConnected&&b()},a);J.set(e,$)},_=()=>{J.has(e)&&(clearTimeout(J.get(e)),J.delete(e)),E()},A=()=>h(),j=()=>_(),k=()=>h(),L=()=>_(),S=$=>{$.key==="Escape"&&f.getAttribute("aria-hidden")==="false"&&_()};e.addEventListener("mouseenter",A),e.addEventListener("mouseleave",j),e.addEventListener("focusin",k),e.addEventListener("focusout",L),e.addEventListener("keydown",S);let w=null;if(s&&d&&typeof d.$watch=="function"){let $=()=>{l&&g()&&E()};w=d.$watch($)}Ao(e,()=>{e.removeEventListener("mouseenter",A),e.removeEventListener("mouseleave",j),e.removeEventListener("focusin",k),e.removeEventListener("focusout",L),e.removeEventListener("keydown",S),w&&(w(),w=null),m(),J.has(e)&&(clearTimeout(J.get(e)),J.delete(e)),l=!1,f.remove(),Ae.delete(e)})}})}function rr(t,e={}){tr(t)}function nr(){Zt()}var U=new Map;function or(){U.clear()}function Ze(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-popover",""),e.textContent=t,document.head.appendChild(e)}function ht(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function je(t,e="togglePopover"){return!!t&&typeof t[e]=="function"}var le=8;function Qe(t,e,r){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,a,s;switch(r){case"top":a=o.top-n.height-le,s=o.left+(o.width-n.width)/2;break;case"left":a=o.top+(o.height-n.height)/2,s=o.left-n.width-le;break;case"right":a=o.top+(o.height-n.height)/2,s=o.right+le;break;default:a=o.bottom+le,s=o.left+(o.width-n.width)/2;break}r==="bottom"&&a+n.height>c&&(a=o.top-n.height-le),r==="top"&&a<0&&(a=o.bottom+le),r==="right"&&s+n.width>i&&(s=o.left-n.width-le),r==="left"&&s<0&&(s=o.right+le),s<4&&(s=4),s+n.width>i-4&&(s=i-n.width-4),a<4&&(a=4),a+n.height>c-4&&(a=c-n.height-4),t.style.top=`${a}px`,t.style.left=`${s}px`}function vt(t,e){t._untrack&&t._untrack();let r=0,o=()=>{r=0;let c=t.popoverEl;if(!c||!c.isConnected){i();return}if(typeof c.matches=="function"&&!c.matches(":popover-open")){i();return}Qe(c,e,t.position)},n=()=>{r||(r=requestAnimationFrame(o))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",n,!0),window.removeEventListener("resize",n),t._untrack=null};return window.addEventListener("scroll",n,!0),window.addEventListener("resize",n),t._untrack=i,i}function ye(t){t&&t._untrack&&t._untrack()}function ir(t){t.directive("popover",{priority:20,init(r,o,n){Ze();let i=n||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!U.has(i))U.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let s=U.get(i);s.popoverEl=r,s.position=c}let a=s=>{let d=U.get(i);if(!d)return;let g=s.newState==="open";d.open=g;for(let u of d.triggerEls)u.setAttribute("aria-expanded",String(g));g||ye(d)};r.addEventListener("toggle",a),ht(r,()=>{r.removeEventListener("toggle",a);let s=U.get(i);s&&(ye(s),s.popoverEl===r&&(s.popoverEl=null,s.open=!1),!s.popoverEl&&s.triggerEls.size===0&&U.delete(i))})}}),t.directive("popover-trigger",{priority:20,init(r,o,n){Ze();let i=n;if(!i){let s=r.closest("[use]")||r.parentElement,d=s?.querySelector("[data-popover-id]")||s?.querySelector("[popover]");if(d&&(i=d.getAttribute("data-popover-id")||d.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),U.has(i)||U.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),U.get(i).triggerEls.add(r);let c=s=>{let d=U.get(i);if(!d||!d.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}je(d.popoverEl)&&(d.popoverEl.togglePopover(),requestAnimationFrame(()=>{d.popoverEl.matches(":popover-open")?(Qe(d.popoverEl,r,d.position),vt(d,r)):ye(d)}))};r.addEventListener("click",c);let a=s=>{let d=U.get(i);s.key==="Escape"&&d?.open&&(je(d.popoverEl,"hidePopover")&&d.popoverEl.hidePopover(),ye(d),r.focus())};document.addEventListener("keydown",a),ht(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",a);let s=U.get(i);s&&(s.triggerEls.delete(r),!s.popoverEl&&s.triggerEls.size===0&&(ye(s),U.delete(i)))})}}),t.directive("popover-dismiss",{priority:20,init(r){Ze();let o=()=>{let n=r.closest(".nojs-popover");!n||!je(n,"hidePopover")||n.hidePopover()};r.addEventListener("click",o),ht(r,()=>r.removeEventListener("click",o))}});let e=(r,o)=>e.open(r,o);e.open=(r,o)=>{let n=U.get(r);if(!n||!n.popoverEl||!je(n.popoverEl,"showPopover"))return!1;try{n.popoverEl.showPopover()}catch{return!1}let i=o||[...n.triggerEls][0];return i&&requestAnimationFrame(()=>{Qe(n.popoverEl,i,n.position),vt(n,i)}),!0},e.close=r=>{let o=U.get(r);if(!o||!o.popoverEl||!je(o.popoverEl,"hidePopover"))return!1;try{o.popoverEl.hidePopover()}catch{}return ye(o),!0},e.toggle=(r,o)=>{let n=U.get(r);if(!n||!n.popoverEl||!je(n.popoverEl))return!1;n.popoverEl.togglePopover();let i=o||[...n.triggerEls][0];return i&&n.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{Qe(n.popoverEl,i,n.position),vt(n,i)}):ye(n),!0},t.popover=e}function sr(t,e={}){ir(t)}function ar(){or()}var W=[],ne=new Map,Co=1e4;function cr(){return Co+W.length}function dr(){W.length=0,ne.clear()}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-modal",""),e.textContent=t,document.head.appendChild(e)}function So(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var ur='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',yt=new WeakMap;function To(t){let e=r=>{if(r.key!=="Tab")return;let o=[...t.querySelectorAll(ur)].filter(c=>c.offsetParent!==null);if(o.length===0){r.preventDefault();return}let n=o[0],i=o[o.length-1];r.shiftKey?document.activeElement===n&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),n.focus())};t.addEventListener("keydown",e),yt.set(t,e)}function lr(t){let e=yt.get(t);e&&(t.removeEventListener("keydown",e),yt.delete(t))}var qe=new WeakMap;function pr(t){t.directive("modal",{priority:10,init(r,o,n){Le();let i=n||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let a=r.getAttribute("modal-backdrop");a==="false"&&r.setAttribute("data-nojs-no-backdrop","");let s=r.getAttribute("modal-class"),d=r.getAttribute("modal-escape"),g=f=>{f.target===r&&a!=="false"&&d!=="false"&&ke(r,i)};r.addEventListener("click",g),ne.set(i,r);let u=f=>{if(f.newState==="open"){if(r.style.zIndex=String(cr()),s&&s.split(/\s+/).filter(Boolean).forEach(l=>r.classList.add(l)),requestAnimationFrame(()=>{if(!r.isConnected||!W.some(p=>p.el===r))return;let l=r.querySelector(ur);l?l.focus():r.focus()}),To(r),d!=="false"){let l=p=>{p.key==="Escape"&&(p.stopPropagation(),ke(r,i))};r.addEventListener("keydown",l),qe.set(r,l)}}else if(f.newState==="closed"){s&&s.split(/\s+/).filter(Boolean).forEach(y=>r.classList.remove(y)),lr(r);let l=qe.get(r);l&&(r.removeEventListener("keydown",l),qe.delete(r));let p=W.findIndex(y=>y.el===r);if(p===-1&&(p=W.findIndex(y=>y.id===i)),p!==-1){let y=W[p];W.splice(p,1),y.triggerEl&&requestAnimationFrame(()=>{y.triggerEl.focus()})}}};r.addEventListener("toggle",u),So(r,()=>{r.removeEventListener("click",g),r.removeEventListener("toggle",u),lr(r);let f=qe.get(r);f&&(r.removeEventListener("keydown",f),qe.delete(r)),ne.delete(i);let l=W.findIndex(p=>p.el===r);l===-1&&(l=W.findIndex(p=>p.id===i)),l!==-1&&W.splice(l,1)})}});let e=r=>e.open(r);e.open=r=>{let o=ne.get(r);if(!o)return!1;try{o.showPopover()}catch{return!1}return W.some(n=>n.id===r)||W.push({id:r,el:o,triggerEl:null}),!0},e.close=r=>{let o=ne.get(r);return o?(ke(o,r),!0):!1},e.closeAll=()=>{for(let r=W.length-1;r>=0;r--)ke(W[r].el,W[r].id)},t.modal=e}function ke(t,e){try{t.hidePopover()}catch{}}function fr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Do(t){let e=document.querySelectorAll("[data-modal-id]");for(let r of e)if(r.getAttribute("data-modal-id")===t)return r;return null}function mr(t){t.directive("modal-open",{priority:10,init(e,r,o){Le();let n=o;if(!n){let u=(e.closest("[use]")||e.parentElement)?.querySelector("[data-modal-id]");if(u&&(n=u.getAttribute("data-modal-id")),!n){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");let i=()=>{let g=ne.get(n)||Do(n);if(!g){console.warn(`[modal-open] modal "${n}" not found`);return}let u=W.some(f=>f.id===n);g.id&&e.setAttribute("aria-controls",g.id);try{g.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${n}"`);return}u||W.push({id:n,el:g,triggerEl:e}),e.setAttribute("aria-expanded","true")},c=()=>{e.setAttribute("aria-expanded","false")},a=null,s=null,d=()=>{let g=ne.get(n);return g?(s=g,a=u=>{u.newState==="closed"&&e.setAttribute("aria-expanded","false")},g.addEventListener("toggle",a),!0):!1};if(!d()){let g=requestAnimationFrame(d);fr(e,()=>cancelAnimationFrame(g))}e.addEventListener("click",i),fr(e,()=>{e.removeEventListener("click",i),s&&a&&s.removeEventListener("toggle",a)})}})}function Io(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function gr(t){t.directive("modal-close",{priority:10,init(e,r,o){Le();let n=()=>{let i,c;if(o){if(c=o,i=ne.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=e.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}ke(i,c)};e.addEventListener("click",n),Io(e,()=>{e.removeEventListener("click",n)})}})}function br(t,e={}){pr(t),mr(t),gr(t)}function hr(){dr()}var ue={openMenus:new Map};function vr(){ue.openMenus.clear()}function Ce(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-dropdown",""),e.textContent=t,document.head.appendChild(e)}var Bo=0;function Ho(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function yr(t,e,r){let o=r.getAttribute("dropdown-position")||"bottom",n=r.getAttribute("dropdown-align")||"start";t.style.top="",t.style.left="";let i=e.getBoundingClientRect(),c=t.getBoundingClientRect(),a=window.innerHeight,s=window.innerWidth,d,g;switch(o){case"top":d=i.top-c.height,g=i.left;break;case"left":d=i.top,g=i.left-c.width;break;case"right":d=i.top,g=i.right;break;default:d=i.bottom,g=i.left}o==="bottom"||o==="top"?n==="end"&&(g=i.right-c.width):n==="end"&&(d=i.bottom-c.height),o==="bottom"&&d+c.height>a&&i.top-c.height>0?d=i.top-c.height:o==="top"&&d<0&&i.bottom+c.height<=a&&(d=i.bottom),g<4&&(g=4),g+c.width>s-4&&(g=s-c.width-4),t.style.top=`${d}px`,t.style.left=`${g}px`}function Et(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function xt(t){let e=Et(t);e.length&&e[0].focus()}function xr(t){let e=Et(t);e.length&&e[e.length-1].focus()}function Er(t){t.directive("dropdown",{priority:15,init(r){Ce()}}),t.directive("dropdown-toggle",{priority:15,init(r){Ce();let o=r.closest("[dropdown]");if(!o)return;let n=o.querySelector("[dropdown-menu]");if(!n)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),n.classList.add("nojs-dropdown-menu"),n.setAttribute("role","menu"),n.setAttribute("popover","auto"),n.id||(n.id=`nojs-dd-menu-${Date.now()}-${Bo++}`),r.setAttribute("aria-controls",n.id);let i=!1,c=typeof n.showPopover=="function"&&typeof n.hidePopover=="function";function a(){if(n.setAttribute("data-open",""),c&&!i)try{n.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),yr(n,r,o),ue.openMenus.set(n,{toggle:r,wrapper:o})}function s(){if(c&&i){i=!1;try{n.hidePopover()}catch{}}n.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),ue.openMenus.delete(n)}function d(){return r.getAttribute("aria-expanded")==="true"}let g=m=>{m.newState==="closed"&&d()&&s()};n.addEventListener("toggle",g);let u=m=>{m.preventDefault(),m.stopPropagation(),d()?s():a()};r.addEventListener("click",u);let f=m=>{d()&&!o.contains(m.target)&&s()};document.addEventListener("click",f,!0);let l=m=>{m.key==="Escape"&&d()&&(s(),r.focus())};document.addEventListener("keydown",l);let p=m=>{switch(m.key){case"Enter":case" ":m.preventDefault(),a(),xt(n);break;case"ArrowDown":m.preventDefault(),a(),xt(n);break;case"ArrowUp":m.preventDefault(),a(),xr(n);break}};r.addEventListener("keydown",p);let y=m=>{if(!(!d()||Et(n).find(h=>h===document.activeElement)))switch(m.key){case"ArrowDown":m.preventDefault(),xt(n);break;case"ArrowUp":m.preventDefault(),xr(n);break}};n.addEventListener("keydown",y);let v=()=>{d()&&yr(n,r,o)};window.addEventListener("scroll",v,!0),window.addEventListener("resize",v),Ho(r,()=>{r.removeEventListener("click",u),r.removeEventListener("keydown",p),n.removeEventListener("keydown",y),n.removeEventListener("toggle",g),document.removeEventListener("click",f,!0),document.removeEventListener("keydown",l),window.removeEventListener("scroll",v,!0),window.removeEventListener("resize",v),ue.openMenus.delete(n)})}}),t.directive("dropdown-menu",{priority:15,init(r){Ce(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let e=r=>e.open(r);e.open=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},e.close=r=>{let o=document.getElementById(r);if(!o)return!1;let i=o.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},t.dropdown=e}function _r(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function $o(t){return[...t.querySelectorAll("[dropdown-item]")].filter(e=>!e.hasAttribute("disabled")&&e.getAttribute("aria-disabled")!=="true")}function _t(t,e){if(!t)return;if(typeof t.hidePopover=="function")try{t.hidePopover()}catch{}t.removeAttribute("data-open");let r=e&&e.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),ue.openMenus.has(t)&&ue.openMenus.delete(t)}function wr(t){t.directive("dropdown-item",{priority:15,init(e){Ce();let r=e.closest("[dropdown-menu]"),o=e.closest("[dropdown]");e.setAttribute("role","menuitem"),e.setAttribute("tabindex","-1"),e.classList.add("nojs-dropdown-item"),e.hasAttribute("disabled")&&e.setAttribute("aria-disabled","true");let n=c=>{if(!r)return;let a=$o(r),s=a.indexOf(e);switch(c.key){case"ArrowDown":{c.preventDefault(),(s+1<a.length?a[s+1]:a[0]).focus();break}case"ArrowUp":{c.preventDefault(),(s-1>=0?a[s-1]:a[a.length-1]).focus();break}case"Home":{c.preventDefault(),a.length&&a[0].focus();break}case"End":{c.preventDefault(),a.length&&a[a.length-1].focus();break}case"Enter":{c.preventDefault(),e.click();break}case"Escape":{if(c.preventDefault(),_t(r,o),o){let d=o.querySelector("[dropdown-toggle]");d&&d.focus()}break}case"Tab":{_t(r,o);break}}};e.addEventListener("keydown",n),_r(e,()=>e.removeEventListener("keydown",n));let i=()=>{if(_t(r,o),o){let c=o.querySelector("[dropdown-toggle]");c&&c.focus()}};e.addEventListener("click",i),_r(e,()=>e.removeEventListener("click",i))}})}function Ar(t,e={}){Er(t),wr(t)}function jr(){vr()}var oe=new Map,Se=new Set,Lr=0;function kr(){return++Lr}function Cr(){for(let t of Se)clearTimeout(t);Se.clear();for(let t of oe.values())t.remove();oe.clear(),Lr=0}function Sr(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-toast",""),e.textContent=t,document.head.appendChild(e)}function wt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var qo=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function At(){return oe.size>0?oe.values().next().value:Ro("top-right")}function Ro(t){if(oe.has(t))return oe.get(t);let e=document.createElement("div");return e.classList.add("nojs-toast-container"),e.setAttribute("data-position",t),e.setAttribute("role","log"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-relevant","additions"),document.body.appendChild(e),oe.set(t,e),e}function Fo(t){return t.startsWith("top")}function jt(t,e,r,o,n){let i=kr(),c=t.getAttribute("data-position")||"top-right",a=document.createElement("div");a.classList.add("nojs-toast"),a.setAttribute("data-toast-id",i),a.setAttribute("data-type",r),r==="error"&&a.setAttribute("aria-live","assertive");let s=document.createElement("span");if(s.textContent=e,a.appendChild(s),n){let d=document.createElement("button");d.type="button",d.classList.add("nojs-toast-dismiss"),d.setAttribute("aria-label","Dismiss"),d.textContent="\xD7",d.addEventListener("click",()=>Je(a)),a.appendChild(d)}if(Fo(c)&&t.firstChild?t.insertBefore(a,t.firstChild):t.appendChild(a),o>0){let d=setTimeout(()=>{Se.delete(d),a.isConnected&&Je(a)},o);Se.add(d),a._toastTimerId=d}return a}function Je(t){!t||!t.isConnected||(t._toastTimerId!=null&&(clearTimeout(t._toastTimerId),Se.delete(t._toastTimerId)),t.remove())}function Tr(t){Sr(),t.directive("toast-container",{priority:10,init(r,o,n){let i=n&&qo.has(n)?n:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),oe.set(i,r),wt(r,()=>{oe.get(i)===r&&oe.delete(i)})}}),t.directive("toast",{priority:10,init(r,o,n){if(!n)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),a=Number.isNaN(c)?3e3:c,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let p=()=>{let y=At();jt(y,n,i,a,s)};r.addEventListener("click",p),wt(r,()=>r.removeEventListener("click",p));return}let g=t.findContext(r);if(!g||typeof g.$watch!="function"){console.warn("[toast] reactive toast requires a parent [state] or [use] context \u2014 element will be inert");return}let u;function f(){let p=t.evaluate(n,g);if(p&&p!==u){let y=typeof p=="string"?p:String(p),v=At();jt(v,y,i,a,s),u=p}else u=p}let l=g.$watch(f);wt(r,l)}});let e=(r,o="info",n=3e3)=>{if(typeof document>"u")return;let i=!0,c=At();return jt(c,String(r),o,n,i)};e.dismiss=r=>{let o=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),n=document.querySelector(`[data-toast-id="${o}"]`);n&&Je(n)},e.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>Je(r))},t.toast=e,t.global("toast",e)}function Dr(t,e={}){Tr(t)}function Ir(){Cr()}var xe={containers:new Map};function Br(){xe.containers.clear()}function Hr(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tabs",""),e.textContent=t,document.head.appendChild(e)}function Mo(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var Po=0;function $r(t){return`${t}-${++Po}`}function Re(t,e,r=!1){let o=xe.containers.get(t);if(!o)return;let{tabs:n,panels:i}=o;if(!(e<0||e>=n.length)&&!(!r&&n[e].getAttribute("aria-disabled")==="true")){for(let c=0;c<n.length;c++)n[c].setAttribute("aria-selected","false"),n[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;n[e].setAttribute("aria-selected","true"),n[e].setAttribute("tabindex","0"),i[e].setAttribute("aria-hidden","false"),i[e].inert=!1,o.activeIndex=e}}function Fe(t,e,r){let o=t.length,n=e;for(let i=0;i<o;i++)if(n=(n+r+o)%o,t[n].getAttribute("aria-disabled")!=="true")return n;return t[e]&&t[e].getAttribute("aria-disabled")!=="true"?e:-1}function qr(t){t.directive("tabs",{priority:10,init(e,r,o){Hr();let n=[],i=[];for(let m of Array.from(e.children))m.hasAttribute("tab")?n.push(m):m.hasAttribute("panel")&&i.push(m);if(n.length===0){console.warn("[tabs] No child [tab] elements found.");return}n.length!==i.length&&console.warn("[tabs] Mismatch: "+n.length+" tabs but "+i.length+" panels.");let c=e.getAttribute("tab-position")||"top";e.setAttribute("data-position",c),e.classList.add("nojs-tabs");let a=document.createElement("div");a.setAttribute("role","tablist"),a.classList.add("nojs-tablist");let s=Math.min(n.length,i.length);for(let m=0;m<s;m++){let b=n[m],E=i[m],h=b.id||$r("nojs-tab"),_=E.id||$r("nojs-panel");b.id=h,E.id=_,b.setAttribute("role","tab"),b.setAttribute("aria-selected","false"),b.setAttribute("aria-controls",_),b.setAttribute("tabindex","-1"),b.classList.add("nojs-tab"),E.setAttribute("role","tabpanel"),E.setAttribute("aria-labelledby",h),E.setAttribute("tabindex","0"),E.setAttribute("aria-hidden","true"),E.inert=!0,E.classList.add("nojs-panel"),a.appendChild(b)}for(let m=s;m<i.length;m++){let b=i[m];b.setAttribute("role","tabpanel"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel")}let d=i[0];d?e.insertBefore(a,d):e.appendChild(a),xe.containers.set(e,{tabs:n.slice(0,s),panels:i.slice(0,s),activeIndex:-1});let g=t.findContext(e),u=[],f=(m,b)=>{let E=!1;try{E=!!t.evaluate(b,g)}catch{E=!1}E?m.setAttribute("aria-disabled","true"):m.removeAttribute("aria-disabled")};for(let m=0;m<s;m++){let b=n[m],E=b.getAttribute("tab-disabled");if(E&&(f(b,E),g&&typeof g.$watch=="function")){let h=g.$watch(()=>f(b,E));u.push(h)}}let l=0;if(o&&o.trim()!==""){let m=parseInt(o,10);!isNaN(m)&&m>=0&&m<s&&(l=m)}let p=n.slice(0,s);if(n[l]?.getAttribute("aria-disabled")==="true"){let m=Fe(p,l,1);m!==-1?(l=m,Re(e,l)):Re(e,l,!0)}else Re(e,l);let y=m=>{let b=xe.containers.get(e);if(!b)return;let E=m.target;if(E.getAttribute("role")!=="tab")return;let{tabs:h}=b,_=h.indexOf(E);if(_===-1)return;let A=-1;switch(m.key){case"ArrowRight":case"ArrowDown":A=Fe(h,_,1);break;case"ArrowLeft":case"ArrowUp":A=Fe(h,_,-1);break;case"Home":A=Fe(h,h.length-1,1);break;case"End":A=Fe(h,0,-1);break;case"Tab":return;default:return}A!==-1&&A!==_&&(m.preventDefault(),Re(e,A),h[A].focus())};a.addEventListener("keydown",y);let v=m=>{let b=m.target.closest("[role='tab']");if(!b)return;let E=xe.containers.get(e);if(!E)return;let h=E.tabs.indexOf(b);h!==-1&&b.getAttribute("aria-disabled")!=="true"&&(Re(e,h),b.focus())};a.addEventListener("click",v),Mo(e,()=>{a.removeEventListener("keydown",y),a.removeEventListener("click",v);for(let m of u)m&&m();u.length=0,xe.containers.delete(e)})}})}function Rr(t){t.directive("tab",{priority:11,init(){}}),t.directive("tab-disabled",{priority:11,init(){}}),t.directive("tab-position",{priority:11,init(){}})}function Fr(t){t.directive("panel",{priority:11,init(){}})}function Mr(t,e={}){qr(t),Rr(t),Fr(t)}function Pr(){Br()}var H={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function zr(){H.branches.clear(),H.selectedItem=null,H.typeahead="",H.typeaheadTimer&&(clearTimeout(H.typeaheadTimer),H.typeaheadTimer=null)}function Te(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-tree",""),e.textContent=t,document.head.appendChild(e)}function De(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Or(t){let e=[],r=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode(n){return n.matches&&n.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:n.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),o;for(;o=r.nextNode();)e.push(o);return e}function Vr(t){return t.closest('[role="tree"]')}function zo(t){let e=t.parentElement?.closest('[role="group"], .nojs-subtree');if(e){let r=e.parentElement?.closest('[role="treeitem"]');if(r)return r;let o=e.previousElementSibling;if(o?.matches?.('[role="treeitem"]'))return o}return t.parentElement?.closest('[role="treeitem"]')||null}function Oo(t){let e=t.cloneNode(!0);return e.querySelectorAll('[role="group"]').forEach(o=>o.remove()),(e.textContent||"").trim().toLowerCase()}function Lt(t){let e=H.selectedItem;e&&e!==t&&(e.classList.remove("nojs-branch-selected"),e.setAttribute("aria-selected","false")),t.classList.add("nojs-branch-selected"),t.setAttribute("aria-selected","true"),H.selectedItem=t}function Nr(t){let e=H.branches.get(t);!e||!e.subtreeEl||(e.expanded=!e.expanded,t.setAttribute("aria-expanded",String(e.expanded)),e.subtreeEl.setAttribute("aria-hidden",String(!e.expanded)))}function Vo(t){let e=H.branches.get(t);!e||!e.subtreeEl||e.expanded||(e.expanded=!0,t.setAttribute("aria-expanded","true"),e.subtreeEl.setAttribute("aria-hidden","false"))}function No(t){let e=H.branches.get(t);!e||!e.subtreeEl||!e.expanded||(e.expanded=!1,t.setAttribute("aria-expanded","false"),e.subtreeEl.setAttribute("aria-hidden","true"))}function Wr(t,e){let r=Vr(e);if(!r)return;let o=Or(r),n=o.indexOf(e);if(n<0)return;let i=H.branches.get(e),c=i&&i.subtreeEl;switch(t.key){case"ArrowRight":if(t.preventDefault(),c&&!i.expanded)Vo(e);else if(c&&i.expanded){let a=i.subtreeEl.querySelector('[role="treeitem"]');a&&Ee(a,o)}break;case"ArrowLeft":if(t.preventDefault(),c&&i.expanded)No(e);else{let a=zo(e);a&&Ee(a,Or(r))}break;case"ArrowDown":t.preventDefault(),n<o.length-1&&Ee(o[n+1],o);break;case"ArrowUp":t.preventDefault(),n>0&&Ee(o[n-1],o);break;case"Enter":case" ":t.preventDefault(),Lt(e),c&&Nr(e);break;case"Home":t.preventDefault(),o.length>0&&Ee(o[0],o);break;case"End":t.preventDefault(),o.length>0&&Ee(o[o.length-1],o);break;default:if(t.key.length===1&&!t.ctrlKey&&!t.altKey&&!t.metaKey){t.preventDefault(),H.typeahead+=t.key.toLowerCase(),H.typeaheadTimer&&clearTimeout(H.typeaheadTimer),H.typeaheadTimer=setTimeout(()=>{H.typeahead="",H.typeaheadTimer=null},500);let a=n+1;for(let s=0;s<o.length;s++){let d=(a+s)%o.length;if(Oo(o[d]).startsWith(H.typeahead)){Ee(o[d],o);break}}}break}}function Gr(t){t.directive("tree",{priority:15,init(e){Te(),e.classList.add("nojs-tree"),e.setAttribute("role","tree"),e.getAttribute("tree-icon")==="false"&&e.setAttribute("data-tree-icon","false")}})}function Ur(t){t.directive("branch",{priority:16,init(e,r,o){Te();let n=o==="expanded";e.classList.add("nojs-branch"),e.setAttribute("role","treeitem"),e.setAttribute("aria-expanded",String(n));let i=Vr(e);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');e.setAttribute("tabindex",d?"-1":"0")}else e.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let d=e.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(e.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?e.nextElementSibling:null);d?(H.branches.set(e,{expanded:n,subtreeEl:d}),d.setAttribute("aria-hidden",String(!n))):H.branches.set(e,{expanded:n,subtreeEl:null})});let a=d=>{d.target.closest?.('[role="treeitem"]')===e&&(d.stopPropagation(),Lt(e),Nr(e))};e.addEventListener("click",a),De(e,()=>e.removeEventListener("click",a));let s=d=>{Wr(d,e)};e.addEventListener("keydown",s),De(e,()=>e.removeEventListener("keydown",s)),De(e,()=>{c=!0,H.branches.delete(e),H.selectedItem===e&&(H.selectedItem=null),H.typeaheadTimer&&(clearTimeout(H.typeaheadTimer),H.typeaheadTimer=null,H.typeahead="")})}})}function Ee(t,e){for(let r of e)r.setAttribute("tabindex",r===t?"0":"-1");t.focus()}function Yr(t){t.directive("subtree",{priority:16,init(e){Te(),e.classList.add("nojs-subtree"),e.classList.add("nojs-tree"),e.setAttribute("role","group");for(let o of e.children)if(o.tagName==="LI"&&!o.querySelector("[branch], .nojs-branch")){o.setAttribute("role","treeitem"),o.setAttribute("tabindex","-1"),o.classList.add("nojs-tree-leaf");let n=c=>{c.stopPropagation(),Lt(o)};o.addEventListener("click",n),De(o,()=>o.removeEventListener("click",n));let i=c=>{Wr(c,o)};o.addEventListener("keydown",i),De(o,()=>o.removeEventListener("keydown",i)),De(o,()=>{H.selectedItem===o&&(H.selectedItem=null)})}let r=e.parentElement?.matches?.('[role="treeitem"]')?e.parentElement:e.previousElementSibling?.matches?.('[role="treeitem"]')?e.previousElementSibling:null;if(r){let o=H.branches.get(r);o?(e.setAttribute("aria-hidden",String(!o.expanded)),o.subtreeEl=e):e.setAttribute("aria-hidden","true")}else e.setAttribute("aria-hidden","true")}})}function Kr(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function kt(t){return t.closest('[role="treeitem"]')}function Wo(t){return t.closest('[role="tree"]')}function Go(t){let e=t.parentElement;return e?[...e.children].filter(r=>r.getAttribute("role")==="treeitem"):[]}function Uo(t){return Go(t).indexOf(t)}function Yo(t,e,r){let o=t.getBoundingClientRect(),n=e-o.top,i=o.height;return r==="reparent"?"on":r==="reorder"?n<i/2?"before":"after":n<i*.25?"before":n>i*.75?"after":"on"}function Xr(t,e){let r=t.parentElement;for(;r;){if(r===e)return!0;r=r.parentElement}return!1}var D={dragging:null,indicator:null,currentTarget:null,currentPosition:null};function Ie(){D.indicator&&(D.indicator.remove(),D.indicator=null)}function Me(t){if(!t)return;let e=t.querySelectorAll(".nojs-tree-drag-over");for(let r of e)r.classList.remove("nojs-tree-drag-over")}function Ko(){let t=document.createElement("div");return t.className="nojs-tree-drag-indicator",t.setAttribute("aria-hidden","true"),t}function Xo(t,e){Ie();let r=Ko(),o=t.getBoundingClientRect(),n=Wo(t);if(!n)return;let i=n.getBoundingClientRect();r.style.position="absolute",r.style.left=o.left-i.left+"px",r.style.width=o.width+"px",e==="before"?r.style.top=o.top-i.top-1+"px":r.style.top=o.bottom-i.top-1+"px",getComputedStyle(n).position==="static"&&(n.style.position="relative"),n.appendChild(r),D.indicator=r}function Zr(t){t.directive("tree-drag-mode",{priority:15,init(e,r,o){if(Te(),o!=="reparent"&&o!=="reorder"&&o!=="both")return;let n=0,i=f=>{let l=kt(f.target);if(l&&e.contains(l)){if(l.hasAttribute("tree-drag-disabled")){f.preventDefault();return}D.dragging={el:l,treeRoot:e},f.dataTransfer&&(f.dataTransfer.effectAllowed="move",f.dataTransfer.setData("text/plain","")),l.classList.add("nojs-dragging"),l.dispatchEvent(new CustomEvent("tree:drag-start",{bubbles:!0,detail:{node:l}}))}},c=f=>{if(!D.dragging||D.dragging.treeRoot!==e)return;let l=kt(f.target);if(!l||!e.contains(l)||l===D.dragging.el||Xr(l,D.dragging.el))return;f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move");let p=Yo(l,f.clientY,o);(D.currentTarget!==l||D.currentPosition!==p)&&(Me(e),Ie(),D.currentTarget=l,D.currentPosition=p,p==="on"?l.classList.add("nojs-tree-drag-over"):Xo(l,p))},a=f=>{D.dragging&&D.dragging.treeRoot===e&&n++},s=f=>{D.dragging&&(n--,n<=0&&(n=0,Me(e),Ie(),D.currentTarget=null,D.currentPosition=null))},d=f=>{if(f.preventDefault(),f.stopPropagation(),n=0,!D.dragging||D.dragging.treeRoot!==e)return;let l=D.dragging.el,p=D.currentTarget,y=D.currentPosition;if(Me(e),Ie(),!p||!y){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(p===l||Xr(p,l)){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(y==="on"){let v=p.querySelector(':scope > [role="group"]');v||(v=p.nextElementSibling?.matches?.('[role="group"]')?p.nextElementSibling:null),v?v.setAttribute("aria-hidden","false"):(v=document.createElement("ul"),v.setAttribute("role","group"),v.setAttribute("subtree",""),v.classList.add("nojs-subtree","nojs-tree"),v.setAttribute("aria-hidden","false"),p.appendChild(v));let m=H.branches.get(p);m&&(m.expanded=!0,m.subtreeEl=v,p.setAttribute("aria-expanded","true")),v.appendChild(l),e.dispatchEvent(new CustomEvent("tree:reparent",{bubbles:!0,detail:{node:l,newParent:p}}))}else{let v=p.parentElement;if(!v){D.dragging=null,D.currentTarget=null,D.currentPosition=null;return}if(y==="before")v.insertBefore(l,p);else{let b=p.nextElementSibling,E=b?.matches?.('[role="group"]')?b.nextElementSibling:b;E?v.insertBefore(l,E):v.appendChild(l)}let m=Uo(l);e.dispatchEvent(new CustomEvent("tree:reorder",{bubbles:!0,detail:{node:l,newIndex:m}}))}D.dragging=null,D.currentTarget=null,D.currentPosition=null},g=f=>{let l=kt(f.target);l&&l.classList.remove("nojs-dragging"),Me(e),Ie(),n=0,D.dragging&&D.dragging.el.dispatchEvent(new CustomEvent("tree:drag-end",{bubbles:!0,detail:{node:D.dragging.el}})),D.dragging=null,D.currentTarget=null,D.currentPosition=null};e.addEventListener("dragstart",i),e.addEventListener("dragover",c),e.addEventListener("dragenter",a),e.addEventListener("dragleave",s),e.addEventListener("drop",d),e.addEventListener("dragend",g),Kr(e,()=>{e.removeEventListener("dragstart",i),e.removeEventListener("dragover",c),e.removeEventListener("dragenter",a),e.removeEventListener("dragleave",s),e.removeEventListener("drop",d),e.removeEventListener("dragend",g),Me(e),Ie()}),Zo(e);let u=new MutationObserver(f=>{for(let l of f)for(let p of l.addedNodes){if(p.nodeType!==1)continue;p.getAttribute("role")==="treeitem"&&Ct(p);let y=p.querySelectorAll?.('[role="treeitem"]');if(y)for(let v of y)Ct(v)}});u.observe(e,{childList:!0,subtree:!0}),Kr(e,()=>u.disconnect())}})}function Ct(t){if(t.hasAttribute("tree-drag-disabled")){t.draggable=!1;return}t.draggable=!0}function Zo(t){let e=t.querySelectorAll('[role="treeitem"]');for(let r of e)Ct(r)}function Qr(t,e={}){Gr(t),Ur(t),Yr(t),Zr(t)}function Jr(){zr()}var et=new Map;function en(){et.clear()}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-stepper",""),e.textContent=t,document.head.appendChild(e)}function tn(t,e){if(!t.hasAttribute("stepper-validate"))return!0;let r=t.querySelector("form[validate]");if(!r)return!0;let n=e(r)?.$form;return n?!!n.valid:!0}function rn(t){let e=t.querySelectorAll("input, textarea, select");for(let r of e)r.dispatchEvent(new Event("focusout",{bubbles:!0}))}function nn(t,e,r){t.dispatchEvent(new CustomEvent("stepper:validation-blocked",{bubbles:!0,detail:{step:e,form:r}}))}function Pe(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function on(t){t.directive("stepper",{priority:14,init(e,r,o){tt();let n=t.findContext(e),i=Array.from(e.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=o&&parseInt(o,10)||0,a=e.getAttribute("stepper-mode")||"linear",s=e.getAttribute("stepper-indicator")!=="false",d=e.getAttribute("stepper-nav")!=="false",g=e.getAttribute("aria-label")||"Stepper",u=Math.max(0,Math.min(c,i.length-1));e.setAttribute("role","group"),e.setAttribute("aria-label",g),e.classList.add("nojs-stepper");let f=null,l=[];if(s){f=document.createElement("div"),f.className="nojs-stepper-indicator",f.setAttribute("role","tablist"),f.setAttribute("aria-label","Progress"),i.forEach((L,S)=>{if(S>0){let P=document.createElement("div");P.className="nojs-stepper-separator",P.setAttribute("aria-hidden","true"),f.appendChild(P)}let w=document.createElement("button");w.type="button",w.className="nojs-stepper-indicator-item",w.setAttribute("role","tab"),w.setAttribute("aria-selected",S===u?"true":"false");let $=L.getAttribute("step-label")||`Step ${S+1}`,O=document.createElement("span");O.textContent=$,w.appendChild(O),w.setAttribute("aria-label",$);let K=`nojs-stepper-tab-${Qo++}`;if(w.id=K,a==="free"){w.setAttribute("data-clickable","");let P=()=>_(S);w.addEventListener("click",P),Pe(e,()=>w.removeEventListener("click",P))}else w.setAttribute("tabindex","-1");f.appendChild(w),l.push(w)});let k=L=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(L.key))return;L.preventDefault();let S=u;L.key==="ArrowRight"?S=Math.min(u+1,i.length-1):L.key==="ArrowLeft"?S=Math.max(u-1,0):L.key==="Home"?S=0:L.key==="End"&&(S=i.length-1),a==="free"?(_(S),l[S]?.focus()):l[u]?.focus()};f.addEventListener("keydown",k),Pe(e,()=>f.removeEventListener("keydown",k)),e.insertBefore(f,e.firstChild)}let p=null,y=null,v=null;if(d){p=document.createElement("div"),p.className="nojs-stepper-nav",p.setAttribute("aria-hidden","true"),y=document.createElement("button"),y.type="button",y.className="nojs-stepper-prev",y.textContent="Previous";let k=()=>h();y.addEventListener("click",k),Pe(e,()=>y.removeEventListener("click",k)),v=document.createElement("button"),v.type="button",v.className="nojs-stepper-next",v.textContent="Next";let L=()=>E();v.addEventListener("click",L),Pe(e,()=>v.removeEventListener("click",L)),p.appendChild(y),p.appendChild(v),e.appendChild(p)}function m(k){let L=i[k];if(!L)return!0;if(!tn(L,t.findContext)){let $=L.querySelector("form[validate]");return $&&(rn($),l[k]&&l[k].classList.add("nojs-step-invalid"),nn(e,L,$)),!1}l[k]&&l[k].classList.remove("nojs-step-invalid");let S=L.querySelectorAll("[required]");for(let $ of S)if(typeof $.checkValidity=="function"&&!$.checkValidity())return $.reportValidity(),!1;let w=L.getAttribute("step-validate");if(w)try{if(!t.evaluate(w,n))return!1}catch($){return console.warn(`[stepper] step-validate error: ${$.message}`),!1}return!0}function b(k){if(i.forEach((L,S)=>{let w=S===u;L.setAttribute("aria-hidden",w?"false":"true"),w?(L.removeAttribute("inert"),L.setAttribute("aria-current","step")):(L.setAttribute("inert",""),L.removeAttribute("aria-current"))}),l.length&&l.forEach((L,S)=>{L.setAttribute("aria-selected",S===u?"true":"false"),S<u?L.setAttribute("data-completed",""):L.removeAttribute("data-completed"),L.setAttribute("tabindex",S===u?"0":"-1");let w=i[S];w.id&&(L.setAttribute("aria-controls",w.id),w.setAttribute("aria-labelledby",L.id))}),y&&(y.disabled=u===0),v&&(v.textContent=u===i.length-1?"Finish":"Next"),!k){let L=i[u];L&&requestAnimationFrame(()=>L.focus())}e.dispatchEvent(new CustomEvent("nojs:stepper-change",{bubbles:!k,detail:{current:u,total:i.length}}))}function E(){return u>=i.length-1?(a==="linear"&&!m(u)||e.dispatchEvent(new CustomEvent("nojs:stepper-complete",{bubbles:!0,detail:{current:u,total:i.length}})),!1):a==="linear"&&!m(u)?!1:(u++,b(),j(),!0)}function h(){return u<=0?!1:(u--,b(),j(),!0)}function _(k){if(k<0||k>=i.length||k===u)return!1;if(a==="linear"&&k>u){for(let L=u;L<k;L++)if(u=L,b(),!m(L))return j(),!1}return u=k,b(),j(),!0}let A={get current(){return u},get total(){return i.length},next:E,prev:h,goTo:_,get isFirst(){return u===0},get isLast(){return u===i.length-1}};function j(){n.$stepper=A}j(),et.set(e,{get current(){return u},steps:i,mode:a,indicatorEl:f,navEl:p}),b(!0),Pe(e,()=>{et.delete(e),f&&f.parentNode&&f.remove(),p&&p.parentNode&&p.remove(),delete n.$stepper})}})}var Qo=0;var Jo=0;function sn(t){t.directive("step",{priority:13,init(e,r,o){tt(),e.classList.add("nojs-step"),e.setAttribute("role","tabpanel"),e.id||(e.id=`nojs-stepper-panel-${Jo++}`),e.setAttribute("tabindex","0")}})}function an(t,e={}){sn(t),on(t)}function cn(){en()}function dn(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-skeleton",""),e.textContent=t,document.head.appendChild(e)}function ln(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function un(t){t.directive("skeleton",{priority:10,init(e,r,o){dn();let n=t.findContext(e),i=e.getAttribute("skeleton-type")||"text",c=e.getAttribute("skeleton-lines"),a=e.getAttribute("skeleton-size"),s=[];function d(m){g();for(let b=0;b<m;b++){let E=document.createElement("div");E.className="nojs-skeleton-line",e.appendChild(E),s.push(E)}}function g(){for(let m of s)m.parentNode===e&&e.removeChild(m);s=[]}function u(){if(e.classList.add("nojs-skeleton"),i==="circle"&&e.classList.add("nojs-skeleton-circle"),a&&(i==="circle"||i==="rect")){let m=a+(String(a).match(/\d$/)?"px":"");e.style.width=m,e.style.height=m}if(c){let m=parseInt(c,10);m>0&&d(m)}e.setAttribute("aria-busy","true")}let f=null;function l(){f&&f(),e.classList.add("nojs-skeleton-fade"),e.classList.remove("nojs-skeleton"),e.classList.remove("nojs-skeleton-circle"),g(),a&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""),e.removeAttribute("aria-busy");let m=!1,b=null,E=()=>{m||(m=!0,e.isConnected&&e.classList.remove("nojs-skeleton-fade"),e.removeEventListener("transitionend",E),b!==null&&clearTimeout(b),f=null)};e.addEventListener("transitionend",E),b=setTimeout(E,0),f=()=>{e.removeEventListener("transitionend",E),b!==null&&clearTimeout(b),m=!0,f=null}}let p=!1;function y(){let m=!!t.evaluate(o,n);m&&!p?(p=!0,u()):!m&&p&&(p=!1,l())}y();let v=n.$watch(y);ln(e,v),ln(e,()=>{f&&f(),p&&(e.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),e.removeAttribute("aria-busy"),g(),a&&(i==="circle"||i==="rect")&&(e.style.width="",e.style.height=""))})}})}function pn(t,e={}){un(t)}var _e=new Map,G=new Map,C={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function fn(){_e.clear(),G.clear(),C.active=!1,C.splitEl=null,C.gutterEl=null,C.prevPane=null,C.nextPane=null,C.direction=null,C.startPos=0,C.startPrevSize=0,C.startNextSize=0,C.containerSize=0}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-split",""),e.textContent=t,document.head.appendChild(e)}function ei(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function mn(t){return t==="horizontal"?"clientX":"clientY"}function Z(t,e){let r=t.getBoundingClientRect?t.getBoundingClientRect():null,o=r&&(e==="horizontal"?r.width:r.height);return o||(e==="horizontal"?t.offsetWidth:t.offsetHeight)}function gn(t,e){if(e!=="horizontal")return 1;try{return(t.closest&&t.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(t).direction:""))==="rtl"?-1:1}catch{return 1}}function ti(t,e){let o=(_e.get(t)?.gutters||[]).reduce((n,i)=>n+Z(i,e),0);return Z(t,e)-o}function ri(t,e){if(!t)return null;let r=parseFloat(t);return Number.isNaN(r)?null:typeof t=="string"&&t.trim().endsWith("%")?r/100*e:r}function ze(t,e){let r=G.get(e);return r?r.min!=null&&t<r.min?r.min:r.max!=null&&t>r.max?r.max:t:t}function nt(t,e,r,o){let n=Z(e,o),i=Z(r,o),c=G.get(e),a=G.get(r);t.setAttribute("aria-valuenow",Math.round(n)),t.setAttribute("aria-valuemin",c?.min||0),t.setAttribute("aria-valuemax",Math.round(n+i-(a?.min||0)))}function St(t){let e=t.getAttribute("split-persist");if(!e)return;let r=_e.get(t);if(!r)return;let o=r.panes.map(n=>n.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${e}`,JSON.stringify(o))}catch{}}function ni(t){let e=t.getAttribute("split-persist");if(!e)return!1;try{let r=localStorage.getItem(`nojs-split:${e}`);if(!r)return!1;let o=JSON.parse(r),n=_e.get(t);return!n||o.length!==n.panes.length?!1:(o.forEach((i,c)=>{i&&(n.panes[c].style.flexBasis=i,n.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function oi(t,e,r,o,n){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",e==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),n!==6&&i.style.setProperty("--nojs-gutter-size",`${n}px`);let c=l=>{if(l.button!==0)return;l.preventDefault();let p=ti(t,e);C.active=!0,C.splitEl=t,C.gutterEl=i,C.prevPane=r,C.nextPane=o,C.direction=e,C.startPos=l[mn(e)],C.startPrevSize=Z(r,e),C.startNextSize=Z(o,e),C.containerSize=p,C.sign=gn(t,e),document.body.style.cursor=e==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(l.pointerId)},a=l=>{if(!C.active||C.gutterEl!==i)return;let p=(l[mn(C.direction)]-C.startPos)*(C.sign||1),y=ze(C.startPrevSize+p,C.prevPane),v=ze(C.startNextSize-p,C.nextPane),m=C.startPrevSize+C.startNextSize;y+v!==m&&(y!==C.startPrevSize+p?v=m-y:y=m-v),C.prevPane.style.flexBasis=`${y}px`,C.prevPane.style.flexGrow="0",C.nextPane.style.flexBasis=`${v}px`,C.nextPane.style.flexGrow="0",nt(i,C.prevPane,C.nextPane,C.direction)},s=()=>{!C.active||C.gutterEl!==i||(C.active=!1,document.body.style.cursor="",document.body.style.userSelect="",St(t),t.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:o}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",a),i.addEventListener("pointerup",s),i.addEventListener("pointercancel",s);let d=10,g=l=>{let p=e==="horizontal",y=gn(t,e),v=0;if(p&&l.key==="ArrowRight"||!p&&l.key==="ArrowDown")v=d*y;else if(p&&l.key==="ArrowLeft"||!p&&l.key==="ArrowUp")v=-d*y;else if(l.key==="Home")v=(G.get(r)?.min||0)-Z(r,e);else if(l.key==="End"){let A=G.get(o);v=Z(r,e)+Z(o,e)-(A?.min||0)-Z(r,e)}else return;l.preventDefault();let m=Z(r,e),b=Z(o,e),E=m+b,h=ze(m+v,r),_=ze(E-h,o);h=E-_,h=ze(h,r),_=E-h,r.style.flexBasis=`${h}px`,r.style.flexGrow="0",o.style.flexBasis=`${_}px`,o.style.flexGrow="0",nt(i,r,o,e),St(t)};i.addEventListener("keydown",g);let u=()=>{let l=G.get(r),p=G.get(o),y=l?.collapsible?r:p?.collapsible?o:null;if(!y)return;let v=G.get(y);if(!v)return;let m=y===r?o:r,b=Z(r,e)+Z(o,e);if(v.collapsed){v.collapsed=!1,y.removeAttribute("data-collapsed");let E=v.preCollapseSize||`${Math.round(b/2)}px`,h=ri(E,b)??b/2,_=Math.min(h,b);y.style.flexBasis=`${_}px`,y.style.flexGrow="0",m.style.flexBasis=`${b-_}px`,m.style.flexGrow="0"}else v.preCollapseSize=y.style.flexBasis||`${Z(y,e)}px`,v.collapsed=!0,y.setAttribute("data-collapsed","true"),y.style.flexBasis="0px",y.style.flexGrow="0",m.style.flexBasis=`${b}px`,m.style.flexGrow="0";nt(i,r,o,e),St(t),t.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:y,collapsed:v.collapsed}}))};return i.addEventListener("dblclick",u),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",a),i.removeEventListener("pointerup",s),i.removeEventListener("pointercancel",s),i.removeEventListener("keydown",g),i.removeEventListener("dblclick",u)}}}function bn(t){t.directive("split",{priority:14,init(e,r,o){rt();let n=(o||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(e.getAttribute("split-gutter"),10)||6;e.classList.add("nojs-split"),e.setAttribute("data-direction",n);let c=Array.from(e.children).filter(g=>g.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(g=>{G.get(g)||G.set(g,{size:g.getAttribute("pane")||null,min:parseInt(g.getAttribute("pane-min"),10)||0,max:parseInt(g.getAttribute("pane-max"),10)||1/0,collapsible:g.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let a=[],s=[];for(let g=0;g<c.length-1;g++){let{gutter:u,cleanup:f}=oi(e,n,c[g],c[g+1],i);c[g].after(u),a.push(u),s.push(f)}_e.set(e,{direction:n,gutterSize:i,panes:c,gutters:a}),ni(e)||c.forEach(g=>{let f=G.get(g)?.size;f?(g.style.flexBasis=f,g.style.flexGrow="0"):(g.style.flexGrow="1",g.style.flexBasis="0")}),requestAnimationFrame(()=>{a.forEach((g,u)=>{nt(g,c[u],c[u+1],n)})}),ei(e,()=>{s.forEach(g=>g()),a.forEach(g=>g.remove()),_e.delete(e),c.forEach(g=>G.delete(g)),e.classList.remove("nojs-split"),e.removeAttribute("data-direction")})}})}function ii(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function hn(t){t.directive("pane",{priority:15,init(e,r,o){rt(),e.classList.add("nojs-pane"),G.has(e)||G.set(e,{size:o||null,min:parseInt(e.getAttribute("pane-min"),10)||0,max:parseInt(e.getAttribute("pane-max"),10)||1/0,collapsible:e.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let n=G.get(e),i=e.closest("[data-direction='vertical']")?"height":"width";n.min&&(e.style[`min${i==="width"?"Width":"Height"}`]=`${n.min}px`),n.max&&n.max!==1/0&&(e.style[`max${i==="width"?"Width":"Height"}`]=`${n.max}px`),ii(e,()=>{e.classList.remove("nojs-pane"),G.delete(e),e.style.removeProperty("min-width"),e.style.removeProperty("min-height"),e.style.removeProperty("max-width"),e.style.removeProperty("max-height"),e.style.removeProperty("flex-basis"),e.style.removeProperty("flex-grow")})}})}function vn(t,e={}){bn(t),hn(t)}function yn(){fn()}var pe={sorts:new Map};function xn(){pe.sorts.clear()}function we(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-table",""),e.textContent=t,document.head.appendChild(e)}function si(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ai(t,e){let r=t.querySelector("tbody");if(!r)return null;let o=r.querySelector(":scope > [each]")||r.querySelector(":scope > [foreach]")||r.querySelector(":scope > [for]");if(!o)return null;let n=o.getAttribute("each")||o.getAttribute("foreach")||o.getAttribute("for");if(!n)return null;let i=n.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function ci(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function En(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function _n(t,e){let r=Number.isNaN(t),o=Number.isNaN(e);return r&&o?0:r?1:o||t<e?-1:t>e?1:0}function An(t,e,r){if(t==null&&e==null)return 0;if(t==null)return-1;if(e==null)return 1;switch(r){case"number":return _n(Number(t),Number(e));case"date":return _n(new Date(t).getTime(),new Date(e).getTime());default:return String(t).localeCompare(String(e))}}function di(t){let e=t.querySelectorAll("th[data-sortable]");for(let r of e)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function jn(t){t.directive("sortable",{priority:10,init(e){we(),e.classList.add("nojs-sortable")}})}function Ln(t){t.directive("sort",{priority:11,init(e,r,o){we();let n=o;if(!n)return;let i=e.getAttribute("sort-type")||"string",c=e.getAttribute("sort-default");e.setAttribute("data-sortable",""),e.setAttribute("aria-sort","none");let a=e.closest("table");if(!a)return;pe.sorts.has(a)||pe.sorts.set(a,{column:null,direction:null}),(c==="asc"||c==="desc")&&(pe.sorts.get(a).column||wn(e,a,n,i,c,t));let s=()=>{let d=pe.sorts.get(a),g;d.column!==n?g="asc":d.direction==="asc"?g="desc":d.direction==="desc"?g=null:g="asc",wn(e,a,n,i,g,t)};e.addEventListener("click",s),si(e,()=>{e.removeEventListener("click",s),a&&!a.isConnected&&(pe.sorts.delete(a),delete a._nojsOriginalOrder,delete a._nojsOriginalRows)})}})}function wn(t,e,r,o,n,i){let c=pe.sorts.get(e);di(e),n?(t.setAttribute("data-sort-dir",n),t.setAttribute("aria-sort",n==="asc"?"ascending":"descending"),c.column=r,c.direction=n):(c.column=null,c.direction=null);let a=ai(e,i);if(a){let s=i.findContext(e),d=s?ci(s,a.arrayPath):null;if(Array.isArray(d)){if(!n){let u=e._nojsOriginalOrder;if(u){let f=new Set(d),l=u.filter(p=>f.has(p));for(let p of d)u.includes(p)||l.push(p);En(s,a.arrayPath,l)}return}e._nojsOriginalOrder||(e._nojsOriginalOrder=[...d]);let g=[...d].sort((u,f)=>{let l=u!=null?u[r]:null,p=f!=null?f[r]:null,y=An(l,p,o);return n==="desc"?-y:y});En(s,a.arrayPath,g);return}}li(e,t,r,o,n)}function li(t,e,r,o,n){let i=t.querySelector("tbody");if(!i)return;let s=[...e.closest("tr").children].indexOf(e);if(s<0)return;let d=[...i.querySelectorAll(":scope > tr")];if(t._nojsOriginalRows||(t._nojsOriginalRows=[...d]),!n){let f=document.createDocumentFragment();for(let l of t._nojsOriginalRows)f.appendChild(l);i.appendChild(f);return}let g=f=>{let l=f.replace(/[^0-9.\-]/g,"");return l===""||l==="-"?NaN:parseFloat(l)};d.sort((f,l)=>{let p=f.children[s]?.textContent?.trim()||"",y=l.children[s]?.textContent?.trim()||"",v=An(o==="number"?g(p):p,o==="number"?g(y):y,o);return n==="desc"?-v:v});let u=document.createDocumentFragment();for(let f of d)u.appendChild(f);i.appendChild(u)}function kn(t){t.directive("fixed-header",{priority:10,init(e){we(),e.classList.add("nojs-fixed-header")}})}function Cn(t){t.directive("fixed-col",{priority:10,init(e){we(),e.classList.add("nojs-fixed-col")}})}function Tt(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Sn(t){let e=t.querySelector("tbody");if(!e)return null;let r=e.querySelector(":scope > [each]")||e.querySelector(":scope > [foreach]")||e.querySelector(":scope > [for]");if(!r)return null;let o=r.getAttribute("each")||r.getAttribute("foreach")||r.getAttribute("for");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim(),eachEl:r}:null}function Tn(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Dn(t,e,r){let o=e.split("."),n=t;for(let i=0;i<o.length-1;i++){if(n[o[i]]==null)return;n=n[o[i]]}n[o[o.length-1]]=r}function In(t){t.directive("table-reorder",{priority:15,init(e){if(we(),e.tagName!=="TABLE")return;let r=e.querySelector("tbody");if(!r)return;let o=t.findContext(e),n=e.getAttribute("table-reorder-handle"),i=e.getAttribute("table-reorder-drag-class")||"nojs-row-dragging",c=e.getAttribute("table-reorder-over-class")||"nojs-row-drag-over",a=null,s=null,d=null;function g(){let v=r.querySelectorAll(":scope > tr");for(let m=0;m<v.length;m++){let b=v[m];if(b._nojsReorderSetup)continue;b._nojsReorderSetup=!0,b.draggable=!0,b.setAttribute("aria-grabbed","false");let E=!0;if(n){let L=S=>{E=!!S.target.closest(n)};b.addEventListener("mousedown",L),Tt(b,()=>b.removeEventListener("mousedown",L))}let h=L=>{if(n&&!E){L.preventDefault();return}a=[...r.querySelectorAll(":scope > tr")].indexOf(b),s=b,L.dataTransfer&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain","")),i.split(/\s+/).filter(Boolean).forEach(w=>b.classList.add(w)),b.setAttribute("aria-grabbed","true")},_=L=>{if(s==null)return;L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let S=b.getBoundingClientRect(),w=S.top+S.height/2,O=[...r.querySelectorAll(":scope > tr")].indexOf(b);u(),O!==a&&(L.clientY<w?b.classList.add("nojs-reorder-insert-before"):b.classList.add("nojs-reorder-insert-after"),d=b)},A=()=>{b.classList.remove("nojs-reorder-insert-before"),b.classList.remove("nojs-reorder-insert-after"),d===b&&(d=null)},j=L=>{if(L.preventDefault(),L.stopPropagation(),s==null||a==null)return;let S=[...r.querySelectorAll(":scope > tr")],w=b.getBoundingClientRect(),$=w.top+w.height/2,O=S.indexOf(b);L.clientY>=$&&O++;let K=a;if(K===O||K+1===O){f();return}let P=K<O?O-1:O,ie=Sn(e);if(ie&&o){let T=Tn(o,ie.arrayPath);if(Array.isArray(T)){let R=[...T],[F]=R.splice(K,1);R.splice(P,0,F),Dn(o,ie.arrayPath,R),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...R]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:K,to:P,item:F}}))}}else{let T=s,R=S[P];T&&R&&(K<P?r.insertBefore(T,R.nextSibling):r.insertBefore(T,R),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:K,to:P,item:null}})))}f()},k=()=>{f()};b.addEventListener("dragstart",h),b.addEventListener("dragover",_),b.addEventListener("dragleave",A),b.addEventListener("drop",j),b.addEventListener("dragend",k),Tt(b,()=>{b.removeEventListener("dragstart",h),b.removeEventListener("dragover",_),b.removeEventListener("dragleave",A),b.removeEventListener("drop",j),b.removeEventListener("dragend",k),b._nojsReorderSetup=!1})}}function u(){d&&(d.classList.remove("nojs-reorder-insert-before"),d.classList.remove("nojs-reorder-insert-after"),d=null)}function f(){s&&(i.split(/\s+/).filter(Boolean).forEach(m=>s.classList.remove(m)),s.setAttribute("aria-grabbed","false")),u(),a=null,s=null;let v=r.querySelectorAll(":scope > tr");for(let m of v)m.classList.remove("nojs-reorder-insert-before"),m.classList.remove("nojs-reorder-insert-after"),c.split(/\s+/).filter(Boolean).forEach(b=>m.classList.remove(b))}let l=v=>{s!=null&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"))},p=v=>{if(s==null||v.target!==r)return;v.preventDefault(),v.stopPropagation();let m=a,E=[...r.querySelectorAll(":scope > tr")].length-1;if(m===E){f();return}let h=Sn(e);if(h&&o){let _=Tn(o,h.arrayPath);if(Array.isArray(_)){let A=[..._],[j]=A.splice(m,1);A.push(j),Dn(o,h.arrayPath,A),e._nojsOriginalOrder&&(e._nojsOriginalOrder=[...A]),e.dispatchEvent(new CustomEvent("table:reorder",{bubbles:!0,detail:{from:m,to:A.length-1,item:j}}))}}f()};r.addEventListener("dragover",l),r.addEventListener("drop",p);let y=new MutationObserver(()=>{g()});y.observe(r,{childList:!0}),g(),Tt(e,()=>{y.disconnect(),r.removeEventListener("dragover",l),r.removeEventListener("drop",p),f()})}})}function Bn(t,e={}){jn(t),Ln(t),kn(t),Cn(t),In(t)}function Hn(){xn()}var fe={containers:new Map};function $n(){for(let[,t]of fe.containers)typeof t.unsub=="function"&&t.unsub();fe.containers.clear()}function qn(){if(typeof document>"u"||document.querySelector("style[data-nojs-breadcrumb]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-breadcrumb",""),e.textContent=t,document.head.appendChild(e)}function Rn(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function ui(t){let e=t.getAttribute("breadcrumb");if(e&&e.trim()!=="")return e.trim();let r=t.getAttribute("title");return r&&r.trim()!==""?r.trim():(t.textContent||"").trim()}function pi(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}function Fn(t,e){let r=t.querySelector("ol.nojs-breadcrumb");r&&r.remove();let o=document.createElement("ol");o.classList.add("nojs-breadcrumb");for(let i=0;i<e.length;i++){let c=e[i],a=document.createElement("li");if(i===e.length-1){let d=document.createElement("span");d.setAttribute("aria-current","page"),d.textContent=c.label,a.appendChild(d)}else{let d=document.createElement("a");d.href=c.href,d.textContent=c.label,a.appendChild(d)}o.appendChild(a)}t.appendChild(o);let n=fe.containers.get(t);n&&(n.crumbs=e)}function fi(t){let e=[],r=Array.from(t.children);for(let o of r){if(o.tagName==="OL"&&o.classList.contains("nojs-breadcrumb"))continue;let n=ui(o);if(!n)continue;let i=o.getAttribute("href")||"#";e.push({label:n,href:i})}return e}function mi(t){if(!t||t==="/")return[{label:"Home",href:"/",isLast:!0}];let r=(t.replace(/\/+$/,"")||"/").split("/").filter(Boolean),o=[{label:"Home",href:"/"}],n="";for(let i=0;i<r.length;i++){n+="/"+r[i];let c=pi(r[i].replace(/[-_]/g," "));o.push({label:c,href:n})}return o}function Mn(t){t.directive("breadcrumb",{priority:15,init(e,r,o){qn(),e.tagName==="NAV"&&!e.getAttribute("aria-label")&&e.setAttribute("aria-label","Breadcrumb");let n=Array.from(e.children).some(a=>!(a.tagName==="OL"&&a.classList.contains("nojs-breadcrumb"))),i=t.router,c=!n&&i;if(fe.containers.set(e,{unsub:null,crumbs:[]}),c){let a=()=>{let s=i.current,d=s?s.path:"/",g=mi(d);Fn(e,g)};if(a(),typeof i.on=="function"){let s=i.on(a),d=fe.containers.get(e);d&&(d.unsub=s),Rn(e,()=>{typeof s=="function"&&s();let g=fe.containers.get(e);g&&(g.unsub=null)})}}else{let a=fi(e);for(let s of Array.from(e.children))s.tagName==="OL"&&s.classList.contains("nojs-breadcrumb")||(s.style.display="none");Fn(e,a)}Rn(e,()=>{fe.containers.delete(e)})}})}function Pn(t,e={}){Mn(t)}function zn(){$n()}var ot={containers:new Map};function On(){ot.containers.clear()}function Vn(){if(typeof document>"u"||document.querySelector("style[data-nojs-accordion]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-accordion",""),e.textContent=t,document.head.appendChild(e)}function gi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}var it=null;function bi(){return it!==null||(it=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("interpolate-size","allow-keywords")),it}function Nn(t){let e=t.querySelector(":scope > summary");if(!e)return null;let r=t.querySelector(":scope > .nojs-accordion-content");if(r)return r;r=document.createElement("div"),r.classList.add("nojs-accordion-content");let o=Array.from(t.children),n=!1;for(let i of o){if(i===e){n=!0;continue}n&&r.appendChild(i)}return t.appendChild(r),r}function hi(t,e){if(!e)return;let r=e.scrollHeight;e.style.height="0px",t.open=!0,requestAnimationFrame(()=>{e.style.height=r+"px";let o=()=>{e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function Gn(t,e){if(!e){t.open=!1;return}let r=e.scrollHeight;e.style.height=r+"px",requestAnimationFrame(()=>{e.style.height="0px";let o=()=>{t.open=!1,e.style.height="",e.removeEventListener("transitionend",o)};e.addEventListener("transitionend",o)})}function Wn(t,e){if(t.open)if(e){let r=t.querySelector(":scope > .nojs-accordion-content");Gn(t,r)}else t.open=!1}function st(t,e,r,o){let n=new CustomEvent("nojs:accordion-change",{bubbles:!0,detail:{element:e,open:r,index:o}});t.dispatchEvent(n)}function Be(t){let e=[];for(let r of t.children)r.tagName==="DETAILS"&&e.push(r);return e}function Un(t){t.directive("accordion",{priority:10,init(e,r,o){Vn();let n=(o||"").trim().toLowerCase()==="multi"?"multi":"single",i=!bi();e.setAttribute("role","group");let c=Be(e);if(c.length===0)return;if(i)for(let f of c)Nn(f);let a=[],s=new MutationObserver(f=>{for(let l of f)for(let p of l.addedNodes)p.nodeType!==1||p.tagName!=="DETAILS"||p.parentElement===e&&g(p)});s.observe(e,{childList:!0});let d=0,g=f=>{i&&Nn(f);let l=f.querySelector(":scope > summary");if(l){let v=`nojs-accordion-panel-${Date.now()}-${d++}`,m=f.querySelector(":scope > .nojs-accordion-content");m?(m.id=m.id||v,m.setAttribute("role","region"),v=m.id):(f.id||(f.id=v),v=f.id),l.setAttribute("aria-expanded",f.open?"true":"false"),l.setAttribute("aria-controls",v)}let p=v=>{let m=Be(e),b=m.indexOf(f),E=f.querySelector(":scope > summary");if(E&&E.setAttribute("aria-expanded",f.open?"true":"false"),f.open){if(n==="single")for(let h of m)h!==f&&h.open&&Wn(h,i);st(e,f,!0,b)}else st(e,f,!1,b)},y=null;if(i){let v=f.querySelector(":scope > summary");v&&(y=m=>{m.preventDefault();let b=f.querySelector(":scope > .nojs-accordion-content");if(f.open)Gn(f,b),v.setAttribute("aria-expanded","false"),st(e,f,!1,Be(e).indexOf(f));else{if(n==="single"){let E=Be(e);for(let h of E)if(h!==f&&h.open){Wn(h,!0);let _=h.querySelector(":scope > summary");_&&_.setAttribute("aria-expanded","false")}}hi(f,b),v.setAttribute("aria-expanded","true"),st(e,f,!0,Be(e).indexOf(f))}},v.addEventListener("click",y))}f.addEventListener("toggle",p),a.push({details:f,toggleHandler:p,clickHandler:y})};for(let f of c)g(f);let u=f=>{let l=f.target;if(l.tagName!=="SUMMARY")return;let p=l.parentElement;if(!p||p.parentElement!==e)return;let v=Be(e).map(E=>E.querySelector(":scope > summary")).filter(Boolean),m=v.indexOf(l);if(m===-1)return;let b=-1;switch(f.key){case"ArrowDown":case"ArrowRight":b=(m+1)%v.length;break;case"ArrowUp":case"ArrowLeft":b=(m-1+v.length)%v.length;break;case"Home":b=0;break;case"End":b=v.length-1;break;default:return}b!==-1&&b!==m&&(f.preventDefault(),v[b].focus())};e.addEventListener("keydown",u),ot.containers.set(e,{mode:n,listeners:a,observer:s}),gi(e,()=>{e.removeEventListener("keydown",u),s.disconnect();for(let f of a)if(f.details.removeEventListener("toggle",f.toggleHandler),f.clickHandler){let l=f.details.querySelector(":scope > summary");l&&l.removeEventListener("click",f.clickHandler)}a.length=0,ot.containers.delete(e)})}})}function Yn(t,e={}){Un(t)}function Kn(){On()}var He=new Map;function Xn(){let t=Array.from(He.keys());for(let e of t){let r=He.get(e);if(r){if(r.resizeObserver){try{r.resizeObserver.disconnect()}catch{}r.resizeObserver=null}if(r.scrollHandler){try{e.removeEventListener("scroll",r.scrollHandler)}catch{}r.scrollHandler=null}if(r.spacerTop&&r.spacerTop.parentNode&&r.spacerTop.remove(),r.spacerBottom&&r.spacerBottom.parentNode&&r.spacerBottom.remove(),r.renderedNodes){for(let[o,n]of r.renderedNodes){if(n.__disposers){for(let i of n.__disposers)try{i()}catch{}n.__disposers=null}n.parentNode&&n.remove()}r.renderedNodes.clear()}r.disposed=!0}}He.clear()}function Zn(){if(typeof document>"u"||document.querySelector("style[data-nojs-virtual-list]"))return;let t=`
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
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-virtual-list",""),e.textContent=t,document.head.appendChild(e)}function vi(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function yi(t){for(let e of t.children)for(let r of["each","foreach","for"])if(e.hasAttribute(r)){let o=xi(e.getAttribute(r));if(o)return{eachEl:e,...o}}return null}function xi(t){if(!t)return null;let e=t.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return e?{iteratorVar:e[1],arrayPath:e[2].trim()}:null}function Ei(t,e){let r=e.split("."),o=t;for(let n of r){if(o==null)return;o=o[n]}return o}function Qn(t){let e=t.tagName.toLowerCase(),r;if(e==="tbody"||e==="table"||e==="thead"||e==="tfoot"){r=document.createElement("tr"),r.classList.add("nojs-virtual-spacer");let o=document.createElement("td"),n=e==="table"?t:t.closest("table"),i=n?n.querySelector("tr:not(.nojs-virtual-spacer)"):null,c=i?i.children.length:1;o.setAttribute("colspan",String(c)),o.style.padding="0",o.style.border="none",r.appendChild(o)}else e==="ul"||e==="ol"?(r=document.createElement("li"),r.classList.add("nojs-virtual-spacer"),r.style.listStyle="none"):(r=document.createElement("div"),r.classList.add("nojs-virtual-spacer"));return r.setAttribute("aria-hidden","true"),r.style.height="0px",r}function at(t,e){if(t.tagName.toLowerCase()==="tr"){let r=t.querySelector("td");r&&(r.style.height=e+"px"),t.style.height=e+"px"}else t.style.height=e+"px"}function _i(t,e){return t*e}function eo(t){let e=t.totalItems,r=new Array(e+1),o=t.estimatedHeight||50;r[0]=0;for(let n=1;n<=e;n++)r[n]=r[n-1]+(t.heights[n-1]||o);t.prefixSums=r}function to(t,e){let r=0,o=t.length-2;for(;r<=o;){let n=r+o>>>1;t[n]<=e?r=n+1:o=n-1}return Math.max(0,o)}function Jn(t){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return t.prefixSums[t.totalItems];let e=0,r=t.estimatedHeight||50;for(let o=0;o<t.totalItems;o++)e+=t.heights[o]||r;return e}function ct(t,e){if(t.itemHeight!=="auto")return e*t.itemHeight;if(t.prefixSums&&e<t.prefixSums.length)return t.prefixSums[e];let r=0,o=t.estimatedHeight||50;for(let n=0;n<e;n++)r+=t.heights[n]||o;return r}function wi(t,e){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return to(t.prefixSums,e);let r=0,o=t.estimatedHeight||50;for(let n=0;n<t.totalItems;n++){let i=t.heights[n]||o;if(r+i>e)return n;r+=i}return Math.max(0,t.totalItems-1)}function Ai(t,e,r){if(t.prefixSums&&t.prefixSums.length===t.totalItems+1)return to(t.prefixSums,e+r);let o=e+r,n=0,i=t.estimatedHeight||50;for(let c=0;c<t.totalItems;c++)if(n+=t.heights[c]||i,n>=o)return c;return t.totalItems-1}function ji(t,e,r){if(t.totalItems===0)return{start:0,end:-1};let o,n;return t.itemHeight!=="auto"?(o=Math.floor(e/t.itemHeight),n=Math.ceil((e+r)/t.itemHeight)-1):(o=wi(t,e),n=Ai(t,e,r)),o=Math.max(0,o-t.buffer),n=Math.min(t.totalItems-1,n+t.buffer),{start:o,end:n}}function Dt(t,e){if(t.disposed)return;let r=t.container,o=r,n=o.scrollTop,i=o.clientHeight,{start:c,end:a}=ji(t,n,i);if(c===t.startIndex&&a===t.endIndex&&!t.dirty)return;t.startIndex=c,t.endIndex=a,t.dirty=!1;let s=ct(t,c),d=t.itemHeight!=="auto"?_i(t.totalItems,t.itemHeight):Jn(t),g=a>=0?ct(t,a+1):0,u=Math.max(0,d-g);at(t.spacerTop,s),at(t.spacerBottom,u);let f=new Set;for(let p=c;p<=a;p++)f.add(p);for(let[p,y]of t.renderedNodes)f.has(p)||(y.remove(),t.renderedNodes.delete(p));let l=[];for(let p=c;p<=a;p++){if(t.renderedNodes.has(p))continue;let y=t.dataArray[p];if(y===void 0)continue;let v=t.template.cloneNode(!0),m={};m[t.iteratorVar]=y,m.$index=p,m.$count=t.totalItems,m.$first=p===0,m.$last=p===t.totalItems-1,m.$even=p%2===0,m.$odd=p%2!==0,v.__ctx=Object.create(e.findContext?e.findContext(r)||{}:{},Object.getOwnPropertyDescriptors(m)),v.__declared=!1,l.push({index:p,node:v}),t.renderedNodes.set(p,v)}if(l.length>0){l.sort((p,y)=>p.index-y.index);for(let{index:p,node:y}of l){let v=null;for(let[m,b]of t.renderedNodes)m>p&&b.parentNode===r&&(!v||m<Li(v,t))&&(v=b);v||(v=t.spacerBottom),r.insertBefore(y,v);try{e.processTree&&e.processTree(y)}catch{}}}if(t.itemHeight==="auto"){let p=!1;for(let[y,v]of t.renderedNodes){let m=v.offsetHeight||v.getBoundingClientRect().height;m>0&&t.heights[y]!==m&&(t.heights[y]=m,p=!0)}if(p){eo(t);let y=Jn(t),v=ct(t,c),m=a>=0?ct(t,a+1):0,b=Math.max(0,y-m);at(t.spacerTop,v),at(t.spacerBottom,b)}}}function Li(t,e){for(let[r,o]of e.renderedNodes)if(o===t)return r;return 1/0}function ki(t,e,r){if(t.disposed)return;let o=t.container.scrollTop;t.dataArray=e||[],t.totalItems=t.dataArray.length,t.dirty=!0,t.itemHeight==="auto"&&t.heights.length>t.totalItems&&(t.heights.length=t.totalItems),t.itemHeight==="auto"&&eo(t);for(let[n,i]of t.renderedNodes){if(i.__disposers){for(let c of i.__disposers)try{c()}catch{}i.__disposers=null}i.remove()}t.renderedNodes.clear(),t.container.scrollTop=o,Dt(t,r)}function ro(t){t.directive("virtual",{priority:10,init(e,r,o){Zn(),e.setAttribute("data-nojs-virtual","");let n=e.getAttribute("virtual-height")||"50",i=e.getAttribute("virtual-buffer")||"5",c=n==="auto"?"auto":parseInt(n,10),a=parseInt(i,10)||5;if(c!=="auto"&&(isNaN(c)||c<=0)){console.warn("[virtual] virtual-height must be a positive number or 'auto'.");return}let s=yi(e),d=null;if(s)d=s.eachEl;else for(let h of e.children)if(!h.classList.contains("nojs-virtual-spacer")){d=h;break}if(!d){console.warn("[virtual] No child template found.");return}let g=d.cloneNode(!0);for(g.removeAttribute("each"),g.removeAttribute("foreach"),g.removeAttribute("for"),g.__declared=!1,g.__disposers=null,g.__ctx=null,s&&(s.eachEl.removeAttribute("each"),s.eachEl.removeAttribute("foreach"),s.eachEl.removeAttribute("for"));e.firstChild;)e.removeChild(e.firstChild);let u=Qn(e),f=Qn(e);e.appendChild(u),e.appendChild(f);let l={container:e,itemHeight:c,buffer:a,totalItems:0,heights:[],prefixSums:[0],estimatedHeight:c==="auto"?50:c,startIndex:-1,endIndex:-1,scrollTop:0,template:g,spacerTop:u,spacerBottom:f,resizeObserver:null,scrollHandler:null,renderedNodes:new Map,iteratorVar:s?s.iteratorVar:"item",arrayPath:s?s.arrayPath:null,dataArray:[],dirty:!0,disposed:!1};He.set(e,l);let p=null,y=()=>{p||(p=requestAnimationFrame(()=>{p=null,Dt(l,t)}))};if(l.scrollHandler=y,e.addEventListener("scroll",y,{passive:!0}),typeof ResizeObserver<"u"){let h=new ResizeObserver(()=>{l.dirty=!0,Dt(l,t)});h.observe(e),l.resizeObserver=h}let v=null,m=-1,b=null,E=()=>{if(!l.disposed){if(l.arrayPath){let h=t.findContext?t.findContext(e):null;if(h){let _=Ei(h,l.arrayPath);Array.isArray(_)&&(_!==v||_.length!==m)&&(v=_,m=_.length,ki(l,_,t))}}b=setTimeout(E,100)}};b=setTimeout(E,100),vi(e,()=>{l.disposed=!0,p&&(cancelAnimationFrame(p),p=null),b&&(clearTimeout(b),b=null),e.removeEventListener("scroll",y),l.resizeObserver&&(l.resizeObserver.disconnect(),l.resizeObserver=null);for(let[h,_]of l.renderedNodes){if(_.__disposers){for(let A of _.__disposers)try{A()}catch{}_.__disposers=null}_.remove()}l.renderedNodes.clear(),l.spacerTop&&l.spacerTop.parentNode&&l.spacerTop.remove(),l.spacerBottom&&l.spacerBottom.parentNode&&l.spacerBottom.remove(),He.delete(e)})}})}function no(t,e={}){ro(t)}function oo(){Xn()}var me=new Map,dt=new Map;function io(){for(let[t,e]of me){if(e.observer)try{e.observer.disconnect()}catch{}for(let r of e.spyEntries){let o=r.el&&r.el.__disposers;if(o){for(let n of o)try{n()}catch{}r.el.__disposers=[]}}}me.clear(),dt.clear()}function so(){if(typeof document>"u"||document.querySelector("style[data-nojs-scroll-spy]"))return;let t=`
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim(),e=document.createElement("style");e.setAttribute("data-nojs-scroll-spy",""),e.textContent=t,document.head.appendChild(e)}function Ci(t,e){t.__disposers=t.__disposers||[],t.__disposers.push(e)}function Si(t){if(t.tagName==="A"){let r=t.getAttribute("href")||"";if(r.startsWith("#")&&r.length>1)return r.slice(1)}let e=t.getAttribute("spy")||"";return e.startsWith("#")&&e.length>1?e.slice(1):e.length>0?e:null}function Ti(t){let e=t.getAttribute("spy-offset");if(e===null||e==="")return 0;let r=parseInt(e,10);return Number.isNaN(r)?0:r}function Di(t){let e=t.getAttribute("spy-threshold");if(e===null||e==="")return .1;let r=parseFloat(e);return Number.isNaN(r)||r<0||r>1?.1:r}function Ii(){return document.documentElement}function Bi(t){t.classList.add("active"),t.setAttribute("aria-current","true")}function ao(t){t.classList.remove("active"),t.removeAttribute("aria-current")}function It(t){let e=me.get(t);if(!e)return;e.observer&&(e.observer.disconnect(),e.observer=null);let r=e.offset,o=e.threshold,n=new Set,i=`-${r}px 0px 0px 0px`,c=new IntersectionObserver(s=>{for(let u of s)u.isIntersecting?n.add(u.target.id):n.delete(u.target.id);let d=null,g=1/0;for(let u of n){let f=document.getElementById(u);if(!f)continue;let l=f.getBoundingClientRect();l.top<g&&(g=l.top,d=u)}for(let u of e.spyEntries)ao(u.el);if(d){for(let u of e.spyEntries)if(u.targetId===d){Bi(u.el),e.activeEl=u.el;break}}else e.activeEl=null},{rootMargin:i,threshold:o}),a=new Set;for(let s of e.spyEntries){if(a.has(s.targetId))continue;let d=document.getElementById(s.targetId);d&&(c.observe(d),a.add(s.targetId))}e.observer=c}function Hi(t,e){t&&typeof t._warn=="function"?t._warn(e):console.warn(e)}function co(t){t.directive("spy",{priority:20,init(e,r,o){so();let n=Si(e);if(!n){e.tagName!=="A"&&Hi(t,'[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');return}let i=Ti(e),c=Di(e),a=Ii();me.has(a)||me.set(a,{observer:null,spyEntries:[],activeEl:null,offset:i,threshold:c});let s=me.get(a),d={el:e,targetId:n};s.spyEntries.push(d),dt.set(e,a),It(a),!s.mutObserver&&typeof MutationObserver<"u"&&(s.mutObserver=new MutationObserver(()=>{It(a)}),s.mutObserver.observe(document.body,{childList:!0,subtree:!0})),Ci(e,()=>{let g=s.spyEntries.indexOf(d);g!==-1&&s.spyEntries.splice(g,1),dt.delete(e),ao(e),s.spyEntries.length===0?(s.observer&&(s.observer.disconnect(),s.observer=null),s.mutObserver&&(s.mutObserver.disconnect(),s.mutObserver=null),me.delete(a)):It(a)})}})}function lo(t,e={}){co(t)}function uo(){io()}var $i="[validate],[drag],[drop],[drag-list],[drag-multiple]";function po(t){if(typeof document>"u")return;let e=document.querySelectorAll($i);for(let r of e){if(!r.__declared)continue;let o=Y(t,"disposeTree");typeof o=="function"?o(r):(r.__disposers&&(r.__disposers.forEach(i=>i()),r.__disposers=null),r.__declared=!1);let n=t.findContext?t.findContext(r):null;n&&delete n.$form,t.processTree(r)}}var qi=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col","breadcrumb","accordion","virtual","virtual-height","virtual-buffer","spy","spy-offset","spy-threshold"],Ri={name:"nojs-elements",install(t,e={}){Mt(t,e),Kt(t,e),rr(t,e),sr(t,e),br(t,e),Ar(t,e),Dr(t,e),Mr(t,e),Qr(t,e),an(t,e),pn(t,e),vn(t,e),Bn(t,e),Pn(t,e),Yn(t,e),no(t,e),lo(t,e),po(t)},init(t){if(po(t),typeof document>"u"||!document.body)return;let e=qi.map(o=>`[${o}]`).join(","),r;try{r=document.body.querySelectorAll(e)}catch{return}for(let o of r)o.__declared&&!o.__disposers&&!o.__ctx&&(o.__declared=!1);try{t.processTree(document.body)}catch(o){t.internals?.warn?.("nojs-elements init re-process error:",o.message)}},dispose(t){Pt(),Xt(),nr(),ar(),hr(),jr(),Ir(),Pr(),Jr(),cn(),yn(),Hn(),zn(),Kn(),oo(),uo()}},ad=Ri;export{ad as default};
//# sourceMappingURL=nojs-elements.js.map
