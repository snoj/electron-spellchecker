//import SpellCheckHandler from 'es6://../src/spell-check-handler.js';
//import ContextMenuListener from 'es6://../src/context-menu-listener.js';
//import ContextMenuBuilder from 'es6://../src/context-menu-builder.js';
//let SpellCheckHandler = import('../src/spell-check-handler.js');
//let ContextMenuListener = import('../src/context-menu-listener.js');
//let ContextMenuBuilder = import('../src/context-menu-builder.js');

let SpellCheckHandler = require('../src/spell-check-handler.js');
let ContextMenuListener = require('../src/context-menu-listener.js');
let ContextMenuBuilder = require('../src/context-menu-builder.js');

//const SpellCheckHandler = require('../src/spell-check-handler');
//const ContextMenuListener = require('../src/context-menu-listener');
//const ContextMenuBuilder = require('../src/context-menu-builder');

window.spellCheckHandler = new SpellCheckHandler();
window.spellCheckHandler.attachToInput();
window.spellCheckHandler.currentSpellcheckerChanged.subscribe(() => {
  document.getElementById('detectedLang').innerText = `Current language is ${window.spellCheckHandler.currentSpellcheckerLanguage}`;
});

window.spellCheckHandler.provideHintText('This is probably the language that you want to check in');
window.spellCheckHandler.autoUnloadDictionariesOnBlur();

let contextMenuBuilder = new ContextMenuBuilder(window.spellCheckHandler);
let contextMenuListener = new ContextMenuListener(async (info) => {
  await contextMenuBuilder.showPopupMenu(info);
});


window.spellCheckHandler2 = new SpellCheckHandler();
window.spellCheckHandler2.attachToInput();
