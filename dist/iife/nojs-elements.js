/**
 * NoJS Elements v1.12.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
(()=>{var V=new Map,F=new Map;function jt(){let e=Array.from(V.keys());for(let t of e){let r=t&&t.__disposers;if(r){for(let n of r)try{n()}catch{}t.__disposers=[]}}for(let t of F.values())clearTimeout(t);F.clear();for(let t of V.values())t.remove();V.clear()}function St(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tooltip",""),t.textContent=e,document.head.appendChild(t)}function Ze(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var nt=8;function Ct(e,t,r){let n=t.getBoundingClientRect(),o=e.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"bottom":s=n.bottom+nt,a=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,a=n.left-o.width-nt;break;case"right":s=n.top+(n.height-o.height)/2,a=n.right+nt;break;default:s=n.top-o.height-nt,a=n.left+(n.width-o.width)/2;break}a<4&&(a=4),a+o.width>i-4&&(a=i-o.width-4),s<4&&(s=4),s+o.height>c-4&&(s=c-o.height-4),e.style.top=`${s}px`,e.style.left=`${a}px`}var Qe=0;function Je(e,t,r){document.body.appendChild(t),Ct(t,e,r),t.setAttribute("aria-hidden","false")}function Lt(e,t){t.setAttribute("aria-hidden","true"),t.remove()}function tr(e,t){e&&typeof e._warn=="function"?e._warn(t):console.warn(t)}function Tt(e){e.directive("tooltip",{priority:20,init(t,r,n){St();let o=n;if(!o){tr(e,"[tooltip] attribute value (tooltip text) is required.");return}let i=t.getAttribute("tooltip-position")||"top",c=parseInt(t.getAttribute("tooltip-delay"),10),s=Number.isNaN(c)?300:c,a=t.getAttribute("tooltip-disabled"),p=a?e.findContext(t):null,f=()=>{if(!a||!p)return!1;try{return!!e.evaluate(a,p)}catch{return!1}},b=`nojs-tooltip-${++Qe}`,g=document.createElement("div");g.className="nojs-tooltip",g.setAttribute("role","tooltip"),g.setAttribute("id",b),g.setAttribute("aria-hidden","true"),g.textContent=o,t.setAttribute("aria-describedby",b),V.set(t,g);let d=!1,l=0,m=()=>{!d||!t.isConnected||l||(l=requestAnimationFrame(()=>{l=0,!(!d||!t.isConnected)&&Ct(g,t,i)}))},y=()=>{window.addEventListener("scroll",m,!0),window.addEventListener("resize",m)},u=()=>{window.removeEventListener("scroll",m,!0),window.removeEventListener("resize",m),l&&(cancelAnimationFrame(l),l=0)},h=()=>{d||(Je(t,g,i),d=!0,y())},v=()=>{if(!d){Lt(t,g);return}u(),Lt(t,g),d=!1},w=()=>{if(f())return;F.has(t)&&clearTimeout(F.get(t));let D=setTimeout(()=>{F.delete(t),!f()&&t.isConnected&&h()},s);F.set(t,D)},k=()=>{F.has(t)&&(clearTimeout(F.get(t)),F.delete(t)),v()},I=()=>w(),q=()=>k(),S=()=>w(),A=()=>k(),j=D=>{D.key==="Escape"&&g.getAttribute("aria-hidden")==="false"&&k()};t.addEventListener("mouseenter",I),t.addEventListener("mouseleave",q),t.addEventListener("focusin",S),t.addEventListener("focusout",A),t.addEventListener("keydown",j);let _=null;if(a&&p&&typeof p.$watch=="function"){let D=()=>{d&&f()&&v()};_=p.$watch(D)}Ze(t,()=>{t.removeEventListener("mouseenter",I),t.removeEventListener("mouseleave",q),t.removeEventListener("focusin",S),t.removeEventListener("focusout",A),t.removeEventListener("keydown",j),_&&(_(),_=null),u(),F.has(t)&&(clearTimeout(F.get(t)),F.delete(t)),d=!1,g.remove(),V.delete(t)})}})}function It(e,t={}){Tt(e)}function Dt(){jt()}var T=new Map;function zt(){T.clear()}function it(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-popover",""),t.textContent=e,document.head.appendChild(t)}function ft(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function U(e,t="togglePopover"){return!!e&&typeof e[t]=="function"}var B=8;function st(e,t,r){let n=t.getBoundingClientRect(),o=e.getBoundingClientRect(),i=window.innerWidth,c=window.innerHeight,s,a;switch(r){case"top":s=n.top-o.height-B,a=n.left+(n.width-o.width)/2;break;case"left":s=n.top+(n.height-o.height)/2,a=n.left-o.width-B;break;case"right":s=n.top+(n.height-o.height)/2,a=n.right+B;break;default:s=n.bottom+B,a=n.left+(n.width-o.width)/2;break}r==="bottom"&&s+o.height>c&&(s=n.top-o.height-B),r==="top"&&s<0&&(s=n.bottom+B),r==="right"&&a+o.width>i&&(a=n.left-o.width-B),r==="left"&&a<0&&(a=n.right+B),a<4&&(a=4),a+o.width>i-4&&(a=i-o.width-4),s<4&&(s=4),s+o.height>c-4&&(s=c-o.height-4),e.style.top=`${s}px`,e.style.left=`${a}px`}function mt(e,t){e._untrack&&e._untrack();let r=0,n=()=>{r=0;let c=e.popoverEl;if(!c||!c.isConnected){i();return}if(typeof c.matches=="function"&&!c.matches(":popover-open")){i();return}st(c,t,e.position)},o=()=>{r||(r=requestAnimationFrame(n))},i=()=>{r&&(cancelAnimationFrame(r),r=0),window.removeEventListener("scroll",o,!0),window.removeEventListener("resize",o),e._untrack=null};return window.addEventListener("scroll",o,!0),window.addEventListener("resize",o),e._untrack=i,i}function H(e){e&&e._untrack&&e._untrack()}function Ft(e){e.directive("popover",{priority:20,init(r,n,o){it();let i=o||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",i),r.id||(r.id=i),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let c=r.getAttribute("popover-position")||"bottom";if(!T.has(i))T.set(i,{popoverEl:r,triggerEls:new Set,position:c,open:!1,_untrack:null});else{let a=T.get(i);a.popoverEl=r,a.position=c}let s=a=>{let p=T.get(i);if(!p)return;let f=a.newState==="open";p.open=f;for(let b of p.triggerEls)b.setAttribute("aria-expanded",String(f));f||H(p)};r.addEventListener("toggle",s),ft(r,()=>{r.removeEventListener("toggle",s);let a=T.get(i);a&&(H(a),a.popoverEl===r&&(a.popoverEl=null,a.open=!1),!a.popoverEl&&a.triggerEls.size===0&&T.delete(i))})}}),e.directive("popover-trigger",{priority:20,init(r,n,o){it();let i=o;if(!i){let a=r.closest("[use]")||r.parentElement,p=a?.querySelector("[data-popover-id]")||a?.querySelector("[popover]");if(p&&(i=p.getAttribute("data-popover-id")||p.id),!i){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",i),T.has(i)||T.set(i,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1,_untrack:null}),T.get(i).triggerEls.add(r);let c=a=>{let p=T.get(i);if(!p||!p.popoverEl){console.warn(`[popover-trigger] no popover found with id "${i}".`);return}U(p.popoverEl)&&(p.popoverEl.togglePopover(),requestAnimationFrame(()=>{p.popoverEl.matches(":popover-open")?(st(p.popoverEl,r,p.position),mt(p,r)):H(p)}))};r.addEventListener("click",c);let s=a=>{let p=T.get(i);a.key==="Escape"&&p?.open&&(U(p.popoverEl,"hidePopover")&&p.popoverEl.hidePopover(),H(p),r.focus())};document.addEventListener("keydown",s),ft(r,()=>{r.removeEventListener("click",c),document.removeEventListener("keydown",s);let a=T.get(i);a&&(a.triggerEls.delete(r),!a.popoverEl&&a.triggerEls.size===0&&(H(a),T.delete(i)))})}}),e.directive("popover-dismiss",{priority:20,init(r){it();let n=()=>{let o=r.closest(".nojs-popover");!o||!U(o,"hidePopover")||o.hidePopover()};r.addEventListener("click",n),ft(r,()=>r.removeEventListener("click",n))}});let t=(r,n)=>t.open(r,n);t.open=(r,n)=>{let o=T.get(r);if(!o||!o.popoverEl||!U(o.popoverEl,"showPopover"))return!1;try{o.popoverEl.showPopover()}catch{return!1}let i=n||[...o.triggerEls][0];return i&&requestAnimationFrame(()=>{st(o.popoverEl,i,o.position),mt(o,i)}),!0},t.close=r=>{let n=T.get(r);if(!n||!n.popoverEl||!U(n.popoverEl,"hidePopover"))return!1;try{n.popoverEl.hidePopover()}catch{}return H(n),!0},t.toggle=(r,n)=>{let o=T.get(r);if(!o||!o.popoverEl||!U(o.popoverEl))return!1;o.popoverEl.togglePopover();let i=n||[...o.triggerEls][0];return i&&o.popoverEl.matches(":popover-open")?requestAnimationFrame(()=>{st(o.popoverEl,i,o.position),mt(o,i)}):H(o),!0},e.popover=t}function Pt(e,t={}){Ft(e)}function Mt(){zt()}var L=[],P=new Map,er=1e4;function qt(){return er+L.length}function Bt(){L.length=0,P.clear()}function K(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-modal",""),t.textContent=e,document.head.appendChild(t)}function rr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Rt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',bt=new WeakMap;function or(e){let t=r=>{if(r.key!=="Tab")return;let n=[...e.querySelectorAll(Rt)].filter(c=>c.offsetParent!==null);if(n.length===0){r.preventDefault();return}let o=n[0],i=n[n.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),i.focus()):document.activeElement===i&&(r.preventDefault(),o.focus())};e.addEventListener("keydown",t),bt.set(e,t)}function $t(e){let t=bt.get(e);t&&(e.removeEventListener("keydown",t),bt.delete(e))}var Q=new WeakMap;function Ht(e){e.directive("modal",{priority:10,init(r,n,o){K();let i=o||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${i}`,r.setAttribute("data-modal-id",i),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let c=r.querySelector("h1, h2, h3, h4, h5, h6");c&&(c.id||(c.id=`nojs-modal-heading-${i}`),r.setAttribute("aria-labelledby",c.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let a=r.getAttribute("modal-class"),p=r.getAttribute("modal-escape"),f=g=>{g.target===r&&s!=="false"&&p!=="false"&&X(r,i)};r.addEventListener("click",f),P.set(i,r);let b=g=>{if(g.newState==="open"){if(r.style.zIndex=String(qt()),a&&a.split(/\s+/).filter(Boolean).forEach(d=>r.classList.add(d)),requestAnimationFrame(()=>{if(!r.isConnected||!L.some(l=>l.el===r))return;let d=r.querySelector(Rt);d?d.focus():r.focus()}),or(r),p!=="false"){let d=l=>{l.key==="Escape"&&(l.stopPropagation(),X(r,i))};r.addEventListener("keydown",d),Q.set(r,d)}}else if(g.newState==="closed"){a&&a.split(/\s+/).filter(Boolean).forEach(m=>r.classList.remove(m)),$t(r);let d=Q.get(r);d&&(r.removeEventListener("keydown",d),Q.delete(r));let l=L.findIndex(m=>m.el===r);if(l===-1&&(l=L.findIndex(m=>m.id===i)),l!==-1){let m=L[l];L.splice(l,1),m.triggerEl&&requestAnimationFrame(()=>{m.triggerEl.focus()})}}};r.addEventListener("toggle",b),rr(r,()=>{r.removeEventListener("click",f),r.removeEventListener("toggle",b),$t(r);let g=Q.get(r);g&&(r.removeEventListener("keydown",g),Q.delete(r)),P.delete(i);let d=L.findIndex(l=>l.el===r);d===-1&&(d=L.findIndex(l=>l.id===i)),d!==-1&&L.splice(d,1)})}});let t=r=>t.open(r);t.open=r=>{let n=P.get(r);if(!n)return!1;try{n.showPopover()}catch{return!1}return L.some(o=>o.id===r)||L.push({id:r,el:n,triggerEl:null}),!0},t.close=r=>{let n=P.get(r);return n?(X(n,r),!0):!1},t.closeAll=()=>{for(let r=L.length-1;r>=0;r--)X(L[r].el,L[r].id)},e.modal=t}function X(e,t){try{e.hidePopover()}catch{}}function nr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ir(e){let t=document.querySelectorAll("[data-modal-id]");for(let r of t)if(r.getAttribute("data-modal-id")===e)return r;return null}function Ot(e){e.directive("modal-open",{priority:10,init(t,r,n){K();let o=n;if(!o){let b=(t.closest("[use]")||t.parentElement)?.querySelector("[data-modal-id]");if(b&&(o=b.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded","false");let i=()=>{let f=P.get(o)||ir(o);if(!f){console.warn(`[modal-open] modal "${o}" not found`);return}let b=L.some(g=>g.id===o);f.id&&t.setAttribute("aria-controls",f.id);try{f.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`);return}b||L.push({id:o,el:f,triggerEl:t}),t.setAttribute("aria-expanded","true")},c=()=>{t.setAttribute("aria-expanded","false")},s=null,a=null;requestAnimationFrame(()=>{let f=P.get(o);f&&(a=f,s=b=>{b.newState==="closed"&&t.setAttribute("aria-expanded","false")},f.addEventListener("toggle",s))}),t.addEventListener("click",i),nr(t,()=>{t.removeEventListener("click",i),a&&s&&a.removeEventListener("toggle",s)})}})}function sr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Nt(e){e.directive("modal-close",{priority:10,init(t,r,n){K();let o=()=>{let i,c;if(n){if(c=n,i=P.get(c),!i){console.warn(`[modal-close] modal "${c}" not found`);return}}else{if(i=t.closest("[modal]"),!i){console.warn("[modal-close] no parent modal found");return}c=i.getAttribute("modal")}X(i,c)};t.addEventListener("click",o),sr(t,()=>{t.removeEventListener("click",o)})}})}function Gt(e,t={}){Ht(e),Ot(e),Nt(e)}function Wt(){Bt()}var $={openMenus:new Map};function Vt(){$.openMenus.clear()}function Y(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-dropdown",""),t.textContent=e,document.head.appendChild(t)}var ar=0;function cr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ut(e,t,r){let n=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";e.style.top="",e.style.left="";let i=t.getBoundingClientRect(),c=e.getBoundingClientRect(),s=window.innerHeight,a=window.innerWidth,p,f;switch(n){case"top":p=i.top-c.height,f=i.left;break;case"left":p=i.top,f=i.left-c.width;break;case"right":p=i.top,f=i.right;break;default:p=i.bottom,f=i.left}n==="bottom"||n==="top"?o==="end"&&(f=i.right-c.width):o==="end"&&(p=i.bottom-c.height),n==="bottom"&&p+c.height>s&&i.top-c.height>0?p=i.top-c.height:n==="top"&&p<0&&i.bottom+c.height<=s&&(p=i.bottom),f<4&&(f=4),f+c.width>a-4&&(f=a-c.width-4),e.style.top=`${p}px`,e.style.left=`${f}px`}function ht(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function gt(e){let t=ht(e);t.length&&t[0].focus()}function Kt(e){let t=ht(e);t.length&&t[t.length-1].focus()}function Xt(e){e.directive("dropdown",{priority:15,init(r){Y()}}),e.directive("dropdown-toggle",{priority:15,init(r){Y();let n=r.closest("[dropdown]");if(!n)return;let o=n.querySelector("[dropdown-menu]");if(!o)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),o.classList.add("nojs-dropdown-menu"),o.setAttribute("role","menu"),o.setAttribute("popover","auto"),o.id||(o.id=`nojs-dd-menu-${Date.now()}-${ar++}`),r.setAttribute("aria-controls",o.id);let i=!1,c=typeof o.showPopover=="function"&&typeof o.hidePopover=="function";function s(){if(o.setAttribute("data-open",""),c&&!i)try{o.showPopover(),i=!0}catch{i=!1}r.setAttribute("aria-expanded","true"),Ut(o,r,n),$.openMenus.set(o,{toggle:r,wrapper:n})}function a(){if(c&&i){i=!1;try{o.hidePopover()}catch{}}o.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),$.openMenus.delete(o)}function p(){return r.getAttribute("aria-expanded")==="true"}let f=u=>{u.newState==="closed"&&p()&&a()};o.addEventListener("toggle",f);let b=u=>{u.preventDefault(),u.stopPropagation(),p()?a():s()};r.addEventListener("click",b);let g=u=>{p()&&!n.contains(u.target)&&a()};document.addEventListener("click",g,!0);let d=u=>{u.key==="Escape"&&p()&&(a(),r.focus())};document.addEventListener("keydown",d);let l=u=>{switch(u.key){case"Enter":case" ":u.preventDefault(),s(),gt(o);break;case"ArrowDown":u.preventDefault(),s(),gt(o);break;case"ArrowUp":u.preventDefault(),s(),Kt(o);break}};r.addEventListener("keydown",l);let m=u=>{if(!(!p()||ht(o).find(w=>w===document.activeElement)))switch(u.key){case"ArrowDown":u.preventDefault(),gt(o);break;case"ArrowUp":u.preventDefault(),Kt(o);break}};o.addEventListener("keydown",m);let y=()=>{p()&&Ut(o,r,n)};window.addEventListener("scroll",y,!0),window.addEventListener("resize",y),cr(r,()=>{r.removeEventListener("click",b),r.removeEventListener("keydown",l),o.removeEventListener("keydown",m),o.removeEventListener("toggle",f),document.removeEventListener("click",g,!0),document.removeEventListener("keydown",d),window.removeEventListener("scroll",y,!0),window.removeEventListener("resize",y),$.openMenus.delete(o)})}}),e.directive("dropdown-menu",{priority:15,init(r){Y(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let t=r=>t.open(r);t.open=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")==="true"?!1:(i.click(),!0)},t.close=r=>{let n=document.getElementById(r);if(!n)return!1;let i=n.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!i||i.getAttribute("aria-expanded")!=="true"?!1:(i.click(),!0)},e.dropdown=t}function Yt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function dr(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function vt(e,t){if(!e)return;if(typeof e.hidePopover=="function")try{e.hidePopover()}catch{}e.removeAttribute("data-open");let r=t&&t.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),$.openMenus.has(e)&&$.openMenus.delete(e)}function Zt(e){e.directive("dropdown-item",{priority:15,init(t){Y();let r=t.closest("[dropdown-menu]"),n=t.closest("[dropdown]");t.setAttribute("role","menuitem"),t.setAttribute("tabindex","-1"),t.classList.add("nojs-dropdown-item"),t.hasAttribute("disabled")&&t.setAttribute("aria-disabled","true");let o=c=>{if(!r)return;let s=dr(r),a=s.indexOf(t);switch(c.key){case"ArrowDown":{c.preventDefault(),(a+1<s.length?s[a+1]:s[0]).focus();break}case"ArrowUp":{c.preventDefault(),(a-1>=0?s[a-1]:s[s.length-1]).focus();break}case"Home":{c.preventDefault(),s.length&&s[0].focus();break}case"End":{c.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{c.preventDefault(),t.click();break}case"Escape":{if(c.preventDefault(),vt(r,n),n){let p=n.querySelector("[dropdown-toggle]");p&&p.focus()}break}case"Tab":{vt(r,n);break}}};t.addEventListener("keydown",o),Yt(t,()=>t.removeEventListener("keydown",o));let i=()=>{if(vt(r,n),n){let c=n.querySelector("[dropdown-toggle]");c&&c.focus()}};t.addEventListener("click",i),Yt(t,()=>t.removeEventListener("click",i))}})}function Qt(e,t={}){Xt(e),Zt(e)}function Jt(){Vt()}var M=new Map,Z=new Set,te=0;function ee(){return++te}function re(){for(let e of Z)clearTimeout(e);Z.clear();for(let e of M.values())e.remove();M.clear(),te=0}function oe(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-toast",""),t.textContent=e,document.head.appendChild(t)}function yt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var lr=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function xt(){return M.size>0?M.values().next().value:ur("top-right")}function ur(e){if(M.has(e))return M.get(e);let t=document.createElement("div");return t.classList.add("nojs-toast-container"),t.setAttribute("data-position",e),t.setAttribute("role","log"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions"),document.body.appendChild(t),M.set(e,t),t}function pr(e){return e.startsWith("top")}function wt(e,t,r,n,o){let i=ee(),c=e.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",i),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let a=document.createElement("span");if(a.textContent=t,s.appendChild(a),o){let p=document.createElement("button");p.type="button",p.classList.add("nojs-toast-dismiss"),p.setAttribute("aria-label","Dismiss"),p.textContent="\xD7",p.addEventListener("click",()=>at(s)),s.appendChild(p)}if(pr(c)&&e.firstChild?e.insertBefore(s,e.firstChild):e.appendChild(s),n>0){let p=setTimeout(()=>{Z.delete(p),s.isConnected&&at(s)},n);Z.add(p),s._toastTimerId=p}return s}function at(e){!e||!e.isConnected||(e._toastTimerId!=null&&(clearTimeout(e._toastTimerId),Z.delete(e._toastTimerId)),e.remove())}function ne(e){oe(),e.directive("toast-container",{priority:10,init(r,n,o){let i=o&&lr.has(o)?o:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",i),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),M.set(i,r),yt(r,()=>{M.get(i)===r&&M.delete(i)})}}),e.directive("toast",{priority:10,init(r,n,o){if(!o)return;let i=r.getAttribute("toast-type")||"info",c=parseInt(r.getAttribute("toast-duration"),10),s=Number.isNaN(c)?3e3:c,a=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let l=()=>{let m=xt();wt(m,o,i,s,a)};r.addEventListener("click",l),yt(r,()=>r.removeEventListener("click",l));return}let f=e.findContext(r),b;function g(){let l=e.evaluate(o,f);if(l&&l!==b){let m=typeof l=="string"?l:String(l),y=xt();wt(y,m,i,s,a),b=void 0}else b=l}let d=f.$watch(g);yt(r,d)}});let t=(r,n="info",o=3e3)=>{if(typeof document>"u")return;let i=!0,c=xt();return wt(c,String(r),n,o,i)};t.dismiss=r=>{let n=typeof CSS<"u"&&CSS.escape?CSS.escape(String(r)):String(r).replace(/["\\\]]/g,"\\$&"),o=document.querySelector(`[data-toast-id="${n}"]`);o&&at(o)},t.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>at(r))},e.toast=t}function ie(e,t={}){ne(e)}function se(){re()}var O={containers:new Map};function ae(){O.containers.clear()}function ce(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tabs",""),t.textContent=e,document.head.appendChild(t)}function fr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var mr=0;function de(e){return`${e}-${++mr}`}function J(e,t,r=!1){let n=O.containers.get(e);if(!n)return;let{tabs:o,panels:i}=n;if(!(t<0||t>=o.length)&&!(!r&&o[t].getAttribute("aria-disabled")==="true")){for(let c=0;c<o.length;c++)o[c].setAttribute("aria-selected","false"),o[c].setAttribute("tabindex","-1"),i[c].setAttribute("aria-hidden","true"),i[c].inert=!0;o[t].setAttribute("aria-selected","true"),o[t].setAttribute("tabindex","0"),i[t].setAttribute("aria-hidden","false"),i[t].inert=!1,n.activeIndex=t}}function tt(e,t,r){let n=e.length,o=t;for(let i=0;i<n;i++)if(o=(o+r+n)%n,e[o].getAttribute("aria-disabled")!=="true")return o;return e[t]&&e[t].getAttribute("aria-disabled")!=="true"?t:-1}function le(e){e.directive("tabs",{priority:10,init(t,r,n){ce();let o=[],i=[];for(let u of Array.from(t.children))u.hasAttribute("tab")?o.push(u):u.hasAttribute("panel")&&i.push(u);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==i.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+i.length+" panels.");let c=t.getAttribute("tab-position")||"top";t.setAttribute("data-position",c),t.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let a=Math.min(o.length,i.length);for(let u=0;u<a;u++){let h=o[u],v=i[u],w=h.id||de("nojs-tab"),k=v.id||de("nojs-panel");h.id=w,v.id=k,h.setAttribute("role","tab"),h.setAttribute("aria-selected","false"),h.setAttribute("aria-controls",k),h.setAttribute("tabindex","-1"),h.classList.add("nojs-tab"),v.setAttribute("role","tabpanel"),v.setAttribute("aria-labelledby",w),v.setAttribute("tabindex","0"),v.setAttribute("aria-hidden","true"),v.inert=!0,v.classList.add("nojs-panel"),s.appendChild(h)}for(let u=a;u<i.length;u++){let h=i[u];h.setAttribute("role","tabpanel"),h.setAttribute("aria-hidden","true"),h.inert=!0,h.classList.add("nojs-panel")}let p=i[0];p?t.insertBefore(s,p):t.appendChild(s),O.containers.set(t,{tabs:o.slice(0,a),panels:i.slice(0,a),activeIndex:-1});let f=e.findContext(t),b=[],g=(u,h)=>{let v=!1;try{v=!!e.evaluate(h,f)}catch{v=!1}v?u.setAttribute("aria-disabled","true"):u.removeAttribute("aria-disabled")};for(let u=0;u<a;u++){let h=o[u],v=h.getAttribute("tab-disabled");if(v&&(g(h,v),f&&typeof f.$watch=="function")){let w=f.$watch(()=>g(h,v));b.push(w)}}let d=0;if(n&&n.trim()!==""){let u=parseInt(n,10);!isNaN(u)&&u>=0&&u<a&&(d=u)}let l=o.slice(0,a);if(o[d]?.getAttribute("aria-disabled")==="true"){let u=tt(l,d,1);u!==-1?(d=u,J(t,d)):J(t,d,!0)}else J(t,d);let m=u=>{let h=O.containers.get(t);if(!h)return;let v=u.target;if(v.getAttribute("role")!=="tab")return;let{tabs:w}=h,k=w.indexOf(v);if(k===-1)return;let I=-1;switch(u.key){case"ArrowRight":case"ArrowDown":I=tt(w,k,1);break;case"ArrowLeft":case"ArrowUp":I=tt(w,k,-1);break;case"Home":I=tt(w,w.length-1,1);break;case"End":I=tt(w,0,-1);break;case"Tab":return;default:return}I!==-1&&I!==k&&(u.preventDefault(),J(t,I),w[I].focus())};s.addEventListener("keydown",m);let y=u=>{let h=u.target.closest("[role='tab']");if(!h)return;let v=O.containers.get(t);if(!v)return;let w=v.tabs.indexOf(h);w!==-1&&h.getAttribute("aria-disabled")!=="true"&&(J(t,w),h.focus())};s.addEventListener("click",y),fr(t,()=>{s.removeEventListener("keydown",m),s.removeEventListener("click",y);for(let u of b)u&&u();b.length=0,O.containers.delete(t)})}})}function ue(e){e.directive("tab",{priority:11,init(){}}),e.directive("tab-disabled",{priority:11,init(){}}),e.directive("tab-position",{priority:11,init(){}})}function pe(e){e.directive("panel",{priority:11,init(){}})}function fe(e,t={}){le(e),ue(e),pe(e)}function me(){ae()}var E={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function be(){E.branches.clear(),E.selectedItem=null,E.typeahead="",E.typeaheadTimer&&(clearTimeout(E.typeaheadTimer),E.typeaheadTimer=null)}function ct(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tree",""),t.textContent=e,document.head.appendChild(t)}function At(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ge(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),n;for(;n=r.nextNode();)t.push(n);return t}function he(e){return e.closest('[role="tree"]')}function br(e){let t=e.parentElement?.closest('[role="group"], .nojs-subtree');if(t){let r=t.parentElement?.closest('[role="treeitem"]');if(r)return r;let n=t.previousElementSibling;if(n?.matches?.('[role="treeitem"]'))return n}return e.parentElement?.closest('[role="treeitem"]')||null}function gr(e){let t=e.cloneNode(!0);return t.querySelectorAll('[role="group"]').forEach(n=>n.remove()),(t.textContent||"").trim().toLowerCase()}function ve(e){e.directive("tree",{priority:15,init(t){ct(),t.classList.add("nojs-tree"),t.setAttribute("role","tree"),t.getAttribute("tree-icon")==="false"&&t.setAttribute("data-tree-icon","false")}})}function ye(e){e.directive("branch",{priority:16,init(t,r,n){ct();let o=n==="expanded";t.classList.add("nojs-branch"),t.setAttribute("role","treeitem"),t.setAttribute("aria-expanded",String(o));let i=he(t);if(i){let d=i.querySelector('[role="treeitem"][tabindex="0"]');t.setAttribute("tabindex",d?"-1":"0")}else t.setAttribute("tabindex","0");let c=!1;queueMicrotask(()=>{if(c)return;let d=t.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(t.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?t.nextElementSibling:null);d?(E.branches.set(t,{expanded:o,subtreeEl:d}),d.setAttribute("aria-hidden",String(!o))):E.branches.set(t,{expanded:o,subtreeEl:null})});function s(d){let l=E.selectedItem;l&&l!==d&&(l.classList.remove("nojs-branch-selected"),l.setAttribute("aria-selected","false")),d.classList.add("nojs-branch-selected"),d.setAttribute("aria-selected","true"),E.selectedItem=d}function a(d){let l=E.branches.get(d);!l||!l.subtreeEl||(l.expanded=!l.expanded,d.setAttribute("aria-expanded",String(l.expanded)),l.subtreeEl.setAttribute("aria-hidden",String(!l.expanded)))}function p(d){let l=E.branches.get(d);!l||!l.subtreeEl||l.expanded||(l.expanded=!0,d.setAttribute("aria-expanded","true"),l.subtreeEl.setAttribute("aria-hidden","false"))}function f(d){let l=E.branches.get(d);!l||!l.subtreeEl||!l.expanded||(l.expanded=!1,d.setAttribute("aria-expanded","false"),l.subtreeEl.setAttribute("aria-hidden","true"))}let b=d=>{d.target.closest?.('[role="treeitem"]')===t&&(d.stopPropagation(),s(t),a(t))};t.addEventListener("click",b),At(t,()=>t.removeEventListener("click",b));let g=d=>{let l=he(t);if(!l)return;let m=ge(l),y=m.indexOf(t),u=E.branches.get(t),h=u&&u.subtreeEl;switch(d.key){case"ArrowRight":if(d.preventDefault(),h&&!u.expanded)p(t);else if(h&&u.expanded){let v=u.subtreeEl.querySelector('[role="treeitem"]');v&&N(v,m)}break;case"ArrowLeft":if(d.preventDefault(),h&&u.expanded)f(t);else{let v=br(t);v&&N(v,ge(l))}break;case"ArrowDown":d.preventDefault(),y<m.length-1&&N(m[y+1],m);break;case"ArrowUp":d.preventDefault(),y>0&&N(m[y-1],m);break;case"Enter":case" ":d.preventDefault(),s(t),a(t);break;case"Home":d.preventDefault(),m.length>0&&N(m[0],m);break;case"End":d.preventDefault(),m.length>0&&N(m[m.length-1],m);break;default:if(d.key.length===1&&!d.ctrlKey&&!d.altKey&&!d.metaKey){d.preventDefault(),E.typeahead+=d.key.toLowerCase(),E.typeaheadTimer&&clearTimeout(E.typeaheadTimer),E.typeaheadTimer=setTimeout(()=>{E.typeahead="",E.typeaheadTimer=null},500);let v=y+1;for(let w=0;w<m.length;w++){let k=(v+w)%m.length;if(gr(m[k]).startsWith(E.typeahead)){N(m[k],m);break}}}break}};t.addEventListener("keydown",g),At(t,()=>t.removeEventListener("keydown",g)),At(t,()=>{c=!0,E.branches.delete(t),E.selectedItem===t&&(E.selectedItem=null),E.typeaheadTimer&&(clearTimeout(E.typeaheadTimer),E.typeaheadTimer=null,E.typeahead="")})}})}function N(e,t){for(let r of t)r.setAttribute("tabindex",r===e?"0":"-1");e.focus()}function xe(e){e.directive("subtree",{priority:16,init(t){ct(),t.classList.add("nojs-subtree"),t.classList.add("nojs-tree"),t.setAttribute("role","group");for(let n of t.children)n.tagName==="LI"&&!n.querySelector("[branch], .nojs-branch")&&(n.setAttribute("role","treeitem"),n.setAttribute("tabindex","-1"),n.classList.add("nojs-tree-leaf"));let r=t.parentElement?.matches?.('[role="treeitem"]')?t.parentElement:t.previousElementSibling?.matches?.('[role="treeitem"]')?t.previousElementSibling:null;if(r){let n=E.branches.get(r);n?(t.setAttribute("aria-hidden",String(!n.expanded)),n.subtreeEl=t):t.setAttribute("aria-hidden","true")}else t.setAttribute("aria-hidden","true")}})}function we(e,t={}){ve(e),ye(e),xe(e)}function Ae(){be()}var dt=new Map;function Ee(){dt.clear()}function lt(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-stepper",""),t.textContent=e,document.head.appendChild(t)}function et(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function _e(e){e.directive("stepper",{priority:14,init(t,r,n){lt();let o=e.findContext(t),i=Array.from(t.querySelectorAll("[step]"));if(!i.length){console.warn("[stepper] No [step] children found.");return}let c=n&&parseInt(n,10)||0,s=t.getAttribute("stepper-mode")||"linear",a=t.getAttribute("stepper-indicator")!=="false",p=t.getAttribute("stepper-nav")!=="false",f=t.getAttribute("aria-label")||"Stepper",b=Math.max(0,Math.min(c,i.length-1));t.setAttribute("role","group"),t.setAttribute("aria-label",f),t.classList.add("nojs-stepper");let g=null,d=[];if(a){g=document.createElement("div"),g.className="nojs-stepper-indicator",g.setAttribute("role","tablist"),g.setAttribute("aria-label","Progress"),i.forEach((A,j)=>{if(j>0){let W=document.createElement("div");W.className="nojs-stepper-separator",W.setAttribute("aria-hidden","true"),g.appendChild(W)}let _=document.createElement("button");_.type="button",_.className="nojs-stepper-indicator-item",_.setAttribute("role","tab"),_.setAttribute("aria-selected",j===b?"true":"false");let D=A.getAttribute("step-label")||`Step ${j+1}`,kt=document.createElement("span");kt.textContent=D,_.appendChild(kt),_.setAttribute("aria-label",D);let Ye=`nojs-stepper-tab-${hr++}`;if(_.id=Ye,s==="free"){_.setAttribute("data-clickable","");let W=()=>k(j);_.addEventListener("click",W),et(t,()=>_.removeEventListener("click",W))}else _.setAttribute("tabindex","-1");g.appendChild(_),d.push(_)});let S=A=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(A.key))return;A.preventDefault();let j=b;A.key==="ArrowRight"?j=Math.min(b+1,i.length-1):A.key==="ArrowLeft"?j=Math.max(b-1,0):A.key==="Home"?j=0:A.key==="End"&&(j=i.length-1),s==="free"?(k(j),d[j]?.focus()):d[b]?.focus()};g.addEventListener("keydown",S),et(t,()=>g.removeEventListener("keydown",S)),t.insertBefore(g,t.firstChild)}let l=null,m=null,y=null;if(p){l=document.createElement("div"),l.className="nojs-stepper-nav",l.setAttribute("aria-hidden","true"),m=document.createElement("button"),m.type="button",m.className="nojs-stepper-prev",m.textContent="Previous";let S=()=>w();m.addEventListener("click",S),et(t,()=>m.removeEventListener("click",S)),y=document.createElement("button"),y.type="button",y.className="nojs-stepper-next",y.textContent="Next";let A=()=>v();y.addEventListener("click",A),et(t,()=>y.removeEventListener("click",A)),l.appendChild(m),l.appendChild(y),t.appendChild(l)}function u(S){let A=i[S];if(!A)return!0;let j=A.querySelectorAll("[required]");for(let D of j)if(typeof D.checkValidity=="function"&&!D.checkValidity())return D.reportValidity(),!1;let _=A.getAttribute("step-validate");if(_)try{if(!e.evaluate(_,o))return!1}catch(D){return console.warn(`[stepper] step-validate error: ${D.message}`),!1}return!0}function h(S){i.forEach((A,j)=>{let _=j===b;A.setAttribute("aria-hidden",_?"false":"true"),_?(A.removeAttribute("inert"),A.setAttribute("aria-current","step")):(A.setAttribute("inert",""),A.removeAttribute("aria-current"))}),d.length&&d.forEach((A,j)=>{A.setAttribute("aria-selected",j===b?"true":"false"),j<b?A.setAttribute("data-completed",""):A.removeAttribute("data-completed"),A.setAttribute("tabindex",j===b?"0":"-1");let _=i[j];_.id&&(A.setAttribute("aria-controls",_.id),_.setAttribute("aria-labelledby",A.id))}),m&&(m.disabled=b===0),y&&(y.textContent=b===i.length-1?"Finish":"Next"),t.dispatchEvent(new CustomEvent("step-change",{bubbles:!S,detail:{current:b,total:i.length}}))}function v(){return b>=i.length-1?(s==="linear"&&!u(b)||t.dispatchEvent(new CustomEvent("step-complete",{bubbles:!0,detail:{current:b,total:i.length}})),!1):s==="linear"&&!u(b)?!1:(b++,h(),q(),!0)}function w(){return b<=0?!1:(b--,h(),q(),!0)}function k(S){if(S<0||S>=i.length||S===b)return!1;if(s==="linear"&&S>b){for(let A=b;A<S;A++)if(b=A,h(),!u(A))return q(),!1}return b=S,h(),q(),!0}let I={get current(){return b},get total(){return i.length},next:v,prev:w,goTo:k,get isFirst(){return b===0},get isLast(){return b===i.length-1}};function q(){o.$stepper=I}q(),dt.set(t,{get current(){return b},steps:i,mode:s,indicatorEl:g,navEl:l}),h(!0),et(t,()=>{dt.delete(t),g&&g.parentNode&&g.remove(),l&&l.parentNode&&l.remove(),delete o.$stepper})}})}var hr=0;var vr=0;function ke(e){e.directive("step",{priority:13,init(t,r,n){lt(),t.classList.add("nojs-step"),t.setAttribute("role","tabpanel"),t.id||(t.id=`nojs-stepper-panel-${vr++}`),t.setAttribute("tabindex","0")}})}function je(e,t={}){ke(e),_e(e)}function Se(){Ee()}function Le(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-skeleton",""),t.textContent=e,document.head.appendChild(t)}function Ce(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Te(e){e.directive("skeleton",{priority:10,init(t,r,n){Le();let o=e.findContext(t),i=t.getAttribute("skeleton-type")||"text",c=t.getAttribute("skeleton-lines"),s=t.getAttribute("skeleton-size"),a=[];function p(u){f();for(let h=0;h<u;h++){let v=document.createElement("div");v.className="nojs-skeleton-line",t.appendChild(v),a.push(v)}}function f(){for(let u of a)u.parentNode===t&&t.removeChild(u);a=[]}function b(){if(t.classList.add("nojs-skeleton"),i==="circle"&&t.classList.add("nojs-skeleton-circle"),s&&(i==="circle"||i==="rect")){let u=s+(String(s).match(/\d$/)?"px":"");t.style.width=u,t.style.height=u}if(c){let u=parseInt(c,10);u>0&&p(u)}t.setAttribute("aria-busy","true")}let g=null;function d(){g&&g(),t.classList.add("nojs-skeleton-fade"),t.classList.remove("nojs-skeleton"),t.classList.remove("nojs-skeleton-circle"),f(),s&&(i==="circle"||i==="rect")&&(t.style.width="",t.style.height=""),t.removeAttribute("aria-busy");let u=!1,h=null,v=()=>{u||(u=!0,t.isConnected&&t.classList.remove("nojs-skeleton-fade"),t.removeEventListener("transitionend",v),h!==null&&clearTimeout(h),g=null)};t.addEventListener("transitionend",v),h=setTimeout(v,0),g=()=>{t.removeEventListener("transitionend",v),h!==null&&clearTimeout(h),u=!0,g=null}}let l=!1;function m(){let u=!!e.evaluate(n,o);u&&!l?(l=!0,b()):!u&&l&&(l=!1,d())}m();let y=o.$watch(m);Ce(t,y),Ce(t,()=>{g&&g(),l&&(t.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),t.removeAttribute("aria-busy"),f(),s&&(i==="circle"||i==="rect")&&(t.style.width="",t.style.height=""))})}})}function Ie(e,t={}){Te(e)}var G=new Map,C=new Map,x={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0,sign:1};function De(){G.clear(),C.clear(),x.active=!1,x.splitEl=null,x.gutterEl=null,x.prevPane=null,x.nextPane=null,x.direction=null,x.startPos=0,x.startPrevSize=0,x.startNextSize=0,x.containerSize=0,x.sign=1}function ut(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-split",""),t.textContent=e,document.head.appendChild(t)}function yr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ze(e){return e==="horizontal"?"clientX":"clientY"}function z(e,t){let r=e.getBoundingClientRect?e.getBoundingClientRect():null,n=r&&(t==="horizontal"?r.width:r.height);return n||(t==="horizontal"?e.offsetWidth:e.offsetHeight)}function Fe(e,t){if(t!=="horizontal")return 1;try{return(e.closest&&e.closest("[dir]")?.getAttribute("dir")||(typeof getComputedStyle=="function"?getComputedStyle(e).direction:""))==="rtl"?-1:1}catch{return 1}}function xr(e,t){let n=(G.get(e)?.gutters||[]).reduce((o,i)=>o+z(i,t),0);return z(e,t)-n}function wr(e,t){if(!e)return null;let r=parseFloat(e);return Number.isNaN(r)?null:typeof e=="string"&&e.trim().endsWith("%")?r/100*t:r}function rt(e,t){let r=C.get(t);return r?r.min!=null&&e<r.min?r.min:r.max!=null&&e>r.max?r.max:e:e}function pt(e,t,r,n){let o=z(t,n),i=z(r,n),c=C.get(t),s=C.get(r);e.setAttribute("aria-valuenow",Math.round(o)),e.setAttribute("aria-valuemin",c?.min||0),e.setAttribute("aria-valuemax",Math.round(o+i-(s?.min||0)))}function Et(e){let t=e.getAttribute("split-persist");if(!t)return;let r=G.get(e);if(!r)return;let n=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${t}`,JSON.stringify(n))}catch{}}function Ar(e){let t=e.getAttribute("split-persist");if(!t)return!1;try{let r=localStorage.getItem(`nojs-split:${t}`);if(!r)return!1;let n=JSON.parse(r),o=G.get(e);return!o||n.length!==o.panes.length?!1:(n.forEach((i,c)=>{i&&(o.panes[c].style.flexBasis=i,o.panes[c].style.flexGrow="0")}),!0)}catch{return!1}}function Er(e,t,r,n,o){let i=document.createElement("div");i.className="nojs-gutter",i.setAttribute("role","separator"),i.setAttribute("tabindex","0"),i.setAttribute("aria-orientation",t==="horizontal"?"vertical":"horizontal"),i.setAttribute("aria-label","Resize"),o!==6&&i.style.setProperty("--nojs-gutter-size",`${o}px`);let c=d=>{if(d.button!==0)return;d.preventDefault();let l=xr(e,t);x.active=!0,x.splitEl=e,x.gutterEl=i,x.prevPane=r,x.nextPane=n,x.direction=t,x.startPos=d[ze(t)],x.startPrevSize=z(r,t),x.startNextSize=z(n,t),x.containerSize=l,x.sign=Fe(e,t),document.body.style.cursor=t==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",i.setPointerCapture(d.pointerId)},s=d=>{if(!x.active||x.gutterEl!==i)return;let l=(d[ze(x.direction)]-x.startPos)*(x.sign||1),m=rt(x.startPrevSize+l,x.prevPane),y=rt(x.startNextSize-l,x.nextPane),u=x.startPrevSize+x.startNextSize;m+y!==u&&(m!==x.startPrevSize+l?y=u-m:m=u-y),x.prevPane.style.flexBasis=`${m}px`,x.prevPane.style.flexGrow="0",x.nextPane.style.flexBasis=`${y}px`,x.nextPane.style.flexGrow="0",pt(i,x.prevPane,x.nextPane,x.direction)},a=()=>{!x.active||x.gutterEl!==i||(x.active=!1,document.body.style.cursor="",document.body.style.userSelect="",Et(e),e.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:n}})))};i.addEventListener("pointerdown",c),i.addEventListener("pointermove",s),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a);let p=10,f=d=>{let l=t==="horizontal",m=Fe(e,t),y=0;if(l&&d.key==="ArrowRight"||!l&&d.key==="ArrowDown")y=p*m;else if(l&&d.key==="ArrowLeft"||!l&&d.key==="ArrowUp")y=-p*m;else if(d.key==="Home")y=(C.get(r)?.min||0)-z(r,t);else if(d.key==="End"){let I=C.get(n);y=z(r,t)+z(n,t)-(I?.min||0)-z(r,t)}else return;d.preventDefault();let u=z(r,t),h=z(n,t),v=u+h,w=rt(u+y,r),k=rt(v-w,n);w=v-k,w=rt(w,r),k=v-w,r.style.flexBasis=`${w}px`,r.style.flexGrow="0",n.style.flexBasis=`${k}px`,n.style.flexGrow="0",pt(i,r,n,t),Et(e)};i.addEventListener("keydown",f);let b=()=>{let d=C.get(r),l=C.get(n),m=d?.collapsible?r:l?.collapsible?n:null;if(!m)return;let y=C.get(m);if(!y)return;let u=m===r?n:r,h=z(r,t)+z(n,t);if(y.collapsed){y.collapsed=!1,m.removeAttribute("data-collapsed");let v=y.preCollapseSize||`${Math.round(h/2)}px`,w=wr(v,h)??h/2,k=Math.min(w,h);m.style.flexBasis=`${k}px`,m.style.flexGrow="0",u.style.flexBasis=`${h-k}px`,u.style.flexGrow="0"}else y.preCollapseSize=m.style.flexBasis||`${z(m,t)}px`,y.collapsed=!0,m.setAttribute("data-collapsed","true"),m.style.flexBasis="0px",m.style.flexGrow="0",u.style.flexBasis=`${h}px`,u.style.flexGrow="0";pt(i,r,n,t),Et(e),e.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:m,collapsed:y.collapsed}}))};return i.addEventListener("dblclick",b),{gutter:i,cleanup:()=>{i.removeEventListener("pointerdown",c),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",a),i.removeEventListener("pointercancel",a),i.removeEventListener("keydown",f),i.removeEventListener("dblclick",b)}}}function Pe(e){e.directive("split",{priority:14,init(t,r,n){ut();let o=(n||"horizontal").trim()==="vertical"?"vertical":"horizontal",i=parseInt(t.getAttribute("split-gutter"),10)||6;t.classList.add("nojs-split"),t.setAttribute("data-direction",o);let c=Array.from(t.children).filter(f=>f.hasAttribute("pane"));if(c.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${c.length}.`);return}c.forEach(f=>{C.get(f)||C.set(f,{size:f.getAttribute("pane")||null,min:parseInt(f.getAttribute("pane-min"),10)||0,max:parseInt(f.getAttribute("pane-max"),10)||1/0,collapsible:f.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],a=[];for(let f=0;f<c.length-1;f++){let{gutter:b,cleanup:g}=Er(t,o,c[f],c[f+1],i);c[f].after(b),s.push(b),a.push(g)}G.set(t,{direction:o,gutterSize:i,panes:c,gutters:s}),Ar(t)||c.forEach(f=>{let g=C.get(f)?.size;g?(f.style.flexBasis=g,f.style.flexGrow="0"):(f.style.flexGrow="1",f.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((f,b)=>{pt(f,c[b],c[b+1],o)})}),yr(t,()=>{a.forEach(f=>f()),s.forEach(f=>f.remove()),G.delete(t),c.forEach(f=>C.delete(f)),t.classList.remove("nojs-split"),t.removeAttribute("data-direction")})}})}function _r(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Me(e){e.directive("pane",{priority:15,init(t,r,n){ut(),t.classList.add("nojs-pane"),C.has(t)||C.set(t,{size:n||null,min:parseInt(t.getAttribute("pane-min"),10)||0,max:parseInt(t.getAttribute("pane-max"),10)||1/0,collapsible:t.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=C.get(t),i=t.closest("[data-direction='vertical']")?"height":"width";o.min&&(t.style[`min${i==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(t.style[`max${i==="width"?"Width":"Height"}`]=`${o.max}px`),_r(t,()=>{t.classList.remove("nojs-pane"),C.delete(t),t.style.removeProperty("min-width"),t.style.removeProperty("min-height"),t.style.removeProperty("max-width"),t.style.removeProperty("max-height"),t.style.removeProperty("flex-basis"),t.style.removeProperty("flex-grow")})}})}function qe(e,t={}){Pe(e),Me(e)}function Be(){De()}var R={sorts:new Map};function $e(){R.sorts.clear()}function ot(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-table",""),t.textContent=e,document.head.appendChild(t)}function kr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function jr(e,t){let r=e.querySelector("tbody");if(!r)return null;let n=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?n=r:n=r.querySelector("[each]")||r.querySelector("[foreach]"),!n)return null;let o=n.getAttribute("each")||n.getAttribute("foreach");if(!o)return null;let i=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return i?{iteratorVar:i[1],arrayPath:i[2].trim()}:null}function Sr(e,t){let r=t.split("."),n=e;for(let o of r){if(n==null)return;n=n[o]}return n}function Re(e,t,r){let n=t.split("."),o=e;for(let i=0;i<n.length-1;i++){if(o[n[i]]==null)return;o=o[n[i]]}o[n[n.length-1]]=r}function He(e,t){let r=Number.isNaN(e),n=Number.isNaN(t);return r&&n?0:r?1:n||e<t?-1:e>t?1:0}function Ne(e,t,r){if(e==null&&t==null)return 0;if(e==null)return-1;if(t==null)return 1;switch(r){case"number":return He(Number(e),Number(t));case"date":return He(new Date(e).getTime(),new Date(t).getTime());default:return String(e).localeCompare(String(t))}}function Lr(e){let t=e.querySelectorAll("th[data-sortable]");for(let r of t)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Ge(e){e.directive("sortable",{priority:10,init(t){ot(),t.classList.add("nojs-sortable")}})}function We(e){e.directive("sort",{priority:11,init(t,r,n){ot();let o=n;if(!o)return;let i=t.getAttribute("sort-type")||"string",c=t.getAttribute("sort-default");t.setAttribute("data-sortable",""),t.setAttribute("aria-sort","none");let s=t.closest("table");if(!s)return;R.sorts.has(s)||R.sorts.set(s,{column:null,direction:null}),(c==="asc"||c==="desc")&&(R.sorts.get(s).column||Oe(t,s,o,i,c,e));let a=()=>{let p=R.sorts.get(s),f;p.column!==o?f="asc":p.direction==="asc"?f="desc":p.direction==="desc"?f=null:f="asc",Oe(t,s,o,i,f,e)};t.addEventListener("click",a),kr(t,()=>{t.removeEventListener("click",a),s&&!s.isConnected&&(R.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function Oe(e,t,r,n,o,i){let c=R.sorts.get(t);Lr(t),o?(e.setAttribute("data-sort-dir",o),e.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),c.column=r,c.direction=o):(c.column=null,c.direction=null);let s=jr(t,i);if(s){let a=i.findContext(t),p=a?Sr(a,s.arrayPath):null;if(Array.isArray(p)){if(!o){let b=t._nojsOriginalOrder;if(b){let g=new Set(p),d=b.filter(l=>g.has(l));for(let l of p)b.includes(l)||d.push(l);Re(a,s.arrayPath,d)}return}t._nojsOriginalOrder||(t._nojsOriginalOrder=[...p]);let f=[...p].sort((b,g)=>{let d=b!=null?b[r]:null,l=g!=null?g[r]:null,m=Ne(d,l,n);return o==="desc"?-m:m});Re(a,s.arrayPath,f);return}}Cr(t,e,r,n,o)}function Cr(e,t,r,n,o){let i=e.querySelector("tbody");if(!i)return;let a=[...t.closest("tr").children].indexOf(t);if(a<0)return;let p=[...i.querySelectorAll(":scope > tr")];if(e._nojsOriginalRows||(e._nojsOriginalRows=[...p]),!o){let g=document.createDocumentFragment();for(let d of e._nojsOriginalRows)g.appendChild(d);i.appendChild(g);return}let f=g=>{let d=g.replace(/[^0-9.\-]/g,"");return d===""||d==="-"?NaN:parseFloat(d)};p.sort((g,d)=>{let l=g.children[a]?.textContent?.trim()||"",m=d.children[a]?.textContent?.trim()||"",y=Ne(n==="number"?f(l):l,n==="number"?f(m):m,n);return o==="desc"?-y:y});let b=document.createDocumentFragment();for(let g of p)b.appendChild(g);i.appendChild(b)}function Ve(e){e.directive("fixed-header",{priority:10,init(t){ot(),t.classList.add("nojs-fixed-header")}})}function Ue(e){e.directive("fixed-col",{priority:10,init(t){ot(),t.classList.add("nojs-fixed-col")}})}function Ke(e,t={}){Ge(e),We(e),Ve(e),Ue(e)}function Xe(){$e()}var Tr=["tooltip","popover","popover-trigger","popover-dismiss","modal","modal-open","modal-close","dropdown","dropdown-toggle","dropdown-menu","dropdown-item","toast","toast-container","tabs","tab","tab-disabled","tab-position","tree","branch","subtree","stepper","step","skeleton","split","pane","panel","sortable","sort","fixed-header","fixed-col"],Ir={name:"nojs-elements",install(e,t={}){It(e,t),Pt(e,t),Gt(e,t),Qt(e,t),ie(e,t),fe(e,t),we(e,t),je(e,t),Ie(e,t),qe(e,t),Ke(e,t)},init(e){if(typeof document>"u"||!document.body)return;let t=Tr.map(n=>`[${n}]`).join(","),r;try{r=document.body.querySelectorAll(t)}catch{return}for(let n of r)n.__declared&&!n.__disposers&&!n.__ctx&&(n.__declared=!1);try{e.processTree(document.body)}catch(n){e.internals?.warn?.("nojs-elements init re-process error:",n.message)}},dispose(e){Dt(),Mt(),Wt(),Jt(),se(),me(),Ae(),Se(),Be(),Xe()}},_t=Ir;if(typeof window<"u"){let t=function(){return e?!0:window.NoJS&&typeof window.NoJS.use=="function"?(window.NoJS.use(_t),e=!0,!0):!1};window.NoJSElements=_t;let e=!1;if(!t()){let r=0,n=100,o=setInterval(()=>{(t()||++r>=n)&&clearInterval(o)},50);typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{t()&&clearInterval(o)},{once:!0})}}})();
//# sourceMappingURL=nojs-elements.js.map
