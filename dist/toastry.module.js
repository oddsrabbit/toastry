var b=`/* Toastry \u2014 Lightweight toast notifications */

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

/* Swipe transform */
[data-toastry-toast][data-swiping="true"] {
    transition: none;
    cursor: grabbing;
}

[data-position="bottom-right"] [data-toastry-toast][data-swiping="true"],
[data-position="bottom-left"] [data-toastry-toast][data-swiping="true"] {
    transform: translateY(calc(var(--toastry-offset, 0) * -1px))
               translateX(var(--toastry-swipe, 0px));
}

[data-position="top-right"] [data-toastry-toast][data-swiping="true"],
[data-position="top-left"] [data-toastry-toast][data-swiping="true"] {
    transform: translateY(calc(var(--toastry-offset, 0) * 1px))
               translateX(var(--toastry-swipe, 0px));
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
`;var y=8,v=60,T=.3,k=200,E=200,w=!1;function A(){if(w||typeof document>"u")return;w=!0;let o=document.createElement("style");o.setAttribute("data-toastry-styles",""),o.textContent=b,document.head.appendChild(o)}var c={maxVisible:3,maxToasts:5,duration:4e3,position:"bottom-right"},m={success:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M6.5 10.5l2 2 5-5.5"/></svg>',error:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M12.5 7.5l-5 5M7.5 7.5l5 5"/></svg>',warning:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L1.5 17.5h17L10 3z"/><path d="M10 8.5v4M10 14.5v.5"/></svg>',info:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 9v5M10 6.5v.5"/></svg>',loading:'<div class="toastry-spinner"></div>'},L='<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 1l12 12M13 1L1 13"/></svg>',S=0,g=typeof document<"u"?document.createElement("div"):null,x=class{constructor(){this.toasts=[],this.container=null,this.expanded=!1,this.hovering=!1,this._collapseTimer=null,this._visibilityHandler=null,this.swipingToast=null,this.pointerStart=null,this.swipeStartTime=0}_ensureContainer(){this.container||(A(),this.container=document.createElement("div"),this.container.setAttribute("data-toastry",""),this.container.setAttribute("data-position",c.position),document.body.appendChild(this.container),this.container.addEventListener("mouseenter",()=>{this.hovering=!0,clearTimeout(this._collapseTimer),this._collapseTimer=null,this._setExpanded(!0),this._pauseAllTimers()}),this.container.addEventListener("mouseleave",()=>{this.hovering=!1,this.swipingToast||(this._collapseTimer=setTimeout(()=>{this._collapseTimer=null,this.hovering||(this._resumeAllTimers(),this._setExpanded(!1))},E))}),this._visibilityHandler=()=>{document.hidden?this._pauseAllTimers():this.hovering||this._resumeAllTimers()},document.addEventListener("visibilitychange",this._visibilityHandler))}_setExpanded(t){this.expanded=t,this.container&&this.container.setAttribute("data-expanded",t?"true":"false"),this._updateLayout()}create(t,s={}){this._ensureContainer(),this.container.getAttribute("data-position")!==c.position&&this.container.setAttribute("data-position",c.position);let e=++S,i=s.type||"default",n=s.duration!==void 0?s.duration:c.duration,a=document.createElement("div");a.setAttribute("data-toastry-toast",e),a.setAttribute("data-type",i),a.setAttribute("data-mounted","false"),a.setAttribute("data-front","true"),a.setAttribute("role",i==="error"?"alert":"status"),a.setAttribute("aria-live",i==="error"?"assertive":"polite"),a.setAttribute("aria-atomic","true");let d="";m[i]&&(d+=`<div class="toastry-icon">${m[i]}</div>`),d+='<div class="toastry-content">',d+=`<div class="toastry-title">${this._escape(t)}</div>`,s.description&&(d+=`<div class="toastry-description">${this._escape(s.description)}</div>`),s.action&&(d+=`<button class="toastry-action">${this._escape(s.action.label)}</button>`),d+="</div>",d+=`<button class="toastry-close" aria-label="Close">${L}</button>`,a.innerHTML=d,s.action&&a.querySelector(".toastry-action").addEventListener("click",p=>{p.stopPropagation(),s.action.onClick?.(),this.dismiss(e)}),a.querySelector(".toastry-close").addEventListener("click",r=>{r.stopPropagation(),this.dismiss(e)}),a.addEventListener("pointerdown",r=>{r.target.closest(".toastry-close")||r.target.closest(".toastry-action")||this._onPointerDown(r,e)}),a.addEventListener("pointermove",r=>this._onPointerMove(r,e)),a.addEventListener("pointerup",r=>this._onPointerUp(r,e)),a.addEventListener("pointercancel",()=>this._onPointerCancel(e)),this.container.appendChild(a);let l={id:e,el:a,type:i,duration:n,height:a.offsetHeight,timer:null,remaining:n,startTime:null,dismissing:!1};return this.toasts.push(l),this._pruneOld(),this._updateLayout(),requestAnimationFrame(()=>{a.setAttribute("data-mounted","true"),n>0&&this._startTimer(l)}),e}dismiss(t){if(t===void 0){[...this.toasts].forEach(e=>this.dismiss(e.id));return}let s=this.toasts.find(e=>e.id===t);!s||s.dismissing||(s.dismissing=!0,clearTimeout(s.timer),s.el.setAttribute("data-dismissing","true"),this._updateLayout(),setTimeout(()=>{s.el.remove(),this.toasts=this.toasts.filter(e=>e.id!==t),this._updateLayout(),this.toasts.length===0&&(clearTimeout(this._collapseTimer),this._collapseTimer=null,this.expanded=!1,this.hovering=!1,this._visibilityHandler&&(document.removeEventListener("visibilitychange",this._visibilityHandler),this._visibilityHandler=null),this.container&&(this.container.remove(),this.container=null))},k))}_update(t,s,e={}){let i=this.toasts.find(p=>p.id===t);if(!i||i.dismissing)return;let n=e.type||"default";i.el.setAttribute("data-type",n),i.el.setAttribute("role",n==="error"?"alert":"status"),i.el.setAttribute("aria-live",n==="error"?"assertive":"polite"),i.type=n;let a=i.el.querySelector(".toastry-icon");if(m[n])if(a)a.innerHTML=m[n];else{let p=document.createElement("div");p.className="toastry-icon",p.innerHTML=m[n],i.el.insertBefore(p,i.el.firstChild)}else a&&a.remove();let d=i.el.querySelector(".toastry-title");d&&(d.textContent=s);let l=i.el.querySelector(".toastry-description");if(e.description)if(l)l.textContent=e.description;else{let p=i.el.querySelector(".toastry-content"),h=document.createElement("div");h.className="toastry-description",h.textContent=e.description,p.appendChild(h)}else l&&l.remove();i.height=i.el.offsetHeight,this._updateLayout();let r=e.duration!==void 0?e.duration:c.duration;i.duration=r,i.remaining=r,r>0&&this._startTimer(i)}_startTimer(t){clearTimeout(t.timer),t.startTime=Date.now(),t.timer=setTimeout(()=>this.dismiss(t.id),t.remaining)}_pauseAllTimers(){this.toasts.forEach(t=>{t.timer&&t.remaining>0&&(clearTimeout(t.timer),t.timer=null,t.remaining-=Date.now()-(t.startTime||Date.now()),t.remaining<0&&(t.remaining=0))})}_resumeAllTimers(){this.toasts.forEach(t=>{!t.timer&&t.remaining>0&&!t.dismissing&&t.duration>0&&this._startTimer(t)})}_updateLayout(){let t=this.toasts.filter(a=>!a.dismissing),s=t.length,e=c.position.startsWith("top"),i=0,n=0;if(t.forEach((a,d)=>{let l=s-1-d,r=l===0;a.el.setAttribute("data-front",r?"true":"false");let p=l*y,h=1-l*.05;a.el.style.setProperty("--toastry-offset",p),a.el.style.setProperty("--toastry-scale",Math.max(h,.85)),a.el.style.setProperty("--toastry-expanded-offset",i),i+=a.height+y,r&&(n=a.height+(s-1)*y),!this.expanded&&l>=c.maxVisible?(a.el.style.opacity="0",a.el.style.pointerEvents="none"):(a.el.style.opacity="",a.el.style.pointerEvents="")}),this.container){let a=this.expanded?i:n;this.container.style.height=(a||0)+"px"}}_pruneOld(){for(;this.toasts.filter(t=>!t.dismissing).length>c.maxToasts;){let t=this.toasts.find(s=>!s.dismissing);t&&this.dismiss(t.id)}}_onPointerDown(t,s){let e=this.toasts.find(i=>i.id===s);!e||e.dismissing||(e.el.setPointerCapture(t.pointerId),this.swipingToast=s,this.pointerStart={x:t.clientX,y:t.clientY},this.swipeStartTime=Date.now())}_onPointerMove(t,s){if(this.swipingToast!==s||!this.pointerStart)return;let e=this.toasts.find(d=>d.id===s);if(!e||e.dismissing)return;let i=t.clientX-this.pointerStart.x,n=c.position.endsWith("right"),a=n?Math.max(0,i):Math.max(0,-i);if(a>2){e.el.setAttribute("data-swiping","true");let d=n?a:-a;e.el.style.setProperty("--toastry-swipe",d+"px"),e.el.style.opacity=Math.max(0,1-a/(v*2.5))}}_onPointerCancel(t){if(this.swipingToast!==t)return;let s=this.toasts.find(e=>e.id===t);s&&!s.dismissing&&(s.el.removeAttribute("data-swiping"),s.el.style.removeProperty("--toastry-swipe"),s.el.style.opacity=""),this._resetSwipe()}_onPointerUp(t,s){if(this.swipingToast!==s||!this.pointerStart)return;let e=this.toasts.find(r=>r.id===s);if(!e||e.dismissing){this._resetSwipe();return}let i=t.clientX-this.pointerStart.x,n=c.position.endsWith("right"),a=n?Math.max(0,i):Math.max(0,-i),d=Date.now()-this.swipeStartTime,l=a/Math.max(d,1);if(a>=v||l>=T){let r=n?"150%":"-150%";e.el.style.setProperty("--toastry-swipe",r),e.el.style.opacity="0",e.el.style.transition="transform 0.2s ease, opacity 0.15s ease",setTimeout(()=>this.dismiss(s),150)}else e.el.removeAttribute("data-swiping"),e.el.style.removeProperty("--toastry-swipe"),e.el.style.opacity="";this._resetSwipe()}_resetSwipe(){this.swipingToast=null,this.pointerStart=null,this.hovering||this._setExpanded(!1)}_escape(t){return g?(g.textContent=t,g.innerHTML):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}},u=new x;function f(o,t){return u.create(o,t)}f.success=function(o,t){return u.create(o,{...t,type:"success"})};f.error=function(o,t){return u.create(o,{...t,type:"error"})};f.warning=function(o,t){return u.create(o,{...t,type:"warning"})};f.info=function(o,t){return u.create(o,{...t,type:"info"})};f.loading=function(o,t){return u.create(o,{...t,type:"loading",duration:0})};f.promise=function(o,t={}){let s=u.create(t.loading||"Loading...",{type:"loading",duration:0});return o.then(e=>{let i=typeof t.success=="function"?t.success(e):t.success||"Done";u._update(s,i,{type:"success"})}).catch(e=>{let i=typeof t.error=="function"?t.error(e):t.error||"Something went wrong";u._update(s,i,{type:"error"})}),o};f.dismiss=function(o){u.dismiss(o)};f.configure=function(o={}){o.position&&(c.position=o.position),o.duration!==void 0&&(c.duration=o.duration),o.maxVisible!==void 0&&(c.maxVisible=o.maxVisible),o.maxToasts!==void 0&&(c.maxToasts=o.maxToasts)};var P=f;export{P as default,f as toast};
//# sourceMappingURL=toastry.module.js.map
