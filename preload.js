const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".sidebar.menu").classList.add("visible")
    const firstMenu = document.querySelector(".sidebar.menu").children[2].innerText;
    const secondMenu = document.querySelector(".sidebar.menu").children[3].innerText;
    document.querySelector("#top-menu").remove();
    document.querySelector(".sidebar.menu").remove();
    document.querySelector("#content").style.marginTop = 0;

    ipcRenderer.send("menuItems", { firstMenu, secondMenu });
})