import styles from './styles.css';

const GAP = 8;
const SWIPE_THRESHOLD = 60;
const VELOCITY_THRESHOLD = 0.3;
const UNMOUNT_DELAY = 200;
const COLLAPSE_DELAY = 200;

let _styleInjected = false;

function _injectStyles() {
    if (_styleInjected || typeof document === 'undefined') return;
    _styleInjected = true;
    const style = document.createElement('style');
    style.setAttribute('data-toastry-styles', '');
    style.textContent = styles;
    document.head.appendChild(style);
}

// Defaults (overridable via toast.configure())
let config = {
    maxVisible: 3,
    maxToasts: 5,
    duration: 4000,
    position: 'bottom-right',
};

// SVG icons for each toast type
const ICONS = {
    success: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M6.5 10.5l2 2 5-5.5"/></svg>',
    error: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M12.5 7.5l-5 5M7.5 7.5l5 5"/></svg>',
    warning: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L1.5 17.5h17L10 3z"/><path d="M10 8.5v4M10 14.5v.5"/></svg>',
    info: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M10 9v5M10 6.5v.5"/></svg>',
    loading: '<div class="toastry-spinner"></div>',
};

const CLOSE_ICON = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 1l12 12M13 1L1 13"/></svg>';

let toastId = 0;
const _escapeDiv = typeof document !== 'undefined' ? document.createElement('div') : null;

class ToastManager {
    constructor() {
        this.toasts = [];
        this.container = null;
        this.expanded = false;
        this.hovering = false;
        this._collapseTimer = null;
        this._visibilityHandler = null;

        // Pointer tracking for swipe
        this.swipingToast = null;
        this.pointerStart = null;
        this.swipeStartTime = 0;
    }

    _ensureContainer() {
        if (this.container) return;
        _injectStyles();
        this.container = document.createElement('div');
        this.container.setAttribute('data-toastry', '');
        this.container.setAttribute('data-position', config.position);
        document.body.appendChild(this.container);

        this.container.addEventListener('mouseenter', () => {
            this.hovering = true;
            clearTimeout(this._collapseTimer);
            this._collapseTimer = null;
            this._setExpanded(true);
            this._pauseAllTimers();
        });
        this.container.addEventListener('mouseleave', () => {
            this.hovering = false;
            if (!this.swipingToast) {
                this._collapseTimer = setTimeout(() => {
                    this._collapseTimer = null;
                    if (!this.hovering) {
                        this._resumeAllTimers();
                        this._setExpanded(false);
                    }
                }, COLLAPSE_DELAY);
            }
        });

        this._visibilityHandler = () => {
            if (document.hidden) {
                this._pauseAllTimers();
            } else if (!this.hovering) {
                this._resumeAllTimers();
            }
        };
        document.addEventListener('visibilitychange', this._visibilityHandler);
    }

    _setExpanded(expanded) {
        this.expanded = expanded;
        if (this.container) {
            this.container.setAttribute('data-expanded', expanded ? 'true' : 'false');
        }
        this._updateLayout();
    }

