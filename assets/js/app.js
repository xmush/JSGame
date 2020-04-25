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



// Aji
//Menambah Children pada Main
const body = document.body
let playerDiv = document.createElement("div")
playerDiv.setAttribute("class", "player")
body.appendChild(playerDiv)

//Menambah isi di kotak player
//Menambah tulisan Player
let playerInPlayerBox = document.createElement("h2")
playerInPlayerBox.setAttribute("id", "titlePlayer")
let playerInPlayerBoxText = document.createTextNode("PLAYER")
playerInPlayerBox.appendChild(playerInPlayerBoxText)
playerDiv.appendChild(playerInPlayerBox)

//Menambah Jenis Player dan Keterangan (Health & Position)
for(player=1; player<2; player++){
    //Membuat Div Wadah jenis Player
    let jenisPlayerDiv = document.createElement("div")
    jenisPlayerDiv.setAttribute("class", `player${player}`)
    playerDiv.appendChild(jenisPlayerDiv)
    //Membuat logo jenis Player
    let markerPlayer1 = document.createElement("p")
    markerPlayer1.setAttribute("class", "marker")
    jenisPlayerDiv.appendChild(markerPlayer1)
    //Membuat judul jenis Player
    let jenisPlayerInPlayerBox = document.createElement("h3")
    let jenisPlayerInPlayerBoxText = document.createTextNode(`Player ${player}`)
    jenisPlayerInPlayerBox.appendChild(jenisPlayerInPlayerBoxText)
    jenisPlayerInPlayerBox.setAttribute("id", "titlePlayer1")
    jenisPlayerDiv.appendChild(jenisPlayerInPlayerBox)
    //Membuat Position
    let positionPlayer = document.createElement("p")
    let positionPlayerText = document.createTextNode(`Position :`)
    positionPlayer.appendChild(positionPlayerText)
    jenisPlayerDiv.appendChild(positionPlayer)
    //Membuat Health
    let healthPlayer = document.createElement("p")
    let healthPlayerText = document.createTextNode(`Health :`)
    healthPlayer.appendChild(healthPlayerText)
    jenisPlayerDiv.appendChild(healthPlayer)
}

//Menambah div Dadu
let daduDiv = document.createElement("div")
daduDiv.setAttribute("class", "dadu")
playerInPlayerBox.setAttribute("id", "titlePlayer")
daduDiv.innerHTML = "<h3 class='titleDadu'>Dadu</h3>"
playerDiv.appendChild(daduDiv)

//Membuat tempat dadu
let tempatDadu = document.createElement("p")
tempatDadu.setAttribute("id", "placeholderDadu")
daduDiv.appendChild(tempatDadu)

//Membuat Roll Dadu
let buttonDadu = document.createElement("button")
buttonDadu.setAttribute("id", "dadu")
buttonDadu.innerHTML = "ROLL DICE"
daduDiv.appendChild(buttonDadu)

//Mengisi angka pada Roll Dice
let dadu = {
    acak: function(){
        var resultRandom = Math.floor(Math.random() * (6) + 0) + 1;
        return resultRandom;
    }
}
//Print angka pada layout
function printDadu(angka){
    let placeholderDadu = document.getElementById('placeholderDadu');
    placeholderDadu.innerHTML = angka;
}
let button = document.getElementById("dadu")
button.onclick = function(){
    var hasil = dadu.acak();
    printDadu(hasil);
}