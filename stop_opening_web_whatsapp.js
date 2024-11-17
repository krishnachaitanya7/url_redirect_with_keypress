// ==UserScript==
// @name         Close WhatsApp Web Automatically
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically close web.whatsapp.com tab
// @author       PoincarePoint
// @match        https://web.whatsapp.com*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // Close the tab as soon as the page loads
  window.close();
  window.location.replace("about:blank");
})();
