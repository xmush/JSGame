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

var jumpMarkerForward = new Audio("assets/audio/soundMarker.ogg");
var jumpMarkerBack = new Audio("assets/audio/soundMarkerBack.wav");
var congratulation = new Audio("assets/audio/congratulation.mp3");
var loser = new Audio("assets/audio/loser.mp3")

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
            } 
            else if (numberBox == 100) {
                divBox.setAttribute("data-type_box", '0');
                divBox.setAttribute("data-bonus_box", '0');
            }
            else {
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
            if (numberBox == 100) {
                boxTextType = document.createTextNode("🚀")
                boxTextLucky = document.createTextNode(`${bonusBox}`)
            }
            else if (typeBox == 'bonus') {
                boxTextType = document.createTextNode("😎")
                boxTextLucky = document.createTextNode(`${bonusBox}`)
            } else if (typeBox == 'start') {
                boxTextType = document.createTextNode("Start")
                boxTextLucky = document.createTextNode(`${bonusBox}`)
            } else if(typeBox == 'bomb') {
                boxTextType = document.createTextNode("😈")
                boxTextLucky = document.createTextNode(`${bonusBox}`)
            } else {
                boxTextType = document.createTextNode("😣")
                boxTextLucky = document.createTextNode(`${bonusBox}`)
            } 
            boxTextContent = document.createTextNode(`${numberBox}`)
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
    playerLocation = document.getElementById('89')
    playerMarker = document.createElement("div")
    playerMarker.setAttribute("class", "marker")
    playerMarker.setAttribute("id", "marker")
    playerLocation.appendChild(playerMarker)
}

function addPlayer2() {
    playerLocation = document.getElementById('1')
    playerMarker = document.createElement("div")
    playerMarker.setAttribute("class", "marker2")
    playerMarker.setAttribute("id", "marker2")
    playerLocation.appendChild(playerMarker)
}

const resetDice = () => {
    dadu = document.getElementById("placeholderDadu")
    dadu.innerHTML = "0"
}


const movePlayer = async (distance=0) => {
    let palyerMovement = distance
    let startPoint = parseInt(document.getElementById("marker").parentNode.getAttribute("id"))
    console.log('ini start point ', startPoint)
    let newparentId = ''
    for(i=1; i<= palyerMovement; i++) {
        // setTimeout(function(){ 
            await new Promise(resolve => setTimeout(resolve, 400));
            let playerObj = document.getElementById("marker")
            let playerLocationParent = playerObj.parentNode;
            let parentId = playerLocationParent.getAttribute("id")
            // console.log(parentId)
            let destinationId = parseInt(parentId)
            if(startPoint < 100) {
                destinationId = parseInt(parentId) + 1
            }
            else {
                destinationId = parseInt(parentId) - 1
            } 
            console.log(destinationId)
            newparentId = destinationId
            let playerDestination = document.getElementById(`${destinationId}`)
            playerDestination.appendChild(playerObj)
            startPoint ++
            jumpMarkerForward.play();
            // sleep(800)
        // }, i*800)
    }
    return newparentId
}

const movePlayerBack = async (distance=0) => {    
    // let palyerMovement = distance
    let palyerMovement = Math.abs(distance)
    let startPoint = parseInt(document.getElementById("marker").parentNode.getAttribute("id"))
    console.log('ini start point ', startPoint)
    let newparentId = ''
    for(i=1; i<= palyerMovement; i++) {
        // setTimeout(function(){ 
            await new Promise(resolve => setTimeout(resolve, 400));
            let playerObj = document.getElementById("marker")
            let playerLocationParent = playerObj.parentNode;
            let parentId = playerLocationParent.getAttribute("id")
            // console.log(parentId)
            let destinationId = parseInt(parentId)
            if(startPoint < 100) {
                destinationId = parseInt(parentId) - 1
            }
            else {
                destinationId = parseInt(parentId) + 1
            } 
            console.log(destinationId)
            newparentId = destinationId
            let playerDestination = document.getElementById(`${destinationId}`)
            playerDestination.appendChild(playerObj)
            startPoint ++
            jumpMarkerBack.play();
            // sleep(800)
        // }, i*800)
    }
    return newparentId
}


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