    /**
     * Create and show a toast
     * @param {string} message
     * @param {Object} options
     * @returns {number} toast id
     */
    create(message, options = {}) {
        this._ensureContainer();

        // Update position if it changed
        if (this.container.getAttribute('data-position') !== config.position) {
            this.container.setAttribute('data-position', config.position);
        }

        const id = ++toastId;
        const type = options.type || 'default';
        const duration = options.duration !== undefined ? options.duration : config.duration;

        // Build DOM
        const el = document.createElement('div');
        el.setAttribute('data-toastry-toast', id);
        el.setAttribute('data-type', type);
        el.setAttribute('data-mounted', 'false');
        el.setAttribute('data-front', 'true');
        el.setAttribute('role', type === 'error' ? 'alert' : 'status');
        el.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
        el.setAttribute('aria-atomic', 'true');

        let html = '';

        // Icon
        if (ICONS[type]) {
            html += `<div class="toastry-icon">${ICONS[type]}</div>`;
        }

        // Content
        html += '<div class="toastry-content">';
        html += `<div class="toastry-title">${this._escape(message)}</div>`;
        if (options.description) {
            html += `<div class="toastry-description">${this._escape(options.description)}</div>`;
        }
        if (options.action) {
            html += `<button class="toastry-action">${this._escape(options.action.label)}</button>`;
        }
        html += '</div>';

        // Close button
        html += `<button class="toastry-close" aria-label="Close">${CLOSE_ICON}</button>`;

        el.innerHTML = html;

        // Action button handler
        if (options.action) {
            const actionBtn = el.querySelector('.toastry-action');
            actionBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                options.action.onClick?.();
                this.dismiss(id);
            });
        }

        // Close button handler
        el.querySelector('.toastry-close').addEventListener('click', (e) => {
            e.stopPropagation();
            this.dismiss(id);
        });

        // Swipe handlers
        el.addEventListener('pointerdown', (e) => {
            if (e.target.closest('.toastry-close') || e.target.closest('.toastry-action')) return;
            this._onPointerDown(e, id);
        });
        el.addEventListener('pointermove', (e) => this._onPointerMove(e, id));
        el.addEventListener('pointerup', (e) => this._onPointerUp(e, id));
        el.addEventListener('pointercancel', () => this._onPointerCancel(id));

        this.container.appendChild(el);

        const t = {
            id,
            el,
            type,
            duration,
            height: el.offsetHeight,
            timer: null,
            remaining: duration,
            startTime: null,
            dismissing: false,
        };

        this.toasts.push(t);

        this._pruneOld();
        this._updateLayout();

        requestAnimationFrame(() => {
            el.setAttribute('data-mounted', 'true');
            if (duration > 0) {
                this._startTimer(t);
            }
        });

        return id;
    }

    dismiss(id) {
        if (id === undefined) {
            [...this.toasts].forEach(t => this.dismiss(t.id));
            return;
        }

        const t = this.toasts.find(x => x.id === id);
        if (!t || t.dismissing) return;

        t.dismissing = true;
        clearTimeout(t.timer);
        t.el.setAttribute('data-dismissing', 'true');

        this._updateLayout();

        setTimeout(() => {
            t.el.remove();
            this.toasts = this.toasts.filter(x => x.id !== id);
            this._updateLayout();

            if (this.toasts.length === 0) {
                clearTimeout(this._collapseTimer);
                this._collapseTimer = null;
                this.expanded = false;
                this.hovering = false;
                if (this._visibilityHandler) {
                    document.removeEventListener('visibilitychange', this._visibilityHandler);
                    this._visibilityHandler = null;
                }
                if (this.container) {
                    this.container.remove();
                    this.container = null;
                }
            }
        }, UNMOUNT_DELAY);
    }

    /**
     * Update a toast's content and type (used by promise toasts)
     */
    _update(id, message, options = {}) {
        const t = this.toasts.find(x => x.id === id);
        if (!t || t.dismissing) return;

        const type = options.type || 'default';
        t.el.setAttribute('data-type', type);
        t.el.setAttribute('role', type === 'error' ? 'alert' : 'status');
        t.el.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
        t.type = type;

        const iconEl = t.el.querySelector('.toastry-icon');
        if (ICONS[type]) {
            if (iconEl) {
                iconEl.innerHTML = ICONS[type];
            } else {
                const icon = document.createElement('div');
                icon.className = 'toastry-icon';
                icon.innerHTML = ICONS[type];
                t.el.insertBefore(icon, t.el.firstChild);
            }
        } else if (iconEl) {
            iconEl.remove();
        }

        const titleEl = t.el.querySelector('.toastry-title');
        if (titleEl) {
            titleEl.textContent = message;
        }

        const descEl = t.el.querySelector('.toastry-description');
        if (options.description) {
            if (descEl) {
                descEl.textContent = options.description;
            } else {
                const content = t.el.querySelector('.toastry-content');
                const desc = document.createElement('div');
                desc.className = 'toastry-description';
                desc.textContent = options.description;
                content.appendChild(desc);
            }
        } else if (descEl) {
            descEl.remove();
        }

        t.height = t.el.offsetHeight;
        this._updateLayout();

        const duration = options.duration !== undefined ? options.duration : config.duration;
        t.duration = duration;
        t.remaining = duration;
        if (duration > 0) {
            this._startTimer(t);
        }
    }

    // --- Timer management ---

    _startTimer(t) {
        clearTimeout(t.timer);
        t.startTime = Date.now();
        t.timer = setTimeout(() => this.dismiss(t.id), t.remaining);
    }

    _pauseAllTimers() {
        this.toasts.forEach(t => {
            if (t.timer && t.remaining > 0) {
                clearTimeout(t.timer);
                t.timer = null;
                t.remaining -= Date.now() - (t.startTime || Date.now());
                if (t.remaining < 0) t.remaining = 0;
            }
        });
    }

    _resumeAllTimers() {
        this.toasts.forEach(t => {
            if (!t.timer && t.remaining > 0 && !t.dismissing && t.duration > 0) {
                this._startTimer(t);
            }
        });
    }

    // --- Layout ---

    _updateLayout() {
        const visible = this.toasts.filter(t => !t.dismissing);
        const count = visible.length;
        const isTop = config.position.startsWith('top');

        let expandedOffset = 0;
        let collapsedHeight = 0;

        visible.forEach((t, i) => {
            const reverseIndex = count - 1 - i; // 0 = front (newest)
            const isFront = reverseIndex === 0;

            t.el.setAttribute('data-front', isFront ? 'true' : 'false');

            const collapsedOffset = reverseIndex * GAP;
            const scale = 1 - reverseIndex * 0.05;

            t.el.style.setProperty('--toastry-offset', collapsedOffset);
            t.el.style.setProperty('--toastry-scale', Math.max(scale, 0.85));
            t.el.style.setProperty('--toastry-expanded-offset', expandedOffset);
            expandedOffset += t.height + GAP;

            if (isFront) {
                collapsedHeight = t.height + (count - 1) * GAP;
            }

            // Don't override styles on a toast being swiped
            if (this.swipingToast === t.id) return;

            if (!this.expanded && reverseIndex >= config.maxVisible) {
                t.el.style.opacity = '0';
                t.el.style.pointerEvents = 'none';
            } else {
                t.el.style.opacity = '';
                t.el.style.pointerEvents = '';
            }
        });

        if (this.container) {
            const height = this.expanded ? expandedOffset : collapsedHeight;
            this.container.style.height = (height || 0) + 'px';
        }
    }

    _pruneOld() {
        while (this.toasts.filter(t => !t.dismissing).length > config.maxToasts) {
            const oldest = this.toasts.find(t => !t.dismissing);
            if (oldest) this.dismiss(oldest.id);
        }
    }

    // --- Swipe ---

    _getSwipeBaseTransform(t) {
        const isTop = config.position.startsWith('top');
        const dir = isTop ? 1 : -1;
        const yOffset = this.expanded
            ? parseFloat(t.el.style.getPropertyValue('--toastry-expanded-offset')) || 0
            : parseFloat(t.el.style.getPropertyValue('--toastry-offset')) || 0;
        return `translateY(${yOffset * dir}px)`;
    }

    _onPointerDown(e, id) {
        const t = this.toasts.find(x => x.id === id);
        if (!t || t.dismissing) return;

        t.el.setPointerCapture(e.pointerId);
        this.swipingToast = id;
        this.pointerStart = { x: e.clientX, y: e.clientY };
        this.swipeStartTime = Date.now();
    }

    _onPointerMove(e, id) {
        if (this.swipingToast !== id || !this.pointerStart) return;

        const t = this.toasts.find(x => x.id === id);
        if (!t || t.dismissing) return;

        const dx = e.clientX - this.pointerStart.x;
        const amount = Math.abs(dx);

        if (amount > 2) {
            t.el.setAttribute('data-swiping', 'true');
            const base = this._getSwipeBaseTransform(t);
            t.el.style.transform = `${base} translateX(${dx}px)`;
            t.el.style.opacity = Math.max(0, 1 - amount / (SWIPE_THRESHOLD * 2.5));
        }
    }

    _onPointerCancel(id) {
        if (this.swipingToast !== id) return;

        const t = this.toasts.find(x => x.id === id);
        if (t && !t.dismissing) {
            t.el.removeAttribute('data-swiping');
            t.el.style.transform = '';
            t.el.style.opacity = '';
        }
        this._resetSwipe();
    }

    _onPointerUp(e, id) {
        if (this.swipingToast !== id || !this.pointerStart) return;

        const t = this.toasts.find(x => x.id === id);
        if (!t || t.dismissing) {
            this._resetSwipe();
            return;
        }

        const dx = e.clientX - this.pointerStart.x;
        const amount = Math.abs(dx);
        const elapsed = Date.now() - this.swipeStartTime;
        const velocity = amount / Math.max(elapsed, 1);

        if (amount >= SWIPE_THRESHOLD || velocity >= VELOCITY_THRESHOLD) {
            const direction = dx > 0 ? '150%' : '-150%';
            const base = this._getSwipeBaseTransform(t);
            t.el.style.transform = `${base} translateX(${direction})`;
            t.el.style.opacity = '0';
            t.el.style.transition = 'transform 0.2s ease, opacity 0.15s ease';
            setTimeout(() => this.dismiss(id), 150);
        } else {
            t.el.removeAttribute('data-swiping');
            t.el.style.transform = '';
            t.el.style.opacity = '';
        }

        this._resetSwipe();
    }

    _resetSwipe() {
        this.swipingToast = null;
        this.pointerStart = null;
        if (!this.hovering) {
            this._setExpanded(false);
        }
    }

    // --- Helpers ---

    _escape(str) {
        if (!_escapeDiv) return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        _escapeDiv.textContent = str;
        return _escapeDiv.innerHTML;
    }
}

