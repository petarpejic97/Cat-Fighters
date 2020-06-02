class ChoseFighter {
    constructor(){
        this.idLeft="";
        this.idRight="";
    }

    init(){
        this._buttonDisableFight(true)
        
        this._clickHandler()

    }
    _buttonDisableFight(state){
        let button  = document.querySelector("#generateFight")
        button.disabled = state;
    }
    _buttonDisableRandom(state){
        let button  = document.querySelector("#randomFight")
        button.disabled = state;
    }
    _buttonDisableCreateFighter(state){
        let button  = document.querySelector("#createFighter")
        button.disabled = state;
    }
    _clickHandler(){
        this._handleFighterPick(".first-side",".fighter-box")
        this._handleFighterPick(".second-side",".fighter-box")

        this._handleGenerateFightBtn();
        this._randomGenerateFighters();
        this._handleEditBtn()
    }

    _handleEditBtn(){
        let parentElementFirst = document.querySelector(".first-side")
        let parentElementSecond = document.querySelector(".second-side")
        let editWrapperFirst = parentElementFirst.querySelector(".fighter-list")
        let editWrapperSecond = parentElementSecond.querySelector(".fighter-list")
        editWrapperFirst.addEventListener("click",(event) => {
            const isButton = event.target.nodeName === 'BUTTON';
            if (!isButton) {
                return;
            }
            let buttonWrapper = event.target.parentElement
            let fighterBox = buttonWrapper.querySelector(".fighter-box")
            let arrayid = Array.from( buttonWrapper.querySelectorAll(".fighter-box")).map(element=>{
                let obj = JSON.parse(element.dataset.info)
                localStorage.setItem("id", obj.id);
                window.location="editFighter.html"
            })
        });
        editWrapperSecond.addEventListener("click",(event) => {
            const isButton = event.target.nodeName === 'BUTTON';
            if (!isButton) {
                return;
            }
            let buttonWrapper = event.target.parentElement
            let fighterBox = buttonWrapper.querySelector(".fighter-box")
            let arrayid = Array.from( buttonWrapper.querySelectorAll(".fighter-box")).map(element=>{
                let obj = JSON.parse(element.dataset.info)
                localStorage.setItem("id", obj.id);
                window.location="editFighter.html"
            })
        });
    }
    _handleGenerateFightBtn(){
      
        const fightBtn = document.querySelector("#generateFight")
        fightBtn.addEventListener("click",(event) => {
            this._buttonDisableFight(true)
            this._buttonDisableRandom(true)
            this._buttonDisableCreateFighter(true)
            this._setDisplay("none")
            this._downCounter(this.idLeft,this.idRight)
        });
    }
     _downCounter(left,right){
        var counter = 3;

        var interval = setInterval( function(){
            let timer = document.querySelector("#clock")
            timer.innerHTML = counter
            counter--;
            if(counter <0){ 
                hideTimer(timer); 
                clearInterval(interval); 
            }
        }, 1000);
        var hideTimer = function(timer){
            timer.innerHTML="";
            SetOldSettings(left,right)
        }
    }
    _setDisplay(style){
        let fighters = document.querySelectorAll(".fighter-list")
        Array.from(fighters).forEach(element => {
            element.setAttribute("style","display:"+style)
        })
    }
    _randomGenerateFighters(){
        const randomBtn = document.querySelector("#randomFight")
        let parentElement = document.querySelector(".first-side")
        let arrayid = Array.from( parentElement.querySelectorAll(".fighter-box")).map(element=>{
            let obj = JSON.parse(element.dataset.info)
            return obj.id
        })
        randomBtn.addEventListener("click",(event) => {
            this._resetBorder(".first-side",".second-side");
            var firstId = Math.floor(Math.random()*arrayid.length);
            this.idLeft = arrayid[firstId]
            do {
                var secondId = Math.floor(Math.random()*arrayid.length);
              }
            while (firstId == secondId);
            this.idRight = arrayid[secondId]

            this._randomLoad(".first-side",this.idLeft)
            this._randomLoad(".second-side",this.idRight)
        })
    }
    _resetBorder(side1,side2){
        let parent1 = document.querySelector(side1)
        let parent2 = document.querySelector(side2)
        let img1 = parent1.querySelector(".img-rounded")
        let img2 = parent2.querySelector(".img-rounded")

        img1.setAttribute("style","border:none")
        img2.setAttribute("style","border:none")
    }
    _randomLoad(side,id){
        const parent = document.querySelector(side)
        let imageBoxes = parent.querySelectorAll(".fighter-box")
        let listInfo = parent.querySelector(".cat-info")
       
        Array.from(imageBoxes).forEach(element => {
            let object = JSON.parse(element.dataset.info)
            if(object.id == id){
                let image = element.querySelector("img")
                this._setId(side,object)
                this._setRandomFighterImg(parent,image.src)
                this._loadData(object,listInfo)
            }
        })
    }
    _handleFighterPick(side,imagebox){

        const parent = document.querySelector(side)
        const imageBoxes = parent.querySelectorAll(imagebox)
        Array.from(imageBoxes).forEach(element => {
            element.addEventListener("click", (event) => {
            this._resetBorder(".first-side",".second-side");
            this._loadFighter(side);
            });
        });
    }
    _loadFighter(side) {
        const parent = document.querySelector(side)
        const listInfo = parent.querySelector(".cat-info")
       
        let obj = JSON.parse(event.target.parentNode.dataset.info)

        this._setId(side,obj)
        this._setFighterImg(parent)
        this._loadData(obj,listInfo)
    }
    _setId(side,obj){
        if(side == ".first-side"){
            this.idLeft = obj.id
            this._disableAntherSide(".second-side",this.idLeft)
        }
        else 
            this.idRight = obj.id

        if(this.idLeft != "" && this.idRight !=""){
            this._buttonDisableFight(false)
            
            this._disableAntherSide(".first-side",this.idRight)
        }
    }
    _disableAntherSide(side,id){
        const parent = document.querySelector(side)
        let dimageboxes = parent.querySelectorAll(".fighter-box")

        Array.from(dimageboxes).forEach(element => {
            let object = JSON.parse(element.dataset.info)
            if(object.id == id){
                element.setAttribute("style","pointer-events:none;opacity:0.5")
            }
            else{
                element.setAttribute("style","pointer-events:auto;")
            }
        });
    }
    _setFighterImg(parent){
        let mainImg = parent.querySelector(".img-rounded")
        mainImg.src = event.target.src
    }
    _setRandomFighterImg(parent,src){
        let mainImg = parent.querySelector(".img-rounded")
        mainImg.src = src
    }
    _loadData(obj,listInfo){
        listInfo.querySelector(".name").innerHTML = obj.name
        listInfo.querySelector(".age").innerHTML = obj.age
        listInfo.querySelector(".skills").innerHTML = obj.catInfo
        listInfo.querySelector(".record").innerHTML = "Wins:"+obj.record.wins+" Loss:"+obj.record.loss
    }
}
function SetOldSettings(leftId,rightId){
    document.querySelector("#generateFight").disabled = false
    document.querySelector("#randomFight").disabled = false
    document.querySelector("#createFighter").disabled = false
    let fighters = document.querySelectorAll(".fighter-list")
    Array.from(fighters).forEach(element => {
        element.setAttribute("style","display:flex")
    })
    saveFighterObject(leftId,rightId)
}

