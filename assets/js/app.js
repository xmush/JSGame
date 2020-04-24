// let mainDiv = document.getElementById("main")
var mainDiv = document.getElementById("main")
// console.log(mainDiv)
// const listMiniBox = []
for(i=0; i<100; i++) {
    divBox = document.createElement("div");
    divBox.setAttribute("class", "miniBox");
    boxContent = document.createTextNode(`box`)
    divBox.appendChild(boxContent)
    mainDiv.appendChild(divBox)
}
