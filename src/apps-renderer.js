// This is the renderer file for functions related
// to the App Drawer

function openInBrowser() {
	require("electron").shell.openExternal("https://www.example.com");
}