// --- Public API ---

const manager = new ToastManager();

function toast(message, options) {
    return manager.create(message, options);
}

toast.success = function (message, options) {
    return manager.create(message, { ...options, type: 'success' });
};

toast.error = function (message, options) {
    return manager.create(message, { ...options, type: 'error' });
};

toast.warning = function (message, options) {
    return manager.create(message, { ...options, type: 'warning' });
};

toast.info = function (message, options) {
    return manager.create(message, { ...options, type: 'info' });
};

toast.loading = function (message, options) {
    return manager.create(message, { ...options, type: 'loading', duration: 0 });
};

/**
 * Promise toast — shows loading, then success or error
 * @param {Promise} promise
 * @param {Object} states - { loading, success, error }
 * @returns {Promise} the original promise (pass-through)
 */
toast.promise = function (promise, states = {}) {
    const id = manager.create(states.loading || 'Loading...', { type: 'loading', duration: 0 });

    promise
        .then((result) => {
            const msg = typeof states.success === 'function' ? states.success(result) : (states.success || 'Done');
            manager._update(id, msg, { type: 'success' });
        })
        .catch((err) => {
            const msg = typeof states.error === 'function' ? states.error(err) : (states.error || 'Something went wrong');
            manager._update(id, msg, { type: 'error' });
        });

    return promise;
};

toast.dismiss = function (id) {
    manager.dismiss(id);
};

/**
 * Configure global defaults
 * @param {Object} opts - { position, duration, maxVisible }
 */
toast.configure = function (opts = {}) {
    if (opts.position) config.position = opts.position;
    if (opts.duration !== undefined) config.duration = opts.duration;
    if (opts.maxVisible !== undefined) config.maxVisible = opts.maxVisible;
    if (opts.maxToasts !== undefined) config.maxToasts = opts.maxToasts;
};

export { toast };
export default toast;
