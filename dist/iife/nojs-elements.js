/**
 * NoJS Elements v1.12.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
(()=>{var U=new Map,C=new Map;function wt(){for(let e of C.values())clearTimeout(e);C.clear();for(let e of U.values())e.remove();U.clear()}function At(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tooltip",""),t.textContent=e,document.head.appendChild(t)}function Ne(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Z=8;function Ge(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,d=window.innerHeight,s,l;switch(r){case"bottom":s=i.bottom+Z,l=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,l=i.left-o.width-Z;break;case"right":s=i.top+(i.height-o.height)/2,l=i.right+Z;break;default:s=i.top-o.height-Z,l=i.left+(i.width-o.width)/2;break}l<4&&(l=4),l+o.width>n-4&&(l=n-o.width-4),s<4&&(s=4),s+o.height>d-4&&(s=d-o.height-4),e.style.top=`${s}px`,e.style.left=`${l}px`}var We=0;function Ve(e,t,r){document.body.appendChild(t),Ge(t,e,r),t.setAttribute("aria-hidden","false")}function Ue(e,t){t.setAttribute("aria-hidden","true"),t.remove()}function Et(e){e.directive("tooltip",{priority:20,init(t,r,i){At();let o=i;if(!o){console.warn("[tooltip] attribute value (tooltip text) is required.");return}let n=t.getAttribute("tooltip-position")||"top",d=parseInt(t.getAttribute("tooltip-delay"),10)||300,s=t.getAttribute("tooltip-disabled"),l=s?e.findContext(t):null,f=`nojs-tooltip-${++We}`,p=document.createElement("div");p.className="nojs-tooltip",p.setAttribute("role","tooltip"),p.setAttribute("id",f),p.setAttribute("aria-hidden","true"),p.textContent=o,t.setAttribute("aria-describedby",f),U.set(t,p);let m=()=>{if(s&&l&&e.evaluate(s,l))return;C.has(t)&&clearTimeout(C.get(t));let y=setTimeout(()=>{C.delete(t),!(s&&l&&e.evaluate(s,l))&&Ve(t,p,n)},d);C.set(t,y)},h=()=>{C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),Ue(t,p)},a=()=>m(),c=()=>h(),u=()=>m(),b=()=>h(),g=y=>{y.key==="Escape"&&p.getAttribute("aria-hidden")==="false"&&h()};t.addEventListener("mouseenter",a),t.addEventListener("mouseleave",c),t.addEventListener("focusin",u),t.addEventListener("focusout",b),t.addEventListener("keydown",g),Ne(t,()=>{t.removeEventListener("mouseenter",a),t.removeEventListener("mouseleave",c),t.removeEventListener("focusin",u),t.removeEventListener("focusout",b),t.removeEventListener("keydown",g),C.has(t)&&(clearTimeout(C.get(t)),C.delete(t)),p.remove(),U.delete(t)})}})}function jt(e,t={}){Et(e)}function _t(){wt()}var k=new Map;function kt(){k.clear()}function Q(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-popover",""),t.textContent=e,document.head.appendChild(t)}function ct(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var $=8;function dt(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,d=window.innerHeight,s,l;switch(r){case"top":s=i.top-o.height-$,l=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,l=i.left-o.width-$;break;case"right":s=i.top+(i.height-o.height)/2,l=i.right+$;break;default:s=i.bottom+$,l=i.left+(i.width-o.width)/2;break}r==="bottom"&&s+o.height>d&&(s=i.top-o.height-$),r==="top"&&s<0&&(s=i.bottom+$),l<4&&(l=4),l+o.width>n-4&&(l=n-o.width-4),s<4&&(s=4),s+o.height>d-4&&(s=d-o.height-4),e.style.top=`${s}px`,e.style.left=`${l}px`}function St(e){e.directive("popover",{priority:20,init(r,i,o){Q();let n=o||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",n),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let d=r.getAttribute("popover-position")||"bottom";if(!k.has(n))k.set(n,{popoverEl:r,triggerEls:new Set,position:d,open:!1});else{let l=k.get(n);l.popoverEl=r,l.position=d}let s=l=>{let f=k.get(n);if(!f)return;let p=l.newState==="open";f.open=p;for(let m of f.triggerEls)m.setAttribute("aria-expanded",String(p))};r.addEventListener("toggle",s),ct(r,()=>{r.removeEventListener("toggle",s),k.delete(n)})}}),e.directive("popover-trigger",{priority:20,init(r,i,o){Q();let n=o;if(!n){let f=(r.closest("[use]")||r.parentElement)?.querySelector("[data-popover-id]");if(f&&(n=f.getAttribute("data-popover-id")),!n){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",n),k.has(n)||k.set(n,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1}),k.get(n).triggerEls.add(r);let d=l=>{let f=k.get(n);if(!f||!f.popoverEl){console.warn(`[popover-trigger] no popover found with id "${n}".`);return}f.popoverEl.togglePopover(),requestAnimationFrame(()=>{f.popoverEl.matches(":popover-open")&&dt(f.popoverEl,r,f.position)})};r.addEventListener("click",d);let s=l=>{let f=k.get(n);l.key==="Escape"&&f?.open&&(f.popoverEl.hidePopover(),r.focus())};document.addEventListener("keydown",s),ct(r,()=>{r.removeEventListener("click",d),document.removeEventListener("keydown",s);let l=k.get(n);l&&l.triggerEls.delete(r)})}}),e.directive("popover-dismiss",{priority:20,init(r){Q();let i=()=>{let o=r.closest(".nojs-popover");o&&o.hidePopover()};r.addEventListener("click",i),ct(r,()=>r.removeEventListener("click",i))}});let t=(r,i)=>t.open(r,i);t.open=(r,i)=>{let o=k.get(r);if(!o||!o.popoverEl)return!1;try{o.popoverEl.showPopover()}catch{return!1}let n=i||[...o.triggerEls][0];return n&&requestAnimationFrame(()=>dt(o.popoverEl,n,o.position)),!0},t.close=r=>{let i=k.get(r);if(!i||!i.popoverEl)return!1;try{i.popoverEl.hidePopover()}catch{}return!0},t.toggle=(r,i)=>{let o=k.get(r);if(!o||!o.popoverEl)return!1;o.popoverEl.togglePopover();let n=i||[...o.triggerEls][0];return n&&o.popoverEl.matches(":popover-open")&&requestAnimationFrame(()=>dt(o.popoverEl,n,o.position)),!0},e.popover=t}function Lt(e,t={}){St(e)}function Ct(){kt()}var L=[],D=new Map,Ke=1e4;function Tt(){return Ke+L.length}function Dt(){L.length=0,D.clear()}function R(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-modal",""),t.textContent=e,document.head.appendChild(t)}function Ye(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var zt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',lt=new WeakMap;function Xe(e){let t=r=>{if(r.key!=="Tab")return;let i=[...e.querySelectorAll(zt)].filter(d=>d.offsetParent!==null);if(i.length===0){r.preventDefault();return}let o=i[0],n=i[i.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),n.focus()):document.activeElement===n&&(r.preventDefault(),o.focus())};e.addEventListener("keydown",t),lt.set(e,t)}function It(e){let t=lt.get(e);t&&(e.removeEventListener("keydown",t),lt.delete(e))}var K=new WeakMap;function Ft(e){e.directive("modal",{priority:10,init(r,i,o){R();let n=o||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${n}`,r.setAttribute("data-modal-id",n),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let d=r.querySelector("h1, h2, h3, h4, h5, h6");d&&(d.id||(d.id=`nojs-modal-heading-${n}`),r.setAttribute("aria-labelledby",d.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let l=r.getAttribute("modal-class"),f=r.getAttribute("modal-escape"),p=h=>{h.target===r&&s!=="false"&&f!=="false"&&O(r,n)};r.addEventListener("click",p),D.set(n,r);let m=h=>{if(h.newState==="open"){if(r.style.zIndex=String(Tt()),l&&l.split(/\s+/).filter(Boolean).forEach(a=>r.classList.add(a)),requestAnimationFrame(()=>{let a=r.querySelector(zt);a?a.focus():r.focus()}),Xe(r),f!=="false"){let a=c=>{c.key==="Escape"&&(c.stopPropagation(),O(r,n))};r.addEventListener("keydown",a),K.set(r,a)}}else if(h.newState==="closed"){l&&l.split(/\s+/).filter(Boolean).forEach(u=>r.classList.remove(u)),It(r);let a=K.get(r);a&&(r.removeEventListener("keydown",a),K.delete(r));let c=L.findIndex(u=>u.id===n);if(c!==-1){let u=L[c];L.splice(c,1),u.triggerEl&&requestAnimationFrame(()=>{u.triggerEl.focus()})}}};r.addEventListener("toggle",m),Ye(r,()=>{r.removeEventListener("click",p),r.removeEventListener("toggle",m),It(r);let h=K.get(r);h&&(r.removeEventListener("keydown",h),K.delete(r)),D.delete(n);let a=L.findIndex(c=>c.id===n);a!==-1&&L.splice(a,1)})}});let t=r=>t.open(r);t.open=r=>{let i=D.get(r);if(!i)return!1;L.push({id:r,el:i,triggerEl:null});try{i.showPopover()}catch{return!1}return!0},t.close=r=>{let i=D.get(r);return i?(O(i,r),!0):!1},t.closeAll=()=>{for(let r=L.length-1;r>=0;r--)O(L[r].el,L[r].id)},e.modal=t}function O(e,t){try{e.hidePopover()}catch{}}function Ze(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Pt(e){e.directive("modal-open",{priority:10,init(t,r,i){R();let o=i;if(!o){let m=(t.closest("[use]")||t.parentElement)?.querySelector("[data-modal-id]");if(m&&(o=m.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded","false");let n=()=>{let p=D.get(o)||document.querySelector(`[data-modal-id="${o}"]`);if(!p){console.warn(`[modal-open] modal "${o}" not found`);return}L.push({id:o,el:p,triggerEl:t}),t.setAttribute("aria-expanded","true"),p.id&&t.setAttribute("aria-controls",p.id);try{p.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`)}},d=()=>{t.setAttribute("aria-expanded","false")},s=null,l=null;requestAnimationFrame(()=>{let p=D.get(o);p&&(l=p,s=m=>{m.newState==="closed"&&t.setAttribute("aria-expanded","false")},p.addEventListener("toggle",s))}),t.addEventListener("click",n),Ze(t,()=>{t.removeEventListener("click",n),l&&s&&l.removeEventListener("toggle",s)})}})}function Qe(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Mt(e){e.directive("modal-close",{priority:10,init(t,r,i){R();let o=()=>{let n,d;if(i){if(d=i,n=D.get(d),!n){console.warn(`[modal-close] modal "${d}" not found`);return}}else{if(n=t.closest("[modal]"),!n){console.warn("[modal-close] no parent modal found");return}d=n.getAttribute("modal")}O(n,d)};t.addEventListener("click",o),Qe(t,()=>{t.removeEventListener("click",o)})}})}function qt(e,t={}){Ft(e),Pt(e),Mt(e)}function Bt(){Dt()}var P={openMenus:new Map};function Ht(){P.openMenus.clear()}function N(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-dropdown",""),t.textContent=e,document.head.appendChild(t)}var Je=0;function tr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function $t(e,t,r){let i=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";e.style.top="",e.style.left="";let n=t.getBoundingClientRect(),d=e.getBoundingClientRect(),s=window.innerHeight,l=window.innerWidth,f,p;switch(i){case"top":f=n.top-d.height,p=n.left;break;case"left":f=n.top,p=n.left-d.width;break;case"right":f=n.top,p=n.right;break;default:f=n.bottom,p=n.left}i==="bottom"||i==="top"?o==="end"&&(p=n.right-d.width):o==="end"&&(f=n.bottom-d.height),i==="bottom"&&f+d.height>s&&n.top-d.height>0?f=n.top-d.height:i==="top"&&f<0&&n.bottom+d.height<=s&&(f=n.bottom),p<4&&(p=4),p+d.width>l-4&&(p=l-d.width-4),e.style.top=`${f}px`,e.style.left=`${p}px`}function ut(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function pt(e){let t=ut(e);t.length&&t[0].focus()}function Rt(e){let t=ut(e);t.length&&t[t.length-1].focus()}function Ot(e){e.directive("dropdown",{priority:15,init(r){N()}}),e.directive("dropdown-toggle",{priority:15,init(r){N();let i=r.closest("[dropdown]");if(!i)return;let o=i.querySelector("[dropdown-menu]");if(!o)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),o.classList.add("nojs-dropdown-menu"),o.setAttribute("role","menu"),o.setAttribute("popover","auto"),o.id||(o.id=`nojs-dd-menu-${Date.now()}-${Je++}`),r.setAttribute("aria-controls",o.id);let n=!1,d=typeof o.showPopover=="function"&&typeof o.hidePopover=="function";function s(){if(o.setAttribute("data-open",""),d&&!n)try{o.showPopover(),n=!0}catch{n=!1}r.setAttribute("aria-expanded","true"),$t(o,r,i),P.openMenus.set(o,{toggle:r,wrapper:i})}function l(){if(d&&n){n=!1;try{o.hidePopover()}catch{}}o.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),P.openMenus.delete(o)}function f(){return r.getAttribute("aria-expanded")==="true"}let p=g=>{g.newState==="closed"&&f()&&l()};o.addEventListener("toggle",p);let m=g=>{g.preventDefault(),g.stopPropagation(),f()?l():s()};r.addEventListener("click",m);let h=g=>{f()&&!i.contains(g.target)&&l()};document.addEventListener("click",h,!0);let a=g=>{g.key==="Escape"&&f()&&(l(),r.focus())};document.addEventListener("keydown",a);let c=g=>{switch(g.key){case"Enter":case" ":g.preventDefault(),s(),pt(o);break;case"ArrowDown":g.preventDefault(),s(),pt(o);break;case"ArrowUp":g.preventDefault(),s(),Rt(o);break}};r.addEventListener("keydown",c);let u=g=>{if(!(!f()||ut(o).find(T=>T===document.activeElement)))switch(g.key){case"ArrowDown":g.preventDefault(),pt(o);break;case"ArrowUp":g.preventDefault(),Rt(o);break}};o.addEventListener("keydown",u);let b=()=>{f()&&$t(o,r,i)};window.addEventListener("scroll",b,!0),window.addEventListener("resize",b),tr(r,()=>{r.removeEventListener("click",m),r.removeEventListener("keydown",c),o.removeEventListener("keydown",u),o.removeEventListener("toggle",p),document.removeEventListener("click",h,!0),document.removeEventListener("keydown",a),window.removeEventListener("scroll",b,!0),window.removeEventListener("resize",b),P.openMenus.delete(o)})}}),e.directive("dropdown-menu",{priority:15,init(r){N(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let t=r=>t.open(r);t.open=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")==="true"?!1:(n.click(),!0)},t.close=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")!=="true"?!1:(n.click(),!0)},e.dropdown=t}function Nt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function er(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function ft(e,t){if(!e)return;if(typeof e.hidePopover=="function")try{e.hidePopover()}catch{}e.removeAttribute("data-open");let r=t&&t.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),P.openMenus.has(e)&&P.openMenus.delete(e)}function Gt(e){e.directive("dropdown-item",{priority:15,init(t){N();let r=t.closest("[dropdown-menu]"),i=t.closest("[dropdown]");t.setAttribute("role","menuitem"),t.setAttribute("tabindex","-1"),t.classList.add("nojs-dropdown-item"),t.hasAttribute("disabled")&&t.setAttribute("aria-disabled","true");let o=d=>{if(!r)return;let s=er(r),l=s.indexOf(t);switch(d.key){case"ArrowDown":{d.preventDefault(),(l+1<s.length?s[l+1]:s[0]).focus();break}case"ArrowUp":{d.preventDefault(),(l-1>=0?s[l-1]:s[s.length-1]).focus();break}case"Home":{d.preventDefault(),s.length&&s[0].focus();break}case"End":{d.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{d.preventDefault(),t.click();break}case"Escape":{if(d.preventDefault(),ft(r,i),i){let f=i.querySelector("[dropdown-toggle]");f&&f.focus()}break}case"Tab":{ft(r,i);break}}};t.addEventListener("keydown",o),Nt(t,()=>t.removeEventListener("keydown",o));let n=()=>{if(ft(r,i),i){let d=i.querySelector("[dropdown-toggle]");d&&d.focus()}};t.addEventListener("click",n),Nt(t,()=>t.removeEventListener("click",n))}})}function Wt(e,t={}){Ot(e),Gt(e)}function Vt(){Ht()}var I=new Map,G=new Set,Ut=0;function Kt(){return++Ut}function Yt(){for(let e of G)clearTimeout(e);G.clear();for(let e of I.values())e.remove();I.clear(),Ut=0}function Xt(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-toast",""),t.textContent=e,document.head.appendChild(t)}function mt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var rr=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function bt(){return I.size>0?I.values().next().value:or("top-right")}function or(e){if(I.has(e))return I.get(e);let t=document.createElement("div");return t.classList.add("nojs-toast-container"),t.setAttribute("data-position",e),t.setAttribute("role","log"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions"),document.body.appendChild(t),I.set(e,t),t}function nr(e){return e.startsWith("top")}function gt(e,t,r,i,o){let n=Kt(),d=e.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",n),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let l=document.createElement("span");if(l.textContent=t,s.appendChild(l),o){let f=document.createElement("button");f.type="button",f.classList.add("nojs-toast-dismiss"),f.setAttribute("aria-label","Dismiss"),f.textContent="\xD7",f.addEventListener("click",()=>J(s)),s.appendChild(f)}if(nr(d)&&e.firstChild?e.insertBefore(s,e.firstChild):e.appendChild(s),i>0){let f=setTimeout(()=>{G.delete(f),J(s)},i);G.add(f),s._toastTimerId=f}return s}function J(e){!e||!e.isConnected||(e._toastTimerId!=null&&(clearTimeout(e._toastTimerId),G.delete(e._toastTimerId)),e.remove())}function Zt(e){Xt(),e.directive("toast-container",{priority:10,init(r,i,o){let n=o&&rr.has(o)?o:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",n),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),I.set(n,r),mt(r,()=>{I.get(n)===r&&I.delete(n)})}}),e.directive("toast",{priority:10,init(r,i,o){if(!o)return;let n=r.getAttribute("toast-type")||"info",d=parseInt(r.getAttribute("toast-duration"),10)||3e3,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let a=()=>{let c=bt();gt(c,o,n,d,s)};r.addEventListener("click",a),mt(r,()=>r.removeEventListener("click",a));return}let f=e.findContext(r),p;function m(){let a=e.evaluate(o,f);if(a&&a!==p){let c=typeof a=="string"?a:String(a),u=bt();gt(u,c,n,d,s)}p=a}let h=f.$watch(m);mt(r,h)}});let t=(r,i="info",o=3e3)=>{if(typeof document>"u")return;let n=!0,d=bt();return gt(d,String(r),i,o,n)};t.dismiss=r=>{let i=document.querySelector(`[data-toast-id="${r}"]`);i&&J(i)},t.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>J(r))},e.toast=t}function Qt(e,t={}){Zt(e)}function Jt(){Yt()}var q={containers:new Map};function te(){q.containers.clear()}function ee(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tabs",""),t.textContent=e,document.head.appendChild(t)}function ir(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var sr=0;function re(e){return`${e}-${++sr}`}function ht(e,t){let r=q.containers.get(e);if(!r)return;let{tabs:i,panels:o}=r;if(!(t<0||t>=i.length)&&i[t].getAttribute("aria-disabled")!=="true"){for(let n=0;n<i.length;n++)i[n].setAttribute("aria-selected","false"),i[n].setAttribute("tabindex","-1"),o[n].setAttribute("aria-hidden","true"),o[n].inert=!0;i[t].setAttribute("aria-selected","true"),i[t].setAttribute("tabindex","0"),o[t].setAttribute("aria-hidden","false"),o[t].inert=!1,r.activeIndex=t}}function Y(e,t,r){let i=e.length,o=t;for(let n=0;n<i;n++)if(o=(o+r+i)%i,e[o].getAttribute("aria-disabled")!=="true")return o;return t}function oe(e){e.directive("tabs",{priority:10,init(t,r,i){ee();let o=[],n=[];for(let c of Array.from(t.children))c.hasAttribute("tab")?o.push(c):c.hasAttribute("panel")&&n.push(c);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==n.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+n.length+" panels.");let d=t.getAttribute("tab-position")||"top";t.setAttribute("data-position",d),t.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let l=Math.min(o.length,n.length);for(let c=0;c<l;c++){let u=o[c],b=n[c],g=u.id||re("nojs-tab"),y=b.id||re("nojs-panel");u.id=g,b.id=y,u.setAttribute("role","tab"),u.setAttribute("aria-selected","false"),u.setAttribute("aria-controls",y),u.setAttribute("tabindex","-1"),u.classList.add("nojs-tab"),b.setAttribute("role","tabpanel"),b.setAttribute("aria-labelledby",g),b.setAttribute("tabindex","0"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel"),s.appendChild(u)}let f=n[0];f?t.insertBefore(s,f):t.appendChild(s),q.containers.set(t,{tabs:o.slice(0,l),panels:n.slice(0,l),activeIndex:-1});let p=e.findContext(t);for(let c=0;c<l;c++){let u=o[c].getAttribute("tab-disabled");u&&e.evaluate(u,p)&&o[c].setAttribute("aria-disabled","true")}let m=0;if(i&&i.trim()!==""){let c=parseInt(i,10);!isNaN(c)&&c>=0&&c<l&&(m=c)}o[m]?.getAttribute("aria-disabled")==="true"&&(m=Y(o.slice(0,l),m,1)),ht(t,m);let h=c=>{let u=q.containers.get(t);if(!u)return;let b=c.target;if(b.getAttribute("role")!=="tab")return;let{tabs:g}=u,y=g.indexOf(b);if(y===-1)return;let w=-1;switch(c.key){case"ArrowRight":case"ArrowDown":w=Y(g,y,1);break;case"ArrowLeft":case"ArrowUp":w=Y(g,y,-1);break;case"Home":w=Y(g,g.length-1,1);break;case"End":w=Y(g,0,-1);break;case"Tab":return;default:return}w!==-1&&w!==y&&(c.preventDefault(),ht(t,w),g[w].focus())};s.addEventListener("keydown",h);let a=c=>{let u=c.target.closest("[role='tab']");if(!u)return;let b=q.containers.get(t);if(!b)return;let g=b.tabs.indexOf(u);g!==-1&&(ht(t,g),u.focus())};s.addEventListener("click",a),ir(t,()=>{s.removeEventListener("keydown",h),s.removeEventListener("click",a),q.containers.delete(t)})}})}function ne(e){e.directive("tab",{priority:11,init(){}}),e.directive("tab-disabled",{priority:11,init(){}}),e.directive("tab-position",{priority:11,init(){}})}function ie(e){e.directive("panel",{priority:11,init(){}})}function se(e,t={}){oe(e),ne(e),ie(e)}function ae(){te()}var E={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function ce(){E.branches.clear(),E.selectedItem=null,E.typeahead="",E.typeaheadTimer&&(clearTimeout(E.typeaheadTimer),E.typeaheadTimer=null)}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tree",""),t.textContent=e,document.head.appendChild(t)}function vt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function de(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),i;for(;i=r.nextNode();)t.push(i);return t}function le(e){return e.closest('[role="tree"]')}function ar(e){let t=e.cloneNode(!0);return t.querySelectorAll('[role="group"]').forEach(i=>i.remove()),(t.textContent||"").trim().toLowerCase()}function pe(e){e.directive("tree",{priority:15,init(t){tt(),t.classList.add("nojs-tree"),t.setAttribute("role","tree"),t.getAttribute("tree-icon")==="false"&&t.setAttribute("data-tree-icon","false")}})}function ue(e){e.directive("branch",{priority:16,init(t,r,i){tt();let o=i==="expanded";t.classList.add("nojs-branch"),t.setAttribute("role","treeitem"),t.setAttribute("aria-expanded",String(o));let n=le(t);if(n){let a=n.querySelector('[role="treeitem"]');t.setAttribute("tabindex",a===t?"0":"-1")}else t.setAttribute("tabindex","0");let d=!1;queueMicrotask(()=>{if(d)return;let a=t.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(t.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?t.nextElementSibling:null);a?(E.branches.set(t,{expanded:o,subtreeEl:a}),a.setAttribute("aria-hidden",String(!o))):E.branches.set(t,{expanded:o,subtreeEl:null})});function s(a){let c=E.selectedItem;c&&c!==a&&(c.classList.remove("nojs-branch-selected"),c.setAttribute("aria-selected","false")),a.classList.add("nojs-branch-selected"),a.setAttribute("aria-selected","true"),E.selectedItem=a}function l(a){let c=E.branches.get(a);!c||!c.subtreeEl||(c.expanded=!c.expanded,a.setAttribute("aria-expanded",String(c.expanded)),c.subtreeEl.setAttribute("aria-hidden",String(!c.expanded)))}function f(a){let c=E.branches.get(a);!c||!c.subtreeEl||c.expanded||(c.expanded=!0,a.setAttribute("aria-expanded","true"),c.subtreeEl.setAttribute("aria-hidden","false"))}function p(a){let c=E.branches.get(a);!c||!c.subtreeEl||!c.expanded||(c.expanded=!1,a.setAttribute("aria-expanded","false"),c.subtreeEl.setAttribute("aria-hidden","true"))}let m=a=>{a.target!==t&&!t.contains(a.target)||(a.stopPropagation(),s(t),l(t))};t.addEventListener("click",m),vt(t,()=>t.removeEventListener("click",m));let h=a=>{let c=le(t);if(!c)return;let u=de(c),b=u.indexOf(t),g=E.branches.get(t),y=g&&g.subtreeEl;switch(a.key){case"ArrowRight":if(a.preventDefault(),y&&!g.expanded)f(t);else if(y&&g.expanded){let w=g.subtreeEl.querySelector('[role="treeitem"]');w&&B(w,u)}break;case"ArrowLeft":if(a.preventDefault(),y&&g.expanded)p(t);else{let w=t.parentElement?.closest('[role="treeitem"]');w&&B(w,de(c))}break;case"ArrowDown":a.preventDefault(),b<u.length-1&&B(u[b+1],u);break;case"ArrowUp":a.preventDefault(),b>0&&B(u[b-1],u);break;case"Enter":case" ":a.preventDefault(),s(t),l(t);break;case"Home":a.preventDefault(),u.length>0&&B(u[0],u);break;case"End":a.preventDefault(),u.length>0&&B(u[u.length-1],u);break;default:if(a.key.length===1&&!a.ctrlKey&&!a.altKey&&!a.metaKey){a.preventDefault(),E.typeahead+=a.key.toLowerCase(),E.typeaheadTimer&&clearTimeout(E.typeaheadTimer),E.typeaheadTimer=setTimeout(()=>{E.typeahead="",E.typeaheadTimer=null},500);let w=b+1;for(let T=0;T<u.length;T++){let z=(w+T)%u.length;if(ar(u[z]).startsWith(E.typeahead)){B(u[z],u);break}}}break}};t.addEventListener("keydown",h),vt(t,()=>t.removeEventListener("keydown",h)),vt(t,()=>{d=!0,E.branches.delete(t),E.selectedItem===t&&(E.selectedItem=null)})}})}function B(e,t){for(let r of t)r.setAttribute("tabindex",r===e?"0":"-1");e.focus()}function fe(e){e.directive("subtree",{priority:16,init(t){tt(),t.classList.add("nojs-subtree"),t.classList.add("nojs-tree"),t.setAttribute("role","group");for(let i of t.children)i.tagName==="LI"&&!i.querySelector("[branch], .nojs-branch")&&(i.setAttribute("role","treeitem"),i.setAttribute("tabindex","-1"),i.classList.add("nojs-tree-leaf"));let r=t.parentElement?.matches?.('[role="treeitem"]')?t.parentElement:t.previousElementSibling?.matches?.('[role="treeitem"]')?t.previousElementSibling:null;if(r){let i=E.branches.get(r);i?(t.setAttribute("aria-hidden",String(!i.expanded)),i.subtreeEl=t):t.setAttribute("aria-hidden","true")}else t.setAttribute("aria-hidden","true")}})}function me(e,t={}){pe(e),ue(e),fe(e)}function be(){ce()}var et=new Map;function ge(){et.clear()}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-stepper",""),t.textContent=e,document.head.appendChild(t)}function cr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function he(e){e.directive("stepper",{priority:14,init(t,r,i){rt();let o=e.findContext(t),n=Array.from(t.querySelectorAll("[step]"));if(!n.length){console.warn("[stepper] No [step] children found.");return}let d=i&&parseInt(i,10)||0,s=t.getAttribute("stepper-mode")||"linear",l=t.getAttribute("stepper-indicator")!=="false",f=t.getAttribute("stepper-nav")!=="false",p=t.getAttribute("aria-label")||"Stepper",m=Math.max(0,Math.min(d,n.length-1));t.setAttribute("role","group"),t.setAttribute("aria-label",p),t.classList.add("nojs-stepper");let h=null,a=[];l&&(h=document.createElement("div"),h.className="nojs-stepper-indicator",h.setAttribute("role","tablist"),h.setAttribute("aria-label","Progress"),n.forEach((x,A)=>{if(A>0){let at=document.createElement("div");at.className="nojs-stepper-separator",at.setAttribute("aria-hidden","true"),h.appendChild(at)}let j=document.createElement("button");j.type="button",j.className="nojs-stepper-indicator-item",j.setAttribute("role","tab"),j.setAttribute("aria-selected",A===m?"true":"false");let V=x.getAttribute("step-label")||`Step ${A+1}`,F=document.createElement("span");F.textContent=V,j.appendChild(F),j.setAttribute("aria-label",V);let Oe=`nojs-stepper-tab-${dr++}`;j.id=Oe,s==="free"?(j.setAttribute("data-clickable",""),j.addEventListener("click",()=>z(A))):j.setAttribute("tabindex","-1"),h.appendChild(j),a.push(j)}),h.addEventListener("keydown",x=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(x.key))return;x.preventDefault();let A=m;x.key==="ArrowRight"?A=Math.min(m+1,n.length-1):x.key==="ArrowLeft"?A=Math.max(m-1,0):x.key==="Home"?A=0:x.key==="End"&&(A=n.length-1),s==="free"&&z(A),a[A]?.focus()}),t.insertBefore(h,t.firstChild));let c=null,u=null,b=null;f&&(c=document.createElement("div"),c.className="nojs-stepper-nav",c.setAttribute("aria-hidden","true"),u=document.createElement("button"),u.type="button",u.className="nojs-stepper-prev",u.textContent="Previous",u.addEventListener("click",()=>T()),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-next",b.textContent="Next",b.addEventListener("click",()=>w()),c.appendChild(u),c.appendChild(b),t.appendChild(c));function g(x){let A=n[x];if(!A)return!0;let j=A.querySelectorAll("[required]");for(let F of j)if(typeof F.checkValidity=="function"&&!F.checkValidity())return F.reportValidity(),!1;let V=A.getAttribute("step-validate");if(V)try{if(!e.evaluate(V,o))return!1}catch(F){return console.warn(`[stepper] step-validate error: ${F.message}`),!1}return!0}function y(){n.forEach((x,A)=>{let j=A===m;x.setAttribute("aria-hidden",j?"false":"true"),j?(x.removeAttribute("inert"),x.setAttribute("aria-current","step")):(x.setAttribute("inert",""),x.removeAttribute("aria-current"))}),a.length&&a.forEach((x,A)=>{x.setAttribute("aria-selected",A===m?"true":"false"),A<m?x.setAttribute("data-completed",""):x.removeAttribute("data-completed"),x.setAttribute("tabindex",A===m?"0":"-1");let j=n[A];j.id&&(x.setAttribute("aria-controls",j.id),j.setAttribute("aria-labelledby",x.id))}),u&&(u.disabled=m===0),b&&(b.textContent=m===n.length-1?"Finish":"Next"),t.dispatchEvent(new CustomEvent("step-change",{bubbles:!0,detail:{current:m,total:n.length}}))}function w(){return m>=n.length-1||s==="linear"&&!g(m)?!1:(m++,y(),W(),!0)}function T(){return m<=0?!1:(m--,y(),W(),!0)}function z(x){if(x<0||x>=n.length||x===m)return!1;if(s==="linear"&&x>m){for(let A=m;A<x;A++)if(!g(A))return!1}return m=x,y(),W(),!0}let st={get current(){return m},get total(){return n.length},next:w,prev:T,goTo:z,get isFirst(){return m===0},get isLast(){return m===n.length-1}};function W(){o.$stepper=st}W(),et.set(t,{current:m,steps:n,mode:s,indicatorEl:h,navEl:c}),y(),cr(t,()=>{et.delete(t),h&&h.parentNode&&h.remove(),c&&c.parentNode&&c.remove(),delete o.$stepper})}})}var dr=0;var lr=0;function ve(e){e.directive("step",{priority:13,init(t,r,i){rt(),t.classList.add("nojs-step"),t.setAttribute("role","tabpanel"),t.id||(t.id=`nojs-stepper-panel-${lr++}`),t.setAttribute("tabindex","0")}})}function ye(e,t={}){ve(e),he(e)}function xe(){ge()}function we(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-skeleton",""),t.textContent=e,document.head.appendChild(t)}function Ae(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ee(e){e.directive("skeleton",{priority:10,init(t,r,i){we();let o=e.findContext(t),n=t.getAttribute("skeleton-type")||"text",d=t.getAttribute("skeleton-lines"),s=t.getAttribute("skeleton-size"),l=[];function f(b){p();for(let g=0;g<b;g++){let y=document.createElement("div");y.className="nojs-skeleton-line",t.appendChild(y),l.push(y)}}function p(){for(let b of l)b.parentNode===t&&t.removeChild(b);l=[]}function m(){if(t.classList.add("nojs-skeleton"),n==="circle"&&t.classList.add("nojs-skeleton-circle"),s&&(n==="circle"||n==="rect")){let b=s+(String(s).match(/\d$/)?"px":"");t.style.width=b,t.style.height=b}if(d){let b=parseInt(d,10);b>0&&f(b)}t.setAttribute("aria-busy","true")}function h(){t.classList.add("nojs-skeleton-fade"),t.classList.remove("nojs-skeleton"),t.classList.remove("nojs-skeleton-circle"),p(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""),t.removeAttribute("aria-busy");let b=!1,g=()=>{b||(b=!0,t.classList.remove("nojs-skeleton-fade"),t.removeEventListener("transitionend",g))};t.addEventListener("transitionend",g),setTimeout(g,500)}let a=!1;function c(){let b=!!e.evaluate(i,o);b&&!a?(a=!0,m()):!b&&a&&(a=!1,h())}c();let u=o.$watch(c);Ae(t,u),Ae(t,()=>{a&&(t.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),t.removeAttribute("aria-busy"),p(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""))})}})}function je(e,t={}){Ee(e)}var H=new Map,_=new Map,v={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function _e(){H.clear(),_.clear(),v.active=!1,v.splitEl=null,v.gutterEl=null,v.prevPane=null,v.nextPane=null,v.direction=null,v.startPos=0,v.startPrevSize=0,v.startNextSize=0,v.containerSize=0}function ot(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-split",""),t.textContent=e,document.head.appendChild(t)}function pr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ke(e){return e==="horizontal"?"clientX":"clientY"}function S(e,t){return t==="horizontal"?e.offsetWidth:e.offsetHeight}function ur(e,t){let i=(H.get(e)?.gutters||[]).reduce((o,n)=>o+S(n,t),0);return S(e,t)-i}function nt(e,t){let r=_.get(t);return r?r.min!=null&&e<r.min?r.min:r.max!=null&&e>r.max?r.max:e:e}function it(e,t,r,i){let o=S(t,i),n=S(r,i),d=_.get(t),s=_.get(r);e.setAttribute("aria-valuenow",Math.round(o)),e.setAttribute("aria-valuemin",d?.min||0),e.setAttribute("aria-valuemax",Math.round(o+n-(s?.min||0)))}function yt(e){let t=e.getAttribute("split-persist");if(!t)return;let r=H.get(e);if(!r)return;let i=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${t}`,JSON.stringify(i))}catch{}}function fr(e){let t=e.getAttribute("split-persist");if(!t)return!1;try{let r=localStorage.getItem(`nojs-split:${t}`);if(!r)return!1;let i=JSON.parse(r),o=H.get(e);return!o||i.length!==o.panes.length?!1:(i.forEach((n,d)=>{n&&(o.panes[d].style.flexBasis=n,o.panes[d].style.flexGrow="0")}),!0)}catch{return!1}}function mr(e,t,r,i,o){let n=document.createElement("div");n.className="nojs-gutter",n.setAttribute("role","separator"),n.setAttribute("tabindex","0"),n.setAttribute("aria-orientation",t==="horizontal"?"vertical":"horizontal"),n.setAttribute("aria-label","Resize"),o!==6&&n.style.setProperty("--nojs-gutter-size",`${o}px`);let d=a=>{if(a.button!==0)return;a.preventDefault();let c=ur(e,t);v.active=!0,v.splitEl=e,v.gutterEl=n,v.prevPane=r,v.nextPane=i,v.direction=t,v.startPos=a[ke(t)],v.startPrevSize=S(r,t),v.startNextSize=S(i,t),v.containerSize=c,document.body.style.cursor=t==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",n.setPointerCapture(a.pointerId)},s=a=>{if(!v.active||v.gutterEl!==n)return;let c=a[ke(v.direction)]-v.startPos,u=nt(v.startPrevSize+c,v.prevPane),b=nt(v.startNextSize-c,v.nextPane),g=v.startPrevSize+v.startNextSize;u+b!==g&&(u!==v.startPrevSize+c?b=g-u:u=g-b),v.prevPane.style.flexBasis=`${u}px`,v.prevPane.style.flexGrow="0",v.nextPane.style.flexBasis=`${b}px`,v.nextPane.style.flexGrow="0",it(n,v.prevPane,v.nextPane,v.direction)},l=()=>{!v.active||v.gutterEl!==n||(v.active=!1,document.body.style.cursor="",document.body.style.userSelect="",yt(e),e.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:i}})))};n.addEventListener("pointerdown",d),n.addEventListener("pointermove",s),n.addEventListener("pointerup",l),n.addEventListener("pointercancel",l);let f=10,p=a=>{let c=t==="horizontal",u=0;if(c&&a.key==="ArrowRight"||!c&&a.key==="ArrowDown")u=f;else if(c&&a.key==="ArrowLeft"||!c&&a.key==="ArrowUp")u=-f;else if(a.key==="Home")u=(_.get(r)?.min||0)-S(r,t);else if(a.key==="End"){let z=_.get(i);u=S(r,t)+S(i,t)-(z?.min||0)-S(r,t)}else return;a.preventDefault();let b=S(r,t),g=S(i,t),y=b+g,w=nt(b+u,r),T=nt(y-w,i);w=y-T,r.style.flexBasis=`${w}px`,r.style.flexGrow="0",i.style.flexBasis=`${T}px`,i.style.flexGrow="0",it(n,r,i,t),yt(e)};n.addEventListener("keydown",p);let m=()=>{let a=_.get(r),c=_.get(i),u=a?.collapsible?r:c?.collapsible?i:null;if(!u)return;let b=_.get(u);if(!b)return;let g=u===r?i:r,y=S(r,t)+S(i,t);if(b.collapsed){b.collapsed=!1,u.removeAttribute("data-collapsed");let w=b.preCollapseSize||`${Math.round(y/2)}px`;u.style.flexBasis=w,u.style.flexGrow="0",g.style.flexBasis=`${y-parseFloat(w)}px`,g.style.flexGrow="0"}else b.preCollapseSize=u.style.flexBasis||`${S(u,t)}px`,b.collapsed=!0,u.setAttribute("data-collapsed","true"),u.style.flexBasis="0px",u.style.flexGrow="0",g.style.flexBasis=`${y}px`,g.style.flexGrow="0";it(n,r,i,t),yt(e),e.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:u,collapsed:b.collapsed}}))};return n.addEventListener("dblclick",m),{gutter:n,cleanup:()=>{n.removeEventListener("pointerdown",d),n.removeEventListener("pointermove",s),n.removeEventListener("pointerup",l),n.removeEventListener("pointercancel",l),n.removeEventListener("keydown",p),n.removeEventListener("dblclick",m)}}}function Se(e){e.directive("split",{priority:14,init(t,r,i){ot();let o=(i||"horizontal").trim()==="vertical"?"vertical":"horizontal",n=parseInt(t.getAttribute("split-gutter"),10)||6;t.classList.add("nojs-split"),t.setAttribute("data-direction",o);let d=Array.from(t.children).filter(p=>p.hasAttribute("pane"));if(d.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${d.length}.`);return}d.forEach(p=>{_.get(p)||_.set(p,{size:p.getAttribute("pane")||null,min:parseInt(p.getAttribute("pane-min"),10)||0,max:parseInt(p.getAttribute("pane-max"),10)||1/0,collapsible:p.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],l=[];for(let p=0;p<d.length-1;p++){let{gutter:m,cleanup:h}=mr(t,o,d[p],d[p+1],n);d[p].after(m),s.push(m),l.push(h)}H.set(t,{direction:o,gutterSize:n,panes:d,gutters:s}),fr(t)||d.forEach(p=>{let h=_.get(p)?.size;h?(p.style.flexBasis=h,p.style.flexGrow="0"):(p.style.flexGrow="1",p.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((p,m)=>{it(p,d[m],d[m+1],o)})}),pr(t,()=>{l.forEach(p=>p()),s.forEach(p=>p.remove()),H.delete(t),d.forEach(p=>_.delete(p)),t.classList.remove("nojs-split"),t.removeAttribute("data-direction")})}})}function br(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Le(e){e.directive("pane",{priority:15,init(t,r,i){ot(),t.classList.add("nojs-pane"),_.has(t)||_.set(t,{size:i||null,min:parseInt(t.getAttribute("pane-min"),10)||0,max:parseInt(t.getAttribute("pane-max"),10)||1/0,collapsible:t.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=_.get(t),n=t.closest("[data-direction='vertical']")?"height":"width";o.min&&(t.style[`min${n==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(t.style[`max${n==="width"?"Width":"Height"}`]=`${o.max}px`),br(t,()=>{t.classList.remove("nojs-pane"),_.delete(t),t.style.removeProperty("minWidth"),t.style.removeProperty("minHeight"),t.style.removeProperty("maxWidth"),t.style.removeProperty("maxHeight"),t.style.removeProperty("flexBasis"),t.style.removeProperty("flexGrow")})}})}function Ce(e,t={}){Se(e),Le(e)}function Te(){_e()}var M={sorts:new Map};function De(){M.sorts.clear()}function X(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-table",""),t.textContent=e,document.head.appendChild(t)}function gr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function hr(e,t){let r=e.querySelector("tbody");if(!r)return null;let i=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?i=r:i=r.querySelector("[each]")||r.querySelector("[foreach]"),!i)return null;let o=i.getAttribute("each")||i.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim()}:null}function vr(e,t){let r=t.split("."),i=e;for(let o of r){if(i==null)return;i=i[o]}return i}function Ie(e,t,r){let i=t.split("."),o=e;for(let n=0;n<i.length-1;n++){if(o[i[n]]==null)return;o=o[i[n]]}o[i[i.length-1]]=r}function ze(e,t){let r=Number.isNaN(e),i=Number.isNaN(t);return r&&i?0:r?1:i||e<t?-1:e>t?1:0}function Pe(e,t,r){if(e==null&&t==null)return 0;if(e==null)return-1;if(t==null)return 1;switch(r){case"number":return ze(Number(e),Number(t));case"date":return ze(new Date(e).getTime(),new Date(t).getTime());default:return String(e).localeCompare(String(t))}}function yr(e){let t=e.querySelectorAll("th[data-sortable]");for(let r of t)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function Me(e){e.directive("sortable",{priority:10,init(t){X(),t.classList.add("nojs-sortable")}})}function qe(e){e.directive("sort",{priority:11,init(t,r,i){X();let o=i;if(!o)return;let n=t.getAttribute("sort-type")||"string",d=t.getAttribute("sort-default");t.setAttribute("data-sortable",""),t.setAttribute("aria-sort","none");let s=t.closest("table");if(!s)return;M.sorts.has(s)||M.sorts.set(s,{column:null,direction:null}),(d==="asc"||d==="desc")&&(M.sorts.get(s).column||Fe(t,s,o,n,d,e));let l=()=>{let f=M.sorts.get(s),p;f.column!==o?p="asc":f.direction==="asc"?p="desc":f.direction==="desc"?p=null:p="asc",Fe(t,s,o,n,p,e)};t.addEventListener("click",l),gr(t,()=>{t.removeEventListener("click",l),s&&!s.isConnected&&(M.sorts.delete(s),delete s._nojsOriginalOrder,delete s._nojsOriginalRows)})}})}function Fe(e,t,r,i,o,n){let d=M.sorts.get(t);yr(t),o?(e.setAttribute("data-sort-dir",o),e.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),d.column=r,d.direction=o):(d.column=null,d.direction=null);let s=hr(t,n);if(s){let l=n.findContext(t),f=l?vr(l,s.arrayPath):null;if(Array.isArray(f)){if(!o){let m=t._nojsOriginalOrder;if(m){let h=new Set(f),a=m.filter(c=>h.has(c));for(let c of f)m.includes(c)||a.push(c);Ie(l,s.arrayPath,a)}return}t._nojsOriginalOrder||(t._nojsOriginalOrder=[...f]);let p=[...f].sort((m,h)=>{let a=m!=null?m[r]:null,c=h!=null?h[r]:null,u=Pe(a,c,i);return o==="desc"?-u:u});Ie(l,s.arrayPath,p);return}}xr(t,e,r,i,o)}function xr(e,t,r,i,o){let n=e.querySelector("tbody");if(!n)return;let l=[...t.closest("tr").children].indexOf(t);if(l<0)return;let f=[...n.querySelectorAll(":scope > tr")];if(e._nojsOriginalRows||(e._nojsOriginalRows=[...f]),!o){let h=document.createDocumentFragment();for(let a of e._nojsOriginalRows)h.appendChild(a);n.appendChild(h);return}let p=h=>{let a=h.replace(/[^0-9.\-]/g,"");return a===""||a==="-"?NaN:parseFloat(a)};f.sort((h,a)=>{let c=h.children[l]?.textContent?.trim()||"",u=a.children[l]?.textContent?.trim()||"",b=Pe(i==="number"?p(c):c,i==="number"?p(u):u,i);return o==="desc"?-b:b});let m=document.createDocumentFragment();for(let h of f)m.appendChild(h);n.appendChild(m)}function Be(e){e.directive("fixed-header",{priority:10,init(t){X(),t.classList.add("nojs-fixed-header")}})}function He(e){e.directive("fixed-col",{priority:10,init(t){X(),t.classList.add("nojs-fixed-col")}})}function $e(e,t={}){Me(e),qe(e),Be(e),He(e)}function Re(){De()}var wr={name:"nojs-elements",install(e,t={}){jt(e,t),Lt(e,t),qt(e,t),Wt(e,t),Qt(e,t),se(e,t),me(e,t),ye(e,t),je(e,t),Ce(e,t),$e(e,t)},dispose(e){_t(),Ct(),Bt(),Vt(),Jt(),ae(),be(),xe(),Te(),Re()}},xt=wr;typeof window<"u"&&(window.NoJSElements=xt,window.NoJS&&typeof window.NoJS.use=="function"&&window.NoJS.use(xt));})();
//# sourceMappingURL=nojs-elements.js.map
