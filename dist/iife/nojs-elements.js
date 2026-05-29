/**
 * NoJS Elements v1.12.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://github.com/ErickXavier/nojs-elements
 * @license MIT
 */
(()=>{var N=new Map,T=new Map;function Et(){for(let e of T.values())clearTimeout(e);T.clear();for(let e of N.values())e.remove();N.clear()}function jt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tooltip]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tooltip",""),t.textContent=e,document.head.appendChild(t)}function We(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var J=8;function Ve(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,d=window.innerHeight,s,l;switch(r){case"bottom":s=i.bottom+J,l=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,l=i.left-o.width-J;break;case"right":s=i.top+(i.height-o.height)/2,l=i.right+J;break;default:s=i.top-o.height-J,l=i.left+(i.width-o.width)/2;break}l<4&&(l=4),l+o.width>n-4&&(l=n-o.width-4),s<4&&(s=4),s+o.height>d-4&&(s=d-o.height-4),e.style.top=`${s}px`,e.style.left=`${l}px`}var Ke=0;function Ue(e,t,r){document.body.appendChild(t),Ve(t,e,r),t.setAttribute("aria-hidden","false")}function Ne(e,t){t.setAttribute("aria-hidden","true"),t.remove()}function kt(e){e.directive("tooltip",{priority:20,init(t,r,i){jt();let o=i;if(!o){console.warn("[tooltip] attribute value (tooltip text) is required.");return}let n=t.getAttribute("tooltip-position")||"top",d=parseInt(t.getAttribute("tooltip-delay"),10)||300,s=t.getAttribute("tooltip-disabled"),l=s?e.findContext(t):null,f=`nojs-tooltip-${++Ke}`,p=document.createElement("div");p.className="nojs-tooltip",p.setAttribute("role","tooltip"),p.setAttribute("id",f),p.setAttribute("aria-hidden","true"),p.textContent=o,t.setAttribute("aria-describedby",f),N.set(t,p);let m=()=>{if(s&&l&&e.evaluate(s,l))return;T.has(t)&&clearTimeout(T.get(t));let y=setTimeout(()=>{T.delete(t),!(s&&l&&e.evaluate(s,l))&&Ue(t,p,n)},d);T.set(t,y)},h=()=>{T.has(t)&&(clearTimeout(T.get(t)),T.delete(t)),Ne(t,p)},c=()=>m(),a=()=>h(),u=()=>m(),b=()=>h(),g=y=>{y.key==="Escape"&&p.getAttribute("aria-hidden")==="false"&&h()};t.addEventListener("mouseenter",c),t.addEventListener("mouseleave",a),t.addEventListener("focusin",u),t.addEventListener("focusout",b),t.addEventListener("keydown",g),We(t,()=>{t.removeEventListener("mouseenter",c),t.removeEventListener("mouseleave",a),t.removeEventListener("focusin",u),t.removeEventListener("focusout",b),t.removeEventListener("keydown",g),T.has(t)&&(clearTimeout(T.get(t)),T.delete(t)),p.remove(),N.delete(t)})}})}function _t(e,t={}){kt(e)}function St(){Et()}var S=new Map;function Lt(){S.clear()}function tt(){if(typeof document>"u"||document.querySelector("style[data-nojs-popover]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-popover",""),t.textContent=e,document.head.appendChild(t)}function dt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var O=8;function lt(e,t,r){let i=t.getBoundingClientRect(),o=e.getBoundingClientRect(),n=window.innerWidth,d=window.innerHeight,s,l;switch(r){case"top":s=i.top-o.height-O,l=i.left+(i.width-o.width)/2;break;case"left":s=i.top+(i.height-o.height)/2,l=i.left-o.width-O;break;case"right":s=i.top+(i.height-o.height)/2,l=i.right+O;break;default:s=i.bottom+O,l=i.left+(i.width-o.width)/2;break}r==="bottom"&&s+o.height>d&&(s=i.top-o.height-O),r==="top"&&s<0&&(s=i.bottom+O),l<4&&(l=4),l+o.width>n-4&&(l=n-o.width-4),s<4&&(s=4),s+o.height>d-4&&(s=d-o.height-4),e.style.top=`${s}px`,e.style.left=`${l}px`}function Ct(e){e.directive("popover",{priority:20,init(r,i,o){tt();let n=o||r.getAttribute("id")||`nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("data-popover-id",n),r.setAttribute("popover","auto"),r.classList.add("nojs-popover");let d=r.getAttribute("popover-position")||"bottom";if(!S.has(n))S.set(n,{popoverEl:r,triggerEls:new Set,position:d,open:!1});else{let l=S.get(n);l.popoverEl=r,l.position=d}let s=l=>{let f=S.get(n);if(!f)return;let p=l.newState==="open";f.open=p;for(let m of f.triggerEls)m.setAttribute("aria-expanded",String(p))};r.addEventListener("toggle",s),dt(r,()=>{r.removeEventListener("toggle",s),S.delete(n)})}}),e.directive("popover-trigger",{priority:20,init(r,i,o){tt();let n=o;if(!n){let f=(r.closest("[use]")||r.parentElement)?.querySelector("[data-popover-id]");if(f&&(n=f.getAttribute("data-popover-id")),!n){console.warn("[popover-trigger] attribute value (popover ID) is required.");return}}r.setAttribute("aria-haspopup","true"),r.setAttribute("aria-expanded","false"),r.setAttribute("aria-controls",n),S.has(n)||S.set(n,{popoverEl:null,triggerEls:new Set,position:"bottom",open:!1}),S.get(n).triggerEls.add(r);let d=l=>{let f=S.get(n);if(!f||!f.popoverEl){console.warn(`[popover-trigger] no popover found with id "${n}".`);return}f.popoverEl.togglePopover(),requestAnimationFrame(()=>{f.popoverEl.matches(":popover-open")&&lt(f.popoverEl,r,f.position)})};r.addEventListener("click",d);let s=l=>{let f=S.get(n);l.key==="Escape"&&f?.open&&(f.popoverEl.hidePopover(),r.focus())};document.addEventListener("keydown",s),dt(r,()=>{r.removeEventListener("click",d),document.removeEventListener("keydown",s);let l=S.get(n);l&&l.triggerEls.delete(r)})}}),e.directive("popover-dismiss",{priority:20,init(r){tt();let i=()=>{let o=r.closest(".nojs-popover");o&&o.hidePopover()};r.addEventListener("click",i),dt(r,()=>r.removeEventListener("click",i))}});let t=(r,i)=>t.open(r,i);t.open=(r,i)=>{let o=S.get(r);if(!o||!o.popoverEl)return!1;try{o.popoverEl.showPopover()}catch{return!1}let n=i||[...o.triggerEls][0];return n&&requestAnimationFrame(()=>lt(o.popoverEl,n,o.position)),!0},t.close=r=>{let i=S.get(r);if(!i||!i.popoverEl)return!1;try{i.popoverEl.hidePopover()}catch{}return!0},t.toggle=(r,i)=>{let o=S.get(r);if(!o||!o.popoverEl)return!1;o.popoverEl.togglePopover();let n=i||[...o.triggerEls][0];return n&&o.popoverEl.matches(":popover-open")&&requestAnimationFrame(()=>lt(o.popoverEl,n,o.position)),!0},e.popover=t}function Tt(e,t={}){Ct(e)}function Dt(){Lt()}var C=[],I=new Map,Ye=1e4;function It(){return Ye+C.length}function zt(){C.length=0,I.clear()}function G(){if(typeof document>"u"||document.querySelector("style[data-nojs-modal]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-modal",""),t.textContent=e,document.head.appendChild(t)}function Xe(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var Pt='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',pt=new WeakMap;function Ze(e){let t=r=>{if(r.key!=="Tab")return;let i=[...e.querySelectorAll(Pt)].filter(d=>d.offsetParent!==null);if(i.length===0){r.preventDefault();return}let o=i[0],n=i[i.length-1];r.shiftKey?document.activeElement===o&&(r.preventDefault(),n.focus()):document.activeElement===n&&(r.preventDefault(),o.focus())};e.addEventListener("keydown",t),pt.set(e,t)}function Ft(e){let t=pt.get(e);t&&(e.removeEventListener("keydown",t),pt.delete(e))}var Y=new WeakMap;function Mt(e){e.directive("modal",{priority:10,init(r,i,o){G();let n=o||`nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;r.setAttribute("popover","manual"),r.classList.add("nojs-modal"),r.id=r.id||`nojs-modal-${n}`,r.setAttribute("data-modal-id",n),r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true");let d=r.querySelector("h1, h2, h3, h4, h5, h6");d&&(d.id||(d.id=`nojs-modal-heading-${n}`),r.setAttribute("aria-labelledby",d.id));let s=r.getAttribute("modal-backdrop");s==="false"&&r.setAttribute("data-nojs-no-backdrop","");let l=r.getAttribute("modal-class"),f=r.getAttribute("modal-escape"),p=h=>{h.target===r&&s!=="false"&&f!=="false"&&W(r,n)};r.addEventListener("click",p),I.set(n,r);let m=h=>{if(h.newState==="open"){if(r.style.zIndex=String(It()),l&&l.split(/\s+/).filter(Boolean).forEach(c=>r.classList.add(c)),requestAnimationFrame(()=>{let c=r.querySelector(Pt);c?c.focus():r.focus()}),Ze(r),f!=="false"){let c=a=>{a.key==="Escape"&&(a.stopPropagation(),W(r,n))};r.addEventListener("keydown",c),Y.set(r,c)}}else if(h.newState==="closed"){l&&l.split(/\s+/).filter(Boolean).forEach(u=>r.classList.remove(u)),Ft(r);let c=Y.get(r);c&&(r.removeEventListener("keydown",c),Y.delete(r));let a=C.findIndex(u=>u.id===n);if(a!==-1){let u=C[a];C.splice(a,1),u.triggerEl&&requestAnimationFrame(()=>{u.triggerEl.focus()})}}};r.addEventListener("toggle",m),Xe(r,()=>{r.removeEventListener("click",p),r.removeEventListener("toggle",m),Ft(r);let h=Y.get(r);h&&(r.removeEventListener("keydown",h),Y.delete(r)),I.delete(n);let c=C.findIndex(a=>a.id===n);c!==-1&&C.splice(c,1)})}});let t=r=>t.open(r);t.open=r=>{let i=I.get(r);if(!i)return!1;C.push({id:r,el:i,triggerEl:null});try{i.showPopover()}catch{return!1}return!0},t.close=r=>{let i=I.get(r);return i?(W(i,r),!0):!1},t.closeAll=()=>{for(let r=C.length-1;r>=0;r--)W(C[r].el,C[r].id)},e.modal=t}function W(e,t){try{e.hidePopover()}catch{}}function Qe(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function qt(e){e.directive("modal-open",{priority:10,init(t,r,i){G();let o=i;if(!o){let m=(t.closest("[use]")||t.parentElement)?.querySelector("[data-modal-id]");if(m&&(o=m.getAttribute("data-modal-id")),!o){console.warn('[modal-open] requires a target modal ID, e.g. modal-open="my-dialog"');return}}t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded","false");let n=()=>{let p=I.get(o)||document.querySelector(`[data-modal-id="${o}"]`);if(!p){console.warn(`[modal-open] modal "${o}" not found`);return}C.push({id:o,el:p,triggerEl:t}),t.setAttribute("aria-expanded","true"),p.id&&t.setAttribute("aria-controls",p.id);try{p.showPopover()}catch{console.warn(`[modal-open] failed to open modal "${o}"`)}},d=()=>{t.setAttribute("aria-expanded","false")},s=null,l=null;requestAnimationFrame(()=>{let p=I.get(o);p&&(l=p,s=m=>{m.newState==="closed"&&t.setAttribute("aria-expanded","false")},p.addEventListener("toggle",s))}),t.addEventListener("click",n),Qe(t,()=>{t.removeEventListener("click",n),l&&s&&l.removeEventListener("toggle",s)})}})}function Je(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Bt(e){e.directive("modal-close",{priority:10,init(t,r,i){G();let o=()=>{let n,d;if(i){if(d=i,n=I.get(d),!n){console.warn(`[modal-close] modal "${d}" not found`);return}}else{if(n=t.closest("[modal]"),!n){console.warn("[modal-close] no parent modal found");return}d=n.getAttribute("modal")}W(n,d)};t.addEventListener("click",o),Je(t,()=>{t.removeEventListener("click",o)})}})}function Ht(e,t={}){Mt(e),qt(e),Bt(e)}function $t(){zt()}var M={openMenus:new Map};function Rt(){M.openMenus.clear()}function V(){if(typeof document>"u"||document.querySelector("style[data-nojs-dropdown]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-dropdown",""),t.textContent=e,document.head.appendChild(t)}var tr=0;function er(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Ot(e,t,r){let i=r.getAttribute("dropdown-position")||"bottom",o=r.getAttribute("dropdown-align")||"start";e.style.top="",e.style.left="";let n=t.getBoundingClientRect(),d=e.getBoundingClientRect(),s=window.innerHeight,l=window.innerWidth,f,p;switch(i){case"top":f=n.top-d.height,p=n.left;break;case"left":f=n.top,p=n.left-d.width;break;case"right":f=n.top,p=n.right;break;default:f=n.bottom,p=n.left}i==="bottom"||i==="top"?o==="end"&&(p=n.right-d.width):o==="end"&&(f=n.bottom-d.height),i==="bottom"&&f+d.height>s&&n.top-d.height>0?f=n.top-d.height:i==="top"&&f<0&&n.bottom+d.height<=s&&(f=n.bottom),p<4&&(p=4),p+d.width>l-4&&(p=l-d.width-4),e.style.top=`${f}px`,e.style.left=`${p}px`}function ft(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function ut(e){let t=ft(e);t.length&&t[0].focus()}function Gt(e){let t=ft(e);t.length&&t[t.length-1].focus()}function Wt(e){e.directive("dropdown",{priority:15,init(r){V()}}),e.directive("dropdown-toggle",{priority:15,init(r){V();let i=r.closest("[dropdown]");if(!i)return;let o=i.querySelector("[dropdown-menu]");if(!o)return;r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false"),o.classList.add("nojs-dropdown-menu"),o.setAttribute("role","menu"),o.setAttribute("popover","auto"),o.id||(o.id=`nojs-dd-menu-${Date.now()}-${tr++}`),r.setAttribute("aria-controls",o.id);let n=!1,d=typeof o.showPopover=="function"&&typeof o.hidePopover=="function";function s(){if(o.setAttribute("data-open",""),d&&!n)try{o.showPopover(),n=!0}catch{n=!1}r.setAttribute("aria-expanded","true"),Ot(o,r,i),M.openMenus.set(o,{toggle:r,wrapper:i})}function l(){if(d&&n){n=!1;try{o.hidePopover()}catch{}}o.removeAttribute("data-open"),r.setAttribute("aria-expanded","false"),M.openMenus.delete(o)}function f(){return r.getAttribute("aria-expanded")==="true"}let p=g=>{g.newState==="closed"&&f()&&l()};o.addEventListener("toggle",p);let m=g=>{g.preventDefault(),g.stopPropagation(),f()?l():s()};r.addEventListener("click",m);let h=g=>{f()&&!i.contains(g.target)&&l()};document.addEventListener("click",h,!0);let c=g=>{g.key==="Escape"&&f()&&(l(),r.focus())};document.addEventListener("keydown",c);let a=g=>{switch(g.key){case"Enter":case" ":g.preventDefault(),s(),ut(o);break;case"ArrowDown":g.preventDefault(),s(),ut(o);break;case"ArrowUp":g.preventDefault(),s(),Gt(o);break}};r.addEventListener("keydown",a);let u=g=>{if(!(!f()||ft(o).find(D=>D===document.activeElement)))switch(g.key){case"ArrowDown":g.preventDefault(),ut(o);break;case"ArrowUp":g.preventDefault(),Gt(o);break}};o.addEventListener("keydown",u);let b=()=>{f()&&Ot(o,r,i)};window.addEventListener("scroll",b,!0),window.addEventListener("resize",b),er(r,()=>{r.removeEventListener("click",m),r.removeEventListener("keydown",a),o.removeEventListener("keydown",u),o.removeEventListener("toggle",p),document.removeEventListener("click",h,!0),document.removeEventListener("keydown",c),window.removeEventListener("scroll",b,!0),window.removeEventListener("resize",b),M.openMenus.delete(o)})}}),e.directive("dropdown-menu",{priority:15,init(r){V(),r.hasAttribute("role")||r.setAttribute("role","menu")}});let t=r=>t.open(r);t.open=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")==="true"?!1:(n.click(),!0)},t.close=r=>{let i=document.getElementById(r);if(!i)return!1;let n=i.closest("[dropdown]")?.querySelector("[dropdown-toggle]");return!n||n.getAttribute("aria-expanded")!=="true"?!1:(n.click(),!0)},e.dropdown=t}function Vt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function rr(e){return[...e.querySelectorAll("[dropdown-item]")].filter(t=>!t.hasAttribute("disabled")&&t.getAttribute("aria-disabled")!=="true")}function mt(e,t){if(!e)return;if(typeof e.hidePopover=="function")try{e.hidePopover()}catch{}e.removeAttribute("data-open");let r=t&&t.querySelector("[dropdown-toggle]");r&&r.setAttribute("aria-expanded","false"),M.openMenus.has(e)&&M.openMenus.delete(e)}function Kt(e){e.directive("dropdown-item",{priority:15,init(t){V();let r=t.closest("[dropdown-menu]"),i=t.closest("[dropdown]");t.setAttribute("role","menuitem"),t.setAttribute("tabindex","-1"),t.classList.add("nojs-dropdown-item"),t.hasAttribute("disabled")&&t.setAttribute("aria-disabled","true");let o=d=>{if(!r)return;let s=rr(r),l=s.indexOf(t);switch(d.key){case"ArrowDown":{d.preventDefault(),(l+1<s.length?s[l+1]:s[0]).focus();break}case"ArrowUp":{d.preventDefault(),(l-1>=0?s[l-1]:s[s.length-1]).focus();break}case"Home":{d.preventDefault(),s.length&&s[0].focus();break}case"End":{d.preventDefault(),s.length&&s[s.length-1].focus();break}case"Enter":{d.preventDefault(),t.click();break}case"Escape":{if(d.preventDefault(),mt(r,i),i){let f=i.querySelector("[dropdown-toggle]");f&&f.focus()}break}case"Tab":{mt(r,i);break}}};t.addEventListener("keydown",o),Vt(t,()=>t.removeEventListener("keydown",o));let n=()=>{if(mt(r,i),i){let d=i.querySelector("[dropdown-toggle]");d&&d.focus()}};t.addEventListener("click",n),Vt(t,()=>t.removeEventListener("click",n))}})}function Ut(e,t={}){Wt(e),Kt(e)}function Nt(){Rt()}var z=new Map,K=new Set,Yt=0;function Xt(){return++Yt}function Zt(){for(let e of K)clearTimeout(e);K.clear();for(let e of z.values())e.remove();z.clear(),Yt=0}function Qt(){if(typeof document>"u"||document.querySelector("style[data-nojs-toast]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-toast",""),t.textContent=e,document.head.appendChild(t)}function bt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var or=new Set(["top-right","top-left","bottom-right","bottom-left","top-center","bottom-center"]);function gt(){return z.size>0?z.values().next().value:nr("top-right")}function nr(e){if(z.has(e))return z.get(e);let t=document.createElement("div");return t.classList.add("nojs-toast-container"),t.setAttribute("data-position",e),t.setAttribute("role","log"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions"),document.body.appendChild(t),z.set(e,t),t}function ir(e){return e.startsWith("top")}function ht(e,t,r,i,o){let n=Xt(),d=e.getAttribute("data-position")||"top-right",s=document.createElement("div");s.classList.add("nojs-toast"),s.setAttribute("data-toast-id",n),s.setAttribute("data-type",r),r==="error"&&s.setAttribute("aria-live","assertive");let l=document.createElement("span");if(l.textContent=t,s.appendChild(l),o){let f=document.createElement("button");f.type="button",f.classList.add("nojs-toast-dismiss"),f.setAttribute("aria-label","Dismiss"),f.textContent="\xD7",f.addEventListener("click",()=>et(s)),s.appendChild(f)}if(ir(d)&&e.firstChild?e.insertBefore(s,e.firstChild):e.appendChild(s),i>0){let f=setTimeout(()=>{K.delete(f),et(s)},i);K.add(f),s._toastTimerId=f}return s}function et(e){!e||!e.isConnected||(e._toastTimerId!=null&&(clearTimeout(e._toastTimerId),K.delete(e._toastTimerId)),e.remove())}function Jt(e){Qt(),e.directive("toast-container",{priority:10,init(r,i,o){let n=o&&or.has(o)?o:"top-right";r.classList.add("nojs-toast-container"),r.setAttribute("data-position",n),r.setAttribute("role","log"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions"),z.set(n,r),bt(r,()=>{z.get(n)===r&&z.delete(n)})}}),e.directive("toast",{priority:10,init(r,i,o){if(!o)return;let n=r.getAttribute("toast-type")||"info",d=parseInt(r.getAttribute("toast-duration"),10)||3e3,s=r.getAttribute("toast-dismiss")!=="false";if(r.tagName==="BUTTON"||r.tagName==="A"||r.hasAttribute("on:click")){let c=()=>{let a=gt();ht(a,o,n,d,s)};r.addEventListener("click",c),bt(r,()=>r.removeEventListener("click",c));return}let f=e.findContext(r),p;function m(){let c=e.evaluate(o,f);if(c&&c!==p){let a=typeof c=="string"?c:String(c),u=gt();ht(u,a,n,d,s)}p=c}let h=f.$watch(m);bt(r,h)}});let t=(r,i="info",o=3e3)=>{if(typeof document>"u")return;let n=!0,d=gt();return ht(d,String(r),i,o,n)};t.dismiss=r=>{let i=document.querySelector(`[data-toast-id="${r}"]`);i&&et(i)},t.dismissAll=()=>{document.querySelectorAll(".nojs-toast").forEach(r=>et(r))},e.toast=t}function te(e,t={}){Jt(e)}function ee(){Zt()}var q={containers:new Map};function re(){q.containers.clear()}function oe(){if(typeof document>"u"||document.querySelector("style[data-nojs-tabs]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tabs",""),t.textContent=e,document.head.appendChild(t)}function sr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}var ar=0;function ne(e){return`${e}-${++ar}`}function vt(e,t){let r=q.containers.get(e);if(!r)return;let{tabs:i,panels:o}=r;if(!(t<0||t>=i.length)&&i[t].getAttribute("aria-disabled")!=="true"){for(let n=0;n<i.length;n++)i[n].setAttribute("aria-selected","false"),i[n].setAttribute("tabindex","-1"),o[n].setAttribute("aria-hidden","true"),o[n].inert=!0;i[t].setAttribute("aria-selected","true"),i[t].setAttribute("tabindex","0"),o[t].setAttribute("aria-hidden","false"),o[t].inert=!1,r.activeIndex=t}}function X(e,t,r){let i=e.length,o=t;for(let n=0;n<i;n++)if(o=(o+r+i)%i,e[o].getAttribute("aria-disabled")!=="true")return o;return t}function ie(e){e.directive("tabs",{priority:10,init(t,r,i){oe();let o=[],n=[];for(let a of Array.from(t.children))a.hasAttribute("tab")?o.push(a):a.hasAttribute("panel")&&n.push(a);if(o.length===0){console.warn("[tabs] No child [tab] elements found.");return}o.length!==n.length&&console.warn("[tabs] Mismatch: "+o.length+" tabs but "+n.length+" panels.");let d=t.getAttribute("tab-position")||"top";t.setAttribute("data-position",d),t.classList.add("nojs-tabs");let s=document.createElement("div");s.setAttribute("role","tablist"),s.classList.add("nojs-tablist");let l=Math.min(o.length,n.length);for(let a=0;a<l;a++){let u=o[a],b=n[a],g=u.id||ne("nojs-tab"),y=b.id||ne("nojs-panel");u.id=g,b.id=y,u.setAttribute("role","tab"),u.setAttribute("aria-selected","false"),u.setAttribute("aria-controls",y),u.setAttribute("tabindex","-1"),u.classList.add("nojs-tab"),b.setAttribute("role","tabpanel"),b.setAttribute("aria-labelledby",g),b.setAttribute("tabindex","0"),b.setAttribute("aria-hidden","true"),b.inert=!0,b.classList.add("nojs-panel"),s.appendChild(u)}let f=n[0];f?t.insertBefore(s,f):t.appendChild(s),q.containers.set(t,{tabs:o.slice(0,l),panels:n.slice(0,l),activeIndex:-1});let p=e.findContext(t);for(let a=0;a<l;a++){let u=o[a].getAttribute("tab-disabled");u&&e.evaluate(u,p)&&o[a].setAttribute("aria-disabled","true")}let m=0;if(i&&i.trim()!==""){let a=parseInt(i,10);!isNaN(a)&&a>=0&&a<l&&(m=a)}o[m]?.getAttribute("aria-disabled")==="true"&&(m=X(o.slice(0,l),m,1)),vt(t,m);let h=a=>{let u=q.containers.get(t);if(!u)return;let b=a.target;if(b.getAttribute("role")!=="tab")return;let{tabs:g}=u,y=g.indexOf(b);if(y===-1)return;let w=-1;switch(a.key){case"ArrowRight":case"ArrowDown":w=X(g,y,1);break;case"ArrowLeft":case"ArrowUp":w=X(g,y,-1);break;case"Home":w=X(g,g.length-1,1);break;case"End":w=X(g,0,-1);break;case"Tab":return;default:return}w!==-1&&w!==y&&(a.preventDefault(),vt(t,w),g[w].focus())};s.addEventListener("keydown",h);let c=a=>{let u=a.target.closest("[role='tab']");if(!u)return;let b=q.containers.get(t);if(!b)return;let g=b.tabs.indexOf(u);g!==-1&&(vt(t,g),u.focus())};s.addEventListener("click",c),sr(t,()=>{s.removeEventListener("keydown",h),s.removeEventListener("click",c),q.containers.delete(t)})}})}function se(e){e.directive("tab",{priority:11,init(){}}),e.directive("tab-disabled",{priority:11,init(){}}),e.directive("tab-position",{priority:11,init(){}})}function ae(e){e.directive("panel",{priority:11,init(){}})}function ce(e,t={}){ie(e),se(e),ae(e)}function de(){re()}var A={branches:new Map,selectedItem:null,typeahead:"",typeaheadTimer:null};function le(){A.branches.clear(),A.selectedItem=null,A.typeahead="",A.typeaheadTimer&&(clearTimeout(A.typeaheadTimer),A.typeaheadTimer=null)}function rt(){if(typeof document>"u"||document.querySelector("style[data-nojs-tree]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-tree",""),t.textContent=e,document.head.appendChild(t)}function yt(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function pe(e){let t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(o){return o.matches&&o.matches('.nojs-subtree[aria-hidden="true"]')?NodeFilter.FILTER_REJECT:o.getAttribute("role")==="treeitem"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),i;for(;i=r.nextNode();)t.push(i);return t}function ue(e){return e.closest('[role="tree"]')}function cr(e){let t=e.cloneNode(!0);return t.querySelectorAll('[role="group"]').forEach(i=>i.remove()),(t.textContent||"").trim().toLowerCase()}function fe(e){e.directive("tree",{priority:15,init(t){rt(),t.classList.add("nojs-tree"),t.setAttribute("role","tree"),t.getAttribute("tree-icon")==="false"&&t.setAttribute("data-tree-icon","false")}})}function me(e){e.directive("branch",{priority:16,init(t,r,i){rt();let o=i==="expanded";t.classList.add("nojs-branch"),t.setAttribute("role","treeitem"),t.setAttribute("aria-expanded",String(o));let n=ue(t);if(n){let c=n.querySelector('[role="treeitem"]');t.setAttribute("tabindex",c===t?"0":"-1")}else t.setAttribute("tabindex","0");let d=!1;queueMicrotask(()=>{if(d)return;let c=t.querySelector(":scope > [subtree], :scope > .nojs-subtree")||(t.nextElementSibling?.matches?.("[subtree], .nojs-subtree")?t.nextElementSibling:null);c?(A.branches.set(t,{expanded:o,subtreeEl:c}),c.setAttribute("aria-hidden",String(!o))):A.branches.set(t,{expanded:o,subtreeEl:null})});function s(c){let a=A.selectedItem;a&&a!==c&&(a.classList.remove("nojs-branch-selected"),a.setAttribute("aria-selected","false")),c.classList.add("nojs-branch-selected"),c.setAttribute("aria-selected","true"),A.selectedItem=c}function l(c){let a=A.branches.get(c);!a||!a.subtreeEl||(a.expanded=!a.expanded,c.setAttribute("aria-expanded",String(a.expanded)),a.subtreeEl.setAttribute("aria-hidden",String(!a.expanded)))}function f(c){let a=A.branches.get(c);!a||!a.subtreeEl||a.expanded||(a.expanded=!0,c.setAttribute("aria-expanded","true"),a.subtreeEl.setAttribute("aria-hidden","false"))}function p(c){let a=A.branches.get(c);!a||!a.subtreeEl||!a.expanded||(a.expanded=!1,c.setAttribute("aria-expanded","false"),a.subtreeEl.setAttribute("aria-hidden","true"))}let m=c=>{c.target!==t&&!t.contains(c.target)||(c.stopPropagation(),s(t),l(t))};t.addEventListener("click",m),yt(t,()=>t.removeEventListener("click",m));let h=c=>{let a=ue(t);if(!a)return;let u=pe(a),b=u.indexOf(t),g=A.branches.get(t),y=g&&g.subtreeEl;switch(c.key){case"ArrowRight":if(c.preventDefault(),y&&!g.expanded)f(t);else if(y&&g.expanded){let w=g.subtreeEl.querySelector('[role="treeitem"]');w&&B(w,u)}break;case"ArrowLeft":if(c.preventDefault(),y&&g.expanded)p(t);else{let w=t.parentElement?.closest('[role="treeitem"]');w&&B(w,pe(a))}break;case"ArrowDown":c.preventDefault(),b<u.length-1&&B(u[b+1],u);break;case"ArrowUp":c.preventDefault(),b>0&&B(u[b-1],u);break;case"Enter":case" ":c.preventDefault(),s(t),l(t);break;case"Home":c.preventDefault(),u.length>0&&B(u[0],u);break;case"End":c.preventDefault(),u.length>0&&B(u[u.length-1],u);break;default:if(c.key.length===1&&!c.ctrlKey&&!c.altKey&&!c.metaKey){c.preventDefault(),A.typeahead+=c.key.toLowerCase(),A.typeaheadTimer&&clearTimeout(A.typeaheadTimer),A.typeaheadTimer=setTimeout(()=>{A.typeahead="",A.typeaheadTimer=null},500);let w=b+1;for(let D=0;D<u.length;D++){let F=(w+D)%u.length;if(cr(u[F]).startsWith(A.typeahead)){B(u[F],u);break}}}break}};t.addEventListener("keydown",h),yt(t,()=>t.removeEventListener("keydown",h)),yt(t,()=>{d=!0,A.branches.delete(t),A.selectedItem===t&&(A.selectedItem=null)})}})}function B(e,t){for(let r of t)r.setAttribute("tabindex",r===e?"0":"-1");e.focus()}function be(e){e.directive("subtree",{priority:16,init(t){rt(),t.classList.add("nojs-subtree"),t.classList.add("nojs-tree"),t.setAttribute("role","group");for(let i of t.children)i.tagName==="LI"&&!i.querySelector("[branch], .nojs-branch")&&(i.setAttribute("role","treeitem"),i.setAttribute("tabindex","-1"),i.classList.add("nojs-tree-leaf"));let r=t.parentElement?.matches?.('[role="treeitem"]')?t.parentElement:t.previousElementSibling?.matches?.('[role="treeitem"]')?t.previousElementSibling:null;if(r){let i=A.branches.get(r);i?(t.setAttribute("aria-hidden",String(!i.expanded)),i.subtreeEl=t):t.setAttribute("aria-hidden","true")}else t.setAttribute("aria-hidden","true")}})}function ge(e,t={}){fe(e),me(e),be(e)}function he(){le()}var ot=new Map;function ve(){ot.clear()}function nt(){if(typeof document>"u"||document.querySelector("style[data-nojs-stepper]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-stepper",""),t.textContent=e,document.head.appendChild(t)}function Z(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ye(e){e.directive("stepper",{priority:14,init(t,r,i){nt();let o=e.findContext(t),n=Array.from(t.querySelectorAll("[step]"));if(!n.length){console.warn("[stepper] No [step] children found.");return}let d=i&&parseInt(i,10)||0,s=t.getAttribute("stepper-mode")||"linear",l=t.getAttribute("stepper-indicator")!=="false",f=t.getAttribute("stepper-nav")!=="false",p=t.getAttribute("aria-label")||"Stepper",m=Math.max(0,Math.min(d,n.length-1));t.setAttribute("role","group"),t.setAttribute("aria-label",p),t.classList.add("nojs-stepper");let h=null,c=[];if(l){h=document.createElement("div"),h.className="nojs-stepper-indicator",h.setAttribute("role","tablist"),h.setAttribute("aria-label","Progress"),n.forEach((x,j)=>{if(j>0){let R=document.createElement("div");R.className="nojs-stepper-separator",R.setAttribute("aria-hidden","true"),h.appendChild(R)}let E=document.createElement("button");E.type="button",E.className="nojs-stepper-indicator-item",E.setAttribute("role","tab"),E.setAttribute("aria-selected",j===m?"true":"false");let P=x.getAttribute("step-label")||`Step ${j+1}`,At=document.createElement("span");At.textContent=P,E.appendChild(At),E.setAttribute("aria-label",P);let Ge=`nojs-stepper-tab-${dr++}`;if(E.id=Ge,s==="free"){E.setAttribute("data-clickable","");let R=()=>F(j);E.addEventListener("click",R),Z(t,()=>E.removeEventListener("click",R))}else E.setAttribute("tabindex","-1");h.appendChild(E),c.push(E)});let _=x=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(x.key))return;x.preventDefault();let j=m;x.key==="ArrowRight"?j=Math.min(m+1,n.length-1):x.key==="ArrowLeft"?j=Math.max(m-1,0):x.key==="Home"?j=0:x.key==="End"&&(j=n.length-1),s==="free"?(F(j),c[j]?.focus()):c[m]?.focus()};h.addEventListener("keydown",_),Z(t,()=>h.removeEventListener("keydown",_)),t.insertBefore(h,t.firstChild)}let a=null,u=null,b=null;if(f){a=document.createElement("div"),a.className="nojs-stepper-nav",a.setAttribute("aria-hidden","true"),u=document.createElement("button"),u.type="button",u.className="nojs-stepper-prev",u.textContent="Previous";let _=()=>D();u.addEventListener("click",_),Z(t,()=>u.removeEventListener("click",_)),b=document.createElement("button"),b.type="button",b.className="nojs-stepper-next",b.textContent="Next";let x=()=>w();b.addEventListener("click",x),Z(t,()=>b.removeEventListener("click",x)),a.appendChild(u),a.appendChild(b),t.appendChild(a)}function g(_){let x=n[_];if(!x)return!0;let j=x.querySelectorAll("[required]");for(let P of j)if(typeof P.checkValidity=="function"&&!P.checkValidity())return P.reportValidity(),!1;let E=x.getAttribute("step-validate");if(E)try{if(!e.evaluate(E,o))return!1}catch(P){return console.warn(`[stepper] step-validate error: ${P.message}`),!1}return!0}function y(_){n.forEach((x,j)=>{let E=j===m;x.setAttribute("aria-hidden",E?"false":"true"),E?(x.removeAttribute("inert"),x.setAttribute("aria-current","step")):(x.setAttribute("inert",""),x.removeAttribute("aria-current"))}),c.length&&c.forEach((x,j)=>{x.setAttribute("aria-selected",j===m?"true":"false"),j<m?x.setAttribute("data-completed",""):x.removeAttribute("data-completed"),x.setAttribute("tabindex",j===m?"0":"-1");let E=n[j];E.id&&(x.setAttribute("aria-controls",E.id),E.setAttribute("aria-labelledby",x.id))}),u&&(u.disabled=m===0),b&&(b.textContent=m===n.length-1?"Finish":"Next"),t.dispatchEvent(new CustomEvent("step-change",{bubbles:!_,detail:{current:m,total:n.length}}))}function w(){return m>=n.length-1?(s==="linear"&&!g(m)||t.dispatchEvent(new CustomEvent("step-complete",{bubbles:!0,detail:{current:m,total:n.length}})),!1):s==="linear"&&!g(m)?!1:(m++,y(),$(),!0)}function D(){return m<=0?!1:(m--,y(),$(),!0)}function F(_){if(_<0||_>=n.length||_===m)return!1;if(s==="linear"&&_>m){for(let x=m;x<_;x++)if(m=x,y(),!g(x))return $(),!1}return m=_,y(),$(),!0}let ct={get current(){return m},get total(){return n.length},next:w,prev:D,goTo:F,get isFirst(){return m===0},get isLast(){return m===n.length-1}};function $(){o.$stepper=ct}$(),ot.set(t,{get current(){return m},steps:n,mode:s,indicatorEl:h,navEl:a}),y(!0),Z(t,()=>{ot.delete(t),h&&h.parentNode&&h.remove(),a&&a.parentNode&&a.remove(),delete o.$stepper})}})}var dr=0;var lr=0;function xe(e){e.directive("step",{priority:13,init(t,r,i){nt(),t.classList.add("nojs-step"),t.setAttribute("role","tabpanel"),t.id||(t.id=`nojs-stepper-panel-${lr++}`),t.setAttribute("tabindex","0")}})}function we(e,t={}){xe(e),ye(e)}function Ae(){ve()}function Ee(){if(typeof document>"u"||document.querySelector("style[data-nojs-skeleton]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-skeleton",""),t.textContent=e,document.head.appendChild(t)}function je(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function ke(e){e.directive("skeleton",{priority:10,init(t,r,i){Ee();let o=e.findContext(t),n=t.getAttribute("skeleton-type")||"text",d=t.getAttribute("skeleton-lines"),s=t.getAttribute("skeleton-size"),l=[];function f(b){p();for(let g=0;g<b;g++){let y=document.createElement("div");y.className="nojs-skeleton-line",t.appendChild(y),l.push(y)}}function p(){for(let b of l)b.parentNode===t&&t.removeChild(b);l=[]}function m(){if(t.classList.add("nojs-skeleton"),n==="circle"&&t.classList.add("nojs-skeleton-circle"),s&&(n==="circle"||n==="rect")){let b=s+(String(s).match(/\d$/)?"px":"");t.style.width=b,t.style.height=b}if(d){let b=parseInt(d,10);b>0&&f(b)}t.setAttribute("aria-busy","true")}function h(){t.classList.add("nojs-skeleton-fade"),t.classList.remove("nojs-skeleton"),t.classList.remove("nojs-skeleton-circle"),p(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""),t.removeAttribute("aria-busy");let b=!1,g=()=>{b||(b=!0,t.classList.remove("nojs-skeleton-fade"),t.removeEventListener("transitionend",g))};t.addEventListener("transitionend",g),setTimeout(g,500)}let c=!1;function a(){let b=!!e.evaluate(i,o);b&&!c?(c=!0,m()):!b&&c&&(c=!1,h())}a();let u=o.$watch(a);je(t,u),je(t,()=>{c&&(t.classList.remove("nojs-skeleton","nojs-skeleton-circle","nojs-skeleton-fade"),t.removeAttribute("aria-busy"),p(),s&&(n==="circle"||n==="rect")&&(t.style.width="",t.style.height=""))})}})}function _e(e,t={}){ke(e)}var H=new Map,k=new Map,v={active:!1,splitEl:null,gutterEl:null,prevPane:null,nextPane:null,direction:null,startPos:0,startPrevSize:0,startNextSize:0,containerSize:0};function Se(){H.clear(),k.clear(),v.active=!1,v.splitEl=null,v.gutterEl=null,v.prevPane=null,v.nextPane=null,v.direction=null,v.startPos=0,v.startPrevSize=0,v.startNextSize=0,v.containerSize=0}function it(){if(typeof document>"u"||document.querySelector("style[data-nojs-split]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-split",""),t.textContent=e,document.head.appendChild(t)}function pr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Le(e){return e==="horizontal"?"clientX":"clientY"}function L(e,t){return t==="horizontal"?e.offsetWidth:e.offsetHeight}function ur(e,t){let i=(H.get(e)?.gutters||[]).reduce((o,n)=>o+L(n,t),0);return L(e,t)-i}function st(e,t){let r=k.get(t);return r?r.min!=null&&e<r.min?r.min:r.max!=null&&e>r.max?r.max:e:e}function at(e,t,r,i){let o=L(t,i),n=L(r,i),d=k.get(t),s=k.get(r);e.setAttribute("aria-valuenow",Math.round(o)),e.setAttribute("aria-valuemin",d?.min||0),e.setAttribute("aria-valuemax",Math.round(o+n-(s?.min||0)))}function xt(e){let t=e.getAttribute("split-persist");if(!t)return;let r=H.get(e);if(!r)return;let i=r.panes.map(o=>o.style.flexBasis||"");try{localStorage.setItem(`nojs-split:${t}`,JSON.stringify(i))}catch{}}function fr(e){let t=e.getAttribute("split-persist");if(!t)return!1;try{let r=localStorage.getItem(`nojs-split:${t}`);if(!r)return!1;let i=JSON.parse(r),o=H.get(e);return!o||i.length!==o.panes.length?!1:(i.forEach((n,d)=>{n&&(o.panes[d].style.flexBasis=n,o.panes[d].style.flexGrow="0")}),!0)}catch{return!1}}function mr(e,t,r,i,o){let n=document.createElement("div");n.className="nojs-gutter",n.setAttribute("role","separator"),n.setAttribute("tabindex","0"),n.setAttribute("aria-orientation",t==="horizontal"?"vertical":"horizontal"),n.setAttribute("aria-label","Resize"),o!==6&&n.style.setProperty("--nojs-gutter-size",`${o}px`);let d=c=>{if(c.button!==0)return;c.preventDefault();let a=ur(e,t);v.active=!0,v.splitEl=e,v.gutterEl=n,v.prevPane=r,v.nextPane=i,v.direction=t,v.startPos=c[Le(t)],v.startPrevSize=L(r,t),v.startNextSize=L(i,t),v.containerSize=a,document.body.style.cursor=t==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",n.setPointerCapture(c.pointerId)},s=c=>{if(!v.active||v.gutterEl!==n)return;let a=c[Le(v.direction)]-v.startPos,u=st(v.startPrevSize+a,v.prevPane),b=st(v.startNextSize-a,v.nextPane),g=v.startPrevSize+v.startNextSize;u+b!==g&&(u!==v.startPrevSize+a?b=g-u:u=g-b),v.prevPane.style.flexBasis=`${u}px`,v.prevPane.style.flexGrow="0",v.nextPane.style.flexBasis=`${b}px`,v.nextPane.style.flexGrow="0",at(n,v.prevPane,v.nextPane,v.direction)},l=()=>{!v.active||v.gutterEl!==n||(v.active=!1,document.body.style.cursor="",document.body.style.userSelect="",xt(e),e.dispatchEvent(new CustomEvent("split-resize",{bubbles:!0,detail:{prevPane:r,nextPane:i}})))};n.addEventListener("pointerdown",d),n.addEventListener("pointermove",s),n.addEventListener("pointerup",l),n.addEventListener("pointercancel",l);let f=10,p=c=>{let a=t==="horizontal",u=0;if(a&&c.key==="ArrowRight"||!a&&c.key==="ArrowDown")u=f;else if(a&&c.key==="ArrowLeft"||!a&&c.key==="ArrowUp")u=-f;else if(c.key==="Home")u=(k.get(r)?.min||0)-L(r,t);else if(c.key==="End"){let F=k.get(i);u=L(r,t)+L(i,t)-(F?.min||0)-L(r,t)}else return;c.preventDefault();let b=L(r,t),g=L(i,t),y=b+g,w=st(b+u,r),D=st(y-w,i);w=y-D,r.style.flexBasis=`${w}px`,r.style.flexGrow="0",i.style.flexBasis=`${D}px`,i.style.flexGrow="0",at(n,r,i,t),xt(e)};n.addEventListener("keydown",p);let m=()=>{let c=k.get(r),a=k.get(i),u=c?.collapsible?r:a?.collapsible?i:null;if(!u)return;let b=k.get(u);if(!b)return;let g=u===r?i:r,y=L(r,t)+L(i,t);if(b.collapsed){b.collapsed=!1,u.removeAttribute("data-collapsed");let w=b.preCollapseSize||`${Math.round(y/2)}px`;u.style.flexBasis=w,u.style.flexGrow="0",g.style.flexBasis=`${y-parseFloat(w)}px`,g.style.flexGrow="0"}else b.preCollapseSize=u.style.flexBasis||`${L(u,t)}px`,b.collapsed=!0,u.setAttribute("data-collapsed","true"),u.style.flexBasis="0px",u.style.flexGrow="0",g.style.flexBasis=`${y}px`,g.style.flexGrow="0";at(n,r,i,t),xt(e),e.dispatchEvent(new CustomEvent("split-collapse",{bubbles:!0,detail:{pane:u,collapsed:b.collapsed}}))};return n.addEventListener("dblclick",m),{gutter:n,cleanup:()=>{n.removeEventListener("pointerdown",d),n.removeEventListener("pointermove",s),n.removeEventListener("pointerup",l),n.removeEventListener("pointercancel",l),n.removeEventListener("keydown",p),n.removeEventListener("dblclick",m)}}}function Ce(e){e.directive("split",{priority:14,init(t,r,i){it();let o=(i||"horizontal").trim()==="vertical"?"vertical":"horizontal",n=parseInt(t.getAttribute("split-gutter"),10)||6;t.classList.add("nojs-split"),t.setAttribute("data-direction",o);let d=Array.from(t.children).filter(p=>p.hasAttribute("pane"));if(d.length<2){console.warn(`[split] Container requires at least 2 [pane] children, found ${d.length}.`);return}d.forEach(p=>{k.get(p)||k.set(p,{size:p.getAttribute("pane")||null,min:parseInt(p.getAttribute("pane-min"),10)||0,max:parseInt(p.getAttribute("pane-max"),10)||1/0,collapsible:p.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null})});let s=[],l=[];for(let p=0;p<d.length-1;p++){let{gutter:m,cleanup:h}=mr(t,o,d[p],d[p+1],n);d[p].after(m),s.push(m),l.push(h)}H.set(t,{direction:o,gutterSize:n,panes:d,gutters:s}),fr(t)||d.forEach(p=>{let h=k.get(p)?.size;h?(p.style.flexBasis=h,p.style.flexGrow="0"):(p.style.flexGrow="1",p.style.flexBasis="0")}),requestAnimationFrame(()=>{s.forEach((p,m)=>{at(p,d[m],d[m+1],o)})}),pr(t,()=>{l.forEach(p=>p()),s.forEach(p=>p.remove()),H.delete(t),d.forEach(p=>k.delete(p)),t.classList.remove("nojs-split"),t.removeAttribute("data-direction")})}})}function br(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function Te(e){e.directive("pane",{priority:15,init(t,r,i){it(),t.classList.add("nojs-pane"),k.has(t)||k.set(t,{size:i||null,min:parseInt(t.getAttribute("pane-min"),10)||0,max:parseInt(t.getAttribute("pane-max"),10)||1/0,collapsible:t.getAttribute("pane-collapsible")==="true",collapsed:!1,preCollapseSize:null});let o=k.get(t),n=t.closest("[data-direction='vertical']")?"height":"width";o.min&&(t.style[`min${n==="width"?"Width":"Height"}`]=`${o.min}px`),o.max&&o.max!==1/0&&(t.style[`max${n==="width"?"Width":"Height"}`]=`${o.max}px`),br(t,()=>{t.classList.remove("nojs-pane"),k.delete(t),t.style.removeProperty("minWidth"),t.style.removeProperty("minHeight"),t.style.removeProperty("maxWidth"),t.style.removeProperty("maxHeight"),t.style.removeProperty("flexBasis"),t.style.removeProperty("flexGrow")})}})}function De(e,t={}){Ce(e),Te(e)}function Ie(){Se()}var U={sorts:new Map};function ze(){U.sorts.clear()}function Q(){if(typeof document>"u"||document.querySelector("style[data-nojs-table]"))return;let e=`
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
`.trim(),t=document.createElement("style");t.setAttribute("data-nojs-table",""),t.textContent=e,document.head.appendChild(t)}function gr(e,t){e.__disposers=e.__disposers||[],e.__disposers.push(t)}function hr(e,t){let r=e.querySelector("tbody");if(!r)return null;let i=null;if(r.hasAttribute("each")||r.hasAttribute("foreach")?i=r:i=r.querySelector("[each]")||r.querySelector("[foreach]"),!i)return null;let o=i.getAttribute("each")||i.getAttribute("foreach");if(!o)return null;let n=o.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);return n?{iteratorVar:n[1],arrayPath:n[2].trim()}:null}function vr(e,t){let r=t.split("."),i=e;for(let o of r){if(i==null)return;i=i[o]}return i}function Fe(e,t,r){let i=t.split("."),o=e;for(let n=0;n<i.length-1;n++){if(o[i[n]]==null)return;o=o[i[n]]}o[i[i.length-1]]=r}function Me(e,t,r){if(e==null&&t==null)return 0;if(e==null)return-1;if(t==null)return 1;switch(r){case"number":return Number(e)-Number(t);case"date":return new Date(e).getTime()-new Date(t).getTime();default:return String(e).localeCompare(String(t))}}function yr(e){let t=e.querySelectorAll("th[data-sortable]");for(let r of t)r.removeAttribute("data-sort-dir"),r.setAttribute("aria-sort","none")}function qe(e){e.directive("sortable",{priority:10,init(t){Q(),t.classList.add("nojs-sortable")}})}function Be(e){e.directive("sort",{priority:11,init(t,r,i){Q();let o=i;if(!o)return;let n=t.getAttribute("sort-type")||"string",d=t.getAttribute("sort-default");t.setAttribute("data-sortable",""),t.setAttribute("aria-sort","none");let s=t.closest("table");if(!s)return;U.sorts.has(s)||U.sorts.set(s,{column:null,direction:null}),(d==="asc"||d==="desc")&&Pe(t,s,o,n,d,e);let l=()=>{let f=U.sorts.get(s),p;f.column!==o?p="asc":f.direction==="asc"?p="desc":f.direction==="desc"?p=null:p="asc",Pe(t,s,o,n,p,e)};t.addEventListener("click",l),gr(t,()=>{t.removeEventListener("click",l),s&&s._nojsOriginalOrder&&delete s._nojsOriginalOrder})}})}function Pe(e,t,r,i,o,n){let d=U.sorts.get(t);yr(t),o?(e.setAttribute("data-sort-dir",o),e.setAttribute("aria-sort",o==="asc"?"ascending":"descending"),d.column=r,d.direction=o):(d.column=null,d.direction=null);let s=hr(t,n);if(s){let l=n.findContext(t),f=l?vr(l,s.arrayPath):null;if(Array.isArray(f)){if(!o){let m=t._nojsOriginalOrder;if(m){let h=new Set(f),c=m.filter(a=>h.has(a));for(let a of f)m.includes(a)||c.push(a);Fe(l,s.arrayPath,c)}return}t._nojsOriginalOrder||(t._nojsOriginalOrder=[...f]);let p=[...f].sort((m,h)=>{let c=m!=null?m[r]:null,a=h!=null?h[r]:null,u=Me(c,a,i);return o==="desc"?-u:u});Fe(l,s.arrayPath,p);return}}xr(t,e,r,i,o)}function xr(e,t,r,i,o){let n=e.querySelector("tbody");if(!n)return;let l=[...t.closest("tr").children].indexOf(t);if(l<0)return;let f=[...n.querySelectorAll(":scope > tr")];if(e._nojsOriginalRows||(e._nojsOriginalRows=[...f]),!o){let m=document.createDocumentFragment();for(let h of e._nojsOriginalRows)m.appendChild(h);n.appendChild(m);return}f.sort((m,h)=>{let c=m.children[l]?.textContent?.trim()||"",a=h.children[l]?.textContent?.trim()||"",u=Me(i==="number"?parseFloat(c.replace(/[^0-9.\-]/g,""))||0:c,i==="number"?parseFloat(a.replace(/[^0-9.\-]/g,""))||0:a,i);return o==="desc"?-u:u});let p=document.createDocumentFragment();for(let m of f)p.appendChild(m);n.appendChild(p)}function He(e){e.directive("fixed-header",{priority:10,init(t){Q(),t.classList.add("nojs-fixed-header")}})}function $e(e){e.directive("fixed-col",{priority:10,init(t){Q(),t.classList.add("nojs-fixed-col")}})}function Re(e,t={}){qe(e),Be(e),He(e),$e(e)}function Oe(){ze()}var wr={name:"nojs-elements",install(e,t={}){_t(e,t),Tt(e,t),Ht(e,t),Ut(e,t),te(e,t),ce(e,t),ge(e,t),we(e,t),_e(e,t),De(e,t),Re(e,t)},dispose(e){St(),Dt(),$t(),Nt(),ee(),de(),he(),Ae(),Ie(),Oe()}},wt=wr;typeof window<"u"&&(window.NoJSElements=wt,window.NoJS&&typeof window.NoJS.use=="function"&&window.NoJS.use(wt));})();
//# sourceMappingURL=nojs-elements.js.map
