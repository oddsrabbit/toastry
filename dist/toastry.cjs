var m=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var L=Object.prototype.hasOwnProperty;var k=(o,t)=>{for(var s in t)m(o,s,{get:t[s],enumerable:!0})},C=(o,t,s,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of E(t))!L.call(o,a)&&a!==s&&m(o,a,{get:()=>t[a],enumerable:!(e=T(t,a))||e.enumerable});return o};var S=o=>C(m({},"__esModule",{value:!0}),o);var N={};k(N,{default:()=>z,toast:()=>u});module.exports=S(N);var _=`/* Toastry \u2014 Beautiful, modern toast notifications */

:root {
    --toastry-bg: #fff;
    --toastry-border: #e5e5e5;
    --toastry-text: #171717;
    --toastry-text-muted: #6b7280;
    --toastry-text-faint: #9ca3af;
    --toastry-accent: #2563eb;
    --toastry-success: #16a34a;
    --toastry-error: #dc2626;
    --toastry-warning: #f59e0b;
    --toastry-close-hover-bg: #f3f4f6;
    --toastry-action-border: #e5e7eb;
    --toastry-action-border-hover: #d1d5db;
    --toastry-spinner-track: #e5e7eb;
    --toastry-font: system-ui, -apple-system, sans-serif;
}

[data-toastry] {
    position: fixed;
    width: 356px;
    z-index: 999999;
    display: flex;
    align-items: flex-end;
    pointer-events: none;
    box-sizing: border-box;
}

/* Position variants */
[data-toastry][data-position="bottom-right"] {
    bottom: 32px;
    right: 32px;
}

[data-toastry][data-position="bottom-left"] {
    bottom: 32px;
    left: 32px;
}

[data-toastry][data-position="top-right"] {
    top: 32px;
    right: 32px;
}

[data-toastry][data-position="top-left"] {
    top: 32px;
    left: 32px;
}

[data-toastry-toast] {
    position: absolute;
    width: 356px;
    padding: 14px 16px;
    background: var(--toastry-bg, #fff);
    border: 1px solid var(--toastry-border, #e5e5e5);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    font-family: var(--toastry-font, system-ui, -apple-system, sans-serif);
    font-size: 14px;
    line-height: 1.4;
    color: var(--toastry-text, #171717);
    pointer-events: auto;
    cursor: grab;
    user-select: none;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    opacity: 0;
    will-change: transform, opacity;
    transition: transform 0.35s cubic-bezier(0.2, 0, 0, 1),
                opacity 0.3s ease,
                box-shadow 0.3s ease;
    touch-action: none;
}

/* Bottom positions \u2014 toasts stack upward */
[data-position="bottom-right"] [data-toastry-toast],
[data-position="bottom-left"] [data-toastry-toast] {
    bottom: 0;
    transform: translateY(calc(var(--toastry-offset, 0) * -1px))
               scale(var(--toastry-scale, 1));
}

/* Top positions \u2014 toasts stack downward */
[data-position="top-right"] [data-toastry-toast],
[data-position="top-left"] [data-toastry-toast] {
    top: 0;
    transform: translateY(calc(var(--toastry-offset, 0) * 1px))
               scale(var(--toastry-scale, 1));
}

/* Left positions \u2014 align to left edge */
[data-position="bottom-left"] [data-toastry-toast],
[data-position="top-left"] [data-toastry-toast] {
    left: 0;
}

/* Right positions \u2014 align to right edge */
[data-position="bottom-right"] [data-toastry-toast],
[data-position="top-right"] [data-toastry-toast] {
    right: 0;
}

[data-toastry-toast]:active {
    cursor: grabbing;
}

/* Entrance animation */
[data-toastry-toast][data-mounted="true"] {
    opacity: 1;
}

/* Initial state before mount \u2014 bottom positions */
[data-position="bottom-right"] [data-toastry-toast][data-mounted="false"],
[data-position="bottom-left"] [data-toastry-toast][data-mounted="false"] {
    opacity: 0;
    transform: translateY(80px) scale(0.95);
}

/* Initial state before mount \u2014 top positions */
[data-position="top-right"] [data-toastry-toast][data-mounted="false"],
[data-position="top-left"] [data-toastry-toast][data-mounted="false"] {
    opacity: 0;
    transform: translateY(-80px) scale(0.95);
}

/* Dismissing \u2014 front toast slides off-screen (bottom) */
[data-position="bottom-right"] [data-toastry-toast][data-dismissing="true"][data-front="true"],
[data-position="bottom-left"] [data-toastry-toast][data-dismissing="true"][data-front="true"],
[data-position="bottom-right"][data-expanded="true"] [data-toastry-toast][data-dismissing="true"],
[data-position="bottom-left"][data-expanded="true"] [data-toastry-toast][data-dismissing="true"] {
    opacity: 0;
    transform: translateY(100%);
    transition: transform 400ms, opacity 400ms;
}

/* Dismissing \u2014 front toast slides off-screen (top) */
[data-position="top-right"] [data-toastry-toast][data-dismissing="true"][data-front="true"],
[data-position="top-left"] [data-toastry-toast][data-dismissing="true"][data-front="true"],
[data-position="top-right"][data-expanded="true"] [data-toastry-toast][data-dismissing="true"],
[data-position="top-left"][data-expanded="true"] [data-toastry-toast][data-dismissing="true"] {
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 400ms, opacity 400ms;
}

/* Dismissing \u2014 non-front toast in collapsed stack fades out (bottom) */
[data-position="bottom-right"] [data-toastry-toast][data-dismissing="true"][data-front="false"],
[data-position="bottom-left"] [data-toastry-toast][data-dismissing="true"][data-front="false"] {
    opacity: 0;
    transform: translateY(40%);
    transition: transform 500ms, opacity 200ms;
}

/* Dismissing \u2014 non-front toast in collapsed stack fades out (top) */
[data-position="top-right"] [data-toastry-toast][data-dismissing="true"][data-front="false"],
[data-position="top-left"] [data-toastry-toast][data-dismissing="true"][data-front="false"] {
    opacity: 0;
    transform: translateY(-40%);
    transition: transform 500ms, opacity 200ms;
}

/* Swiping \u2014 disable transitions, JS handles transform inline */
[data-toastry-toast][data-swiping="true"] {
    transition: none !important;
    cursor: grabbing;
}

/* Expanded \u2014 container becomes hover target */
[data-toastry][data-expanded="true"] {
    pointer-events: auto;
}

/* Expanded \u2014 bottom positions */
[data-position="bottom-right"][data-expanded="true"] [data-toastry-toast],
[data-position="bottom-left"][data-expanded="true"] [data-toastry-toast] {
    transition: transform 0.35s cubic-bezier(0.2, 0, 0, 1),
                opacity 0.3s ease;
    transform: translateY(calc(var(--toastry-expanded-offset, 0) * -1px))
               scale(1);
}

/* Expanded \u2014 top positions */
[data-position="top-right"][data-expanded="true"] [data-toastry-toast],
[data-position="top-left"][data-expanded="true"] [data-toastry-toast] {
    transition: transform 0.35s cubic-bezier(0.2, 0, 0, 1),
                opacity 0.3s ease;
    transform: translateY(calc(var(--toastry-expanded-offset, 0) * 1px))
               scale(1);
}

/* Non-front toasts when collapsed */
[data-toastry-toast][data-front="false"][data-mounted="true"] {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Toast content layout */
.toastry-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
}

.toastry-icon svg {
    width: 20px;
    height: 20px;
}

.toastry-icon img {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    object-fit: cover;
}

.toastry-content {
    flex: 1;
    min-width: 0;
    line-height: 1.7;
}

.toastry-title {
    font-weight: 500;
    color: var(--toastry-text, #171717);
    word-break: break-word;
}

.toastry-description {
    margin-top: 2px;
    font-size: 13px;
    color: var(--toastry-text-muted, #6b7280);
    word-break: break-word;
}

.toastry-close {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    color: var(--toastry-text-faint, #9ca3af);
    cursor: pointer;
    padding: 0;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.15s ease, background 0.15s ease, color 0.15s ease;
    margin-top: 1px;
}

[data-toastry-toast]:hover .toastry-close {
    opacity: 1;
}

.toastry-close:hover {
    background: var(--toastry-close-hover-bg, #f3f4f6);
    color: var(--toastry-text, #171717);
}

.toastry-close svg {
    width: 14px;
    height: 14px;
}

/* Action button inside toast */
.toastry-action {
    display: inline-flex;
    align-items: center;
    margin-top: 8px;
    padding: 4px 10px;
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;
    color: var(--toastry-accent, #2563eb);
    background: none;
    border: 1px solid var(--toastry-action-border, #e5e7eb);
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
}

.toastry-action:hover {
    background: var(--toastry-close-hover-bg, #f3f4f6);
    border-color: var(--toastry-action-border-hover, #d1d5db);
}

/* Dismiss-all button \u2014 opt-in via toast.configure({ clearAll: true }).
   Sits on the stack's growing edge (above for bottom positions, below for
   top), right-aligned like each toast's close button. Hidden via visibility
   as well as opacity so it can't take focus while it isn't shown. */
.toastry-clear-all {
    position: absolute;
    right: 0;
    padding: 4px 10px;
    font-family: var(--toastry-font, system-ui, -apple-system, sans-serif);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--toastry-text-muted, #6b7280);
    background: var(--toastry-bg, #fff);
    border: 1px solid var(--toastry-border, #e5e5e5);
    border-radius: 999px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    /* Hide only after the fade-out; show instantly (see below) so a quick
       Tab press can land on it. */
    transition: opacity 0.2s ease, visibility 0s linear 0.2s, background 0.15s ease, color 0.15s ease;
}

/* Transparent bridge across the gap to the stack, so moving the pointer from
   a toast to the button never leaves the container and collapses it. */
.toastry-clear-all::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 8px;
}

[data-position="bottom-right"] .toastry-clear-all,
[data-position="bottom-left"] .toastry-clear-all {
    bottom: calc(100% + 8px);
}

[data-position="bottom-right"] .toastry-clear-all::after,
[data-position="bottom-left"] .toastry-clear-all::after {
    top: 100%;
}

[data-position="top-right"] .toastry-clear-all,
[data-position="top-left"] .toastry-clear-all {
    top: calc(100% + 8px);
}

[data-position="top-right"] .toastry-clear-all::after,
[data-position="top-left"] .toastry-clear-all::after {
    bottom: 100%;
}

.toastry-clear-all:hover {
    background: var(--toastry-close-hover-bg, #f3f4f6);
    color: var(--toastry-text, #171717);
}

[data-toastry][data-clearable="true"][data-expanded="true"] .toastry-clear-all {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition-delay: 0s;
}

/* No hover on touch \u2014 the stack never expands on its own there, so show the
   button whenever it applies. */
@media (hover: none) {
    [data-toastry][data-clearable="true"] .toastry-clear-all {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transition-delay: 0s;
    }
}

/* Type-specific icon colors */
[data-type="success"] .toastry-icon { color: var(--toastry-success, #16a34a); }
[data-type="error"] .toastry-icon { color: var(--toastry-error, #dc2626); }
[data-type="warning"] .toastry-icon { color: var(--toastry-warning, #f59e0b); }
[data-type="info"] .toastry-icon { color: var(--toastry-accent, #2563eb); }

/* Loading spinner */
.toastry-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--toastry-spinner-track, #e5e7eb);
    border-top-color: var(--toastry-text-muted, #6b7280);
    border-radius: 50%;
    animation: toastry-spin 0.6s linear infinite;
}

@keyframes toastry-spin {
    to { transform: rotate(360deg); }
}

/* Mobile responsive */
@media (max-width: 600px) {
    [data-toastry] {
        width: auto;
    }

    [data-toastry][data-position="bottom-right"],
    [data-toastry][data-position="bottom-left"] {
        bottom: 16px;
        right: 16px;
        left: 16px;
    }

    [data-toastry][data-position="top-right"],
    [data-toastry][data-position="top-left"] {
        top: 16px;
        right: 16px;
        left: 16px;
    }

    [data-toastry-toast] {
        width: 100%;
    }
}
`;var g=8,w=60,B=.3,M=200,D=200,H=2,A=!1;function Y(){if(A||typeof document>"u")return;A=!0;let o=document.createElement("style");o.setAttribute("data-toastry-styles",""),o.textContent=_,document.head.appendChild(o)}var l={maxVisible:3,maxToasts:5,duration:4e3,position:"bottom-right",clearAll:!1,clearAllLabel:"Dismiss all"},b={success:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M6.5 10.5l2 2 5-5.5"/></svg>',error:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M12.5 7.5l-5 5M7.5 7.5l5 5"/></svg>',warning:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L1.5 17.5h17L10 3z"/><path d="M10 8.5v4M10 14.5v.5"/></svg>',info:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 9v5M10 6.5v.5"/></svg>',loading:'<div class="toastry-spinner"></div>'},O='<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 1l12 12M13 1L1 13"/></svg>',I=0;function $(o){try{return o.matches(":focus-visible")}catch{return!1}}var x=typeof document<"u"?document.createElement("div"):null,v=class{constructor(){this.toasts=[],this.container=null,this.expanded=!1,this.hovering=!1,this.focused=!1,this._collapseTimer=null,this._visibilityHandler=null,this._clearAllBtn=null,this._clearAllPointer=null,this.swipingToast=null,this.pointerStart=null,this.swipeStartTime=0}_ensureContainer(){this.container||(Y(),this.container=document.createElement("div"),this.container.setAttribute("data-toastry",""),this.container.setAttribute("data-position",l.position),document.body.appendChild(this.container),this.container.addEventListener("mouseenter",()=>{this.hovering=!0,this._engage()}),this.container.addEventListener("mouseleave",()=>{this.hovering=!1,this.swipingToast||this._scheduleCollapse()}),this.container.addEventListener("focusin",t=>{$(t.target)&&(this.focused=!0,this._engage())}),this.container.addEventListener("focusout",t=>{this.container&&this.container.contains(t.relatedTarget)||this._onFocusLost()}),this._visibilityHandler=()=>{document.hidden?this._pauseAllTimers():this._isEngaged()||this._resumeAllTimers()},document.addEventListener("visibilitychange",this._visibilityHandler))}_isEngaged(){return this.hovering||this.focused}_engage(){clearTimeout(this._collapseTimer),this._collapseTimer=null,this._setExpanded(!0),this._pauseAllTimers()}_scheduleCollapse(){clearTimeout(this._collapseTimer),this._collapseTimer=setTimeout(()=>{this._collapseTimer=null,this._isEngaged()||(this._resumeAllTimers(),this._setExpanded(!1))},D)}_onFocusLost(){this.focused&&(this.focused=!1,!this.hovering&&!this.swipingToast&&this._scheduleCollapse())}_setExpanded(t){this.expanded=t,this.container&&this.container.setAttribute("data-expanded",t?"true":"false"),this._updateLayout()}create(t,s={}){this._ensureContainer(),this.container.getAttribute("data-position")!==l.position&&this.container.setAttribute("data-position",l.position);let e=++I,a=s.type||"default",n=s.duration!==void 0?s.duration:l.duration,i=document.createElement("div");i.setAttribute("data-toastry-toast",e),i.setAttribute("data-type",a),i.setAttribute("data-mounted","false"),i.setAttribute("data-front","true"),i.setAttribute("role",a==="error"?"alert":"status"),i.setAttribute("aria-live",a==="error"?"assertive":"polite"),i.setAttribute("aria-atomic","true");let d="";s.icon?d+=`<div class="toastry-icon"><img src="${this._escape(s.icon)}" alt=""></div>`:b[a]&&(d+=`<div class="toastry-icon">${b[a]}</div>`),d+='<div class="toastry-content">',d+=`<div class="toastry-title">${this._escape(t)}</div>`,s.description&&(d+=`<div class="toastry-description">${this._escape(s.description)}</div>`),s.action&&(d+=`<button class="toastry-action">${this._escape(s.action.label)}</button>`),d+="</div>",d+=`<button class="toastry-close" aria-label="Close">${O}</button>`,i.innerHTML=d,s.action&&i.querySelector(".toastry-action").addEventListener("click",h=>{h.stopPropagation(),s.action.onClick?.(),this.dismiss(e)}),i.querySelector(".toastry-close").addEventListener("click",r=>{r.stopPropagation(),this.dismiss(e)}),i.addEventListener("pointerdown",r=>{r.target.closest(".toastry-close")||r.target.closest(".toastry-action")||this._onPointerDown(r,e)}),i.addEventListener("pointermove",r=>this._onPointerMove(r,e)),i.addEventListener("pointerup",r=>this._onPointerUp(r,e)),i.addEventListener("pointercancel",()=>this._onPointerCancel(e)),this.container.insertBefore(i,this._clearAllBtn);let c={id:e,el:i,type:a,duration:n,height:i.offsetHeight,timer:null,remaining:n,startTime:null,dismissing:!1};return this.toasts.push(c),this._pruneOld(),this._updateLayout(),requestAnimationFrame(()=>{i.setAttribute("data-mounted","true"),n>0&&this._startTimer(c)}),e}dismissAll(){[...this.toasts].filter(t=>!t.dismissing&&t.type!=="loading").forEach(t=>this.dismiss(t.id))}dismiss(t){if(t===void 0){[...this.toasts].forEach(e=>this.dismiss(e.id));return}let s=this.toasts.find(e=>e.id===t);!s||s.dismissing||(s.dismissing=!0,clearTimeout(s.timer),s.el.setAttribute("data-dismissing","true"),this._updateLayout(),setTimeout(()=>{s.el.remove(),this.toasts=this.toasts.filter(e=>e.id!==t),this._updateLayout(),this.focused&&this.container&&!this.container.contains(document.activeElement)&&this._onFocusLost(),this.toasts.length===0&&(clearTimeout(this._collapseTimer),this._collapseTimer=null,this.expanded=!1,this.hovering=!1,this.focused=!1,this._visibilityHandler&&(document.removeEventListener("visibilitychange",this._visibilityHandler),this._visibilityHandler=null),this.container&&(this.container.remove(),this.container=null,this._clearAllBtn=null))},M))}_update(t,s,e={}){let a=this.toasts.find(f=>f.id===t);if(!a||a.dismissing)return;let n=e.type||"default";a.el.setAttribute("data-type",n),a.el.setAttribute("role",n==="error"?"alert":"status"),a.el.setAttribute("aria-live",n==="error"?"assertive":"polite"),a.type=n;let i=a.el.querySelector(".toastry-icon"),d=e.icon?`<img src="${this._escape(e.icon)}" alt="">`:b[n]||null;if(d)if(i)i.innerHTML=d;else{let f=document.createElement("div");f.className="toastry-icon",f.innerHTML=d,a.el.insertBefore(f,a.el.firstChild)}else i&&i.remove();let c=a.el.querySelector(".toastry-title");c&&(c.textContent=s);let r=a.el.querySelector(".toastry-description");if(e.description)if(r)r.textContent=e.description;else{let f=a.el.querySelector(".toastry-content"),y=document.createElement("div");y.className="toastry-description",y.textContent=e.description,f.appendChild(y)}else r&&r.remove();a.height=a.el.offsetHeight,this._updateLayout();let h=e.duration!==void 0?e.duration:l.duration;a.duration=h,a.remaining=h,h>0&&this._startTimer(a)}_startTimer(t){clearTimeout(t.timer),t.startTime=Date.now(),t.timer=setTimeout(()=>this.dismiss(t.id),t.remaining)}_pauseAllTimers(){this.toasts.forEach(t=>{t.timer&&t.remaining>0&&(clearTimeout(t.timer),t.timer=null,t.remaining-=Date.now()-(t.startTime||Date.now()),t.remaining<0&&(t.remaining=0))})}_resumeAllTimers(){this.toasts.forEach(t=>{!t.timer&&t.remaining>0&&!t.dismissing&&t.duration>0&&this._startTimer(t)})}_updateLayout(){let t=this.toasts.filter(i=>!i.dismissing),s=t.length,e=l.position.startsWith("top"),a=0,n=0;if(t.forEach((i,d)=>{let c=s-1-d,r=c===0;i.el.setAttribute("data-front",r?"true":"false");let h=c*g,f=1-c*.05;i.el.style.setProperty("--toastry-offset",h),i.el.style.setProperty("--toastry-scale",Math.max(f,.85)),i.el.style.setProperty("--toastry-expanded-offset",a),a+=i.height+g,r&&(n=i.height+(s-1)*g),this.swipingToast!==i.id&&(!this.expanded&&c>=l.maxVisible?(i.el.style.opacity="0",i.el.style.pointerEvents="none"):(i.el.style.opacity="",i.el.style.pointerEvents=""))}),this.container){let i=this.expanded?a:n;this.container.style.height=(i||0)+"px"}this._syncClearAll(t)}_syncClearAll(t){if(!this.container)return;if(!l.clearAll){this._clearAllBtn&&(this._clearAllBtn.remove(),this._clearAllBtn=null),this.container.removeAttribute("data-clearable");return}if(!this._clearAllBtn){let e=document.createElement("button");e.type="button",e.className="toastry-clear-all",e.addEventListener("click",a=>{a.stopPropagation(),this.dismissAll(),document.activeElement===e&&e.blur()}),e.addEventListener("pointerdown",a=>{a.pointerType!=="mouse"&&(this._clearAllPointer=a.pointerId)}),e.addEventListener("pointercancel",()=>{this._clearAllPointer=null}),e.addEventListener("pointerup",a=>{a.pointerType==="mouse"||a.pointerId!==this._clearAllPointer||(this._clearAllPointer=null,a.stopPropagation(),this.dismissAll())}),this.container.appendChild(e),this._clearAllBtn=e}this._clearAllBtn.textContent!==l.clearAllLabel&&(this._clearAllBtn.textContent=l.clearAllLabel);let s=t.filter(e=>e.type!=="loading").length;this.container.setAttribute("data-clearable",s>=H?"true":"false")}_pruneOld(){for(;this.toasts.filter(t=>!t.dismissing).length>l.maxToasts;){let t=this.toasts.find(s=>!s.dismissing);t&&this.dismiss(t.id)}}_getSwipeBaseTransform(t){let e=l.position.startsWith("top")?1:-1;return`translateY(${(this.expanded?parseFloat(t.el.style.getPropertyValue("--toastry-expanded-offset"))||0:parseFloat(t.el.style.getPropertyValue("--toastry-offset"))||0)*e}px)`}_onPointerDown(t,s){let e=this.toasts.find(a=>a.id===s);!e||e.dismissing||(e.el.setPointerCapture(t.pointerId),this.swipingToast=s,this.pointerStart={x:t.clientX,y:t.clientY},this.swipeStartTime=Date.now())}_onPointerMove(t,s){if(this.swipingToast!==s||!this.pointerStart)return;let e=this.toasts.find(i=>i.id===s);if(!e||e.dismissing)return;let a=t.clientX-this.pointerStart.x,n=Math.abs(a);if(n>2){e.el.setAttribute("data-swiping","true");let i=this._getSwipeBaseTransform(e);e.el.style.transform=`${i} translateX(${a}px)`,e.el.style.opacity=Math.max(0,1-n/(w*2.5))}}_onPointerCancel(t){if(this.swipingToast!==t)return;let s=this.toasts.find(e=>e.id===t);s&&!s.dismissing&&(s.el.removeAttribute("data-swiping"),s.el.style.transform="",s.el.style.opacity=""),this._resetSwipe()}_onPointerUp(t,s){if(this.swipingToast!==s||!this.pointerStart)return;let e=this.toasts.find(c=>c.id===s);if(!e||e.dismissing){this._resetSwipe();return}let a=t.clientX-this.pointerStart.x,n=Math.abs(a),i=Date.now()-this.swipeStartTime,d=n/Math.max(i,1);if(n>=w||d>=B){let c=a>0?"150%":"-150%",r=this._getSwipeBaseTransform(e);e.el.style.transform=`${r} translateX(${c})`,e.el.style.opacity="0",e.el.style.transition="transform 0.2s ease, opacity 0.15s ease",setTimeout(()=>this.dismiss(s),150)}else e.el.removeAttribute("data-swiping"),e.el.style.transform="",e.el.style.opacity="";this._resetSwipe()}_resetSwipe(){this.swipingToast=null,this.pointerStart=null,this._isEngaged()||this._setExpanded(!1)}_escape(t){return x?(x.textContent=t,x.innerHTML):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}},p=new v;function u(o,t){return p.create(o,t)}u.success=function(o,t){return p.create(o,{...t,type:"success"})};u.error=function(o,t){return p.create(o,{...t,type:"error"})};u.warning=function(o,t){return p.create(o,{...t,type:"warning"})};u.info=function(o,t){return p.create(o,{...t,type:"info"})};u.loading=function(o,t){return p.create(o,{...t,type:"loading",duration:0})};u.promise=function(o,t={}){let s=p.create(t.loading||"Loading...",{type:"loading",duration:0});return o.then(e=>{let a=typeof t.success=="function"?t.success(e):t.success||"Done";p._update(s,a,{type:"success"})}).catch(e=>{let a=typeof t.error=="function"?t.error(e):t.error||"Something went wrong";p._update(s,a,{type:"error"})}),o};u.dismiss=function(o){p.dismiss(o)};u.dismissAll=function(){p.dismissAll()};u.configure=function(o={}){o.position&&(l.position=o.position),o.duration!==void 0&&(l.duration=o.duration),o.maxVisible!==void 0&&(l.maxVisible=o.maxVisible),o.maxToasts!==void 0&&(l.maxToasts=o.maxToasts),o.clearAll!==void 0&&(l.clearAll=!!o.clearAll),o.clearAllLabel&&(l.clearAllLabel=String(o.clearAllLabel)),p._updateLayout()};var z=u;
//# sourceMappingURL=toastry.cjs.map
