// ==UserScript==
// @name         Overleaf Quote Buttons (New Editor)
// @namespace    http://tampermonkey.net/
// @version      9.4
// @description  Add single and double curly quote buttons to Overleaf new editor (CM6)
// @match        https://www.overleaf.com/*
// @run-at       document-idle
// @grant        none
// @updateURL    https://raw.githubusercontent.com/krishnachaitanya7/url_redirect_with_keypress/refs/heads/master/Overleaf_Quotations.js
// @downloadURL  https://raw.githubusercontent.com/krishnachaitanya7/url_redirect_with_keypress/refs/heads/master/Overleaf_Quotations.js
// ==/UserScript==

(function () {
  "use strict";

  function getCM6View() {
    const dom = document.querySelector(".cm-editor");
    if (!dom) return null;
    return window.__CODE_MIRROR_EDITOR_VIEW.findFromDOM(dom);
  }

  function wrapWith(open, close) {
    const view = getCM6View();
    if (!view) {
      console.warn("[CB] CM6 view not found");
      return;
    }
    const { state, dispatch } = view;
    const changes = [];

    for (const range of state.selection.ranges) {
      if (!range.empty) {
        changes.push({ from: range.from, insert: open });
        changes.push({ from: range.to, insert: close });
      } else {
        changes.push({ from: range.from, insert: open + close });
      }
    }

    dispatch(state.update({ changes, scrollIntoView: true }));
    view.focus();
  }

  function addButton(id, label, title, open, close, toolbar) {
    if (document.getElementById(id)) return;

    const group = document.createElement("div");
    group.className = "ol-cm-toolbar-button-group";

    const btn = document.createElement("button");
    btn.id = id;
    btn.title = title;
    btn.innerText = label;
    btn.type = "button";
    btn.className = "ol-cm-toolbar-button";
    btn.style.cssText =
      "font-family: monospace; font-size: 13px; font-weight: bold; min-width: 32px;";

    btn.addEventListener("mousedown", (e) => {
      e.preventDefault();
      wrapWith(open, close);
    });

    group.appendChild(btn);
    toolbar.appendChild(group);
  }

  function addButtons() {
    const toolbar = document.querySelector(".ol-cm-toolbar");
    if (!toolbar) return false;

    addButton(
      "single-quote-btn",
      "'...'", // '...'
      "Wrap in single quotes",
      "\u2018", // '
      "\u2019", // '
      toolbar,
    );

    addButton(
      "double-quote-btn",
      '"..."', // "..."
      "Wrap in double quotes",
      "\u201C", // "
      "\u201D", // "
      toolbar,
    );

    console.log("[CB] Quote buttons successfully added!");
    return true;
  }

  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    const success = addButtons();
    if (success || attempts > 40) clearInterval(interval);
  }, 500);

  const observer = new MutationObserver(() => {
    if (
      !document.getElementById("single-quote-btn") ||
      !document.getElementById("double-quote-btn")
    ) {
      addButtons();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
