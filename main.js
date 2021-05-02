const { app, BrowserWindow, Menu, ipcMain, MenuItem } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
    // create main window
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.loadURL("https://powerful-savannah-48895.herokuapp.com/");

    // const menu = Menu.buildFromTemplate(menuTemplate);
    // Menu.setApplicationMenu(menu);
    mainWindow.removeMenu();

    // opens developer console
    // mainWindow.webContents.openDevTools();
})

let userSubmenuItem = [];
ipcMain.on("menuItems", (e, item) => {
    //set menuitems
    let { firstMenu, secondMenu } = item;
    while (userSubmenuItem.length > 0)
        userSubmenuItem.pop();

    if (firstMenu == "Sign Up" && secondMenu == "Login") {
        userSubmenuItem.push(
            {
                label: "Sign Up",
                click() {
                    mainWindow.loadURL("https://powerful-savannah-48895.herokuapp.com/register");
                }
            },
            {
                label: "Login",
                click() {
                    mainWindow.loadURL("https://powerful-savannah-48895.herokuapp.com/login");
                }
            }
        );
    }
    else {
        userSubmenuItem.push(
            {
                label: firstMenu,
            },
            {
                label: secondMenu,
                click() {
                    mainWindow.loadURL("https://powerful-savannah-48895.herokuapp.com/logout");
                }
            }
        );
    }
    menuTemplate[1].submenu = userSubmenuItem;
    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    // mainWindow.removeMenu();
    // mainWindow.setMenu(menu);
});

const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Home",
                accelerator: "Home",
                click() {
                    mainWindow.loadURL("https://powerful-savannah-48895.herokuapp.com/");
                }
            },
            {
                label: "New Post",
                accelerator: "CmdOrCtrl+N",
                click() {
                    mainWindow.loadURL("https://powerful-savannah-48895.herokuapp.com/blogs/new");
                }
            },
            {
                label: "Quit",
                accelerator: "CmdOrCtrl+W",
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: "User",
        submenu: userSubmenuItem
    }
]