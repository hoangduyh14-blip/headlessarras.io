// ==UserScript==
// @name         Arras UI Notes Panel
// @namespace    local.arras.ui-toolkit
// @version      1.0.0
// @description  A UI-only notes panel; does not automate gameplay or inspect game state.
// @match        https://arras.io/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';

  if (document.getElementById('arras-ui-notes')) return;

  const style = `
    #arras-ui-notes {
      position: fixed; right: 16px; bottom: 16px; z-index: 2147483000;
      width: 250px; color: #f4f4f5; background: rgba(20, 24, 32, .96);
      border: 1px solid #64748b; border-radius: 10px; padding: 12px;
      font: 13px/1.45 system-ui, sans-serif; box-shadow: 0 8px 28px #0006;
    }
    #arras-ui-notes button {
      cursor: pointer; border: 1px solid #64748b; border-radius: 6px;
      padding: 5px 9px; color: inherit; background: #334155;
    }
    #arras-ui-notes textarea {
      box-sizing: border-box; width: 100%; min-height: 82px; margin-top: 8px;
      padding: 7px; resize: vertical; color: inherit; background: #111827;
      border: 1px solid #475569; border-radius: 6px;
    }
    #arras-ui-notes .row { display:flex; justify-content:space-between; align-items:center; }
    #arras-ui-notes[hidden] { display:none; }
  `;

  if (typeof GM_addStyle === 'function') GM_addStyle(style);
  else {
    const sheet = document.createElement('style');
    sheet.textContent = style;
    document.head.appendChild(sheet);
  }

  const panel = document.createElement('section');
  panel.id = 'arras-ui-notes';
  panel.setAttribute('aria-label', 'Arras UI notes');
  panel.innerHTML = `
    <div class="row">
      <strong>Session notes</strong>
      <button type="button" id="arras-ui-hide">Hide</button>
    </div>
    <p>UI-only helper. No gameplay automation.</p>
    <label for="arras-ui-note-text">Your notes</label>
    <textarea id="arras-ui-note-text" placeholder="Write a reminder..."></textarea>
    <div class="row" style="margin-top:8px">
      <small id="arras-ui-status">Not saved</small>
      <button type="button" id="arras-ui-clear">Clear</button>
    </div>
  `;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.textContent = 'Show notes';
  toggle.id = 'arras-ui-show';
  toggle.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:2147483000;display:none';

  document.body.append(panel, toggle);

  const textarea = panel.querySelector('#arras-ui-note-text');
  const status = panel.querySelector('#arras-ui-status');
  const storageKey = 'arras-ui-toolkit-session-notes';

  try {
    textarea.value = sessionStorage.getItem(storageKey) || '';
  } catch (_) {}

  textarea.addEventListener('input', () => {
    try {
      sessionStorage.setItem(storageKey, textarea.value);
      status.textContent = 'Saved in this tab';
    } catch (_) {
      status.textContent = 'Storage unavailable';
    }
  });

  panel.querySelector('#arras-ui-hide').addEventListener('click', () => {
    panel.hidden = true;
    toggle.style.display = 'block';
  });

  toggle.addEventListener('click', () => {
    panel.hidden = false;
    toggle.style.display = 'none';
  });

  panel.querySelector('#arras-ui-clear').addEventListener('click', () => {
    textarea.value = '';
    try { sessionStorage.removeItem(storageKey); } catch (_) {}
    status.textContent = 'Cleared';
  });
})();
