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
const body = document.body
let dice = 0


const listMiniBox = []

let generateMiniBox = () => {
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
                typeBox = 'start'
                divBox.setAttribute("data-type_box", "start");
                divBox.setAttribute("data-bonus_box", "start");
            } else {
                divBox.setAttribute("data-type_box", `${typeBox}`);
                divBox.setAttribute("data-bonus_box", `${bonusBox}`);
            }
            divBox.style.backgroundColor = listColor.random()
            boxContent = document.createElement("div")
            boxContent.setAttribute('class', 'boxContent')
            boxType = document.createElement("div")
            boxType.setAttribute('class', 'boxType')
            boxLucky = document.createElement("div")
            boxLucky.setAttribute('class', 'boxLucky')
            if (typeBox == 'bomb') {
                boxTextType = document.createTextNode("😈")
            }
            else if (typeBox == 'bonus') {
                boxTextType = document.createTextNode("😎")
            } else if (typeBox == 'start') {
                boxTextType = document.createTextNode("Start")
            } else {
                boxTextType = document.createTextNode("😣")
            } 
            boxTextContent = document.createTextNode(`${numberBox}`)
            boxTextLucky = document.createTextNode(`${bonusBox}`)
            // boxContent = document.createTextNode('')

            boxContent.appendChild(boxTextContent)
            boxType.appendChild(boxTextType)
            boxLucky.appendChild(boxTextLucky)

            divBox.appendChild(boxContent)
            divBox.appendChild(boxType)
            divBox.appendChild(boxLucky)
    
            // mainDiv.appendChild(divBox)
            tempList.push(divBox)
            numberBox++
        }
        listMiniBox.push(tempList)
    }
}

let printMiniBoxToBoard = () => {
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
}

// return location
function addPlayer() {
    playerLocation = document.getElementById('1')
    playerMarker = document.createElement("div")
    playerMarker.setAttribute("class", "marker")
    playerMarker.setAttribute("id", "marker")
    playerLocation.appendChild(playerMarker)
}


const movePlayer = async (distance=0) => {
    let palyerMovement = distance
    let newparentId = ''
    for(i=1; i<= palyerMovement; i++) {
        // setTimeout(function(){ 
            await new Promise(resolve => setTimeout(resolve, 400));
            let playerObj = document.getElementById("marker")
            let playerLocationParent = playerObj.parentNode;
            let parentId = playerLocationParent.getAttribute("id")
            let destinationId = parseInt(parentId)+ 1
            newparentId = destinationId
            let playerDestination = document.getElementById(`${destinationId}`)
            playerDestination.appendChild(playerObj)
            // sleep(800)
        // }, i*800)
    }
    return newparentId
}


// function movePlayer(distance=0) {
//     let palyerMovement = distance
//     for(i=1; i<= palyerMovement; i++) {
//         setTimeout(function(){ 
//             let playerObj = document.getElementById("marker")
//             let playerLocationParent = playerObj.parentNode;
//             let parentId = playerLocationParent.getAttribute("id")
//             let destinationId = parseInt(parentId)+ 1
//             let playerDestination = document.getElementById(`${destinationId}`)
//             playerDestination.appendChild(playerObj)
//          }, i*800);
//     }

    // checkBoxType()
    
    // console.log("clicked")
// }

// function movePlayerBack() {
//     let palyerMovement = 1
//     let playerObj = document.getElementById("marker")
//     let playerLocationParent = playerObj.parentNode;
//     let parentId = playerLocationParent.getAttribute("id")
//     let destinationId = parseInt(parentId)- palyerMovement
//     let playerDestination = document.getElementById(`${destinationId}`)
//     console.log(parentId)
//     console.log(destinationId)
//     playerDestination.appendChild(playerObj)
    
//     // console.log("clicked")
// }