const checkLuckyBox = async (idParentMark) => {
    console.log('ini di lucky ' ,idParentMark)
    parentId = document.getElementById(idParentMark)
    getLuckyMove = parentId.getAttribute('data-bonus_box')
    distance = parseInt(getLuckyMove)
    console.log('ini distance ', distance)
    let moveLocation = ''
    if (distance > 0) {
        moveLocation = await movePlayer(distance)
        console.log('ini maju', distance)
    } else if (distance < 0){
        moveLocation = await movePlayerBack(distance)
        // console.log('ini mundur', distance)
    }
    return moveLocation
}

// const checkMaxMinPosition = (startPoint,) => {
//     if(startPoint == 95)
// }

let changePositionBar = (playerNewPosition) => {
    position = document.getElementById("playerPosition")
    position.innerHTML = `Position : ${playerNewPosition}`
    console.log(playerNewPosition)
}

// Aji
//Menambah Children pada Main
let generatePlayerBar = () => {
    let playerDiv = document.createElement("div")
    playerDiv.setAttribute("class", "player")
    body.appendChild(playerDiv)

    // Menambah isi di kotak Game
    // Menambah tulisan judul Game
    let playerInPlayerBox = document.createElement("h2")
    playerInPlayerBox.setAttribute("id", "titlePlayer")
    let playerInPlayerBoxText = document.createTextNode("LUCKY BOARD")
    playerInPlayerBox.appendChild(playerInPlayerBoxText)
    playerDiv.appendChild(playerInPlayerBox)

    // Menambah DIV Wadah jenis Player 1
    let jenisPlayer1Div = document.createElement("div")
    jenisPlayer1Div.setAttribute("class", `player1`)
    playerDiv.appendChild(jenisPlayer1Div)
    
    // Membuat judul Player 1
    let titlePlayer1 = document.createElement("h3")
    titlePlayer1.setAttribute("id", "titlePlayer1")
    let titlePlayer1Text = document.createTextNode("Player 1")
    titlePlayer1.appendChild(titlePlayer1Text)
    jenisPlayer1Div.appendChild(titlePlayer1)
    
    // Membuat Position Player 1
    let positionPlayer1 = document.createElement("p")
    positionPlayer1.setAttribute("id", "playerPosition1")
    let positionPlayer1Text = document.createTextNode(`Position : ${playerPosition}`)
    positionPlayer1.appendChild(positionPlayer1Text)
    jenisPlayer1Div.appendChild(positionPlayer1)
    
    // Membuat Health Player 1
    let healthPlayer1 = document.createElement("p")
    healthPlayer1.setAttribute("id", "playerHealth1")
    let healthPlayer1Text = document.createTextNode(`Health : ${playerHealth}`)
    healthPlayer1.appendChild(healthPlayer1Text)
    jenisPlayer1Div.appendChild(healthPlayer1)

    //Membuat Div Wadah jenis Player 2
    let jenisPlayer2Div = document.createElement("div")
    jenisPlayer2Div.setAttribute("class", `player2`)
    playerDiv.appendChild(jenisPlayer2Div)
    
    //Membuat judul PLayer 2
    let titlePlayer2 = document.createElement("h3")
    titlePlayer2.setAttribute("id", "titlePlayer2")
    let titlePlayer2Text = document.createTextNode("Player 2")
    titlePlayer2.appendChild(titlePlayer2Text)
    jenisPlayer2Div.appendChild(titlePlayer2)
    
    //Membuat Position Player 2
    let positionPlayer2 = document.createElement("p")
    positionPlayer2.setAttribute("id", "playerPosition2")
    let positionPlayer2Text = document.createTextNode(`Position : `)
    positionPlayer2.appendChild(positionPlayer2Text)
    jenisPlayer2Div.appendChild(positionPlayer2)
    
    //Membuat Health Player 2
    let healthPlayer2 = document.createElement("p")
    healthPlayer2.setAttribute("id", "playerHealth2")
    let healthPlayer2Text = document.createTextNode(`Health : `)
    healthPlayer2.appendChild(healthPlayer2Text)
    jenisPlayer2Div.appendChild(healthPlayer2)

    // Menambah div Dadu
    let daduDiv = document.createElement("div")
    daduDiv.setAttribute("class", "dadu")
    playerInPlayerBox.setAttribute("id", "titlePlayer")
    daduDiv.innerHTML = "<h3 class='titleDadu'>Dice</h3>"
    playerDiv.appendChild(daduDiv)

    // Membuat tempat dadu
    let tempatDadu = document.createElement("p")
    tempatDadu.setAttribute("id", "placeholderDadu")
    tempatDadu.innerHTML = 0
    daduDiv.appendChild(tempatDadu)

    // Membuat Roll Dadu
    let buttonDadu = document.createElement("button")
    buttonDadu.setAttribute("id", "dadu")
    buttonDadu.innerHTML = "ROLL DICE"
    daduDiv.appendChild(buttonDadu)
}

