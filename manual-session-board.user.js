// ==UserScript==
// @name         Manual Multi-Window Session Board
// @namespace    local.arras.ui-toolkit
// @version      1.0.0
// @description  A per-tab checklist for manually managed sessions; no window or input synchronization.
// @match        https://arras.io/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';
  if (document.getElementById('arras-session-board')) return;

  const board = document.createElement('aside');
  board.id = 'arras-session-board';
  board.style.cssText = [
    'position:fixed', 'left:12px', 'bottom:12px', 'z-index:2147483000',
    'width:190px', 'padding:10px', 'border-radius:8px',
    'background:#172033ee', 'color:#fff', 'font:12px system-ui,sans-serif'
  ].join(';');

  const title = document.createElement('strong');
  title.textContent = 'Manual session';
  const label = document.createElement('label');
  label.textContent = 'Window label ';
  const input = document.createElement('input');
  input.maxLength = 24;
  input.placeholder = 'e.g. Main window';
  input.style.cssText = 'width:100%;box-sizing:border-box;margin-top:6px';
  const hint = document.createElement('p');
  hint.textContent = 'Track tabs manually. No synchronized controls or automated play.';
  hint.style.marginBottom = '0';

  board.append(title, label, input, hint);
  label.append(input);
  document.body.appendChild(board);
})();
