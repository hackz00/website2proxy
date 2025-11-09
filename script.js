// ==UserScript==
// @name         Site Overlay Toggler
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Toggle a fullscreen iframe overlay on a specified host website to display another site on top. Press Alt + Left Arrow to configure. Press Alt key alone to toggle (if configured for the site). Added small 'X' close button in top-right when overlaid.
// @author       hackz00
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    let iframe = null;
    let toggleButton = null;
    let isToggled = false;
    let originalBodyDisplay = '';

    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            configure();
        } else if (e.key === 'Alt') {
            // Check if configured and on matching host
            let hostDomain = GM_getValue('hostDomain');
            if (hostDomain && location.hostname.includes(hostDomain)) {
                e.preventDefault();
                toggleOverlay();
            }
            // Else do nothing
        }
    });

    function configure() {
        // Prompt for host domain (default current)
        let hostDomain = prompt('Enter the host domain where the toggle should work (e.g., google.com):', location.hostname);
        if (hostDomain) {
            GM_setValue('hostDomain', hostDomain);
        } else {
            alert('No host domain provided. Configuration cancelled.');
            return;
        }

        // Prompt for target URL
        let targetURL = prompt('Enter the full URL of the website you want to overlay (e.g., https://example.com):');
        if (targetURL) {
            GM_setValue('targetURL', targetURL);
            alert('Configuration saved. Now press Alt (alone) on the configured site to toggle.');
        } else {
            alert('No URL provided. Configuration cancelled.');
        }
    }

    function toggleOverlay() {
        if (isToggled) {
            // Remove overlay and restore original
            if (iframe) {
                iframe.remove();
                iframe = null;
            }
            if (toggleButton) {
                toggleButton.remove();
                toggleButton = null;
            }
            document.body.style.display = originalBodyDisplay;
            isToggled = false;
        } else {
            // Hide original content and add overlay
            originalBodyDisplay = document.body.style.display;
            document.body.style.display = 'none';

            iframe = document.createElement('iframe');
            iframe.src = GM_getValue('targetURL'); // Direct iframe, no proxy
            iframe.style.position = 'fixed';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.margin = '0';
            iframe.style.padding = '0';
            iframe.style.zIndex = '999999';
            iframe.style.background = 'white'; // Optional: to avoid transparency issues

            // Append to html to bypass body hiding
            document.documentElement.appendChild(iframe);

            // Add small 'X' toggle button in top-right
            toggleButton = document.createElement('button');
            toggleButton.innerText = 'X';
            toggleButton.style.position = 'fixed';
            toggleButton.style.top = '0px';
            toggleButton.style.right = '0px';
            toggleButton.style.zIndex = '1000000';
            toggleButton.style.background = 'red';
            toggleButton.style.color = 'white';
            toggleButton.style.padding = '2px 6px';
            toggleButton.style.border = '1px solid white';
            toggleButton.style.fontSize = '12px';
            toggleButton.style.cursor = 'pointer';
            toggleButton.style.width = '20px';
            toggleButton.style.height = '20px';
            toggleButton.style.display = 'flex';
            toggleButton.style.alignItems = 'center';
            toggleButton.style.justifyContent = 'center';
            toggleButton.onclick = toggleOverlay;
            document.documentElement.appendChild(toggleButton);

            isToggled = true;
        }
    }
})();
