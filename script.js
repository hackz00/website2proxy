// ==UserScript==
// @name         Site Overlay Toggler
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Toggle a fullscreen iframe overlay on a specified host website to display another site on top. Press Alt + Left Arrow to toggle.
// @author       hackz00
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    let hostDomain = GM_getValue('hostDomain');
    if (!hostDomain) {
        hostDomain = prompt('Enter the host domain where the toggle should work (e.g., google.com):');
        if (hostDomain) {
            GM_setValue('hostDomain', hostDomain);
        } else {
            alert('No host domain provided. The script won\'t work until configured.');
            return;
        }
    }

    if (!location.hostname.includes(hostDomain)) {
        return;
    }

    let targetURL = GM_getValue('targetURL');
    if (!targetURL) {
        targetURL = prompt('Enter the full URL of the website you want to overlay (e.g., https://example.com):');
        if (targetURL) {
            GM_setValue('targetURL', targetURL);
        } else {
            alert('No URL provided. The script won\'t work until configured.');
            return;
        }
    }

    let iframe = null;
    let isToggled = false;
    let originalBodyDisplay = '';

    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            toggleOverlay();
        }
    });

    function toggleOverlay() {
        if (isToggled) {
            if (iframe) {
                iframe.remove();
                iframe = null;
            }
            document.body.style.display = originalBodyDisplay;
            isToggled = false;
        } else {
            originalBodyDisplay = document.body.style.display;
            document.body.style.display = 'none';

            iframe = document.createElement('iframe');
            iframe.src = targetURL;
            iframe.style.position = 'fixed';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.margin = '0';
            iframe.style.padding = '0';
            iframe.style.zIndex = '999999';
            iframe.style.background = 'white'; 

            document.documentElement.appendChild(iframe);
            isToggled = true;
        }
    }
})();
