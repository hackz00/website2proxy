// ==UserScript==
// @name         Site Overlay Toggler
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Toggle a fullscreen iframe overlay on a specified host website to display another site on top. Press Alt + Left Arrow to toggle or configure if not set. Uses a proxy to attempt bypassing iframe restrictions.
// @author       hackz00
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    let iframe = null;
    let isToggled = false;
    let originalBodyDisplay = '';

    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'ArrowLeft') {
            e.preventDefault(); // Prevent default browser behavior if needed

            // Check and prompt for host domain if not set
            let hostDomain = GM_getValue('hostDomain');
            if (!hostDomain) {
                hostDomain = prompt('Enter the host domain where the toggle should work (e.g., herricks.org):', location.hostname);
                if (hostDomain) {
                    GM_setValue('hostDomain', hostDomain);
                } else {
                    alert('No host domain provided. Cannot proceed.');
                    return;
                }
            }

            // Only proceed if on matching host
            if (!location.hostname.includes(hostDomain)) {
                alert('This toggle is configured for ' + hostDomain + ', not the current site.');
                return;
            }

            // Check and prompt for target URL if not set
            let targetURL = GM_getValue('targetURL');
            if (!targetURL) {
                targetURL = prompt('Enter the full URL of the website you want to overlay (e.g., https://example.com):');
                if (targetURL) {
                    GM_setValue('targetURL', targetURL);
                } else {
                    alert('No URL provided. Cannot proceed.');
                    return;
                }
            }

            // Now toggle
            toggleOverlay();
        }
    });

    function toggleOverlay() {
        if (isToggled) {
            // Remove overlay and restore original
            if (iframe) {
                iframe.remove();
                iframe = null;
            }
            document.body.style.display = originalBodyDisplay;
            isToggled = false;
        } else {
            // Hide original content and add overlay
            originalBodyDisplay = document.body.style.display;
            document.body.style.display = 'none';

            iframe = document.createElement('iframe');
            // Use a public CORS proxy to attempt to bypass X-Frame-Options
            const proxyURL = 'https://corsproxy.io/?' + encodeURIComponent(GM_getValue('targetURL'));
            iframe.src = proxyURL;
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
            isToggled = true;
        }
    }
})();
