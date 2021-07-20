// preload-launcher.js
const { remote } = require('electron');

require('electron-compile/lib/initialize-renderer').initializeRendererProcess(remote.getGlobal('globalCompilerHost').readOnlyMode);

require('path/to/real/preload');


console.log("send help")