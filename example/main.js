const {protocol, app, BrowserWindow } = require('electron');
const electronDebug = require('electron-debug');
const {openProcessManager } = require('electron-process-manager');

const nfs = require( 'fs' )
const npjoin = require( 'path' ).join
const es6Path = npjoin( __dirname, '' )

let mainWindow = null;
//electronDebug({enabled: true, showDevTools: true});
//electronDebug({enabled: true});

protocol.registerStandardSchemes(['es6']);
app.on('window-all-closed', () => {
  app.quit();
});


let alreadyLoaded = false;

app.on('ready', () => {
  //if(alreadyLoaded || !!mainWindow) return;
  alreadyLoaded = true;

  protocol.registerBufferProtocol( 'es6', ( req, cb ) => {
    nfs.readFile(
      npjoin( es6Path, req.url.replace( /^(es6|client):\/\//, '' ) ),
      (e, b) => { cb( { mimeType: 'text/javascript', data: b } ) }
    )
  });

  mainWindow = new BrowserWindow({
    width: 580,
    height: 365
  });

  openProcessManager();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  //setTimeout(() => mainWindow.openDevTools(), 5*1000);
});
