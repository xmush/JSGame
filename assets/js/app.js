// let mainDiv = document.getElementById("main")
const mainDiv = document.getElementById("main")
const listColor = ['#c2b9dd', '#ccc7d4', '#faf6ff', '#c4dad7', '#f5d9d1', '#f3bced', '#a38da4', '#c6e1c1', '#ded8dd', '#b9b1a4', '#ad888c', '#ffd7c9', '#93c2d3', '#bef2f6', '#e0e3dd', '#a3c6ce', '#b4edf3', '#e4fec5', '#f9db7c', '#ecd7d9', '#cccccc', '#d1d8de', '#d7eef9', '#fae1cc', '#f6d7cb', '#b4a598']
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}
// console.log(mainDiv)
const listMiniBox = []
let numberBox = 1

for(i=0; i<10; i++) {
    let tempList = []
    for(j=0; j<10; j++) {
        divBox = document.createElement("div");
        divBox.setAttribute("class", "miniBox");
        // divBox.setAttribute("id", `col${i}row${j}`);
        divBox.setAttribute("id", `${numberBox}`);
        divBox.style.backgroundColor = listColor.random()
        // boxContent = document.createTextNode(`${i}${j}`)
        boxContent = document.createTextNode('')
        divBox.appendChild(boxContent)

        // mainDiv.appendChild(divBox)
        tempList.push(divBox)
        numberBox++
    }
    listMiniBox.push(tempList)
}

for(itemCol of listMiniBox.reverse()) {
    idxOfItem = listMiniBox.indexOf(itemCol) +1
    if(idxOfItem % 2 != 0) {
        // console.log(idxOfItem)
        for(itemRow of itemCol.reverse()) {
            mainDiv.appendChild(itemRow)
        }
    } else {
        for(itemRow of itemCol) {
            mainDiv.appendChild(itemRow)
        }
    }
}

// console.log(...listMiniBox)

// return location
function addPlayer() {
    playerLocation = document.getElementById('1')
    playerLocation2 = document.getElementById('2')

    playerMarker = document.createElement("div")
    playerMarker.setAttribute("class", "marker")
    playerMarker2 = document.createElement("div")
    playerMarker2.setAttribute("class", "marker2")
    playerLocation.appendChild(playerMarker)
    playerLocation2.appendChild(playerMarker2)
    // console.log(playerLocation)
}

addPlayer()