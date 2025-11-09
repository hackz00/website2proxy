# Site Overlay Toggler

A Tampermonkey userscript that lets you toggle a fullscreen overlay of one website on top of another specified host site.

## Features
- Runs on a configurable host (e.g., herricks.org).
- Prompts for the host domain and overlay target URL only when Alt + Left Arrow is pressed if not set.
- Toggle with Alt + Left Arrow key.
- Hides the original page content when overlaid.
- Restores original when toggled off.
- Uses a public proxy to attempt bypassing iframe restrictions (X-Frame-Options).

## Installation
1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Copy the script code into a new Tampermonkey script.
3. Configure by pressing the toggle key on the host site.
