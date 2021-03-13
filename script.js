///IMPORTS-----------------------------------------

import screens from './components/screens.js'
import PausedTimeout from './functions/pausedTimeout.js'
import map1 from './maps/map1.js'
import map2 from './maps/map2.js'
import map3 from './maps/map3.js'
import map4 from './maps/map4.js'
import map5 from './maps/map5.js'



///GLOBAL VARIABLES-----------------------------------------

//values for car position
window.gameArea = document.getElementById('game-area')

//storing the intervals
window.objIntervals = {

}
window.myIntervals = {
    moving:null,
    rotating:null,
}

window.myIntervalValues = {
     moving:50,
     rotating:50,
 }

window.timeouts = {

}

window.maps = [
    map1,
    map2,
    map3,
    map4,
    map5 

]
window.state = {
    paused:true,
    gameStart:true,
    crashed:false,
    completed:false,
    mapIndex:0,
 
}



///GLOBAL METHODS-----------------------------------------

window.killScreen = function(){
    let classList = document.getElementById('screen').classList
    classList.add('fadeoutslide')
    classList.remove('fadeinslide')
    state.paused = false
    state.gameStart = false
    setTimeout(()=>{
        document.getElementById('screen').remove()
    },600)
}

window.rotationRatio = function(){
    let ratio = (rotationAngle%360)/360
    if(ratio < 0 ) ratio=Math.abs(ratio + 1)
    return ratio
}

window.PausedTimeout = PausedTimeout


window.pauseTimeouts = function(){
    for(let timeout in timeouts){
        timeouts[timeout].pauseTimeout()
    }
}

window.resumeTimeouts = function(){
    for(let timeout in timeouts){
        timeouts[timeout].resumeTimeout()
    }
}

window.destroyTimeouts = function(){
    for(let timeout in timeouts){
        timeouts[timeout].stopTimeout()
        delete timeouts[timeout] 
    }
}

window.rotationPercentage = function(){
    let ratio

     (rotationAngle%360)/360 < 0 ? ratio = Math.abs((rotationAngle%360)/360 + 1) : ratio = (rotationAngle%360)/360
     if(ratio >= 0.5) ratio = (1 - ratio)
     ratio*=4
     if(ratio >1) ratio = 1 - (ratio - 1)

    return ratio
}

window.handleCrash = function(){
    clearIntervals()
    screens({
        title:'You crashed!',
        content:"Play again?",
        button:"Continue",
    })
    state.paused=true
    state.crashed=true
    return null
}



 //keys for multiple key listeners
let activeKeys={}
let crashed = false



//FUNCTIONS-----------------------------------------

function clearIntervals(){
    clearInterval(myIntervals.moving)
        myIntervals.moving = null
    clearInterval(myIntervals.rotating)
        myIntervals.rotating = null
    deleteKeys()

    return null
}

function deleteKeys(){
    for(let key in activeKeys){
        delete activeKeys[key]
    }
}

function handleVictory(){
    clearIntervals()
    screens({
        title:'Goal reached!',
        content:"",
        button:"Next Level",
    })
    
    state.paused=true
    state.completed=true
             
}

var crashListener = setInterval(()=>{
    if( checkCrash() ){
        handleCrash()
        clearTimeout(crashListener)
    }
},50)




function checkVictory(){
    const point = document.getElementById('victory-point')
     //the values should adjust for what percentage to the side the car has rotated
     
    let ratio = rotationPercentage()

     //If the car is fully rotated to the side, tbe difference will be 25 pixels less to top, so 25px should be added.
    if(
        //from bottom to to p
        (yPosition + (25*ratio) ) < (point.offsetTop + point.offsetHeight) &&
        (yPosition + (25*ratio)) > point.offsetTop &&
        (xPosition + 40) > point.offsetLeft &&
        xPosition < (point.offsetLeft + point.offsetWidth)
    ){
        return true   
    }else{
        return false
    }
}

function checkCrash(){
    if(state.paused) return

    let ratio = rotationPercentage()

    function checkBoundaries(){
        if(
            (yPosition + (25 * ratio) ) < 0 | //TOP
            ((yPosition + mycar.offsetHeight) - (25 * ratio) ) > gameArea.offsetHeight | //BOTTOM
            (xPosition - (25 * ratio) ) < 0 | //LEFT
            ((xPosition + mycar.offsetWidth) + (25 * ratio) ) > gameArea.offsetWidth //RIGHT
    
        ){
            return true
        } 
    }

    const calcPoints = {
        center(){
           return ((mycar.offsetTop + mycar.offsetHeight)/2 + (mycar.offsetLeft + mycar.offsetWidth)/2)
        },
        topleft(){
            return{
                x:1,
                y:1
            }
        }
        
    }


    function checkForeignObjects(){
        let crashed = false
        document.querySelectorAll('[crashable="true"]').forEach(crashable=>{

            
            let foreignRatio, foreignRotation;
            if(crashable.style.transform){
                 //this only works because rotateZ is the only transform applied
                foreignRotation = parseInt(crashable.style.transform.match(/[0-9]+/));
                

                //this tests if the foreign object is rotated
                (foreignRotation%360)/360 < 0 ? foreignRatio = Math.abs((foreignRotation%360)/360 + 1) : foreignRatio = (foreignRotation%360)/360
                if(foreignRatio >= 0.5) foreignRatio = (1 - foreignRatio)
                foreignRatio*=4
                if(foreignRatio >1) foreignRatio = 1 - (foreignRatio - 1)
            }else{
                foreignRatio = 0
            }

            //defines boundaries, adjusts for rotation
            let top =(crashable.offsetTop + crashable.offsetHeight)
            let bottom = crashable.offsetTop 
            let left = (crashable.offsetLeft+crashable.offsetWidth)
            let right = crashable.offsetLeft
            let difference = (crashable.offsetHeight - crashable.offsetWidth) /2

            //tests the values
            if(
                (yPosition + (25 * ratio) ) < top - (difference * foreignRatio) && //INTO BOTTOM
                ((yPosition + mycar.offsetHeight) - (25 * ratio) ) > bottom + (difference * foreignRatio) && //INTO TOP
                (xPosition - (25 * ratio) ) < left + (difference * foreignRatio) &&  //INTO LEFT
                ((xPosition + mycar.offsetWidth) + (25 * ratio) ) > right - (difference * foreignRatio) //INTO RIGHT
            ){
                crashed = true
            }
        })

        return crashed
    }
    if( checkBoundaries() | checkForeignObjects() ) return true
}