function saveFighterObject(leftId,rightId){
   
    var leftObject = findObject(".first-side",leftId)
    var rightObject = findObject(".second-side",rightId)

    doCalculation(leftObject,rightObject)
}
function doCalculation(left,right){
    let winpercentleft = (left.record.wins/(left.record.wins + left.record.loss))*100
    let winpercentright = (right.record.wins/(right.record.wins + right.record.loss))*100

    console.log("Lijevi: " + winpercentleft)
    console.log("Desni: " +winpercentright)
    determineWinner(winpercentleft,winpercentright)
}
function determineWinner(winpercentleft,winpercentright){
    var winNumber = Math.floor(Math.random() * 100)
    if((winpercentleft > winpercentright) ){
        if((winpercentleft - winpercentright) < 10){
            if(winNumber < 60){
                colorizeMainBoxes(".first-side",".second-side")
                updateScore(choseFighter.idLeft,".first-side",choseFighter.idRight,".second-side")
            }
            else{
                colorizeMainBoxes(".second-side",".first-side")   
                updateScore(choseFighter.idRight,".second-side",choseFighter.idLeft,".first-side")
            }
        }
        else{
            if(winNumber < 70){
                colorizeMainBoxes(".first-side",".second-side") 
                updateScore(choseFighter.idLeft,".first-side",choseFighter.idRight,".second-side")

           }
            else{
                colorizeMainBoxes(".second-side",".first-side")  
                updateScore(choseFighter.idRight,".second-side",choseFighter.idLeft,".first-side") 
            }
        }
    }

    if(winpercentright > winpercentleft ){
        if(( winpercentright-winpercentleft ) > 10){
            if(winNumber < 60){
                colorizeMainBoxes(".second-side",".first-side") 
                updateScore(choseFighter.idRight,".second-side",choseFighter.idLeft,".first-side")  
            }
            else{
                colorizeMainBoxes(".first-side",".second-side")  
                updateScore(choseFighter.idLeft,".first-side",choseFighter.idRight,".second-side")
         
            }
        }
        else{
            if(winNumber < 70){
                colorizeMainBoxes(".second-side",".first-side")   
                updateScore(choseFighter.idRight,".second-side",choseFighter.idLeft,".first-side")
         
            }
            else{
                colorizeMainBoxes(".first-side",".second-side")  
                updateScore(choseFighter.idLeft,".first-side",choseFighter.idRight,".second-side")
          
            }
        }
    }
}
function updateScore(idWinner,sideWinner,idLoser,sideLoser){
    console.log("Winner :" + idWinner)
    console.log("Looser :" + idLoser)
    incrementWinnerScore(idWinner,sideWinner)
    incrementLoserScore(idLoser,sideLoser)
    
    loadChangeInDatabase(idWinner,idLoser)
}
function incrementWinnerScore(idWinner,sideWinner){
    let winFighters = document.querySelectorAll(".fighter-box")
    for (let i =0 ; i< winFighters.length;i++){
        var object = JSON.parse(winFighters[i].dataset.info)
        
        if(object.id == idWinner){
            num = parseInt(object.record.wins) 
            num += 1
            object.record.wins = num.toString()
            winFighters[i].setAttribute("data-info",JSON.stringify(object))
            let parentList = document.querySelector(sideWinner)
            let list = parentList.querySelector(".cat-info")
            loadDataInList(object,list)
        }

    } 
}
function  incrementLoserScore(idLoser,sideLoser){
    let loseFighters = document.querySelectorAll(".fighter-box") 
   
    for (let i =0 ; i< loseFighters.length;i++){
        var object = JSON.parse(loseFighters[i].dataset.info)
        
        if(object.id == idLoser){
            num = parseInt(object.record.loss) 
            num += 1
            object.record.loss = num.toString()
            loseFighters[i].setAttribute("data-info",JSON.stringify(object))
            let parentList = document.querySelector(sideLoser)
            let list = parentList.querySelector(".cat-info")
            loadDataInList(object,list)
        }

    } 
}
function loadChangeInDatabase(idWinner,idLoser){
    $.ajax({
        type: 'POST',
        url: './backend/updateScore.php',
        data: {winId:idWinner , 
            lossId: idLoser},
        success: function(response){                       
            console.log(response)
        }
    })    
}
function loadDataInList(obj,listInfo){

    listInfo.querySelector(".name").innerHTML = obj.name
    listInfo.querySelector(".age").innerHTML = obj.age
    listInfo.querySelector(".skills").innerHTML = obj.catInfo
    listInfo.querySelector(".record").innerHTML = "Wins:"+obj.record.wins+" Loss:"+obj.record.loss
}
function colorizeMainBoxes(sideWin,sideLose){
    let parentWin = document.querySelector(sideWin)
    let listWin = parentWin.querySelector(".cat-info")
    let winname = listWin.querySelector(".name").textContent
    setWinnerMessage(winname)
    let winner = parentWin.querySelector(".img-rounded")

    let parentLose = document.querySelector(sideLose)
    let loser = parentLose.querySelector(".img-rounded")

    winner.setAttribute("style","border:5px solid green")
    loser.setAttribute("style","border:5px solid red")
}
function setWinnerMessage(name){
    let parent = document.querySelector(".message").innerHTML = "Pobijednik je " + name
}
function findObject(side,id){
    let parent = document.querySelector(side)
    let fighters = parent.querySelectorAll(".fighter-box")
 
    for (let i =0 ; i< fighters.length;i++){
        var object = JSON.parse(fighters[i].dataset.info)
        if(object.id == id)
            return object
    } 
}
const choseFighter = new ChoseFighter()
choseFighter.init();