//Mengisi angka pada Roll Dice
const randomDoce = () => {
    var resultRandom = Math.floor(Math.random() * (6) + 0) + 1;
    return resultRandom
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

// Membuat modal Rule
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
isiModalRule.innerHTML = "<h2>Rules of Lucky Board :</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <br>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
modalContentRule.appendChild(isiModalRule)

//Tombol Back
let backStart = document.createElement("button")
backStart.setAttribute("id", "backStart")
backStart.innerHTML = "back"
modalContentRule.appendChild(backStart)

// Membuat modal Winner
let myModalWinner = document.createElement("div")
myModalWinner.setAttribute("id", "myModalWinner")
myModalWinner.setAttribute("class", "modalWinner")
body.appendChild(myModalWinner)

//Membuat isian di dalam Modal Winner
let modalContentWinner = document.createElement("div")
modalContentWinner.setAttribute("class", "modalContentWinner")
myModalWinner.appendChild(modalContentWinner)

//Membuat text di dalam Modal Winner
let isiModalWinner = document.createElement("p")
isiModalWinner.setAttribute("id", "isiModalWinner")
isiModalWinner.innerHTML = "<h1>CONGRATULATIONS !</h1><h2>You're Lucky Boy</h2>"
modalContentWinner.appendChild(isiModalWinner)

// Membuat modal Winner
let myModalGameOver = document.createElement("div")
myModalGameOver.setAttribute("id", "myModalGameOver")
myModalGameOver.setAttribute("class", "modalGameOver")
body.appendChild(myModalGameOver)

//Membuat isian di dalam Modal Winner
let modalContentGameOver = document.createElement("div")
modalContentGameOver.setAttribute("class", "modalContentGameOver")
myModalGameOver.appendChild(modalContentGameOver)

//Membuat text di dalam Modal Winner
let isiModalGameOver = document.createElement("p")
isiModalGameOver.setAttribute("id", "isiModalGameOver")
isiModalGameOver.innerHTML = "<h1>!!! GAME OVER !!!</h1>"
modalContentGameOver.appendChild(isiModalGameOver)

let modal = document.getElementById("myModal");
let modalRule = document.getElementById("myModalRule");
let modalWinner = document.getElementById("myModalWinner");
let modalGameOver = document.getElementById("myModalGameOver");

// Memulai game saat button start di klik
buttonStart.onclick = function(event) {
    modal.style.display = "none";
}

// Mengeluarkan modal rule saat button rule di klik
ruleStart.onclick = function(event) {
    modal.style.display = "none";
    modalRule.style.display = "block";
}

// Mengeluarkan modal start saat button back di klik
backStart.onclick = function(event) {
    modalRule.style.display = "none";
    modal.style.display = "block";
}

window.onload = function(event) {
    modal.style.display = "block";
    modalWinner.style.display = "none";

    generateMiniBox()
    printMiniBoxToBoard()
    addPlayer()
    addPlayer2()
    generatePlayerBar()
    printDadu()
    
    let button = document.getElementById("dadu")
        button.onclick = async () => {
        button.disabled = true;
        var hasil = randomDoce();
        jarak = hasil
        printDadu(hasil);
        playerPosition = await movePlayer(jarak)
        checkBoxType()
        console.log('Player position ', playerPosition)
        newPlayerLocation = await checkLuckyBox(''+playerPosition)
        if(parseInt(newPlayerLocation) == 100 || parseInt(playerPosition)== 100) {
            modal.style.display = "none";
            console.log('lllokasi ', parseInt(newPlayerLocation))
            modalWinner.style.display = "block";
            congratulation.play()
        }
        console.log('ini hasilnya ', newPlayerLocation)
        resetDice()
        button.disabled = false;
        }
}
