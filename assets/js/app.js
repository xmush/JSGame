Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

// let mainDiv = document.getElementById("main")
const mainDiv = document.getElementById("main")
const listColor = ['#ff0000', '#0000ff', '#008000', '#ffa500', '#808080', '#ffff00', '#800080']
const listTypeBox = ['bomb', 'save', 'bonus', 'bomb'];
const listBonusBox = ['-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5']
let playerHealth = 200
let playerPosition = 0
// deklarasi nilai dadu 
let dice = 0

// console.log(mainDiv)
const listMiniBox = []
let numberBox = 1

for(i=0; i<10; i++) {
    let tempList = []
    for(j=0; j<10; j++) {
        let typeBox = listTypeBox.random()
        let bonusBox = listBonusBox.random()
        divBox = document.createElement("div");
        divBox.setAttribute("class", "miniBox");
        // divBox.setAttribute("id", `col${i}row${j}`);
        divBox.setAttribute("id", `${numberBox}`);
        if (numberBox == 1) {
            divBox.setAttribute("data-type_box", "start");
            divBox.setAttribute("data-bonus_box", "start");
        } else {
            divBox.setAttribute("data-type_box", `${typeBox}`);
            divBox.setAttribute("data-bonus_box", `${bonusBox}`);
        }
        divBox.style.backgroundColor = listColor.random()
        boxContent = document.createTextNode(`${numberBox}`)
        // boxContent = document.createTextNode('')
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
    // playerLocation2 = document.getElementById('2')

    playerMarker = document.createElement("div")
    playerMarker.setAttribute("class", "marker")
    playerMarker.setAttribute("id", "marker")
    
    // player2Marker = document.createElement("div")
    // player2Marker.setAttribute("class", "marker2")
    // player2Marker.setAttribute("id", "marker2")

    // playerMarker2 = document.createElement("div")
    // playerMarker2.setAttribute("class", "marker2")
    playerLocation.appendChild(playerMarker)
    // playerLocation.appendChild(player2Marker)
    // playerLocation2.appendChild(playerMarker2)
    // console.log(playerLocation)
}
addPlayer()

const movePlayer2G = async (distance=0) => {
    let palyerMovement = distance
    let startPoint = document.getElementById("marker").parentNode.getAttribute("id")
    for(i=1; i<= palyerMovement; i++) {
        setTimeout(function(){ 
            let playerObj = document.getElementById("marker")
            let playerLocationParent = playerObj.parentNode;
            let parentId = playerLocationParent.getAttribute("id")
            let destinationId = parseInt(parentId)+ 1
            let playerDestination = document.getElementById(`${destinationId}`)
            playerDestination.appendChild(playerObj)
        }, i*800)
    }
    return parseInt(startPoint) + distance
}


function movePlayer(distance=0) {
    let palyerMovement = distance
    for(i=1; i<= palyerMovement; i++) {
        setTimeout(function(){ 
            let playerObj = document.getElementById("marker")
            let playerLocationParent = playerObj.parentNode;
            let parentId = playerLocationParent.getAttribute("id")
            let destinationId = parseInt(parentId)+ 1
            let playerDestination = document.getElementById(`${destinationId}`)
            playerDestination.appendChild(playerObj)
         }, i*800);
    }

    // checkBoxType()
    
    // console.log("clicked")
}

function movePlayerBack() {
    let palyerMovement = 1
    let playerObj = document.getElementById("marker")
    let playerLocationParent = playerObj.parentNode;
    let parentId = playerLocationParent.getAttribute("id")
    let destinationId = parseInt(parentId)- palyerMovement
    let playerDestination = document.getElementById(`${destinationId}`)
    console.log(parentId)
    console.log(destinationId)
    playerDestination.appendChild(playerObj)
    
    // console.log("clicked")
}

const checkBoxType = async () => new Promise((resolve) => {
    let playerObj = document.getElementById("marker")
    let playerLocationParent = playerObj.parentNode;
    let parentType = playerLocationParent.getAttribute('data-type_box')
    resolve(console.log(parentType))
})

const cBox = async (idParent) => {
    console.log(idParent)
}

const body = document.body

// Aji
//Menambah Children pada Main
// const body = document.body
let playerDiv = document.createElement("div")
playerDiv.setAttribute("class", "player")
body.appendChild(playerDiv)

//Menambah isi di kotak player
//Menambah tulisan Player
let playerInPlayerBox = document.createElement("h2")
playerInPlayerBox.setAttribute("id", "titlePlayer")
let playerInPlayerBoxText = document.createTextNode("LUCKY BOARD")
playerInPlayerBox.appendChild(playerInPlayerBoxText)
playerDiv.appendChild(playerInPlayerBox)

//Menambah Jenis Player dan Keterangan (Health & Position)
for(player=1; player<2; player++){
    //Membuat Div Wadah jenis Player
    let jenisPlayerDiv = document.createElement("div")
    jenisPlayerDiv.setAttribute("class", `player${player}`)
    playerDiv.appendChild(jenisPlayerDiv)
    //Membuat logo jenis Player
    // let markerPlayer1 = document.createElement("p")
    // markerPlayer1.setAttribute("class", "marker")
    // jenisPlayerDiv.appendChild(markerPlayer1)
    //Membuat judul jenis Player
        // let jenisPlayerInPlayerBox = document.createElement("h3")
        // let jenisPlayerInPlayerBoxText = document.createTextNode(`Player ${player}`)
        // jenisPlayerInPlayerBox.appendChild(jenisPlayerInPlayerBoxText)
        // jenisPlayerInPlayerBox.setAttribute("id", "titlePlayer1")
        // jenisPlayerDiv.appendChild(jenisPlayerInPlayerBox)
    //Membuat Position
    let positionPlayer = document.createElement("p")
    positionPlayer.setAttribute("id", "playerPosition")
    let positionPlayerText = document.createTextNode(`Position : ${playerPosition}`)
    positionPlayer.appendChild(positionPlayerText)
    jenisPlayerDiv.appendChild(positionPlayer)
    //Membuat Health
    let healthPlayer = document.createElement("p")
    let healthPlayerText = document.createTextNode(`Health : ${playerHealth}`)
    healthPlayer.appendChild(healthPlayerText)
    jenisPlayerDiv.appendChild(healthPlayer)
}

let changePositionBar = (playerNewPosition) => {
    position = document.getElementById("playerPosition")
    position.innerHTML = `Position : ${playerNewPosition}`
    console.log(playerNewPosition)
}

//Menambah div Dadu
let daduDiv = document.createElement("div")
daduDiv.setAttribute("class", "dadu")
playerInPlayerBox.setAttribute("id", "titlePlayer")
daduDiv.innerHTML = "<h3 class='titleDadu'>Dice</h3>"
playerDiv.appendChild(daduDiv)

//Membuat tempat dadu
let tempatDadu = document.createElement("p")
tempatDadu.setAttribute("id", "placeholderDadu")
tempatDadu.innerHTML = 0
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
button.onclick = async () => {
    var hasil = dadu.acak();
    dice = hasil
    printDadu(hasil);
    // move = movePlayer(parseInt(dice))
    playerPosition = movePlayer2G(dice)
    await changePositionBar(playerPosition)
    // changePositionBar(playerPosition)
    // box_type = await checkBoxType()
    // printDadu('0')
}

//Membuat Modal
let myModal = document.createElement("div")
myModal.setAttribute("id", "myModal")
myModal.setAttribute("class", "modal")
body.appendChild(myModal)
//Membuat isian di dalam Modal
let modalContent = document.createElement("div")
modalContent.setAttribute("class", "modalContent")
myModal.appendChild(modalContent)
//Membuat text di dalam Modal
let isiModal = document.createElement("p")
isiModal.setAttribute("id", "isiModal")
isiModal.innerHTML = "<h1>Lucky Board</h1><h3>Try your Lucky Now !</h3>"
modalContent.appendChild(isiModal)
//Membuat button Start
let buttonStart = document.createElement("button")
buttonStart.setAttribute("id", "buttonStart")
buttonStart.innerHTML = "start"
modalContent.appendChild(buttonStart)
//Membuat button Rules
let ruleStart = document.createElement("button")
ruleStart.setAttribute("id", "ruleStart")
ruleStart.innerHTML = "rules"
modalContent.appendChild(ruleStart)

/* */
let myModalRule = document.createElement("div")
myModalRule.setAttribute("id", "myModalRule")
myModalRule.setAttribute("class", "modalRule")
body.appendChild(myModalRule)
//Membuat isian di dalam Modal
let modalContentRule = document.createElement("div")
modalContentRule.setAttribute("class", "modalContentRule")
myModalRule.appendChild(modalContentRule)
//Membuat text di dalam Modal
let isiModalRule = document.createElement("p")
isiModalRule.setAttribute("id", "isiModalRule")
isiModalRule.innerHTML = "<h2>Rules of Lucky Board :</h2>"
modalContentRule.appendChild(isiModalRule)
//Tombol Back
let backStart = document.createElement("button")
backStart.setAttribute("id", "backStart")
backStart.innerHTML = "back"
modalContentRule.appendChild(backStart)
/* */

let modal = document.getElementById("myModal");
let modalRule = document.getElementById("myModalRule")

window.onload = function(event) {
    modal.style.display = "block";
}

buttonStart.onclick = function(event) {
    modal.style.display = "none";
}

ruleStart.onclick = function(event) {
    modal.style.display = "none";
    modalRule.style.display = "block";
}

backStart.onclick = function(event) {
    modalRule.style.display = "none";
    modal.style.display = "block";
}
