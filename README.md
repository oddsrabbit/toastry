# Toastry

A beautiful, modern toast notification library for JavaScript.

- **~5 KB** gzipped (CSS auto-injected)
- **Zero dependencies**
- Smooth stacking animations with hover-to-expand
- Swipe to dismiss
- Promise API for async operations
- 4 positions: `bottom-right`, `bottom-left`, `top-right`, `top-left`
- Fully customizable via CSS variables
- Works with ES modules, CommonJS, and `<script>` tags

**[View full docs & playground →](https://oddsrabbit.github.io/toastry/)**

## Install

```bash
npm install @oddsrabbit/toastry
```

Or use a CDN:

```html
<script src="https://unpkg.com/@oddsrabbit/toastry@1/dist/toastry.js"></script>
```

## Quick Start

```js
import toast from '@oddsrabbit/toastry';

toast('Hello world');
```

No CSS import needed — styles are injected automatically.

See the [full docs](https://oddsrabbit.github.io/toastry/) for detailed examples, the interactive playground, and CSS customization.

## License

MIT