function move(isForward){

    myIntervals.moving = setInterval(()=>{
        if(state.paused) return
        
        let ratio = (rotationAngle%360)/360
            if(ratio < 0 ) ratio=Math.abs(ratio + 1)
        let ratio2 = (10 * (ratio*4))
            if(ratio2 > 20) ratio2 -= 2*(ratio2 - 20)
        let ratio3 = (10 * (ratio*4))
            if(ratio3 > 10 && ratio3 < 30) ratio3 -= 2*(ratio3 - 10)
            else if(ratio3 >= 30) ratio3 -=40

        if(isForward){
            yPosition -= (10 - ratio2)
            xPosition += ratio3
        }else{
            yPosition += (10 - ratio2)
            xPosition -=ratio3
        }
        
        if( checkVictory() ) return handleVictory()

        mycar.style.top=`${yPosition}px`
        mycar.style.left=`${xPosition}px`

        },myIntervalValues.moving)
}

//EVENT LISTENERS ---------------------------------------------------

window.initListeners = function(){
document.addEventListener('keypress',e=>{

    //WHEN YOU PRESS THE SPACEBAR
    if(e.keyCode==32){
       
        //PAUSES GAME 
        if(!state.paused){
            screens({
                title:'Paused',
                content:'Press space to continue.',
            })
            state.paused = true
            clearIntervals()
            pauseTimeouts()
        }else{
            killScreen()
            resumeTimeouts()

            //ADDITIONAL OPTIONS IF SPACEBAR IS PRESSED

            if(state.crashed){
                destroyTimeouts()
                state.crashed=false
                maps[state.mapIndex].reset()
                return crashListener = setInterval(()=>{
                    if( checkCrash() ){
                        handleCrash()
                        clearTimeout(crashListener)
                    }
                },50)
            }
            if(state.completed){
                state.completed = false
                maps[state.mapIndex].destroy()
                state.mapIndex++
                return maps[state.mapIndex].init()
            }


        }
    }
})




//WHEN YOU PRESS ANY OTHER KEY
document.addEventListener('keydown',function handleKeyDown(e){
    
1
    //38: top arrow....39 right arrow..... 40 bottom arrow... 37 left arrow
    //16: shift, 32: spacebar

    activeKeys[e.keyCode]=e.keyCode

    // console.log(e.keyCode)
    for(let key in activeKeys){
        //toggle headlights
        if(key==16){
            document.querySelectorAll('#my-car .headlight').forEach(element=>{
                if(!element.classList.contains('highbeams-in')){
                    element.classList.add('highbeams-in')
                    element.classList.remove('highbeams-out')
                }
                else{
                    element.classList.remove('highbeams-in')
                    element.classList.add('highbeams-out')
                }
            })
                
        }

        //move forward
        if(key==38&&!myIntervals.moving){
            if(state.paused) return
            move(true)
        }

        //move backward
        if(key==40&&!myIntervals.moving){
            if(state.paused) return
            move(false)
        } 

        //rotate left
        if(key==37&&!myIntervals.rotating){
            if(state.paused) return

            myIntervals.rotating = setInterval(()=>{

                if(state.paused) return

                rotationAngle-=10
                mycar.style.transform = `rotateZ(${rotationAngle}deg)`
            },myIntervalValues.rotating)
        }
        //rotate right
        if(key==39&&!myIntervals.rotating){
            if(state.paused) return
            myIntervals.rotating = setInterval(()=>{

                if(state.paused) return

                rotationAngle+=10
                mycar.style.transform = `rotateZ(${rotationAngle}deg)`
            },myIntervalValues.rotating)
        }
    }

})


document.addEventListener('keyup',function handleKeyUp(e){
    if(state.paused) return

    delete activeKeys[e.keyCode]
    if(e.keyCode==38|e.keyCode==40){
        clearInterval(myIntervals.moving)
        myIntervals.moving = null
        }
    if(e.keyCode==37|e.keyCode==39){
        clearInterval(myIntervals.rotating)
        myIntervals.rotating = null
    }
})
}

//INITIALIZATION ---------------------------------------------------
maps[state.mapIndex].init()
initListeners()

screens({
    title:'Road Whiz',
    content:'Can you survive the challenges?',
    button:'Continue'
})
