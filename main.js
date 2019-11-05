const { app, BrowserWindow,dialog, Notification,Tray,Menu } = require('electron')
const {globalShortcut} = require('electron')
const storage = require('electron-storage')
var path = require('path')


let win
let tray = null

function createWindow () {
  win = new BrowserWindow({
    width: 425,
    height: 500,
    frame: false,
    transparent: false,
    resizable:false,
    icon:__dirname + '/src/images/clock.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

  

  globalShortcut.register('f5', function() {
    console.log('f5 is pressed')
    win.reload()
  })

  globalShortcut.register('f8', function() {
    storage.remove('token.json', err => {
      if (err) {
        console.log(err)
      }
    });
  })
  
  globalShortcut.register('CommandOrControl+Z', function() {
    console.log('CommandOrControl+Z+R is pressed')
    storage.remove('token.json', err => {
      if (err) {
        console.log(err)
      }
    });
	})

	globalShortcut.register('CommandOrControl+R', function() {
    console.log('CommandOrControl+R is pressed')
    win.reload()
  })
  

  win.loadURL(`file://${__dirname}/src/html/index.html`)

  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
} 

app.on('ready', () => {
  tray = new Tray(__dirname+'/src/images/clock.ico')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Reload',  click:function(){win.reload()} },
    { label: 'Delete Token', click:function(){ storage.remove('token.json', err => {if (err) {console.log(err)}});} },
    { label: 'Exit', click:function(){app.quit()} },
  ])
  tray.setContextMenu(contextMenu)
  createWindow()
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})