const checkBoxType = async () => {
    let playerObj = document.getElementById("marker")
    let playerLocationParent = playerObj.parentNode;
    let parentType = playerLocationParent.getAttribute('data-type_box')
    if (parentType == 'bomb') {
        playerHealth -= 50
        newPlayerHealth = document.getElementById("playerHealth")
        newPlayerHealth.innerHTML = `Health : ${playerHealth}`
    }
}
let changePositionBar = (playerNewPosition) => {
    position = document.getElementById("playerPosition")
    position.innerHTML = `Position : ${playerNewPosition}`
    console.log(playerNewPosition)
}

// Aji
//Menambah Children pada Main
let generatePlayerBar = () => {
    // const body = document.body
    let playerDiv = document.createElement("div")
    playerDiv.setAttribute("class", "player")
    body.appendChild(playerDiv)
    // }

    // //Menambah isi di kotak player
    // let createPlayerBar = () => {
    //Menambah tulisan Player
    let playerInPlayerBox = document.createElement("h2")
    playerInPlayerBox.setAttribute("id", "titlePlayer")
    let playerInPlayerBoxText = document.createTextNode("LUCKY BOARD")
    playerInPlayerBox.appendChild(playerInPlayerBoxText)
    playerDiv.appendChild(playerInPlayerBox)
    // }

    // //Menambah Jenis Player dan Keterangan (Health & Position)
    // let createPlayerContent = () => {
    //Membuat Div Wadah jenis Player
    let jenisPlayerDiv = document.createElement("div")
    jenisPlayerDiv.setAttribute("class", `player1`)
    playerDiv.appendChild(jenisPlayerDiv)
    let positionPlayer = document.createElement("p")
    positionPlayer.setAttribute("id", "playerPosition")
    let positionPlayerText = document.createTextNode(`Position : ${playerPosition}`)
    positionPlayer.appendChild(positionPlayerText)
    jenisPlayerDiv.appendChild(positionPlayer)
    //Membuat Health
    let healthPlayer = document.createElement("p")
    healthPlayer.setAttribute("id", "playerHealth")
    let healthPlayerText = document.createTextNode(`Health : ${playerHealth}`)
    healthPlayer.appendChild(healthPlayerText)
    jenisPlayerDiv.appendChild(healthPlayer)
    // }

    // //Menambah div Dadu
    // let createBoxDadu = () => {
    let daduDiv = document.createElement("div")
    daduDiv.setAttribute("class", "dadu")
    playerInPlayerBox.setAttribute("id", "titlePlayer")
    daduDiv.innerHTML = "<h3 class='titleDadu'>Dice</h3>"
    playerDiv.appendChild(daduDiv)
    // }

    // //Membuat tempat dadu
    // let createDadu = () => {
    let tempatDadu = document.createElement("p")
    tempatDadu.setAttribute("id", "placeholderDadu")
    tempatDadu.innerHTML = 0
    daduDiv.appendChild(tempatDadu)
    // }

    // //Membuat Roll Dadu
    // let createButtonRollDadu = () => {
    let buttonDadu = document.createElement("button")
    buttonDadu.setAttribute("id", "dadu")
    buttonDadu.innerHTML = "ROLL DICE"
    daduDiv.appendChild(buttonDadu)
}

//Mengisi angka pada Roll Dice
let dadu = {
    acak: function(){
        var resultRandom = Math.floor(Math.random() * (6) + 0) + 1;
        return resultRandom;
        }
    }

//Print angka pada layout
function printDadu(angka=0){
    let placeholderDadu = document.getElementById('placeholderDadu');
    placeholderDadu.innerHTML = angka;
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

window.onload = function(event) {
    modal.style.display = "block";

    generateMiniBox()
    printMiniBoxToBoard()
    addPlayer()
    generatePlayerBar()
    printDadu()
    
    let button = document.getElementById("dadu")
        button.onclick = async () => {
        button.disabled = true;
        var hasil = dadu.acak();
        jarak = hasil
        printDadu(hasil);
        playerPosition = await movePlayer(jarak)
        checkBoxType()
        button.disabled = false;
        }
}
