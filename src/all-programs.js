const icon = require('lnk-icon-extractor');
const path = require('path');
const { app } = require('electron').remote;

function recFindByExt(base, ext, files, result) {
    files = files || fs.readdirSync(base)
    result = result || []

    files.forEach(
        function (file) {
            var newbase = path.join(base, file)
            if (fs.statSync(newbase).isDirectory()) {
                result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result)
            }
            else {
                if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
                    result.push(newbase)
                }
            }
        }
    )
    return result
}

if (!fs.existsSync('src\\icons')) {
    console.log("Loading icons!")
    var programLocations = [path.resolve(app.getPath('appData') + '\\Microsoft\\Windows\\Start Menu\\Programs'), 'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs'];
    var programs = [];

    programLocations.forEach(location => {
        programs.push(...recFindByExt(location, 'lnk'));
    })

    fs.mkdirSync('src\\icons');

    icon.extract(programs, "src\\icons");

}

var icons = [];
console.log(path.resolve("./src/icons"));
icons.push(...recFindByExt(path.resolve("./src/icons"), "png"));
icons.forEach(icon => {
    document.querySelector(".edit-programs-list").innerHTML += `<img class="edit-programs-list-icon" src="${icon}" alt="${path.basename(icon, ".png")}" title="${path.basename(icon, ".png")}"/>`;
})

document.querySelectorAll(".edit-programs-list-icon").forEach(element => {
	element.addEventListener('click', () => {
		console.log("Hello, world!")
		color = document.getElementById("edit-pane").dataset.color;
		element.classList.toggle("program-selected");
		element.classList.toggle(`light-${color}`)
	})
})


