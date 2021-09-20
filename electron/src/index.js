const { app, BrowserWindow, Menu } = require('electron');

app.on('ready', () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600
    });
    window.loadFile('static/main/index.html');
    window.webContents.openDevTools()

    const menu = Menu.buildFromTemplate([
        {
            label: 'Hello',
            submenu: [
                {
                    label: 'World!',
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: process.platform == 'darwin' ? 'Command+X' : 'Ctrl+X',
                    click: () => app.quit()
                }
            ]
        }
    ]);
    window.setMenu(menu);
})