# Site Overlay Toggler

A Tampermonkey userscript that lets you toggle a fullscreen overlay of one website on top of another specified host site.

## Features
- Runs on a configurable host (e.g., google.com).
- Press Alt + Left Arrow to configure host domain and overlay URL.
- Press Alt key alone to toggle (only if configured for the current site; else nothing).
- Hides the original page content when overlaid.
- Restores original when toggled off.
- Direct iframe embedding (no proxy).

## Installation
1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Copy the script code into a new Tampermonkey script.
3. Configure by pressing Alt + Left Arrow on the host site.

## Limitations
- Won't work if the target site blocks iframes (common for security).
- Pressing Alt alone may conflict with browser shortcuts (e.g., menu focus); consider changing to another combo if needed.
- This is for personal use; not intended for deception or bypassing restrictions—use responsibly.
- No support for mobile or non-standard browsers.
